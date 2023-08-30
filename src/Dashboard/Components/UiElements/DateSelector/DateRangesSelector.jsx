/**
 * DateRangeSelector()
 * pick date range
 *
 * @param {function} arg.onSubmit callback function
 *
 * @returns JSX element Calendar.
 */

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import calendar from '../../../../assets/icons/cd-calendar.svg'
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangeSelector = ({ onSubmit }) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isVisible, setVisible] = useState(false);
  const formatMonthYear = (date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleSelect = (ranges) => {
    setSelectedDateRange(ranges.selection);
  };

  const submitHandler = () => {
    onSubmit(selectedDateRange);
    setVisible(false);
  };

  const cancelHandler = () => {
    setVisible(false);
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  return (
    <div className="relative bg-white">
      <button
        onClick={() => setVisible(!isVisible)}
        type="button"
        className="flex gap-2 items-center rounded-md border border-slate-300 px-2 py-[0.4rem]"
      >
        <img src={calendar} alt="" />
        <span className="">{formatMonthYear(selectedDateRange.startDate)}</span>
        <span className="">-</span>
        <span className="">{formatMonthYear(selectedDateRange.endDate)}</span>
      </button>
      {isVisible && (
        <div className="shadow absolute right-0 z-10 bg-white">
          <DateRangePicker
            onChange={handleSelect}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={[selectedDateRange]}
            rangeColors={'#ededed'}
            direction="horizontal"
          />
          <div className=" flex items-center justify-around">
            <button
              onClick={cancelHandler}
              className="px-4 py-2 mb-2 text-red-700 hover:bg-primary rounded"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="px-4 py-2 mb-2 text-secondary hover:bg-primary rounded"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
