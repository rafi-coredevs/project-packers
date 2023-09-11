import React, { useEffect } from "react";
import arrow_left from "../../../assets/icons/cd-arrow-left-1.svg";
import arrow_right from "../../../assets/icons/cd-arrow-right-2.svg";

/**
* Pagination Component
* @param {Number} page Current Page Number
* @param {Number} setPage Set Current Page Number
* @param {Number} pageLimit Max Page Number
* @returns Pagination Component
*/

const Pagination = ({ page, setPage, pageLimit }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= pageLimit; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page])

  const pageNumbers = getPageNumbers();

  const maxVisibleButtons = 5;

  const buttonsToShow = [];

  if (pageLimit <= maxVisibleButtons) {
    buttonsToShow.push(...pageNumbers.slice(0, maxVisibleButtons));
  }
  else if (page <= maxVisibleButtons - 2) {
    buttonsToShow.push(...pageNumbers.slice(0, maxVisibleButtons - 1), "...");
  } else if (page > pageLimit - maxVisibleButtons + 2) {
    buttonsToShow.push(
      "...",
      ...pageNumbers.slice(pageLimit - maxVisibleButtons + 1)
    );
  } else {
    const start = page - 2;

    const end = page + 2;

    buttonsToShow.push("...", ...pageNumbers.slice(start - 1, end), "...");
  }

  return (
    <div className="flex items-center gap-1 lg:gap-2">
      <button
        className="bg-primary rounded-full lg:p-1"
        onClick={() => page > 1 && setPage(page - 1)}
      >
        <img src={arrow_left} className="w-10 h-10" />
      </button>

      {buttonsToShow.map((num, i) => (
        <div key={i} className={`h-12 w-12 flex items-center justify-center  text-xs lg:text-sm rounded-full ${page === num ? "bg-primary" : "bg-[#CFF6EF]"
          }`}>
          <button
            key={i}
            className="h-full w-full"
            onClick={() => num !== "..." && setPage(num)}
          >
            {num}
          </button>
        </div>
      ))}

      <button
        className="bg-primary rounded-full lg:p-1"
        onClick={() => page < pageLimit && setPage(page + 1)}
      >
        <img src={arrow_right} className="w-10 h-10" />
      </button>
    </div>
  );
};

export default Pagination;
