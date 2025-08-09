import "./App.css";
import { useState, useEffect } from "react";
import { SelectedPostContext } from "./SelectedPostContext.ts";
import { PostsContext } from "./PostsContext.ts";
import { Header } from "./components/header.tsx";
import { Separator } from "./components/ui/separator.tsx";
import { PostMenu } from "./components/post-menu.tsx";
import { ThemeProvider } from "./theme-provider";
import { ApiConfig } from "./utils/ApiConfig.ts";
import { CreatePostArea } from "./components/create-post-area.tsx";
import { Toaster } from "sonner";
import { PaginationControls } from "./components/pagination-controls.tsx";
import type { Post } from "./models/post.ts";

function App() {
  const PAGE_SIZE = 10;
  const [searchInput, setSearchInput] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchInput.length !== 0) {
      setTimeout(() => {
        setDisplayedPosts(
          allPosts.filter((post) =>
            post.title?.includes(searchInput.toLowerCase())
          )
        );
      }, 2000);
    } else {
      setDisplayedPosts(
        allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      );
    }
  }, [searchInput, page, allPosts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await ApiConfig.get<Post[]>("/posts");
        setAllPosts(posts);
        setDisplayedPosts(
          posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col items-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster position="top-center" richColors />
        <PostsContext.Provider value={displayedPosts}>
          <Header onSearchChange={setSearchInput} />

          <Separator className="my-1" />
          {searchInput.length > 0 ? (
            <div className="text-center">{`Search Results (${displayedPosts.length})`}</div>
          ) : (
            <CreatePostArea />
          )}
          <Separator className="my-1" />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SelectedPostContext.Provider
              value={{ selectedPost, setSelectedPost }}
            >
              <PostMenu />
            </SelectedPostContext.Provider>
          )}
          <PaginationControls
            currentPage={page}
            totalCount={allPosts.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </PostsContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
