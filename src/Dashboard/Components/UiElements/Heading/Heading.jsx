import arrow from "../../../../assets/icons/cd-arrow-left.svg";
import { useNavigate } from "react-router-dom";
const Heading = ({ type, title, children, back }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(-1);
  };
  if (type === "navigate") {
    return (
      <div className="flex justify-between items-center">
        <div className="py-4 flex gap-2">
          <button onClick={navigateHandler}>
            <img
              className="p-2 border border-[#00000027] rounded"
              src={arrow}
              alt=""
            />
          </button>
          <div className="">
            <p className="text-sm text-[#475569]">Back to {back}</p>
            <p className="text-xl text-secondary font-semibold">{title}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center">{children}</div>
      </div>
    );
  }
  return (
    <div className="py-4 border-b border-[#0000001c] ">
      <div className="flex justify-between items-center">
        <div className="">
          {type === "navigate" ? "" : ""}
          <h1 className="text-secondary text-xl font-semibold">
            {title || "no data"}
          </h1>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Heading;
