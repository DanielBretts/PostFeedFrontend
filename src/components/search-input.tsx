import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
type Props = {
  placeholder: string;
  onInputChange: (value: string) => void;
};

export function SearchInput({ placeholder, onInputChange }: Props) {
  return (
    <div className="group flex items-center justify-between rounded-lg border border-border transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:shadow-lg">
      <Input
        placeholder={placeholder || "Search"}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => onInputChange(e.target.value)}
      />
      <Button
        size="icon"
        variant="ghost"
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Search />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
