import "../App.css";
import { Header } from "../components/header";
import { Separator } from "../components/ui/separator";
import { PostMenu } from "../components/PostMenu";
import { ThemeProvider } from "../theme-provider";
import { CreatePostArea } from "../components/CreatePostArea";
import { Toaster } from "sonner";
import { PaginationControls } from "../components/PaginationControls";
import { PostSkeleton } from "../components/PostSkeleton";
import { usePosts } from "../PostsContext";

export function PostsPage() {
  const { displayedPosts, loading, error, searchInput, setSearchInput } =
    usePosts();

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col items-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" richColors />
        <Header showSearch={true} onSearchChange={setSearchInput} />

        <Separator className="my-1" />
        {searchInput.length > 0 ? (
          <div className="text-center">{`Search Results (${displayedPosts?.length})`}</div>
        ) : (
          <CreatePostArea />
        )}
        <Separator className="my-1" />
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <PostMenu />
        )}
        {searchInput.length === 0 && <PaginationControls />}
      </ThemeProvider>
    </div>
  );
}
