import { useParams } from "react-router-dom";
import Heading from "../Components/UiElements/Heading/Heading";
import Button from "../Components/UiElements/Button/Button";
import Input from "../Components/UiElements/Input/Input";
import globe from "../../assets/icons/cd-internet.svg";
import ImageUploader from "../../Components/UiElements/ImageUploader/ImageUploader";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import { useTitle } from "../../Components/Hooks/useTitle";
import { useFormik } from "formik";
import { useEffect } from "react";
import { terminal } from "../../contexts/terminal/Terminal";
import UploadIcon from "../../assets/icons/UploadIcon.svg";
import { requestItems } from "../../Util/ValidationSchema";
//
const RequestDetails = () => {
  useTitle("Request Detail");
  const { requestId } = useParams();
  //  console.log(requestId)

  const requestForm = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      email:'',
      phone:'',
      link: "",
      note: "",
      sellerTakes: "",
      tax: "",
      fee: "",
      shippingaddress: "",
      billingaddress: "",
      user: {},
      images: [],
    },
    validationSchema: requestItems,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    terminal
      .request({ name: "singleRequest", params: { id: requestId } })
      .then((res) => {
        console.log(res);
        requestForm.setValues({
          name: res.name,
          email: res.user?.email,
          phone: res.user?.phone,
          quantity: res.quantity || 1,
          link: res.link,
          note: res.note,
          sellerTakes: 0,
          tax: 0,
          fee: 0,
          shippingaddress: res.shippingaddress,
          billingaddress: res.billingaddress,
          user: res.user,
          images: res.images,
        });
      });
  }, []);

  const handleQuantity = (value) => {
    requestForm.setFieldValue("quantity", value);
  };

  const updateHandler = () => {
    console.log("update clicked");
    console.log(requestForm.values)
  };
  const deleteHandler = () => {
    console.log("delete clicked");
  };
  return (
    <form onSubmit={requestForm.handleSubmit} className="h-full px-5">
      <Heading type="navigate" title={`#${requestId}`} back={"Request"}>
        <div className="flex items-center gap-1">
          <Button style="delete" onClick={deleteHandler}>
            Delete
          </Button>
          <Button style="primary" type="button" onClick={updateHandler} >
            Update
          </Button>
        </div>
      </Heading>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-3 sm:col-span-2 grid gap-5">
          <div className="grid gap-5 border border-[#0000001c] rounded p-5">
            <h3 className="text-base font-semibold">Requested Items</h3>
            <div className="flex gap-2 items-center">
              {/* link */}
              <div className="w-full">
                <Input
                  styles="secondary"
                  type="text"
                  placeholder="Enter your URL"
                  name="link"
                  change={requestForm.handleChange}
                  blur={requestForm.handleBlur}
                  error={requestForm.touched.link && requestForm.errors.link ? requestForm.errors.link : null}
                  value={requestForm.values.link}
                >
                  <img className="opacity-70" src={globe} />
                </Input>
              </div>
              <Button style="outline">Go</Button>
            </div>
            <div className="flex gap-2 items-center">
              {/* quantity */}
              <p className="">Quantity</p>
              <Input
                styles="quantity"
                type="number"
                name="quantity"
                change={requestForm.handleChange}
                blur={requestForm.handleBlur}
                value={requestForm.values.quantity}
                onClick={handleQuantity}
              />
            </div>
            <div className="">
              <ImageUploader
                formikProps={requestForm}
                uploadButtonIcon={UploadIcon}
                placeholder={
                  <>
                    <span className="text-sm"> Drop you image here, or</span>
                    <span className="text-[#3E949A] underline">browser</span>
                    <br />
                    <span className="text-slate-600 text-center text-xs">
                      Supports JPG, PNG
                    </span>
                  </>
                }
              />
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">Note</p>
                <button className="text-[#3E949A] text-sm font-normal">
                  Edit
                </button>
              </div>
              <textarea
                className="w-full text-[#475569] outline-none"
                name="note"
                onChange={requestForm.handleChange}
                onBlur={requestForm.handleBlur}
                id="note"
                rows="3"
                value={requestForm.values.note}
                disabled={false}
              ></textarea>
            </div>
          </div>
          <div className="grid gap-5 border border-[#0000001c] rounded p-5">
            <p className="text-base font-semibold">Payment Details</p>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <p className="text-[#475569] text-sm">Seller Takes</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    name="sellerTakes"
                    type="number"
                    id="sellerTakes"
                    error={requestForm.touched.sellerTakes && requestForm.errors.sellerTakes ? requestForm.errors.sellerTakes : null}
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.sellerTakes}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#475569] text-sm">US Sales Tax</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    name="tax"
                    id="tax"
                    error={requestForm.touched.tax && requestForm.errors.tax ? requestForm.errors.tax : null}
                    type="number"
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.tax}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#475569] text-sm">Packers Fee</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    name="fee"
                    type='number'
                
                    id="fee"
                    error={requestForm.touched.fee && requestForm.errors.fee ? requestForm.errors.fee : null}
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.fee}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  ৳{" "}
                  {Number(requestForm.values.sellerTakes) +
                    Number(requestForm.values.tax) +
                    Number(requestForm.values.fee)}
                </p>
              </div>
              <div className="py-5 flex gap-2 justify-end border-t border-[#0000001c] ">
                <Button style="outline">Cancel</Button>
                <Button type="submit" style="primary">
                  Send Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 border border-[#0000001c] divide-y  rounded-lg ">
          <SideCard   onChange={requestForm.handleChange} types="customer" value={requestForm.values.name} />
          <SideCard name={'email'} types="contact" email={requestForm.values.email} phone={requestForm.values.phone} />
          <SideCard
            types="address"
            title="Shipping Address"
            address="No Address"
          />
          <SideCard
            types="address"
            title="Billing Address"
            address="No Address"
          />
        </div>
      </div>
    </form>
  );
};

export default RequestDetails;
