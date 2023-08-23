/**
 * SubCategory() return JSX Element
 * Adding sub category or delete sub category from here
 *
 * @returns JSX Element
 *
 */

import Button from "../UiElements/Button/Button";
import Input from "../UiElements/Input/Input";
import Table from "../UiElements/Table/Table";
import sort from "../../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import { useFormik } from "formik";
import { subCategorySchema } from "../../../Util/ValidationSchema";
import {  useEffect, useState } from "react";
import { getApi, postApi } from "../../../Util/apiCall";
import { errorToast, successToast } from "../../../Util/toaster";

const SubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);

  const subCategoryForm = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: subCategorySchema,
    onSubmit: (values) => {
      values.id = selected.id;
      postApi("/category-sub", values).then((res) => {
        if (res.status === 200) {
          successToast("Sub category successfully added");
          setSelected(res.data);
          const newCat = categories.map((item) => {
            if (item.id === res.data.id) return res.data;
            else {
              return item;
            }
          });
          setCategories(newCat);

          //fetch subcategories
        } else {
          errorToast(res.data);
        }
      });
    },
  });

  useEffect(() => {
    getApi("/category?paginate=true&limit=1000&page=1").then((res) => {
      if (res.status === 200) {
        setCategories(res.data.docs);
        setSelected(res.data.docs[0]);
      } else console.log("something wents wrong");
    });
  }, []);

  return (
    <>
      <div className="col-span-6 sm:col-span-2">
        <form action="" onSubmit={subCategoryForm.handleSubmit}>
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold pb-[0.88rem]">
              Add Sub Category
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <label className="text-[#475569] text-sm">Parent Category</label>
              <select
                className="bg-transparent border-[1px] w-full outline-none px-3 py-2 rounded-lg"
                name="id"
                onChange={(e) =>
                  setSelected(
                    categories.find((item) => item.id === e.target.value)
                  )
                }
              >
                {categories.map((chat, i) => (
                  <option key={i} value={chat.id}>
                    {chat.name}
                  </option>
                ))}
              </select>

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
          <button className="border border-[#0000001f] p-2  ">
            <img className="opacity-70" src={sort} alt="" />
          </button>
        </div>
        <Table type="subcategory" data={selected.subCategory} pageItem={5} />
      </div>
    </>
  );
};

export default SubCategory;
