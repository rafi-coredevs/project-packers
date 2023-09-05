/**
 * Button component for creating various button types.
 *
 * @param {boolean} arrow - Determines whether to display an arrow.
 * @param {object} children - Child components to display inside the button.
 * @param {boolean} full - Determines whether the button should have full width.
 * @param {string} buttonType - Specifies the button type, e.g., "submit".
 * @param {string} className - Additional CSS classes for styling the button.
 * @param {boolean} disabled - Determines whether the button is disabled.
 * @param {function} onClick - Function to execute when the button is clicked.
 * @param {object} eventHandlers - Additional event handlers for the button.
 */
const Button = ({
  arrow,
  children,
  full,
  type,
  buttonType,
  disabled,
  className,
  onClick,
  ...eventHandlers
}) => {
  // Define styles for different button types.
  const styles = {
    text: `${className}`,
    primary: `bg-primary text-secondary py-[12px] px-[20px] ${className}`,
    secondary: `bg-secondary text-white py-[11px] px-[20px] ${className}`,
    outline: `bg-transparent text-secondary py-[11px] px-[20px] border border-primary ${className}`,
    light: `bg-[#F8FAFC] font-normal text-secondary py-[11px] px-[20px] ${className}`,
    lightGreen: `bg-[#CFF6EF] font-normal text-secondary py-[11px] px-[30px] ${className}`,
    default: `bg-[#ffffff] text-secondary border-2 border-primary ${className}`,
  };
  return (
    <button
      {...eventHandlers}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
      className={`disabled:cursor-not-allowed
             rounded-[50px] font-sans w-full ${
               full != undefined ? "w-full" : "sm:max-w-fit"
             } text-center  text-sm font-bold
             hover:drop-shadow-lg active:scale-[0.99]
             ${
               type
                 ? styles[type]
                 : "bg-[#ffffff] text-secondary border-2 border-primary"
             }
        `}
    >
      <span className="justify-center flex gap-3 font-bold ">
        {children}
        {arrow && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8335 10H3.3335"
              stroke="#124E58"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 5.83301L16.0774 9.41042C16.3552 9.68817 16.4941 9.82709 16.4941 9.99967C16.4941 10.1723 16.3552 10.3112 16.0774 10.5889L12.5 14.1663"
              stroke="#124E58"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default Button;
