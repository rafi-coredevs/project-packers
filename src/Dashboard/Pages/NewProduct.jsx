/**
 * NewProduct() returns JSX Element
 * Component used to add or edit product
 * edit product id coming from url
 * @returns JSX Element product add form
 *
 */

import Heading from "../Components/UiElements/Heading/Heading";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Components/UiElements/Input/Input";
import Button from "../Components/UiElements/Button/Button";
import { useFormik } from "formik";
import { productSchema } from "../../Util/ValidationSchema";
import { useEffect, useState } from "react";
import removeEmptyFields from "../../Util/removeEmptyFields";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
import { useTitle } from "../../Components/Hooks/useTitle";
import UploadIcon from "../../assets/icons/UploadIcon.svg";
import ProductImageUpload from "../Components/uploadImages/ProductImageUpload/ProductImagesUpdate";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";

const NewProduct = () => {
  useTitle("New Product");
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [btnType, setBtnType] = useState("submit");
  const [categories, setCategories] = useState([]);
  const [selectedCategeory, setSelectedCategory] = useState(null);
  const [selectedSubCategeory, setselectedSubCategeory] = useState(null);
  const [preLoadedImages, setPreLoadedImages] = useState([]);
  const [categoryError, setCategoryerror] = useState({
    category: false,
    subCategory: false,
  });
  const navigate = useNavigate();
  // formik and handleSubmit
  const productForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      tax: "",
      fee: "",
      quantity: "",
      origin: "",
      link: "",
      tags: "",
      images: [],
      removeImages: [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      if (
        categoryError.category === true ||
        categoryError.subCategory === true
      ) {
        return;
      }
      values.status = btnType;
      values.category = selectedCategeory.id;
      values.subcategory = selectedSubCategeory.id;
      removeEmptyFields(values);

      const { images, ...rest } = values;
      product
        ? terminal
            .request({
              name: "updateProduct",
              params: { id: product?.id },
              body: { data: rest, images: images },
            })
            .then((res) =>
              res?.status === false
                ? toaster({ type: "success", message: res.message })
                : (toaster({
                    type: "success",
                    message: "Product successfully Updated",
                  }),
                  navigate(-1))
            )
        : terminal
            .request({
              name: "registerProduct",
              body: { data: rest, images: images },
            })
            .then((res) =>
              res?.status === false
                ? toaster({ type: "success", message: res.message })
                : (toaster({
                    type: "success",
                    message: "Product successfully added",
                  }),
                  navigate(-1))
            );
    },
  });

  // fetching all Category
  useEffect(() => {
    terminal.request({ name: "allCategory" }).then((res) => setCategories(res));
    if (productId) {
      // fetching single product
      terminal
        .request({ name: "singleProduct", params: { id: productId } })
        .then((res) => {
          if (res.status === false) {
            toaster({ type: "error", message: res.message });
          } else {
            setProduct(res);
            setPreLoadedImages(res.images);

            productForm.setValues({
              name: res.name,
              description: res.description,
              price: res.price,
              tax: res.tax,
              fee: res.fee,
              quantity: res.quantity,
              origin: res.origin,
              link: res.link,
              tags: res.tags,
            });
          }
        })
        .catch((err) => console.error("getting all category error", err));
    }
  }, []);

  /**
   * Handle category selection errors.
   */
  const handleCheck = () => {
    if (selectedCategeory === null) {
      setCategoryerror({
        category: true,
        subCategory: true,
      });
    } else if (selectedSubCategeory === null) {
      setCategoryerror({
        category: false,
        subCategory: true,
      });
    }
  };

  /**
   * Handle category selection.
   * @param {string} val - Selected category value.
   */
  const categorySelector = (val) => {
    setSelectedCategory(categories.find((item) => item.id === val));
  };

  /**
   * Handle subcategory selection.
   * @param {string} val - Selected subcategory value.
   */
  const subcategorySelector = (val) => {
    setselectedSubCategeory(
      selectedCategeory.subcategory.find((item) => item.id === val)
    );
  };

  /**
   * Effect to set the selected category when productId is available.
   */
  useEffect(() => {
    if (productId) {
      categorySelector(product?.category?.id);
    }
  }, [categories, product]);

  /**
   * Effect to set the selected subcategory when productId is available.
   */
  useEffect(() => {
    if (productId) {
      setselectedSubCategeory(
        selectedCategeory?.subcategory?.find(
          (item) => item.id == product?.subcategory
        )
      );
    } else {
      setselectedSubCategeory(null);
    }
  }, [selectedCategeory, product]);

  return (
    <div className="h-full px-5">
      <Heading type="navigate" title="Add New Product" back="Products" />
      <form onSubmit={productForm.handleSubmit} action="">
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-3 py-5">
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
                name="description"
                change={productForm.handleChange}
                blur={productForm.handleBlur}
                value={productForm.values.description}
                error={
                  productForm.touched.description &&
                  productForm.errors.description
                    ? productForm.errors.description
                    : null
                }
                placeholder="Write here..."
              />
            </div>

            <h2 className="text-base text-secondary font-semibold">Category</h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <label className="text-[#475569] text-sm">Parent Category</label>

              <CustomSelect
                appearance={"select"}
                bg="white"
                options={categories}
                onChange={categorySelector}
                value={selectedCategeory?.name}
              />

              <label className="text-[#475569] text-sm">Sub Category</label>
              <CustomSelect
                appearance={"select"}
                bg="white"
                options={selectedCategeory?.subcategory}
                onChange={subcategorySelector}
                value={selectedSubCategeory?.name}
              />

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
            <div className="border border-[#0000001c] rounded-lg p-3 min-h-[12rem]">
              <ProductImageUpload
                formikProps={productForm}
                className="flex-row-reverse items-center justify-end mr-auto"
                uploadButtonIcon={UploadIcon}
                placeholder={
                  <>
                    <span className="text-[#3E949A] underline">
                      Click to upload
                    </span>
                    <span> or drag and drop</span>
                  </>
                }
                preLoadedImages={preLoadedImages}
              />
            </div>
            <h2 className="text-base text-secondary font-semibold">Pricing</h2>
            <div className="border border-[#0000001c] grid grid-cols-2 gap-3 rounded-lg p-3">
              <span className="col-span-2">
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
              </span>
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
                  name="origin"
                  change={productForm.handleChange}
                  blur={productForm.handleBlur}
                  value={productForm.values.origin}
                  error={
                    productForm.touched.origin && productForm.errors.origin
                      ? productForm.errors.origin
                      : null
                  }
                  placeholder="USA"
                />
              </div>
              <div className="col-span-2">
                <Input
                  styles="basic"
                  label="Stock"
                  type="number"
                  name="quantity"
                  change={productForm.handleChange}
                  blur={productForm.handleBlur}
                  value={productForm.values.quantity}
                  error={
                    productForm.touched.quantity && productForm.errors.quantity 
                      ? productForm.errors.quantity
                      : null
                  }
                  placeholder="0"
                />
              </div>
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
                <Button
                  onClick={() => setBtnType("archived")}
                  style="outline"
                  type="submit"
                >
                  Archive
                </Button>
                <Button
                  onClick={() => setBtnType("draft")}
                  style="outline"
                  type="submit"
                >
                  Draft
                </Button>
                <Button
                  onClick={() => {
                    handleCheck(), setBtnType("active");
                  }}
                  style="primary"
                  type="submit"
                >
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
