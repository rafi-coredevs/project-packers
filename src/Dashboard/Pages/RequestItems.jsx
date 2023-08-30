import { useEffect, useState } from "react";
import Heading from "../Components/UiElements/Heading/Heading";
import filter from "../../assets/icons/cd-filter.svg";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import search from "../../assets/icons/cd-search2.svg";
import Table from "../Components/UiElements/Table/Table";
import Input from "../Components/UiElements/Input/Input";
import { requestTable } from "../../Store/Data";
import Button from "../Components/UiElements/Button/Button";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
// 
const requestStatuses = [{ id: 1, name: "All", value: "all" }, { id: 2, name: "Paid", value: "paid" }, { id: 3, name: "Pending", value: "pending" }]

// 
const RequestItems = () => {
  
  useTitle("Requested Items")
  const [active, setActive] = useState("all");
  const [tableData, setTabledata] = useState(null);
  const [loading,setLoading]=useState(true);
  const [sortBy,setSortBy]=useState('createdAt:asc');
  useEffect(() => {
    fetchData();
   
  }, [sortBy, active]);
  
  const [selectedRequestStatus, setSelectedRequestStatus] = useState({ name: 'Select', value: null, id: 0 });

  function requestStatusHandler(id) {
    setSelectedRequestStatus(requestStatuses.find(item => item.id === id))
  }

  const fetchData = (page=1) => {
    setLoading(true);
    terminal.request({name:'allRequest', queries: { page, sortBy, status: active } }).then((res) => {
      res.status===false? '': setTabledata(res),  setLoading(false);
    })
  };
  const tableButtonHandler = (value) => {
    setActive(value);
    console.log(value);
  };
  const deleteHandler = () => {
    console.log("deleted");
  };
  return (
    <div className="h-full px-5 ">
      <Heading title="Item Request">
        <Button style="delete" onClick={deleteHandler}>
          delete
        </Button>
      </Heading>
      <div className="grid grid-cols-3 gap-5 py-5">
        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2 my-auto">
                <button
                  onClick={() => tableButtonHandler("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => tableButtonHandler("pending")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "pending"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => tableButtonHandler("estimate")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "estimate"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Estimate sent
                </button>
                <button
                  onClick={() => tableButtonHandler("closed")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "closed"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Closed
                </button>
                <button
                  onClick={() => tableButtonHandler("abandoned")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "abandoned"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Abandoned
                </button>
              </div>
              <div className="py-2 flex gap-1">
                <Input type="text" placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>

                <CustomSelect value={selectedRequestStatus.name} options={requestStatuses} onChange={requestStatusHandler} bg="bg-white" appearance="filter" />

                <button onClick={()=>setSortBy(sortBy==='createdAt:desc'?'createdAt:asc':'createdAt:desc')}  className="border border-[#0000001f] p-2  ">
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

export default RequestItems;
