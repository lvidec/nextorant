import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MealWithAdditionalFields } from "@/lib/types";
import { generatePageHref } from "@/lib/utils";

interface PaginationSelectProps {
  meals: MealWithAdditionalFields[];
  currentPage: number;
  perPage: number;
}

export function PaginationSelect({
  meals,
  currentPage,
  perPage,
}: PaginationSelectProps) {
  const canGoNext = currentPage * perPage < meals.length;
  const canGoPrev = currentPage > 1;

  const lastPossiblePage = Math.ceil(meals.length / perPage);

  const getPrevHref = () => generatePageHref(currentPage - 1 || 1, perPage);
  const getNextHref = () => generatePageHref(currentPage + 1 || 1, perPage);
  const getNumberHref = (number: number) => generatePageHref(number, perPage);

  const getThreeMiddleNumbers = () => {
    const start = currentPage - 1 || 1;
    let end =
      lastPossiblePage < currentPage + 1 ? lastPossiblePage : currentPage + 1;

    if (currentPage + 1 < 3 && lastPossiblePage > 2) end = 3

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <Pagination>
      <PaginationContent>
        {canGoPrev && (
          <PaginationItem>
            <PaginationPrevious href={getPrevHref()} />
          </PaginationItem>
        )}
        {getThreeMiddleNumbers().map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              href={getNumberHref(Number(num))}
              isActive={num === currentPage}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        {lastPossiblePage > currentPage + 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {canGoNext && (
          <PaginationItem>
            <PaginationNext href={getNextHref()} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
