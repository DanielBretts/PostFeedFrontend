import { createContext } from "react";

import type { Post } from "./models/post";

export const PostsContext = createContext<Post[]>([]);
