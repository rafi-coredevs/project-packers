/**
 * Toaster components
 * used to show error or success messages
 * @param {string} message message to show.
 * @returns JSX Element
 */

import { toast } from "react-hot-toast";

export const successToast = (message) => {
  return toast.success(message, {
    style: {
      // border: "1px solid #0D3D4B",
      padding: "16px",
      color: "#0D3D4B",
      backgroundColor: "#F2C852",
    },
    iconTheme: {
      primary: "#198754",
      secondary: "#FFFAEE",
    },
  });
};
export const errorToast = (message) => {
  return toast.error(message, {
    style: {
      padding: "16px",
      color: "#0D3D4B",
      backgroundColor: "#F2C852",
    },
    iconTheme: {
      primary: "#FF0000",
      secondary: "#FFFAEE",
    },
  });
};
