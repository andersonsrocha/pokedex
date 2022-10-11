import { useState } from "react";
import classNames from "classnames";
import { range } from "@utils";

export type PageChangeEvent = {
  pageNumber: number;
  pageSize: number;
};

export type PaginationProps = {
  pageSize?: number;
  pageNumber: number;
  count: number;
  onChange?: (e: PageChangeEvent) => void;
};

export function Pagination(props: PaginationProps) {
  const { count, onChange, pageSize = 20 } = props;

  const [current, setCurrent] = useState(props.pageNumber);

  const LEFT_PAGE_CONST = "LEFT";
  const RIGHT_PAGE_CONST = "RIGHT";

  const pagesCount = Math.max(1, Math.ceil(count / pageSize));
  const pagesNeighbours = 2;
  const pagesNumbers = pagesNeighbours * 2 + 3;
  const pagesBlocks = pagesNumbers + 2;

  const getPagination = () => {
    if (pagesCount > pagesBlocks) {
      const leftPage = Math.max(2, current - pagesNeighbours);
      const rightPage = Math.min(pagesCount - 1, current + pagesNeighbours);
      const pages = range(leftPage, rightPage);

      const hasLeftPage = leftPage > 2;
      const hasRightPage = pagesCount - rightPage > 1;
      const pageOffset = pagesNumbers - (pages.length + 1);

      if (hasLeftPage && !hasRightPage) {
        const extraPages = range(leftPage - pageOffset, leftPage - 1);
        return [1, LEFT_PAGE_CONST, ...extraPages, ...pages, pagesCount];
      } else if (!hasLeftPage && hasRightPage) {
        const extraPages = range(rightPage + 1, rightPage + pageOffset - 2);
        return [1, ...pages, ...extraPages, RIGHT_PAGE_CONST, pagesCount];
      } else if (hasLeftPage && hasRightPage) {
        return [1, LEFT_PAGE_CONST, ...pages, RIGHT_PAGE_CONST, pagesCount];
      }
    }

    return range(1, pagesCount);
  };

  const onChangePage = (pageNumber: number) => {
    setCurrent(pageNumber);
    onChange?.({ pageNumber, pageSize });
  };

  const onPrev = () => {
    setCurrent((cur) => {
      const pageNumber = cur - 1;

      onChange?.({ pageNumber, pageSize });
      return pageNumber;
    });
  };

  const onNext = () => {
    setCurrent((cur) => {
      const pageNumber = cur + 1;

      onChange?.({ pageNumber, pageSize });
      return pageNumber;
    });
  };

  const onMoveLeft = () => {
    setCurrent((cur) => {
      const pageNumber = cur - pagesNeighbours * 2 - 1 || 1;

      onChange?.({ pageNumber, pageSize });
      return pageNumber;
    });
  };

  const onMoveRight = () => {
    setCurrent((cur) => {
      const newCur = cur + pagesNeighbours * 2 + 1;
      const pageNumber = newCur > pagesCount ? pagesCount : newCur;

      onChange?.({ pageNumber, pageSize });
      return pageNumber;
    });
  };

  return (
    <ul className="flex gap-1 text-white text-sm">
      <li>
        <button
          onClick={onPrev}
          disabled={current < 2}
          className="w-8 h-8 rounded-sm border-[1px] border-divide disabled:cursor-not-allowed disabled:bg-disabled"
        >
          <span aria-hidden="true">&lt;</span>
        </button>
      </li>

      {getPagination().map((page) => (
        <li key={page}>
          {page == "LEFT" && (
            <button onClick={onMoveLeft} className="w-8 h-8 rounded-sm">
              <span aria-hidden="true">&laquo;</span>
            </button>
          )}

          <button
            hidden={typeof page != "number"}
            onClick={() => onChangePage(Number(page))}
            className={classNames("w-8 h-8 rounded-sm border-[1px] border-divide", {
              "bg-white text-brand-500": page == current,
            })}
          >
            {page}
          </button>

          {page == "RIGHT" && (
            <button onClick={onMoveRight} className="w-8 h-8 rounded-sm">
              <span aria-hidden="true">&raquo;</span>
            </button>
          )}
        </li>
      ))}

      <li>
        <button
          onClick={onNext}
          disabled={current == pagesCount}
          className="w-8 h-8 rounded-sm border-[1px] border-divide disabled:cursor-not-allowed disabled:bg-disabled"
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      </li>
    </ul>
  );
}
