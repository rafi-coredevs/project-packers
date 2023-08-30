/**
 * Custom selector
 * 
 * @param {Array} arg.option select options
 * @param {string} arg.value initial value
 * @param {function} arg.onChange callback function.
 * 
 * @returns JSX Element 
 */

import React, { useState, useEffect } from "react";
import downArrow from '../../../assets/icons/caret-down_minor.svg'
import filter from "../../../assets/icons/cd-filter.svg";
const CustomSelect = ({ options, value, onChange, appearance, bg }) => {

  const [isOpen, setIsOpen] = useState(false);

  // window.addEventListener('click', ()=>{
  //   setIsOpen(false)
  // })
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const sty_log = () => appearance == "select" ? "left-0 w-full" : " right-[0rem] w-[22rem]";
  return (
    <div className="relative inline-block w-full">
      {/* {JSON.stringify(options)} */}

      {appearance == "select" &&
        <div
          className={`py-2 px-4 ${bg} border border-[#ededed] rounded-md  cursor-pointer flex justify-between`}
          onClick={toggleDropdown}
        >
          {value === null ? 'Select' : value}
          <img src={downArrow} alt="" />
        </div>
      }
      {appearance == "filter" &&
        <button onClick={toggleDropdown} className=" border-[#0000001f] p-2 ">
          <img className="opacity-70" src={filter} alt="" />
        </button>

      }

      {isOpen ? (
        <ul className={`absolute z-10 top-full  ${bg} ${sty_log()} border  rounded-t-none shadow   overflow-y-auto scrollbar`}>
          {options?.map((option, index) => (<li
            key={index}
            className={`${value === option.name ? 'bg-primary' : bg} py-2 px-4 cursor-pointer   hover:bg-primary`}
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
