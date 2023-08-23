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
import sort from "../../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import { getApi, postApi } from "../../../Util/apiCall";
import { useEffect, useState } from "react";

const MainCategory = () => {
  const [categories, setCategories] = useState([]);
  const [refatch,setRefatch]=useState(false)

  useEffect(() => {
    getApi("/category?paginate=true&limit=5&page=1").then((res) => {
      setCategories(res.data);
    });
   
  }, [refatch]);

  const reFatch = (page) => {
    getApi(`/category?paginate=true&limit=5&page=${page}`).then((res) => {
      setCategories(res.data);
    });
  };

  const categoryForm = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
     
    },
  });
  return (
    <>
      <div className="col-span-6 sm:col-span-2">
        <form action="" onSubmit={categoryForm.handleSubmit}>
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold">
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
      </div>
      <div className="col-span-6 sm:col-span-4 px-0 sm:pl-8">
        <div className="flex justify-between pb-2">
          <Button style="delete">delete</Button>
          <button className="border border-[#0000001f] p-2  ">
            <img className="opacity-70" src={sort} alt="" />
          </button>
        </div>
        <Table reFatch={reFatch} type="category" data={categories} />
      </div>
    </>
  );
};

export default MainCategory;
