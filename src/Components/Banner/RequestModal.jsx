import Button from "../UiElements/Buttons/Button";
import Input from "../UiElements/Input/Input";
import globe from "../../assets/icons/cd-internet.svg";
import reload from "../../assets/icons/cd-reload.svg";
import { useState } from "react";
import ImageUploader from "../UiElements/ImageUploader/ImageUploader";
import { useFormik } from "formik";
import removeEmptyFields from "./../../Util/removeEmptyFields";
import { useUserCtx } from "../../contexts/user/UserContext";
import { terminal } from "../../contexts/terminal/Terminal";
import { useNavigate } from "react-router-dom";

/**
 * React component for a modal used for requesting an item.
 *
 * @param {string} url - The required product URL to begin the request process.
 * @param {function} confirmSubmit - Callback function for modal submission.
 * @param {function} setIsOpen - Function to set modal open/close state.
 * @returns {JSX.Element} Modal Element
 */
const RequestModal = ({ url, confirmSubmit, setIsOpen }) => {
  const [active, setActive] = useState("link");
  const navigate = useNavigate();

  const { user } = useUserCtx();

  const itemRequestForm = useFormik({
    initialValues: {
      link: url,
      name: "",
      quantity: 1,
      note: "",
      images: [],
    },
    onSubmit: (values) => {
      const { images, ...rest } = values;
      removeEmptyFields(rest);

      if (user) {
        terminal
          .request({
            name: "registerRequest",
            body: { data: rest, images: images },
          })
          .then((d) => {
            if (d.id) {
              confirmSubmit("success");
            }
          });
      } else {
        setIsOpen(false);
        navigate("/login", {
          state: {
            requestItem: { data: rest, images: images },
            sendRequest: true,
          },
        });
      }
    },
  });

  return (
    <form action="" onSubmit={itemRequestForm.handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-8 pb-4 justify-between items-start border-b border-[#0000001e]">
          <div className="flex gap-2 items-center flex-wrap ">
            <p className="shrink-0 text-xl font-semibold"> Request Items</p>

            {/* button */}
            <div className="flex gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setActive("link");
                }}
                type={active === "link" ? "lightGreen" : "light"}
                buttonType="button"
              >
                Link
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setActive("image");
                }}
                type={active === "image" ? "lightGreen" : "light"}
                buttonType="button"
              >
                Image
              </Button>
            </div>
          </div>
        </div>

        {/* rendering as active button */}
        {active === "link" && (
          <>
            <div className="flex gap-2 items-end ">
              {/* link */}
              <div className="w-full">
                <Input
                  styles="primary"
                  label="Product Link"
                  name="link"
                  change={itemRequestForm.handleChange}
                  blur={itemRequestForm.handleBlur}
                  value={itemRequestForm.values.link}
                  placeholder="Product URL"
                  border
                >
                  <img src={globe} alt="" />
                </Input>
              </div>
              <button
                type="button"
                className="cursor-pointer duration-500 active:rotate-180"
              >
                <img
                  className="p-4  rounded-full bg-[#00031615] "
                  src={reload}
                  alt=""
                />
              </button>
            </div>

            {/* product name */}
            <div className="">
              <Input
                styles="primary"
                label="Product Name"
                name="name"
                change={itemRequestForm.handleChange}
                blur={itemRequestForm.handleBlur}
                value={itemRequestForm.values.name}
                placeholder="Product Name"
                border
              />
            </div>
          </>
        )}

        {/* images upload */}
        {active === "image" && (
          <ImageUploader title="Product Image" formikProps={itemRequestForm} />
        )}

        <div className="flex gap-3 items-center">
          {/* quantity */}
          <div className="border-[#0000004d] border rounded-full w-fit flex items-center justify-center">
            <button
              className="px-5 pb-2 text-[#0000004d] text-3xl"
              type="button"
              onClick={() =>
                itemRequestForm.values.quantity > 1
                  ? itemRequestForm.setFieldValue(
                      "quantity",
                      itemRequestForm.values.quantity - 1
                    )
                  : null
              }
            >
              -
            </button>
            <input
              className="text-center max-w-[40px] text-secondary font-semibold outline-none"
              name="quantity"
              value={itemRequestForm.values.quantity}
              onChange={itemRequestForm.handleChange}
              onBlur={itemRequestForm.handleBlur}
              min={1}
              type="number"
            />
            <button
              className="px-5 pb-2 text-[#0000004d] text-3xl h-full"
              type="button"
              onClick={() =>
                itemRequestForm.setFieldValue(
                  "quantity",
                  itemRequestForm.values.quantity + 1
                )
              }
            >
              +
            </button>
          </div>
          {active === "link" && (
            <p className="">
              By{" "}
              <span className="text-secondary">
                {
                  itemRequestForm.values.link
                    ?.replace(/^(https?:\/\/)?(www\.)?/, "")
                    .split("/")[0]
                }
              </span>
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-3" htmlFor="note">
            Add Note (optional)
          </label>
          <textarea
            className="border p-2 rounded-md w-full outline-none"
            name="note"
            onChange={itemRequestForm.handleChange}
            onBlur={itemRequestForm.handleBlur}
            value={itemRequestForm.values.notes}
            rows="5"
            placeholder="Specify size, color, model or any instructions here..."
          ></textarea>
        </div>
        <Button type="primary" buttonType="submit" full>
          {user ? "Request Item" : "Login & Request Your Item"}
        </Button>
      </div>
    </form>
  );
};

export default RequestModal;
