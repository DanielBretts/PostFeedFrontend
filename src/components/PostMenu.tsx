import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { usePosts } from "../PostsContext";
import { PostDialog } from "@/pages/PostDialog";

export function PostMenu() {
  const { displayedPosts, selectedPost, setSelectedPost } = usePosts();
  return (
    <div className="pl-2 pr-2">
      {displayedPosts?.map((post) => (
        <CardContainer key={post.id} className="inter-var">
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
        <PostDialog post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
