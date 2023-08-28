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
const CustomSelect = ({ options, value, onChange }) => {

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



  return (
    <div className="relative inline-block w-full">
      <div
        className="py-2 px-4 bg-white border border-[#ededed] rounded-md  cursor-pointer flex justify-between"
        onClick={toggleDropdown}
      >
        {value === null ? 'Select' : value}
        <img src={downArrow} alt="" />
      </div>
      {isOpen  ? (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-t-none shadow max-h-40 overflow-y-auto scrollbar">
          {options.map((option, index) => (
            <li
              key={index}
              className={`${value === option.name ? 'bg-primary': 'bg-white'} py-2 px-4 cursor-pointer   hover:bg-primary`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      ): null}
    </div>
  );
};

export default CustomSelect;
