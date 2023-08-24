import { useTitle } from "../../Components/Hooks/useTitle";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";

const NewDiscount = () => {
  useTitle("New Discount");
  const submitHandler = () => {
    console.log("update clicked");
  };
  return (
    <div className="px-5 h-full">
      <Heading type="navigate" title={`Add New Discount`} />
      <form action="" onSubmit={submitHandler}>
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 gap-3 border-t border-[#0000001c] py-5">
          <div className="grid gap-3">
            <h2 className="text-base text-secondary font-semibold">
              Coupon Details
            </h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <div className="flex items-end gap-2 ">
                <Input styles="basic" label="Coupon Code"  placeholder="Coupon" />
                <button className="shrink-0 py-[10px] px-3 rounded-md border border-[#0000001c] h-fit text-sm text-[#000316]">Generate Coupone</button>
              </div>
              <Input
                styles="area"
                rows={3}
                label="Description (Optional)"
                placeholder="Write here..."
              />
            </div>

            <h2 className="text-base text-secondary font-semibold">General</h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
              <Input
                styles="select"
                label="Product Category"
                option={[
                  { name: "Electronics", value: "electronics" },
                  { name: "Fashion", value: "fashion" },
                  { name: "Travel", value: "travel" },
                ]}
              />
              <Input
                styles="select"
                label="Sub Category"
                option={[
                  { name: "Beauty", value: "beauty" },
                  { name: "Fashion", value: "fashion" },
                  { name: "Travel", value: "travel" },
                ]}
              />
              <Input styles="basic" label="Tags" placeholder="Tags" />
            </div>
            <div className="flex justify-between">
                <Button type="reset" style='outline'>Discard</Button>
                <Button type="submit" style='green'>Save</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewDiscount;
