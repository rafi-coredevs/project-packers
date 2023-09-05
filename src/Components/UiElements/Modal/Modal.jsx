/**
 * Modal returns JSX Element
 * @param {boolean} show hide and visible
 * @param {object} children JSX Element
 * @param {function} onClose callback function
 */

import cancel from "../../../assets/icons/cd-cancel.svg";
const Modal = ({ show, children, onClose }) => {
  // Conditionally render the modal based on the 'show' prop
  if (show) {
    return (
      <>
        <div className="fixed z-50 top-0 left-0 bottom-0 overflow-y-auto overflow-x-hidden right-0 bg-[#0000008e] ">
          <div className="flex justify-center items-end sm:items-center w-full md:w-fit mx-auto z-30 relative mt-auto top-[20vh]">
            <button
              className="absolute z-40 top-8 right-8 opacity-30"
              onClick={() => onClose()}
            >
              <img src={cancel} alt="" />
            </button>
            <div className="relative overflow-y-auto z-20 p-[30px] bg-white rounded-t-xl sm:rounded-[12px] w-full  md:min-w-[600px]">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Modal;
