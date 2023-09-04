/**
 * Query()
 * 
 * @param {string} args.title - query title
 * @param {string} args.description - query description
 * 
 * @returns JSX Element
 */

import search from "../../../assets/icons/searchYellow.svg";
const Query = ({ title, description }) => {
  return (
    <div className="flex gap-5 w-full flex-wrap md:flex-nowrap max-w-[34.375rem] items-start">
      <img src={search} />
      <div className="grid gap-3">
        <p className="font-sans md:text-2xl  leading-8 tracking-[-0.48px] text-secondary font-semibold">
          {title}
        </p>
        <p className=" text-[#475569] text-base font-normal leading-6 font-sans">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Query;
