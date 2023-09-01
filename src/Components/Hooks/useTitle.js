import { useEffect } from "react";

/**
* set document title as page changes, title depends on what data is fetched on the page (dynamic in that regard)
* @param {String} headerTitle text for page title
* @returns Set title
*/
export const useTitle = (headerTitle = String) => {
  useEffect(() => {
    document.title = `${headerTitle} / PP - Project Packers`;
  }, [headerTitle]);
};
