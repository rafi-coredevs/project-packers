import { useState } from "react";

const Category = ({ data, refatch }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const toggleSubCategories = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleCategory = (data) => {
    refatch(data)

  }
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-[#3E949A] text-base font-sans font-semibold">
        All Category
      </h5>
      {data?.map((category, i) => (
        <div key={i} className="category">

          <div
            className={`text-[#475569] text-base font-normal cursor-pointer flex justify-between category-name ${category?.subcategory?.length > 0 ? "collapsible" : ""
              }`}
            onClick={() => toggleSubCategories(category.id)}
          >
            <p className="">

              {category.name}
            </p>
            {category?.subcategory?.length > 0 && <svg className="-rotate-90" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.5303 5.46967C15.8232 5.76256 15.8232 6.23744 15.5303 6.53033L10.2375 11.8232C10.1674 11.8933 10.1106 11.9501 10.0623 12C10.1106 12.0499 10.1674 12.1067 10.2374 12.1767L15.5303 17.4697C15.8232 17.7626 15.8232 18.2374 15.5303 18.5303C15.2374 18.8232 14.7626 18.8232 14.4697 18.5303L9.17682 13.2375C9.17681 13.2375 9.17684 13.2375 9.17682 13.2375C9.16881 13.2294 9.16071 13.2214 9.15261 13.2133C9.00745 13.0682 8.85048 12.9114 8.73585 12.7611C8.60161 12.5852 8.45712 12.3335 8.45712 12C8.45712 11.6665 8.60161 11.4148 8.73585 11.2389C8.85048 11.0886 9.00745 10.9318 9.15261 10.7867C9.16071 10.7786 9.16878 10.7706 9.17679 10.7626C9.1768 10.7626 9.17678 10.7626 9.17679 10.7626L14.4697 5.46967C14.7626 5.17678 15.2374 5.17678 15.5303 5.46967Z" fill="#141B34" />
            </svg>}
          </div>
          {expandedCategory === category.id && (
            <div className="ml-8 my-2">
              <ul className=" flex gap-2 flex-col list-disc">
                {category.subcategory.map((subcategory) => (
                  <li onClick={() => handleCategory({ category: category.id, subcategory: subcategory.id })} className="text-[#475569] text-base font-normal cursor-pointer" key={subcategory.slug}>{subcategory.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Category;
