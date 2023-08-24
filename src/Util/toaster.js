import toast from 'react-hot-toast';

/**
 * @param toaster function is used to show a toast
 * @param {type, message} data recieves the type of the toast and the message to be displayed
 * @returns the toast
 */
const toaster = ({ type, message }) => {
    toast[type](message, { id: message });
};

export default toaster;
