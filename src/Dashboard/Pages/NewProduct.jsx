/**
 * NewProduct() returns JSX Element
 * Component used to add or edit product
 * edit product id coming from url
 * @returns JSX Element product add form
 *
 *  TODO - show existing product images , remove existing images .
 */

import Heading from "../Components/UiElements/Heading/Heading";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Components/UiElements/Input/Input";
import ImageUploader from "../../Components/UiElements/ImageUploader/ImageUploader";
import Button from "../Components/UiElements/Button/Button";
import { useFormik } from "formik";
import { productSchema } from "../../Util/ValidationSchema";
import { useEffect, useState } from "react";

import removeEmptyFields from "../../Util/removeEmptyFields";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
import { useTitle } from "../../Components/Hooks/useTitle";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";



const NewProduct = () => {
	useTitle("New Product");
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [btnType, setBtnType] = useState('submit')
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [selectedCategeory, setSelectedcategory] = useState({ name: 'Select', value: null, id: 0 });
	const [selectedSubcategeory, setSelectedsubcategory] = useState({ name: 'Select', value: null, id: 0 });
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
			values.category = selectedCategeory.value;
			values.subcategory = selectedSubcategeory.value;
			removeEmptyFields(values);
			const { images, ...rest } = values;
			product
				? terminal
						.request({
							name: 'updateProduct',
							params: { id: product?.id },
							body: { data: rest, images: images },
						})
						.then((res) =>
							res?.status === false
								? toaster({ type: 'success', message: res.message })
								: (toaster({
										type: 'success',
										message: 'Product successfully Updated',
								  }),
								  navigate(-1)),
						)
				: terminal
						.request({
							name: 'registerProduct',
							body: { data: rest, images: images },
						})
						.then((res) =>
							res?.status === false
								? toaster({ type: 'success', message: res.message })
								: (toaster({
										type: 'success',
										message: 'Product successfully added',
								  }),
								  navigate(-1)),
						);
		},
	});

  useEffect(() => {
    terminal.request({ name: 'allCategory' }).then(res => setCategories(res));
    if (productId) {
      terminal
        .request({ name: "singleProduct", params: { id: productId } })
        .then((res) => {
          if (res.status === false) {
            toaster({ type: 'error', message: res.message });
          }
          else {
            setProduct(res);
            setSelectedcategory({ name: 'Select', value: null, id: 0 })
            setSelectedsubcategory({ name: 'Select', value: null, id: 0 })

						productForm.setValues({
							"name": res.name,
							"description": res.description,
							"price": res.price,
							"tax": res.tax,
							"fee": res.fee,
							"quantity": res.quantity,
							"origin": res.origin,
							"link": res.link,
							"tags": res.tags,
						})
					}

				}
				);
		}
	}, []);
	useEffect(() => {
		let arr = categories.find(item => item.id === selectedCategeory.id)?.subcategory;
		console.log("::  ", selectedCategeory.id, arr)
		setSubCategories(arr)

	}, [selectedCategeory])
	const handleCheck = () => {
		if (selectedCategeory.value === null) {
			setCategoryerror({
				category: true,
				subCategory: true,
			});
		} else if (selectedSubcategeory.value === null) {
			setCategoryerror({
				category: false,
				subCategory: true,
			});
		}
	};

	function categoryHandler(id) {
		setSelectedcategory(categories.find(item => item.id === id)), setSelectedsubcategory({ name: 'Select', value: null, id: 0 }), setCategoryerror({
			category: false,
			subCategory: true,
		});
	}
	function subCategoryHandler(id) {
		setSelectedsubcategory(subCategories.find(item => item.id === id)), setCategoryerror({
			category: false,
			subCategory: false,
		});
	}

	return (
		<div className="h-full px-5">
			<Heading type="navigate" title="Add New Product" back="Products" />
			<form onSubmit={productForm.handleSubmit} action="">
				<div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-3">
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
									productForm.touched.description && productForm.errors.description
										? productForm.errors.description
										: null
								}
								placeholder="Write here..."
							/>
						</div>

						<h2 className="text-base text-secondary font-semibold">Category</h2>
						<div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
							<label className="text-[#475569] text-sm">Parent Category</label>

              <CustomSelect value={selectedCategeory.name} options={categories} bg="bg-white" onChange={categoryHandler} appearance="select" />

              <label className="text-[#475569] text-sm">Sub Category</label>
              <CustomSelect value={selectedSubcategeory.name} options={subCategories} bg="bg-white" onChange={subCategoryHandler} appearance="select" />



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
							<ImageUploader formikProps={productForm} />
						</div>
						<h2 className="text-base text-secondary font-semibold">Pricing</h2>
						<div className="border border-[#0000001c] grid grid-cols-2 gap-3 rounded-lg p-3">
							<span className="col-span-2"><Input
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
							/></span>
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
										productForm.touched.from && productForm.errors.quantity
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

						<div className="flex justify-between mb-10">
							<Button
								onClick={() => productForm.resetForm()}
								style="outline"
								type="reset"
							>
								Discard
							</Button>
							<div className='space-x-2'>
								<Button
									onClick={() => setBtnType('archived')}
									style='outline'
									type='submit'
								>
									Archive
								</Button>
								<Button
									onClick={() => setBtnType('draft')}
									style='outline'
									type='submit'
								>
									Draft
								</Button>
								<Button
									onClick={() => {
										handleCheck(), setBtnType('active');
									}}
									style='primary'
									type='submit'
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