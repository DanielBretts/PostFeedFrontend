import { Skeleton } from "./ui/skeleton";

export function CommentSkeleton() {
  return (
    <div className="flex flex-row items-center space-x-4 p-4">
      <div className="flex flex-col justify-start">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-col w-full">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
