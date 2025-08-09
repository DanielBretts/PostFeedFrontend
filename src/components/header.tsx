// Header.tsx
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { SearchInput } from "./search-input";

interface HeaderProps {
  onSearchChange: (value: string) => void;
}

export function Header({ onSearchChange }: HeaderProps) {
  return (
    <div className="bg-background sticky z-10 top-0 flex justify-between w-full gap-2 p-2">
      <div className="flex flex-row md:flex-1 flex-0.5 justify-start">
        <img
          src="/logo.png"
          alt=""
          className="h-8 w-auto max-w-full object-contain md:h-16"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <SearchInput placeholder="Search" onInputChange={onSearchChange} />
      </div>

      <div className="inline-block md:flex md:flex-1 md:justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
