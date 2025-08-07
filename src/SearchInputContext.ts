import { createContext } from "react";

type SearchInputContextType = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInputContext = createContext<
  SearchInputContextType | undefined
>(undefined);
