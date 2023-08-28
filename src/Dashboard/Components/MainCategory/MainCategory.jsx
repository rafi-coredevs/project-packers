/**
 * MainCategory() return JSX Element
 * Adding Category or delete Category from here
 *
 * @returns JSX Element
 *
 */

import { useFormik } from "formik";
import Button from "../UiElements/Button/Button";
import Input from "../UiElements/Input/Input";
import Table from "../UiElements/Table/Table";
import { categorySchema } from "../../../Util/ValidationSchema";
import { subCategorySchema } from "../../../Util/ValidationSchema";
import sort from "../../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import { useEffect, useState } from "react";
import { terminal } from "../../../contexts/terminal/Terminal";
import toaster from "../../../Util/toaster";
import CustomSelect from "../../../Components/UiElements/Input/CustomSelect";

const MainCategory = () => {
  const [categories, setCategories] = useState([]);
  const[selected,setSelected]= useState(null);
  const [isActive, setIsActive]= useState(true);
  const [dropdown, setDropdown] = useState({name:'Select', value:''})
  useEffect(()=>{
    fetchdata();

  },[]);
  useEffect(()=>{
    setSelected(categories.find(item=>item.id===selected?.id))

  },[categories])
  const fetchdata = ()=> terminal.request({ name: 'allCategory'}).then(res=> res.status===false? toaster({type:'error', message: res.message}):setCategories(res));

  const categoryForm = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      terminal.request({ name: 'registerCategory', body: { categoryname: values?.name, categoryslug: values?.slug}}).then(res=>res.status===false? toaster({type:'error', message:res?.message}):fetchdata())

    },
  });
  const subCategoryForm = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: subCategorySchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(selected);
      terminal.request({ name: 'registerCategory', body: { categoryname: selected?.name, categoryslug: selected?.slug, subcategoryname: values?.name, subcategoryslug: values?.slug}}).then(res=>res.status===false? toaster({type:'error', message:res?.message}):fetchdata());
      
      
    },
  });
  
  const categoryHandler = (id)=> setSelected(categories.find(item=>item.id===id));

  return (
    <>
      <div className="col-span-6 sm:col-span-2">
        <form action="" onSubmit={categoryForm.handleSubmit}>
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold pb-[0.88rem]">
              Add New Category
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <Input
                styles="basic"
                label="Name"
                name="name"
                change={categoryForm.handleChange}
                blur={categoryForm.handleBlur}
                value={categoryForm.values.name}
                error={
                  categoryForm.touched.name && categoryForm.errors.name
                    ? categoryForm.errors.name
                    : null
                }
                placeholder="Gategory name"
              />
              <Input
                styles="basic"
                name="slug"
                change={categoryForm.handleChange}
                blur={categoryForm.handleBlur}
                value={categoryForm.values.slug}
                error={
                  categoryForm.touched.slug && categoryForm.errors.slug
                    ? categoryForm.errors.slug
                    : null
                }
                label="Slug"
                placeholder="Slug"
              />
            </div>
            <div className="text-end mt-3">
              <Button type="submit" style="primary">
                Add New Category
              </Button>
            </div>
          </div>
        </form>
        <form action="" onSubmit={subCategoryForm.handleSubmit}>
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold pb-[0.88rem]">
              Add Sub Category
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <label className="text-[#475569] text-sm">Parent Category</label>
          

              <CustomSelect value={selected?.name} options={categories} onChange={categoryHandler} />

              <Input
                styles="basic"
                label="Name"
                name="name"
                change={subCategoryForm.handleChange}
                blur={subCategoryForm.handleBlur}
                value={subCategoryForm.values.name}
                error={
                  subCategoryForm.touched.name && subCategoryForm.errors.name
                    ? subCategoryForm.errors.name
                    : null
                }
                placeholder="Sub Category name"
              />
              <Input
                styles="basic"
                name="slug"
                change={subCategoryForm.handleChange}
                blur={subCategoryForm.handleBlur}
                value={subCategoryForm.values.slug}
                error={
                  subCategoryForm.touched.slug && subCategoryForm.errors.slug
                    ? subCategoryForm.errors.slug
                    : null
                }
                label="Slug"
                placeholder="Slug"
              />
            </div>
            <div className="text-end mt-3">
              <Button type="submit" style="primary">
                Add Sub Category
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-span-6 sm:col-span-4 px-0 sm:pl-8">
        <div className="flex justify-between pb-2">
          <Button style="delete">delete</Button>
          <div className="flex gap-2 items-center">
          <Button onClick={()=>setIsActive(!isActive)} style={isActive?'primary':'outline'}>Category Table</Button>
          <Button onClick={()=>setIsActive(!isActive)}   style={!isActive?'primary':'outline'}>Sub Category Table</Button>
          <button className="border border-[#0000001f] p-2  ">
            <img className="opacity-70" src={sort} alt="" />
          </button>
          </div>
        </div>
        {
          isActive?<Table  data={categories} />:<Table   data={selected?.subcategory || []}/>
        }
        
      </div>
    </>
  );
};

export default MainCategory;
