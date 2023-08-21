import { useEffect, useState } from "react";

const Paginate = ({ totalPage, onPageChange }) => {
  const [startPage, setStartPage] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {

    if (activePage >= 3 && activePage <= totalPage - 2) {
      setStartPage(activePage - 3);
    } else if (activePage > totalPage - 2) {
      setStartPage(totalPage - 5);
    } else {
      setStartPage(0);
    }
  }, [activePage, totalPage]);

  const clickHandler = (pageNumber) => {
    if (pageNumber <= 0) {
      setActivePage(1);
      onPageChange(1);
    } else if (pageNumber >= totalPage) {
      setActivePage(totalPage);
      onPageChange(totalPage);
    } else {
      setActivePage(pageNumber);
      onPageChange(pageNumber);
    }
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={() => clickHandler(activePage - 5)}
        className="h-[40px] w-[40px] bg-primary  flex items-center justify-center rounded-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5303 5.46967C15.8232 5.76256 15.8232 6.23744 15.5303 6.53033L10.2375 11.8232C10.1674 11.8933 10.1106 11.9501 10.0623 12C10.1106 12.0499 10.1674 12.1067 10.2374 12.1767L15.5303 17.4697C15.8232 17.7626 15.8232 18.2374 15.5303 18.5303C15.2374 18.8232 14.7626 18.8232 14.4697 18.5303L9.17682 13.2375C9.17681 13.2375 9.17684 13.2375 9.17682 13.2375C9.16881 13.2294 9.16071 13.2214 9.15261 13.2133C9.00745 13.0682 8.85048 12.9114 8.73585 12.7611C8.60161 12.5852 8.45712 12.3335 8.45712 12C8.45712 11.6665 8.60161 11.4148 8.73585 11.2389C8.85048 11.0886 9.00745 10.9318 9.15261 10.7867C9.16071 10.7786 9.16878 10.7706 9.17679 10.7626C9.1768 10.7626 9.17678 10.7626 9.17679 10.7626L14.4697 5.46967C14.7626 5.17678 15.2374 5.17678 15.5303 5.46967Z"
            fill="#141B34"
          />
        </svg>
      </button>
      {pageNumbers.slice(startPage, startPage + 4).map((page) => {
        return (
          <button
            key={page}
            onClick={() => clickHandler(page)}
            className={`h-[40px] w-[40px] ${
              activePage === page ? "bg-primary" : "bg-[#CFF6EF]"
            }  flex items-center justify-center rounded-full`}
          >
            {page}
          </button>
        );
      })}
      <button
        className={`h-[40px] w-[40px] bg-[#CFF6EF]  flex items-center justify-center rounded-full`}
      >
        ...
      </button>
      <button
        onClick={() => clickHandler(pageNumbers.slice(-1)[0])}
        className={`h-[40px] w-[40px] ${
            activePage === totalPage ? "bg-primary" : "bg-[#CFF6EF]"
          } flex items-center justify-center rounded-full`}
      >
        {pageNumbers.slice(-1)}
      </button>
      <button
        onClick={() => clickHandler(activePage + 5)}
        className="h-[40px] w-[40px] bg-primary  flex items-center justify-center rounded-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L14.8232 10.7626C14.8313 10.7706 14.8394 10.7788 14.8476 10.7869C14.9927 10.9319 15.1496 11.0887 15.2641 11.2388C15.3984 11.4147 15.5429 11.6665 15.5429 12C15.5429 12.3335 15.3984 12.5853 15.2641 12.7612C15.1496 12.9113 14.9927 13.0681 14.8476 13.2131C14.8394 13.2212 14.8313 13.2294 14.8232 13.2374L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303C8.17678 18.2374 8.17678 17.7626 8.46967 17.4697L13.7626 12.1768C13.8326 12.1067 13.8894 12.0499 13.9377 12C13.8894 11.9501 13.8326 11.8933 13.7626 11.8232L8.46967 6.53033C8.17678 6.23744 8.17678 5.76256 8.46967 5.46967Z"
            fill="#141B34"
          />
        </svg>
      </button>
    </div>
  );
};

export default Paginate;
