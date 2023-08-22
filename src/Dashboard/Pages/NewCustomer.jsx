import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";

const NewCustomer = () => {
  const submitHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`New Customer`} />
      <div className="grid grid-cols-2 gap-5 py-5 border-t border-[#0000001c]">
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
          <div className="text-[#64748B] text-sm max-w-[400px]">
            <h2 className="text-secondary text-base font-semibold">Address</h2>
            <p className="max-w-[520px]">
              We can help with that Replace your next meeting with a short video
              and get feedback faster .
            </p>
          </div>
        </div>
        <form onSubmit={submitHandler} className="col-span-2 sm:col-span-1 grid gap-5">
          <div className="rounded-lg border border-[#0000001c] p-3 grid-cols-1 grid gap-3 ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input styles="basic" label="First Name" placeholder="First Name" />
              <Input styles="basic" label="Last Name" placeholder="Last Name" />
            </div>
            <Input styles="basic" label="Email" placeholder="example@domain.com" />
            <Input styles="basic" label="Phone Number" placeholder="01700000000" />
          </div>
          <div className="rounded-lg border border-[#0000001c] p-3 grid-cols-1 grid gap-3 ">
            <Input styles="basic" label="Address" placeholder="Address..." />
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input styles="basic" label="City" placeholder="City name" />
              <Input styles="basic" label="Zip/Postal Code" placeholder="Zip/Postal Code" />
            </div>
            <Input styles="basic" label="Phone Number" placeholder="01700000000" />
          </div>
          <div className="flex justify-between">
              <Button style="outline">Discard</Button>
              <div className="space-x-2">
                <Button style="outline">Draft</Button>
                <Button style="primary">Publish</Button>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
