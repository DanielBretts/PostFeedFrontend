import { useState, useEffect } from "react";
import { Separator } from "./components/ui/separator.tsx";
import { SearchInput } from "./components/search-input.tsx";
import type { Post } from "./models/post.ts";
import { PostsContext } from "./PostsContext.ts";
import { PostMenu } from "./components/post-menu.tsx";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./components/mode-toggle.tsx";
import "./App.css";
import { SelectedPostContext } from "./SelectedPostContext.ts";

function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //TODO debounce search
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setAllPosts(data);
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setPosts(allPosts.filter((post) => post.title?.includes(searchInput)));
  }, [searchInput, allPosts]);

  if (error) return <div>Error: {error}</div>;
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PostsContext.Provider value={posts}>
        <div className="bg-background sticky z-10 top-0 flex justify-between w-full gap-2 m-4">
          <div className="flex-1"></div>

          <div className="flex-1 flex justify-center">
            <SearchInput placeholder="Search" onInputChange={setSearchInput} />
          </div>
          <div className="flex-1 flex">
            <ModeToggle />
          </div>
        </div>

        <Separator className="my-4" />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <SelectedPostContext.Provider
            value={{ selectedPost, setSelectedPost }}
          >
            <PostMenu />
          </SelectedPostContext.Provider>
        )}
      </PostsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
