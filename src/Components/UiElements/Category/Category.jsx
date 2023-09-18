import { useState } from "react";
import icon from '../../../assets/icons/cd-filter.svg';
import arrow from '../../../assets/icons/cd-arrow-right-2.svg';

const Category = ({ data, reFetch }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoryHandler, setCategoryHandler] = useState(false)
  const [active, setActive] = useState('all')
  const toggleSubCategories = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleCategory = (data) => {
    setActive(data?.subcategory)
    reFetch(data)
  }

  const handleCategoryFetch = (category) => {
    
    if (category.subcategory.length === 0) {
      reFetch({ category: category.id })
    }
  }
  const lgCategory = <div className="flex flex-col gap-2">
    <h5 id='all' onClick={() => {handleCategory({}); setActive('all')}} className={`${active === 'all' ? 'text-[#3E949A]' : "text-[#475569]"} text-base font-sans font-semibold cursor-pointer`}>
      All Category
    </h5>
    {data?.map((category, i) => (
      <div key={i} className="category">

        <div
          className={` text-base font-normal cursor-pointer flex justify-between category-name ${category?.subcategory?.length > 0 ? "collapsible" : ""
            }`}
          onClick={() => toggleSubCategories(category.id)}
        >
        <p className={`${active === category.id ? 'text-[#3E949A]' : "text-[#475569]"}`} onClick={() =>{ handleCategoryFetch(category); setActive(category?.id)}}>

            {category.name}
          </p>
          {category?.subcategory?.length > 0 && <img src={arrow} className={expandedCategory === category.id ? 'rotate-90' : 'rotate-0'} />}
        </div>
        {(expandedCategory === category.id && category?.subcategory?.length != 0) && (
          <div className="ml-8 my-2">
            <ul className=" flex gap-2 flex-col list-disc">
              {category.subcategory.map((subcategory) => (
                <li onClick={() => handleCategory({ category: category.id, subcategory: subcategory.id })} className={`${active === subcategory.id ? 'text-[#3E949A]' : 'text-[#475569]' } text-base font-normal cursor-pointer`} key={subcategory.slug}>{subcategory.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>;

  const smCategory = <>
    <button type="button" onClick={() => setCategoryHandler(!categoryHandler)} className='w-full flex items-center border rounded-full px-5 py-3'>
      <img className='w-5 mr-2' src={icon} alt='icon' />
      <div className='w-full flex justify-between'>
        <h4>Sort and Filter</h4>
        <img src={arrow} className='rotate-90' />
      </div>
    </button>
    <div className={`${categoryHandler ? 'block' : 'hidden'} p-3`}>
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
            {category?.subcategory?.length > 0 && <img src={arrow} className='rotate-90' />}
          </div>
          {expandedCategory === category.id && (
            <div className="ml-8 my-2">
              <ul className="flex gap-2 flex-col list-disc">
                {category.subcategory.map((subcategory) => (
                  <li onClick={() => handleCategory({ category: category.id, subcategory: subcategory.id })} className="text-[#475569] text-base font-normal cursor-pointer" key={subcategory.slug}>{subcategory.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  </>

  return <>
    <div className='hidden lg:block'>{lgCategory}</div>
    <div className='lg:hidden'>{smCategory}</div>
  </>;
};

export default Category;
