import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
/**
 * @objective to take user back to top of the page (depending on the location user currently on)
 */
const ScrollTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);
};

export default ScrollTop;
