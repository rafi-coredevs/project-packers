/**
 * Custom selector
 * 
 * @param {Array} arg.option select options
 * @param {string} arg.value initial value
 * @param {function} arg.onChange callback function.
 * @param {string} styles custom styles 
 * @returns JSX Element 
 */

import React, { useState } from "react";
import downArrow from '../../../assets/icons/caret-down_minor.svg'
import downArrowWhite from '../../../assets/icons/caret-down_minor_white.svg'
import filter from "../../../assets/icons/cd-filter.svg";
const CustomSelect = ({ options, value, onChange, appearance, bg }) => {

  const [isOpen, setIsOpen] = useState(false);

  // window.addEventListener('click', (e) => {
  //   let triggerId = e.target.id;
  //   console.log(triggerId)
  //   if (triggerId == "customselect" || triggerId == "customselectfilter") { setIsOpen(true); }
  //   else {
  //     setIsOpen(false);
  //   }
  // })
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };


  const colorComb = {
    green: "bg-[#3E949A] text-white",
    white: "bg-white text-black",
    paste:"bg-[#CFF6EF]"
  }
  const iconComb = {
    green: downArrowWhite,
    white: downArrow,
    paste: downArrow
  }

  const sty_log = () => appearance == "select" ? "left-0 w-full" : " right-[0rem] w-[22rem]";
  return (
    <div className="relative inline-block w-full">
      {/* {JSON.stringify(options)} */}

      {appearance == "select" &&
        <div
          id="customselect"
          className={`py-2 px-4 ${colorComb[bg]} border border-[#ededed] rounded-md  cursor-pointer flex justify-between`}
          onClick={toggleDropdown}
        >
          {value ? value : 'Select'}
          <img src={iconComb[bg]} alt="" className="w-[1.5rem] h-[1.5rem]" />
        </div>
      }
      {appearance == "filter" &&
        <button onClick={toggleDropdown} className="border border-[#0000001f] p-2 " id="customselectfilter">
          <img src={filter} alt="" className="w-[1.5rem] h-[1.5rem]" />
        </button>

      }

      {isOpen ? (
        <ul className={`absolute z-10 top-full  ${colorComb[bg]} ${sty_log()} border  rounded-t-none shadow   overflow-y-auto scrollbar bg-white max-h-60`}>
          {options?.map((option, index) => (<li
            key={index}
            className={`${value === option.name ? 'bg-primary' : colorComb['white']} py-2 px-4 cursor-pointer   hover:bg-primary`}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.name}
          </li>
          )
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default CustomSelect;
