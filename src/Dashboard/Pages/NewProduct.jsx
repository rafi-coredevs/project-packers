/**
 * NewProduct() returns JSX Element
 * Component used to add or edit product
 * edit product id coming from url
 * @returns JSX Element product add form
 *
 *  TODO add fetch method in useEffect
 */

import Heading from "../Components/UiElements/Heading/Heading";
import { useParams } from "react-router-dom";
import Input from "../Components/UiElements/Input/Input";
import ImageUploader from "../../Components/UiElements/ImageUploader/ImageUploader";
import Button from "../Components/UiElements/Button/Button";
import { useFormik } from "formik";
import { productSchema } from "../../Util/ValidationSchema";
import { useEffect, useState } from "react";

import removeEmptyFields from "../../Util/removeEmptyFields";
import { useTitle } from "../../Components/Hooks/useTitle";

const NewProduct = () => {
  useTitle("New Product")
  const { productId } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [selectedCategeory, setSelectedcategory] = useState("default");
  const [selectedSubcategeory, setSelectedsubcategory] = useState("default");
  const [categoryError, setCategoryerror] = useState({
    category: false,
    subCategory: false,
  });

  useEffect(() => {
    if (selectedCategeory !== "default") {
      categoryError.category = false;
    }
    if (selectedSubcategeory !== "default") {
      categoryError.subCategory = false;
    }
    setCategoryerror({ ...categoryError });
  }, [selectedCategeory, selectedSubcategeory]);

  const productForm = useFormik({
    initialValues: {
      name: "",
      desc: "",
      price: "",
      tax: "",
      fee: "",
      stock: "",
      from: "",
      link: "",
      category: "",
      subCategory: "",
      tags: "",
      images: [],
      deliveryTime: {
        min: "",
        max: "",
      },
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      //if (
      //  categoryError.category === true ||
      //  categoryError.subCategory === true
      //) {
      //  return;
      //}
      //values.category = selectedCategeory.id;
      //values.subCategory = selectedSubcategeory;
      removeEmptyFields(values);
      const { images, ...rest } = values; //Pujon- TODO:Add Api here
    },
  });

  const categoryHandler = (value) => {
    const _category = categories.find((item) => item.id === value);

    setSelectedcategory(_category);
    setSubcategories(_category.subCategory);
  };

  const handleCheck = () => {
    if (selectedCategeory === "default") {
      setCategoryerror({
        category: true,
        subCategory: true,
      });
    } else if (selectedSubcategeory === "default") {
      setCategoryerror({
        category: false,
        subCategory: true,
      });
    }
  };

  return (
    <div className="h-full px-5">
      <Heading type="navigate" title="Add New Product" back="Products" />
      <form onSubmit={productForm.handleSubmit} action="">
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-3 border-t border-[#0000001c] py-5">
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold">
              Description
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <Input
                styles="basic"
                label="Product name"
                type="text"
                name="name"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.name}
                error={
                  productForm.touched.name && productForm.errors.name
                    ? productForm.errors.name
                    : null
                }
                placeholder="Product name"
              />
              <Input
                styles="area"
                label="Description"
                type="text"
                name="desc"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.desc}
                error={
                  productForm.touched.desc && productForm.errors.desc
                    ? productForm.errors.desc
                    : null
                }
                placeholder="Write here..."
              />
            </div>

            <h2 className="text-base text-secondary font-semibold">Category</h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <label className="text-[#475569] text-sm">Parent Category</label>
              <select
                className={`bg-transparent border-[1px] w-full outline-none px-3 py-2 rounded-lg ${
                  categoryError.category ? "border-[red]" : ""
                } `}
                name="id"
                onChange={(e) => categoryHandler(e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Select
                </option>
                {categories.map((chat, i) => (
                  <option key={i} value={chat.id}>
                    {chat.name}
                  </option>
                ))}
              </select>
              <label className="text-[#475569] text-sm">Sub Category</label>
              <select
                className={`bg-transparent border-[1px] w-full outline-none px-3 py-2 rounded-lg ${
                  categoryError.subCategory ? "border-[red]" : ""
                } `}
                name="id"
                onChange={(e) => setSelectedsubcategory(e.target.value)}
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Select
                </option>
                {subCategories.map((sub, i) => (
                  <option key={i} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <Input
                styles="basic"
                label="Tags"
                type="text"
                name="tags"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.tags}
                error={
                  productForm.touched.tags && productForm.errors.tags
                    ? productForm.errors.tags
                    : null
                }
                placeholder="Tags"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold">
              Product Images
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3">
              <ImageUploader formikProps={productForm} />
            </div>
            <h2 className="text-base text-secondary font-semibold">Pricing</h2>
            <div className="border border-[#0000001c] grid grid-cols-2 gap-3 rounded-lg p-3">
              <Input
                styles="basic"
                label="Price"
                type="number"
                name="price"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.price}
                error={
                  productForm.touched.price && productForm.errors.price
                    ? productForm.errors.price
                    : null
                }
                placeholder="0.00"
              />
              <Input
                styles="basic"
                label="Tax"
                type="number"
                name="tax"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.tax}
                error={
                  productForm.touched.tax && productForm.errors.tax
                    ? productForm.errors.tax
                    : null
                }
                placeholder="0.00"
              />
              <Input
                styles="basic"
                label="Fee"
                type="number"
                name="fee"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.fee}
                error={
                  productForm.touched.fee && productForm.errors.fee
                    ? productForm.errors.fee
                    : null
                }
                placeholder="0.00"
              />
              <Input
                styles="basic"
                label="Stock"
                type="number"
                name="stock"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.stock}
                error={
                  productForm.touched.stock && productForm.errors.stock
                    ? productForm.errors.stock
                    : null
                }
                placeholder="0"
              />
            </div>
            <h2 className="text-base text-secondary font-semibold">
              Delivery Information
            </h2>
            <div className="border border-[#0000001c] grid grid-cols-2 gap-3 rounded-lg p-3">
              <div className="col-span-2">
                <Input
                  styles="basic"
                  label="Product From"
                  type="text"
                  name="from"
                  change={productForm.handleChange}
                  blur={productForm.handleBlur}
                  value={productForm.values.from}
                  error={
                    productForm.touched.from && productForm.errors.from
                      ? productForm.errors.from
                      : null
                  }
                  placeholder="USA"
                />
              </div>
              <Input
                styles="basic"
                label="Approx Delivery (min)"
                type="number"
                name="deliveryTime.min"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.deliveryTime.min}
                error={
                  productForm.errors.deliveryTime &&
                  productForm.touched.deliveryTime
                    ? productForm.errors.deliveryTime
                    : null
                }
                placeholder="1 week"
              />
              <Input
                styles="basic"
                label="Approx Delivery (max)"
                type="number"
                name="deliveryTime.max"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.deliveryTime.max}
                error={
                  productForm.errors.deliveryTime &&
                  productForm.touched.deliveryTime
                    ? productForm.errors.deliveryTime
                    : null
                }
                placeholder="2 week"
              />
            </div>
            <h2 className="text-base text-secondary font-semibold">
              Product link (Only admin can show this link)
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3">
              <Input
                styles="basic"
                label="Product URL"
                type="text"
                name="link"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.link}
                error={
                  productForm.touched.link && productForm.errors.link
                    ? productForm.errors.link
                    : null
                }
                placeholder="https://example.com/product-link"
              />
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => productForm.resetForm()}
                style="outline"
                type="reset"
              >
                Discard
              </Button>
              <div className="space-x-2">
                <Button style="outline">Draft</Button>
                <Button onClick={handleCheck} style="primary" type="submit">
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
