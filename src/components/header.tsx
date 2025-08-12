import { ModeToggle } from "../components/ModeToggle";
import { LogoComponent } from "./LogoComponent";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
  onSearchChange?: (value: string) => void;
  showSearch: boolean;
}

export function Header({ showSearch, onSearchChange }: HeaderProps) {
  return (
    <div className="bg-background sticky z-10 top-0 flex justify-between w-full gap-2 p-2">
      <LogoComponent />

      <div className="flex-1 flex flex-col justify-center">
        {showSearch && (
          <div>
            <SearchInput
              placeholder="Search"
              onInputChange={(input) => {
                if (showSearch && onSearchChange) {
                  onSearchChange(input);
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="inline-block md:flex md:flex-1 md:items-center md:justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
