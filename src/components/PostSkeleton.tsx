import { Skeleton } from "../components/ui/skeleton";

export function PostSkeleton() {
  return (
    <Skeleton className="w-[30%] h-40 rounded-xl p-2 border bg-gray-50 dark:bg-black dark:border-white/20 border-black/10" />
  );
}
