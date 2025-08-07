import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState, useContext } from "react";
import { PostsContext } from "../PostsContext";
import { SelectedPostContext } from "../SelectedPostContext";
import type { Post } from "@/models/post";
import { PostDialog } from "./post-dialog";

export function PostMenu() {
  const posts = useContext(PostsContext);
  const selectedPostContext = useContext(SelectedPostContext);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (!selectedPostContext)
    throw new Error("SelectedPostContext must be used within its provider");

  return (
    <>
      {posts.map((post) => (
        <CardContainer className="inter-var">
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="inline-block"
          >
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {post.title ?? ""}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {post.body ?? ""}
              </CardItem>
            </CardBody>
          </div>
        </CardContainer>
      ))}

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PostDialog
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        </div>
      )}
    </>
  );
}
