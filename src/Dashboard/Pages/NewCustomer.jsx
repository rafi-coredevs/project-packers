import { useFormik } from "formik";
import { useTitle } from "../../Components/Hooks/useTitle";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import { customerSchema } from "../../Util/ValidationSchema";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";

const NewCustomer = () => {
  useTitle("New Customer");
  const draftHandler = () => {
    console.log(customerForm.values)
  };
  const customerForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
    },
    validationSchema: customerSchema,
    onSubmit: (values) => {
     const body={
      fullName : values.firstName + ' '+ values.lastName,
      email:values.email,
      phone:values.phone,
      shippingaddress: {
        address: values.address,
        city: values.city,
        zip: values.zip,
      },
     }
     terminal.request({ name: 'registerUser', body }).then(data=> {
      if(data.id){
        toaster({type:'success',message:'Customer Created'})
      }
      else{
        toaster({type:'error',message:'An error occured'})
      }
     })
    },
  });
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`New Customer`} back={"customer"} />
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2 sm:col-span-1 grid">
          <div className="space-y-3">
            <h2 className="text-secondary text-base font-semibold">
              Customer Overview
            </h2>
            <p className="text-[#64748B] text-sm max-w-[400px]">
              We can help with that Replace your next meeting with a short video
              and get feedback faster .
            </p>
          </div>
          <div className="text-[#64748B] text-sm max-w-[400px] mt-5 md:-mt-14">
            <h2 className="text-secondary text-base font-semibold">Address</h2>
            <p className="max-w-[520px]">
              We can help with that Replace your next meeting with a short video
              and get feedback faster .
            </p>
          </div>
        </div>
        <form
          onSubmit={customerForm.handleSubmit}
          className="col-span-2 sm:col-span-1 grid gap-5"
        >
          <div className="rounded-lg border border-[#0000001c] p-3 grid-cols-1 grid gap-3 ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                styles="basic"
                label="First Name"
                name={"firstName"}
                change={customerForm.handleChange}
                blur={customerForm.handleBlur}
                error={
                  customerForm.touched.firstName &&
                  customerForm.errors.firstName
                    ? customerForm.errors.firstName
                    : null
                }
                value={customerForm.values.firstName}
                placeholder="First Name"
              />
              <Input
                styles="basic"
                label="Last Name"
                name={"lastName"}
                change={customerForm.handleChange}
                blur={customerForm.handleBlur}
                error={
                  customerForm.touched.lastName &&
                  customerForm.errors.lastName
                    ? customerForm.errors.lastName
                    : null
                }
                value={customerForm.values.lastName}
                placeholder="Last Name"
              />
            </div>
            <Input
              styles="basic"
              label="Email"
              name={"email"}
              change={customerForm.handleChange}
              blur={customerForm.handleBlur}
              error={
                customerForm.touched.email && customerForm.errors.email
                  ? customerForm.errors.email
                  : null
              }
              value={customerForm.values.email}
              placeholder="example@domain.com"
            />
            <Input
              styles="basic"
              label="Phone Number"
              name={"phone"}
              change={customerForm.handleChange}
              blur={customerForm.handleBlur}
              error={
                customerForm.touched.phone && customerForm.errors.phone
                  ? customerForm.errors.phone
                  : null
              }
              value={customerForm.values.phone}
              placeholder="01700000000"
            />
          </div>
          <div className="rounded-lg border border-[#0000001c] p-3 grid-cols-1 grid gap-3 ">
            <Input
              styles="basic"
              label="Address"
              name={"address"}
              change={customerForm.handleChange}
              blur={customerForm.handleBlur}
              error={
                customerForm.touched.address && customerForm.errors.address
                  ? customerForm.errors.address
                  : null
              }
              value={customerForm.values.address}
              placeholder="Address..."
            />
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                styles="basic"
                label="City"
                name={"city"}
                change={customerForm.handleChange}
                blur={customerForm.handleBlur}
                error={
                  customerForm.touched.city && customerForm.errors.city
                    ? customerForm.errors.city
                    : null
                }
                value={customerForm.values.city}
                placeholder="City name"
              />
              <Input
                styles="basic"
                label="Zip/Postal Code"
                name={"zip"}
                change={customerForm.handleChange}
                blur={customerForm.handleBlur}
                error={
                  customerForm.touched.zip && customerForm.errors.zip
                    ? customerForm.errors.zip
                    : null
                }
                value={customerForm.values.zip}
                placeholder="Zip/Postal Code"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="button" onClick={customerForm.handleReset} style="outline">Discard</Button>
            <div className="space-x-2">
              <Button onClick={draftHandler} type="button" style="outline">Draft</Button>
              <Button type="submit" style="primary">Publish</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
