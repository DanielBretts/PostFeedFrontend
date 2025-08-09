import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(current: number, total: number) {
  // simple windowed pager: 1, ..., current-1, current, current+1, ..., total
  const pages: (number | "...")[] = [];
  const window = 1; // show 1 on each side of current

  const push = (p: number | "...") => pages.push(p);

  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i);
    return pages;
  }
  // always show first
  push(1);

  const start = Math.max(2, current - window);
  const end = Math.min(total - 1, current + window);

  if (start > 2) push("...");
  for (let i = start; i <= end; i++) push(i);
  if (end < total - 1) push("...");
  // always show last
  push(total);
  return pages;
}

export function PaginationControls({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <Pagination className="pb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!canPrev}
            onClick={(e) => {
              e.preventDefault();
              if (canPrev) onPageChange(currentPage - 1);
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
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(p);
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
              if (canNext) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
