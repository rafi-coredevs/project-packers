// todo colors need to change.
//  * According component
// ? props => parameters: header, description
import { useState, useRef, useEffect } from "react";

const Collapse = ({ data }) => {
  const [expand, setExpand] = useState(false);
  const collapseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        setExpand(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={collapseRef}
      onBlur={() => setExpand(false)}
      onClick={() => setExpand(!expand)}
      className="cursor-pointer py-4 border-b border-slate-200 justify-start items-start gap-[25px] inline-flex"
    >
      <div
        className={`px-[15px] py-1.5 ${
          expand ? "bg-primary" : "bg-[#CFF6EF]"
        } rounded-[50px] border border-cyan-900 flex-col justify-start items-start gap-2.5 inline-flex transition-all duration-500`}
      >
        <span className="text-secondary text-lg font-semibold leading-7">
          ?
        </span>
      </div>
      <div className="flex-col justify-center items-start gap-3 inline-flex">
        <p className="text-cyan-900 text-lg font-semibold leading-7">
          {data?.header}
        </p>
        <p
          className={`text-slate-600 text-base font-normal w-full max-w-[320px] leading-normal overflow-hidden transition-all duration-500 ${
            expand ? "h-auto opacity-100" : "h-0 opacity-0"
          }`}
        >
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default Collapse;

