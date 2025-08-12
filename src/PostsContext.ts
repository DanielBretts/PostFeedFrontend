import { useContext, createContext } from "react";
import type { Post } from "./models/post";

interface PostsContextType {
  allPosts: Post[];
  displayedPosts: Post[] | null;
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  page: number;
  searchInput: string;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setDisplayedPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
}

export const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
