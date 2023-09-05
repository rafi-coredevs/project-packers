import { useState } from "react";
import { Link } from "react-router-dom";
// data
import { suppoortArticles } from "../Store/Data";
// shared components
import { useTitle } from "../Components/Hooks/useTitle";
import Input from "../Components/UiElements/Input/Input";
import Content1 from "../Components/SupportContent/Content1";
import Content2 from "../Components/SupportContent/Content2";
import Content3 from "../Components/SupportContent/Content3";
import Content4 from "../Components/SupportContent/Content4";
import Content5 from "../Components/SupportContent/Content5";
import Content6 from "../Components/SupportContent/Content6";

// image & icons
import search from "../assets/icons/cd-search2.svg";
// import Button from '../Components/UiElements/Buttons/Button';
//
const Support = () => {
  useTitle("Support Center");
  const [activeContent, setActiveContent] = useState(0);
  // Function to handle content change
  const handleContentChange = (content) => {
    setActiveContent(content);
  };
  const activeContents = [
    <Content1 />,
    <Content2 />,
    <Content3 />,
    <Content4 />,
    <Content5 />,
    <Content6 />,
  ];

  return (
    <main className="min-h-screen">
      <div className="bg-secondary py-14 hidden sm:block">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-[48px] font-semibold">
              Support Center
            </h1>
            <Input className={'w-full'} type="text" placeholder="Search...">
              <img src={search} alt="" />
            </Input>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-12 flex items-start flex-col md:flex-row gap-12 md:gap-[4.12rem]">
        <div className="w-full md:w-[17.5375rem]">
          {/* sidebar title */}
          <div className="font-semibold w-full text-xl text-[#124E58] p-[0.625rem]">
            Articles in this section
            <hr className="mt-3 w-full" />
          </div>
          {/* sidebar buttons */}
          <ul className="flex flex-nowrap list-disc  sm:items-start items-center flex-row overflow-x-auto sm:px-[1.0rem] px-[1.5rem]  md:flex-col w-full md:w-[18rem] gap-[0.625rem]">
            {suppoortArticles.map((articleHeader, index) => {
              return (
                <SupportMenuButton key={index}
                  buttonName={articleHeader}
                  activeContent={activeContent}
                  handleContentChange={() => handleContentChange(index)}
                  activeNumber={index}
                />
              );
            })}
          </ul>
        </div>

        <div className="w-full px-4 lg:pr-60">
          {activeContents[activeContent]}
        </div>
      </div>
    </main>
  );
};

export default Support;

// support button
const SupportMenuButton = ({
  activeContent,
  activeNumber,
  buttonName,
  handleContentChange,
}) => {
  return (
    <li
      onClick={handleContentChange}
      className={`p-[0.75rem] text-slate-600 cursor-pointer  w-[16.0rem] outline-none flex justify-start   items-start gap-[0.5rem]   ${activeContent === activeNumber &&
        "bg-[#F2C852] text-black text-md font-semibold rounded-full"
        }  `}
    >
      <Dot />
      <span className="text-start   flex-grow w-[15.5rem] "> {buttonName}</span>
    </li>
  );
};

function Dot() {
  return (
    <svg
      className=" w-[0.50rem] rounded-full  bg-black my-auto"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill="" />
    </svg>
  );
}
