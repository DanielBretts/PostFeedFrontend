import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { usePosts } from "../PostsContext";

function getPageNumbers(current: number, total: number) {
  const pages: (number | "...")[] = [];
  const window = 1;

  const push = (p: number | "...") => pages.push(p);

  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i);
    return pages;
  }
  push(1);

  const start = Math.max(2, current - window);
  const end = Math.min(total - 1, current + window);

  if (start > 2) push("...");
  for (let i = start; i <= end; i++) push(i);
  if (end < total - 1) push("...");

  push(total);
  return pages;
}

export function PaginationControls() {
  const PAGE_SIZE = 10;
  const { page, setPage, displayedPosts } = usePosts();
  const totalPages = Math.max(
    1,
    Math.ceil(displayedPosts?.length ?? 1 / PAGE_SIZE)
  );
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pages = getPageNumbers(page, totalPages);

  return (
    <Pagination className="pb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!canPrev}
            onClick={(e) => {
              e.preventDefault();
              if (canPrev) setPage(page - 1);
            }}
          />
        </PaginationItem>

        {pages.map((p, idx) =>
          p === "..." ? (
            <PaginationItem key={`ell-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={!canNext}
            onClick={(e) => {
              e.preventDefault();
              if (canNext) setPage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
