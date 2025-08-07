import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { useEffect, useState } from "react";
import { CommentComponent } from "./comment-component";
import type { Post } from "../models/post";
import type { Comment } from "../models/comment";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <ExitButton onClose={onClose} />
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            {post.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            {post.body}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <h3 className="text-start font-semibold">Comments</h3>
        <ScrollArea
          type="always"
          className="w-full min-h-[200px] max-h-[50vh] overflow-auto rounded-md border p-4"
        >
          {isLoadingComments
            ? "Loading comments..."
            : postComments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))}
        </ScrollArea>
        {/* <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
            {tags.map((tag) => (
              <React.Fragment key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
