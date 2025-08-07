import { X } from "lucide-react";

export function ExitButton({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="flex items-center absolute size-8 z-10 top-4 right-4 rounded-full p-2 border border-ring
              hover:ring hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <X className=" text-ring hover:text-white" />
    </div>
  );
}
