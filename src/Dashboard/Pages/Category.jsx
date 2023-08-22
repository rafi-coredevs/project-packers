/**
 * Category() returns JSX Element
 * Managing product Categories
 *
 * @returns JSX Element
 *
 */

import { useState } from "react";
import MainCategory from "../Components/MainCategory/MainCategory";
import SubCategory from "../Components/SubCategory/SubCategory";
import Heading from "../Components/UiElements/Heading/Heading";
import Button from "../Components/UiElements/Button/Button";

const Category = () => {
  const [state, setState] = useState(true);
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`Category`} back="product">
        <Button onClick={() => setState(!state)} style="primary">
          {!state ? "Category" : "Sub Category"}
        </Button>
      </Heading>

      <div className="grid grid-cols-6 gap-8">
        {state ? <MainCategory /> : <SubCategory />}
      </div>
    </div>
  );
};

export default Category;
