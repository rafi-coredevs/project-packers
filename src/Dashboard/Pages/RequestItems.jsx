import { useEffect, useState } from "react";
import Heading from "../Components/UiElements/Heading/Heading";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import search from "../../assets/icons/cd-search2.svg";
import Table from "../Components/UiElements/Table/Table";
import Input from "../Components/UiElements/Input/Input";
import Button from "../Components/UiElements/Button/Button";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";
import toaster from '../../Util/toaster';
//
const requestStatuses = [{ id: 'All', name: "All", value: "All" }, { id: 'Paid', name: "Paid", value: "Paid" }, { id: 'Pending', name: "Pending", value: "Pending" }]

//
const RequestItems = () => {

  useTitle("Requested Items")
  const [active, setActive] = useState("all");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [requestIds, setRequestIds] = useState([]);
  useEffect(() => {
    fetchData();

  }, [sortBy, active]);

  const [selectedRequestStatus, setSelectedRequestStatus] = useState('all');
 const filterHandler = (val)=>{
  setSelectedRequestStatus(val);
  setActive(val.toLowerCase());
 }


  const fetchData = (page = 1) => {
    setLoading(true);
    terminal.request({ name: 'allRequest', queries: { page, sortBy, status: active } }).then((res) => {
      res.status === false ? '' : setTableData(res), setLoading(false);
    })
  };
  const tableButtonHandler = (value) => {
    setActive(value);
  };
  const deleteHandler = () => {
    terminal.request({ name: 'removeRequest', body: { id : requestIds} }).then(res => res.status === true ? (toaster({ type: 'success', message: res.message }), fetchData()) : (toaster({ type: 'error', message: res.message })))
  };

  function handleSearch(e) {
    if(e.target.value?.length >= 1) {
      setLoading(true);
      terminal.request({ name: 'allRequest', queries: { sortBy, status: active, search: e.target.value } }).then((res) => {
        res.status === false ? '' : setTableData(res), setLoading(false);
      });
    } else {
      fetchData();
    }
  }

  return (
    <div className="h-full px-5 ">
      <Heading title="Item Request">
        <Button style="delete" onClick={deleteHandler}>
          Delete
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
                  onClick={() => tableButtonHandler("pending")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "pending"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                    }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => tableButtonHandler("estimate")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "estimate"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                    }`}
                >
                  Estimate sent
                </button>
                <button
                  onClick={() => tableButtonHandler("closed")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "closed"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                    }`}
                >
                  Closed
                </button>
                <button
                  onClick={() => tableButtonHandler("abandoned")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "abandoned"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                    }`}
                >
                  Abandoned
                </button>
              </div>
              <div className="py-2 flex gap-1">
                <Input type="text" change={handleSearch} placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>

                <div className=" flex ">
                  <CustomSelect value={selectedRequestStatus} options={requestStatuses} onChange={filterHandler} bg="white" appearance="filter" />
                </div>
                <button onClick={() => setSortBy(sortBy === 'createdAt:desc' ? 'createdAt:asc' : 'createdAt:desc')} className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>

            <Table paginate={fetchData} data={tableData} loading={loading} getData={setRequestIds}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestItems;
