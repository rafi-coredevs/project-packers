/**
 * Category() returns JSX Element
 * Managing product Categories
 *
 * @returns JSX Element
 *
 */

import { useTitle } from "../../Components/Hooks/useTitle";
import MainCategory from "../Components/MainCategory/MainCategory";
import Heading from "../Components/UiElements/Heading/Heading";

const Category = () => {
  useTitle("Product Categories");
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`Category`} back="product"></Heading>
      <div className="grid grid-cols-6 gap-8">
        <MainCategory />
        
      </div>
    </div>
  );
};

export default Category;
