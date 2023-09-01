/**
 * DateRangeSelector()
 * pick date range
 *
 * @param  {string} args.type - type of selector single || multiple
 * @param {function} args.onSubmit callback function
 * @param {string} args.label input label
 * @param {string} args.style styles
 * @param {boolean} args.error field error
 * @returns JSX element Calendar.
 */

import React, { useState } from "react";
import { Calendar, DateRange, DateRangePicker } from "react-date-range";
import calendar from '../../../../assets/icons/cd-calendar.svg'
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangeSelector = ({ type, label, onSubmit, style, error }) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [date, setDate] = useState(new Date());
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
  const dateHandler = (date) => {
    const formatted = date.toLocaleString('en-US',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
    setDate(date)
    onSubmit(formatted)
    setVisible(false)
  }
  const cancelHandler = () => {
    setVisible(false);
    setSelectedDateRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };
  if (type === 'single') {
    return (
      <div className="relative">
        <p className="text-[#475569] text-sm mb-1">{label}</p>
        <div className="bg-white">
          <span onClick={() => setVisible(!isVisible)} className={`flex w-full justify-end gap-4  px-3 py-2 ${style} cursor-pointer ${error && 'border-red-500'}`}> <span>

            {date.toLocaleString('en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
          </span>
            <img src={calendar} alt="" />

          </span>
          {isVisible && <div className="absolute top-16 shadow-md bg-white z-50">
            <Calendar
              date={date}
              onChange={dateHandler}
              color='#F2C852'
            />
          </div>}
        </div>
      </div>
    )
  }
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
            rangeColors={['#F2C852']}
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
