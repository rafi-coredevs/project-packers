/**
 * @params {string} label - typical label field for input; depends on text passed or not 
 * @params {string} args.name - input field name
 * @params {string} args.type - input field type (text,email etc)
 * @params {string} args.placeholder text 
 * @params {string} args.value - field value
 * @params {function} args.change - change event handler 
 * @params {boolean} args.error - used to determine whether error message to be shown or not
 * @params {function} args.blur - on blur event handler
 * @params {number} args.min - defines the must required number of char for a value to be valid
 * @params {number} args.max  - to sets the limit of field value
 * @params {numer} args.row - sets the number of row if the input field type is text area,  
 * @params {string} args.styles - sets the style classes based on passed single string, default- 'primary'
 * @params {boolean} args.required - set whether a fiels is optional or required
 * @params {boolean} args.disabled - set whether a fiels should be disabled  at any point
 * @params {array} args.option - to map the options for select input when the input type is select
 */
const style = {
  primary: "bg-[#F8FAFC] py-3",
  secondary: "bg-white border border-[#0000001e] py-2",
  basic: "",
  quantity: "border border-[#0000001c]",
};

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  change,
  blur,
  error,
  children,
  min,
  max,
  rows,
  styles = "primary",
  required,
  disabled,
  option = [],
}) => {
  const clickHandler = (value) => {
    console.log(value);
  };
  if (styles === "quantity") {
    return (
      <div className={`rounded h-full w-fit`}>
        <div
          className={`flex items-center rounded gap-2 ${style[styles]} px-2 py-1 h-full`}
        >
          <button
            onClick={() => clickHandler("decrement")}
            className="text-[#00000085] font-semibold text-xl"
          >
            -
          </button>
          <input
            className="bg-transparent outline-none h-full w-7 text-center"
            type={type}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={change}
            onBlur={blur}
            disabled={disabled}
            minLength={min}
            maxLength={max}
          />
          <button
            onClick={() => clickHandler("increment")}
            className="text-[#00000085] font-semibold text-xl"
          >
            +
          </button>
        </div>
      </div>
    );
  }
  if (styles === "basic") {
    return (
      <div className={`flex flex-col gap-1 rounded w-full h-full`}>
        {label && (
          <label htmlFor={name} className="text-[#475569] text-sm">
            {label}
          </label>
        )}
        <input
          className={`border ${error ? "border-red-600" : "border-[#0000001c]"}  w-full outline-none px-3 py-2 rounded-lg`}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={change}
          onBlur={blur}
          disabled={disabled}
          minLength={min}
          maxLength={max}
          min={0}
          required={required}
        />
      </div>
    );
  }
  if (styles === "area") {
    return (
      <div className={`flex flex-col gap-1 rounded h-full`}>
        {label && (
          <label htmlFor={name} className="text-[#475569] text-sm">
            {label}
          </label>
        )}
        <textarea
          className={`border ${error ? 'border-red-600' : 'border-[#0000001c]'}  outline-none px-3 py-2 rounded-lg`}
          type={type}
          id={name}
          rows={rows}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={change}
          onBlur={blur}
          disabled={disabled}
          minLength={min}
          maxLength={max}
        />
      </div>
    );
  }
  if (styles === "select") {
    return (
      <div className={`flex flex-col gap-1 rounded h-full`}>
        {label && (
          <label htmlFor={name} className="text-[#475569] text-sm">
            {label}
          </label>
        )}
        <select
          className={`border ${error ? "border-red-600" : "border-[#0000001c]"} outline-none px-3 py-2 rounded-lg bg-white appearance`}
          id={name}
          name={name}
          value={value}
          onChange={change}
          onBlur={blur}
          disabled={disabled}
        >
          {option?.map((item, index) => (
            <option defaultValue={index === 0 ? true : false} key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className={`rounded h-full`}>
      {label && (
        <label htmlFor={name} className="text-[#475569] text-sm">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded gap-2 ${style[styles]} px-2 h-full`}
      >
        <div className="">{children}</div>
        <input
          className="bg-transparent outline-none h-full w-full"
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={change}
          onBlur={blur}
          min={0}
          disabled={disabled}
          minLength={min}
          maxLength={max}
        />
      </div>
    </div>
  );
};

export default Input;
