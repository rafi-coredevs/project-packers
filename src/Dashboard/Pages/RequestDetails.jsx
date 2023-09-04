import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import { requestItems } from "../../Util/ValidationSchema";
import Heading from "../Components/UiElements/Heading/Heading";
import Button from "../Components/UiElements/Button/Button";
import Input from "../Components/UiElements/Input/Input";
import globe from "../../assets/icons/cd-internet.svg";
import SideCard from "../Components/UiElements/SideCard/SideCard";
import UploadIcon from "../../assets/icons/UploadIcon.svg";
import RequestImageUpload from "../Components/uploadImages/RequestImageUpload/RequestImageUpload";
import toaster from "../../Util/toaster";

const RequestDetails = () => {
  useTitle("Request Detail");
  const { requestId } = useParams();
  const [preLoadedImages, setPreLoadedImages] = useState([]);
  const [disable, setDisable] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);

  const navigate = useNavigate();

  // formik initialization
  const requestForm = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      email: "",
      phone: "",
      link: "",
      note: "",
      sellerTakes: 0,
      tax: 0,
      fee: 0,
      shippingaddress: "",
      billingaddress: "",
      user: {},
      images: [],
      removeImages: [],
      fullName: "",
    },
    validationSchema: requestItems,
    onSubmit: (values) => {
      setDisable(true);
      const { images, user, ...rest } = values;

      // sending invoice
      terminal
        .request({
          name: "invoiceRequest",
          params: { id: requestId },
          body: { data: rest, images: images },
        })
        .then((res) =>
          res?.status === false
            ? toaster({ type: "success", message: res.message })
            : (toaster({
                type: "success",
                message: "Invoice send successfully",
              }),
              navigate(-1),
              setDisable(false))
        );
    },
  });

  // for fetching data when page is loaded
  useEffect(() => {
    terminal
      .request({ name: "singleRequest", params: { id: requestId } })
      .then((res) => {
        console.log(res);
        setPreLoadedImages(res.images);
        requestForm.setValues({
          name: res.name,
          email: res.user?.email,
          phone: res.user?.phone,
          quantity: res.quantity || 1,
          link: res.link,
          note: res.note,
          sellerTakes: res.sellerTakes || 0,
          tax: res.tax || 0,
          fee: res.fee || 0,
          shippingaddress: res.shippingaddress,
          billingaddress: res.billingaddress,
          user: res.user,
          images: res.images,
          fullName: res.user.fullName || "No Name",
        });
      })
      .catch((err) => console.error("request error when loaded", err));
  }, []);

  /**
   * Handle quantity change.
   * @param {number} value - The new quantity value.
   */
  const handleQuantity = (value) => {
    requestForm.setFieldValue("quantity", value);
  };

  /**
   * Handle request update.
   * @param {Event} e - The click event.
   */
  const updateHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    const { images, user, ...rest } = requestForm.values;

    terminal
      .request({
        name: "updateRequest",
        params: { id: requestId },
        body: { data: rest, images: images },
      })
      .then(
        (res) =>
          res?.status === false
            ? toaster({ type: "success", message: res.message })
            : (toaster({
                type: "success",
                message: "Updated successfully",
              }),
              setDisable(false)),
        navigate(-1)
      )
      .catch((err) => console.error("Request update error", err));
  };

  /**
   * Handle request deletion.
   * @param {Event} e - The click event.
   */
  const deleteHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    terminal
      .request({ name: "removeRequest", body: { id: [requestId] } })
      .then((res) =>
        res?.status === false
          ? toaster({ type: "success", message: res.message })
          : (toaster({
              type: "success",
              message: "Deleted successfully",
            }),
            navigate(-1),
            setDisable(false))
      )
      .catch((err) => console.error("Error in delete request", err));
  };

  return (
    <div onSubmit={requestForm.handleSubmit} className="h-full px-5">
      <Heading type="navigate" title={`#${requestId}`} back={"Request"}>
        <div className="flex items-center gap-1">
          <Button style="delete" onClick={(e) => deleteHandler(e)}>
            Delete
          </Button>
          <Button
            style="primary"
            type="button"
            onClick={(e) => updateHandler(e)}
          >
            Update
          </Button>
        </div>
      </Heading>
      <form
        onSubmit={requestForm.handleSubmit}
        className="grid grid-cols-3 gap-5"
      >
        <div className="col-span-3 sm:col-span-2 grid gap-5">
          {/* request details */}
          <div className="grid gap-5 border border-[#0000001c] rounded-lg ">
            <h3 className="text-base font-semibold p-5 pb-0">
              Requested Items
            </h3>
            {/* link */}
            <div className="flex gap-2 items-center px-5">
              <div className="w-full">
                <Input
                  styles="secondary"
                  type="text"
                  placeholder="Enter your URL"
                  name="link"
                  change={requestForm.handleChange}
                  blur={requestForm.handleBlur}
                  error={
                    requestForm.touched.link && requestForm.errors.link
                      ? requestForm.errors.link
                      : null
                  }
                  value={requestForm.values.link}
                >
                  <img className="opacity-70" src={globe} />
                </Input>
              </div>
              <Button style="outline">Go</Button>
            </div>

            {/* quantity */}
            <div className="flex gap-2 items-center px-5">
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

            {/* image upload */}
            <div className="px-5">
              <RequestImageUpload
                formikProps={requestForm}
                uploadButtonIcon={UploadIcon}
                preLoadedImages={preLoadedImages}
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
            <hr />
            {/* note */}
            <div className="grid gap-3 px-5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">Note</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setInputDisable(!inputDisable);
                  }}
                  className="text-[#3E949A] text-sm font-normal"
                >
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
                value={requestForm.values.note || "N/A"}
                disabled={inputDisable}
              ></textarea>
            </div>
          </div>

          {/* payment details */}
          <div className="grid gap-5 border border-[#0000001c] rounded-lg ">
            <p className="text-base font-semibold p-5">Payment Details</p>
            <div className="grid gap-4">
              {/* seller Takes */}
              <div className="flex justify-between items-center px-5">
                <p className="text-[#475569] text-sm">Seller Takes</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    name="sellerTakes"
                    className={`text-end`}
                    type="number"
                    id="sellerTakes"
                    error={
                      requestForm.touched.sellerTakes &&
                      requestForm.errors.sellerTakes
                        ? requestForm.errors.sellerTakes
                        : null
                    }
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.sellerTakes}
                  />
                </div>
              </div>

              {/* us seller tax */}
              <div className="flex justify-between items-center px-5">
                <p className="text-[#475569] text-sm">US Sales Tax</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    className={`text-end`}
                    name="tax"
                    id="tax"
                    error={
                      requestForm.touched.tax && requestForm.errors.tax
                        ? requestForm.errors.tax
                        : null
                    }
                    type="number"
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.tax}
                  />
                </div>
              </div>

              {/* fee */}
              <div className="flex justify-between items-center px-5">
                <p className="text-[#475569] text-sm">Packers Fee</p>
                <div className="flex gap-1 items-center">
                  <p className="text-lg font-semibold">৳</p>
                  <Input
                    styles="secondary"
                    name="fee"
                    type="number"
                    className={`text-end`}
                    id="fee"
                    error={
                      requestForm.touched.fee && requestForm.errors.fee
                        ? requestForm.errors.fee
                        : null
                    }
                    change={requestForm.handleChange}
                    blur={requestForm.handleBlur}
                    value={requestForm.values.fee}
                  />
                </div>
              </div>

              {/* total */}
              <div className="flex justify-between items-center px-5">
                <p className="text-base font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  ৳{" "}
                  {Number(parseFloat(requestForm.values.sellerTakes)) +
                    Number(parseFloat(requestForm.values.tax)) +
                    Number(parseFloat(requestForm.values.fee))}
                </p>
              </div>

              {/* buttons */}
              <div className="py-5 flex gap-2 justify-end border-t border-[#0000001c] px-5">
                <Button
                  style="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={disable} type="submit" style="primary">
                  Send Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* right side's customer details */}
        <div className="col-span-3 sm:col-span-1 h-fit grid gap-5 border border-[#0000001c] divide-y  rounded-lg ">
          <SideCard
            types="customer"
            customerName={requestForm.values.fullName}
          />
          <SideCard
            name={"email"}
            types="contact"
            email={requestForm.values.email}
            phone={requestForm.values.phone}
          />
          <SideCard
            types="shipping"
            title="Shipping Address"
            address="No Address"
            editable={false}
          />
          <SideCard
            types="billing"
            title="Billing Address"
            address="No Address"
            editable={false}
          />
        </div>
      </form>
    </div>
  );
};

export default RequestDetails;
