import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Components/UiElements/Button/Button";
import Heading from "../Components/UiElements/Heading/Heading";
import Input from "../Components/UiElements/Input/Input";
import Table from "../Components/UiElements/Table/Table";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import search from "../../assets/icons/cd-search2.svg";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";

const discountStatuses = [{ id: 1, name: "All", value: "all" }, { id: 2, name: "Valid", value: "valid" }, { id: 3, name: "Expired", value: "expired" }]


const Discount = () => {
  useTitle("Active Discounts");
  const [active, setActive] = useState("all");
  const [tableData, setTabledata] = useState(null);
  const [loading,setLoading]= useState(false);
  const [sortBy,setSortby]=useState('createdAt:asc');
  const [selectedDiscountStatus, setSelectedDiscountStatus] = useState({ name: 'Select', value: null, id: 0 });

  function discountStatusHandler(id) {
    const  selected = discountStatuses.find(item => item.id === id)
    setSelectedDiscountStatus(selected);
    setActive(selected.value)
  }
  const navigate = useNavigate();
  const tableButtonHandler = (value) => {
    setActive(value);
    console.log(value);
  };
 console.log(active);
  useEffect(() => {
    
    fetchData();

  }, [active, sortBy]);

  const fetchData = (page = 1) => {
    setLoading(true);
    terminal.request({ name: 'allDiscount', queries: { page,filter: active , sortBy} }).then((res) => {
      res.status === false ? '' : setTabledata(res), setLoading(false);
    });
  };

  return (
    <div className="h-full px-5 ">
      <Heading title="Discount">
        <Button style="primary" onClick={() => navigate("new-discount")}>
          Add Coupon
        </Button>
      </Heading>
      <div className="grid grid-cols-3 gap-5 py-5">
        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2 my-auto">
                <button
                  onClick={() => tableButtonHandler("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => tableButtonHandler("valid")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "valid"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Valid
                </button>
                <button
                  onClick={() => tableButtonHandler("expired")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "expired"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Expired
                </button>
               
              </div>
              <div className="py-2 flex gap-1">
                <Input type="text" placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>
                <div className="flex">
                <CustomSelect value={selectedDiscountStatus.name} options={discountStatuses} onChange={discountStatusHandler} bg="white" appearance="filter" />
             </div>
             
                <button onClick={() => setSortby(sortBy === 'createdAt:desc' ? 'createdAt:asc' : 'createdAt:desc')} className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>
            <Table paginate={fetchData} data={tableData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;
