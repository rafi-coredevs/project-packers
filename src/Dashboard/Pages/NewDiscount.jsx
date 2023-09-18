import { useEffect, useState } from "react";
import { useTitle } from "../../Components/Hooks/useTitle";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
import { useFormik } from "formik";
import DateRangeSelector from "../Components/UiElements/DateSelector/DateRangesSelector";
import { discountSchema } from "../../Util/ValidationSchema";
import { useNavigate } from "react-router-dom";
const discountType = [
  {
    id: "Fixed",
    name: "Fixed",
  },
  {
    id: "Percentage",
    name: "Percentage",
  },
];

const NewDiscount = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedType, setSelectedtype] = useState(null);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  useEffect(() => {
    terminal
      .request({ name: "allCategory" })
      .then((res) =>
        res?.status === false
          ? toaster({ type: "error", message: res?.message })
          : setCategory(res)
      );
  }, []);
  const categorySelector = (val) => {
    setSelectedCategory(category.find((item) => item.id === val));
    setSelectedSubcategory(null);
    discountForm.setFieldValue("category", val);
  };
  const subcategorySelector = (val) => {
    setSelectedSubcategory(
      selectedCategory.subcategory.find((item) => item.id === val)
    );
    discountForm.setFieldValue("subCategory", val);
  };
  function generateCoupon() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let coupon = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      coupon += characters[randomIndex];
    }
    discountForm.setFieldValue("coupon", coupon);
  }
  useTitle("New Discount");


  const discountForm = useFormik({
    initialValues: {
      coupon: "",
      type: "",
      amount: "",
      limit: "",
      expiry: "",
      category: "",
      subCategory: "",
      tags: "",
    },
    validationSchema: discountSchema,
    onSubmit: (data) => {
      const discountData = {
        code: data.coupon,
        category: data.category,
        subcategory: data.subCategory,
        expiry_date: data.expiry,
        limit: data.limit,
      };
      data.type === "Fixed"
        ? (discountData.amount = data.amount)
        : (discountData.percentage = data.amount);
      if (description !== "") discountData.description = description;
      terminal
        .request({ name: "registerDiscount", body: { ...discountData } })
        .then(
          (res) =>
            res.status === false
              ? toaster({ type: "error", message: res.message })
              : toaster({
                  type: "success",
                  message: "New Coupon Successfully Generated",
                }),
          
        );
      discountForm.resetForm();
    },
  });

  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`Add New Discount`} />
      <form action="" onSubmit={discountForm.handleSubmit}>
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-3 border-t border-[#0000001c] py-5">
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold">
              Coupon Details
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <div className="flex items-end gap-2 ">
                <Input
                  styles="basic"
                  name="coupon"
                  change={discountForm.handleChange}
                  blur={discountForm.handleBlur}
                  error={
                    discountForm.touched.coupon && discountForm.errors.coupon
                      ? discountForm.errors.coupon
                      : null
                  }
                  label="Coupon Code"
                  value={discountForm.values.coupon}
                  placeholder="Coupon"
                />
                <div
                  onClick={generateCoupon}
                  className="shrink-0 py-[10px] px-3 rounded-md border border-[#0000001c] h-fit text-sm text-[#000316] cursor-pointer"
                >
                  Generate Coupone
                </div>
              </div>
              <Input
                styles="area"
                rows={3}
                value={description}
                change={(e) => setDescription(e.target.value)}
                label="Description (Optional)"
                placeholder="Write here..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <label htmlFor="Type" className="text-[#475569] text-sm">
                    Type
                  </label>
                  <CustomSelect
                    appearance="select"
                    options={discountType}
                    bg={'white'}
                    onChange={(type) => {
                      discountForm.setFieldValue("type", type);
                      setSelectedtype(type);
                    }}
                    value={discountForm.values.type}
                    error={
                      discountForm.touched.type && discountForm.errors.type
                        ? true
                        : false
                    }
                  />
                </div>
                <Input
                  styles="basic"
                  name="amount"
                  change={discountForm.handleChange}
                  blur={discountForm.handleBlur}
                  value={discountForm.values.amount}
                  error={
                    discountForm.touched.amount && discountForm.errors.amount
                      ? discountForm.errors.amount
                      : null
                  }
                  label="Amount"
                  placeholder={selectedType === "Percentage" ? "30%" : 500}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  styles="basic"
                  name={"limit"}
                  change={discountForm.handleChange}
                  blur={discountForm.handleBlur}
                  value={discountForm.values.limit}
                  error={
                    discountForm.touched.limit && discountForm.errors.limit
                      ? discountForm.errors.limit
                      : null
                  }
                  label="Limit"
                  placeholder=" 100"
                />
                <DateRangeSelector
                  type={"single"}
                  style={"border border-[#ededed] rounded-md"}
                  onSubmit={(date) =>
                    discountForm.setFieldValue("expiry", date)
                  }
                  label={"Expiry Date"}
                  error={
                    discountForm.touched.expiry && discountForm.errors.expiry
                      ? true
                      : false
                  }
                />
              </div>
            </div>

            <h2 className="text-base text-secondary font-semibold">General</h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <label
                htmlFor="Parent Category"
                className="text-[#475569] text-sm"
              >
                Parent Category
              </label>
              <CustomSelect
                appearance={"select"}
                options={category}
                onChange={categorySelector}
                bg={'white'}
                value={selectedCategory?.name}
                error={
                  discountForm.touched.category && discountForm.errors.category
                    ? true
                    : false
                }
              />
              <label htmlFor="Sub Category" className="text-[#475569] text-sm">
                Sub Category
              </label>
              <CustomSelect
                appearance={"select"}
                options={selectedCategory?.subcategory}
                onChange={subcategorySelector}
                bg={'white'}
                value={selectedSubcategory?.name}
                error={
                  discountForm.touched.subCategory &&
                  discountForm.errors.subCategory
                    ? true
                    : false
                }
              />

              <Input
                styles="basic"
                name={"tags"}
                change={discountForm.handleChange}
                blur={discountForm.handleBlur}
                error={
                  discountForm.touched.tags && discountForm.errors.tags
                    ? discountForm.errors.tags
                    : null
                }
                value={discountForm.values.tags}
                label="Tags"
                placeholder="Tags"
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={discountForm.resetForm}
                type="reset"
                style="outline"
              >
                Discard
              </Button>
              <Button type="submit" style="green">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewDiscount;
