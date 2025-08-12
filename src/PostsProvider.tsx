import { useEffect, useState } from "react";
import { PostsContext } from "./PostsContext";
import type { Post } from "./models/post";
import { ApiConfig } from "./utils/ApiConfig";

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const PAGE_SIZE = 10;
  const [searchInput, setSearchInput] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[] | null>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchInput.length !== 0) {
      const timeout = setTimeout(() => {
        setDisplayedPosts(
          allPosts.filter((post) =>
            post.title?.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      }, 1000);
      return () => clearTimeout(timeout);
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
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  return (
    <PostsContext.Provider
      value={{
        allPosts,
        displayedPosts,
        selectedPost,
        loading,
        error,
        page,
        searchInput,
        pageSize: PAGE_SIZE,
        setPage,
        setSearchInput,
        setSelectedPost,
        setDisplayedPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
