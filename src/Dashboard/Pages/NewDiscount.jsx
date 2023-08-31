import { useEffect, useState } from "react";
import { useTitle } from "../../Components/Hooks/useTitle";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import { terminal } from "../../contexts/terminal/Terminal";
import toaster from "../../Util/toaster";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
const discountType = [{
  id:'Fixed',
  name: 'Fixed',
},
{id:'Percentage',
name: 'Percentage',
},

]

const NewDiscount = () => {
  const [category,setCategory]=useState([]);
  const [selectedCategory,setSelectedCategory]=useState(null);
  const [selectedSubcategory,setSelectedSubcategory]=useState(null);
  const [selectedType,setSelectedtype]=useState(null);
 

  useEffect(()=>{
    terminal.request({name:'allCategory'}).then(res=>res?.status===false? toaster({type:'error', message: res?.message}): setCategory(res));
  },[])
  const categorySelector = (val)=> {
    
    setSelectedCategory(category.find(item=>item.id===val))

  }
  useTitle("New Discount");
  const submitHandler = () => {
    console.log("update clicked");
  };
  const subcategorySelector = (val)=>{

    setSelectedSubcategory(selectedCategory.subcategory.find(item=>item.id===val));


  }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               <div className="">
               <label htmlFor="Type" className="text-[#475569] text-sm">Type</label>
               <CustomSelect appearance={"select"} options={discountType} onChange={setSelectedtype} value={selectedType}/></div> 
              <Input styles="basic" label="Amount"  placeholder=" 500" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input styles="basic" label="Limit"  placeholder=" 100" />
              <input type="date" />
              </div>
              
            </div>

            <h2 className="text-base text-secondary font-semibold">General</h2>
            <div className="border border-[#0000001c] rounded-lg p-3 grid gap-3">
            <label htmlFor="Parent Category" className="text-[#475569] text-sm">Parent Category</label>
            <CustomSelect appearance={"select"} options={category} onChange={categorySelector} value={selectedCategory?.name}/>
            <label htmlFor="Sub Category" className="text-[#475569] text-sm">Sub Category</label>
            <CustomSelect appearance={"select"} options={selectedCategory?.subcategory} onChange={subcategorySelector} value={selectedSubcategory?.name}/>
              
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
