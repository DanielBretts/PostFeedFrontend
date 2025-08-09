import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { CommentComponent } from "./comment-component";
import type { Post } from "../models/post";
import type { Comment } from "../models/comment";
import { ScrollArea } from "./ui/scroll-area";
import { ExitButton } from "./exit-button";
import { Separator } from "./ui/separator";

export function PostDialog({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Comment[] = await response.json();
        setPostComments(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoadingComments(false);
      }
    };
    fetchComments();
  }, [open, post.id]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <ExitButton onClose={onClose} />
        <DialogHeader>
          <DialogTitle className="text-start">{post.title}</DialogTitle>
          <DialogDescription className="text-start">
            <ScrollArea
              type="always"
              className="w-full min-h-[50px] max-h-[30vh] overflow-auto rounded-md border border-transparent p-4"
            >
              {post.body}
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <h3 className="text-start font-semibold">Comments</h3>
        <ScrollArea
          type="always"
          className="w-full min-h-[200px] max-h-[30vh] overflow-auto rounded-md border border-transparent p-4"
        >
          {isLoadingComments
            ? "Loading comments..."
            : postComments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
