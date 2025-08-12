import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { usePosts } from "@/PostsContext";
type Props = {
  placeholder: string;
  onInputChange: (value: string) => void;
};

export function SearchInput({ placeholder, onInputChange }: Props) {
  const { searchInput, setSearchInput } = usePosts();
  return (
    <div className="w-full p-1 group flex items-center justify-between rounded-lg border border-border transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-lg">
      <Input
        placeholder={placeholder || "Search"}
        className="h-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md"
        onChange={(e) => {
          setSearchInput(e.target.value);
          onInputChange(e.target.value);
        }}
        value={searchInput}
      />
      <div className="flex flex-row pe-2 items-center space-x-1">
        {searchInput && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchInput("")}
            className="w-8 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Search className="focus-visible:ring-0 focus-visible:ring-offset-0 w-4 h-4" />
      </div>
    </div>
  );
}
