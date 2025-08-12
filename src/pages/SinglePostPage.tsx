import { CommentComponent } from "../components/CommentComponent";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { CommentSkeleton } from "../components/CommentSkeleton";
import { useEffect, useState } from "react";
import type { Comment } from "@/models/Comment";
import { useParams } from "react-router-dom";
import { usePosts } from "@/PostsContext";
import { ApiConfig } from "@/utils/ApiConfig";
import { ThemeProvider } from "@/theme-provider";
import { Header } from "@/components/header";
import NotFound from "./NotFoundPage";

export function SinglePostPage() {
  const { id } = useParams();
  const { allPosts } = usePosts();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const selectedPost = allPosts.find((p) => p.id === Number(id));

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await ApiConfig.get<Comment[]>(
          `/comments?postId=${selectedPost?.id}`
        );
        setPostComments(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoadingComments(false);
      }
    };
    fetchComments();
  });

  if (error) return <div>Error: {error}</div>;

  if (selectedPost === undefined) return <NotFound />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4">
        <Header showSearch={false} />
        <div className="p-4">
          <h2 className="text-start text-2xl font-semibold">
            {selectedPost?.title}
          </h2>
          <h5 className="text-start">
            <ScrollArea
              type="always"
              className="w-full min-h-[50px] max-h-[30vh] overflow-auto rounded-md border border-transparent p-4"
            >
              {selectedPost?.body}
            </ScrollArea>
          </h5>
          <Separator />
          <h3 className="text-start font-semibold">Comments</h3>
          <ScrollArea
            type="always"
            className="w-full min-h-[200px] max-h-[30vh] overflow-auto rounded-md border border-transparent p-4"
          >
            {isLoadingComments ? (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : (
              postComments.map((comment) => (
                <CommentComponent key={comment.id} comment={comment} />
              ))
            )}
          </ScrollArea>
        </div>
      </div>
    </ThemeProvider>
  );
}
