import search from "../../../assets/icons/searchYellow.svg";
const Query = ({ title, description }) => {
  return (
    <div className="flex gap-5 flex-wrap items-start mb-12">
      <img src={search} />
      <div className="">
        <p className="pb-3 font-sans text-[24px] sm:text-[32px] text-secondary font-semibold">
          {title}
        </p>
        <p className=" text-[#475569] text-base font-normal font-sans">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Query;
