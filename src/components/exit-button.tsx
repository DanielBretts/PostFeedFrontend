import { X } from "lucide-react";

export function ExitButton({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="flex items-center absolute size-4 z-10 top-4 right-4 rounded-sm border border-ring
              hover:ring hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <X className="w-full h-full text-ring hover:text-foreground p-0" />
    </div>
  );
}
