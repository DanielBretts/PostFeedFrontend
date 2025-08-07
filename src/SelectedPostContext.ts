import { createContext } from "react";
import type { Post } from "./models/post";

type SelectedPostContextType = {
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const SelectedPostContext = createContext<
  SelectedPostContextType | undefined
>(undefined);
