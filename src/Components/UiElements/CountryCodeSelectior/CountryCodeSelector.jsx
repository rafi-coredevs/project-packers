import { useState } from "react";
import { COUNTRY_CODE } from "./Data";

const CountryCodeSelector = ({code}) => {
  const data = COUNTRY_CODE;
  const [selected, setSelected] = useState(data[0].dial_code);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  code(selected)
  return (
    <div className="flex gap-2 max-w-[140px] border-r border-[#E2E8F0]">
      <select
        className="bg-transparent border-none focus:outline-none max-w-[45px]"
        onChange={handleChange}
        name="code"
        id="code"
        value={selected}
      >
        {data.map((item, index) => {
          return (
            <option className="" key={index} value={item.dial_code} >
              {item.flag}&nbsp;&nbsp;
              {item.dial_code}&nbsp;&nbsp;
              {item.name}
            </option>
          );
        })}
      </select>
      <input type="text" value={selected} className="outline-none w-full" readOnly />
    </div>
  );
};

export default CountryCodeSelector;
