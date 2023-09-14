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
//
const customerStatuses = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "New", value: "new" },
  { id: 3, name: "Returning", value: "returning" },
  { id: 4, name: 'Abandoned Checkouts', value: 'abandoned' }
];

const Customer = () => {
  useTitle("Customers");
  const [active, setActive] = useState("all");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(true);
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [selectedCustomerStatus, setSelectedCustomerStatus] = useState({
    name: "Select",
    value: null,
    id: 0,
  });

  function customerStatusHandler(id) {
    const selected = customerStatuses.find((item) => item.id === id);
    setSelectedCustomerStatus(selected);
    setActive(selected?.value)
    fetchData({ status: selected?.value });
  }

  const navigate = useNavigate();
  const tableButtonHandler = (value) => {
    setActive(value);
    setSelectedCustomerStatus(null)
  };
  useEffect(() => {
    fetchData();
  }, [active]);
  useEffect(() => {
    setTableData({ ...tableData, nextPage: nextPage, prevPage: prevPage })
  }, [nextPage, prevPage])
  const fetchData = async (page = 1, search = '') => {
    setLoading(true)
    const response = await terminal.request({ name: "getCustomerOrder", queries: { page: page, status: active }, }).then((res) => res);
    if (response?.totalPages == 1) {
      setNextPage(null);
      setPrevPage(null);
    } else {
      setNextPage((Number(response?.page) + 1) > response?.totalPages ? null : Number(response?.page) + 1);
      setPrevPage(Number(response?.page) - 1 <= 0 ? null : Number(response?.page) - 1);
    }
    response.status === false ? "" : setTableData({ ...response, nextPage: nextPage, prevPage: prevPage }), setLoading(false);
  };

  function handleSorting() {
    setSortBy(!sortBy);
    fetchData({ sortBy: `date|${sortBy === false ? "desc" : "asc"}` });
  }

  function handleSearch(e) {
    // if (e.key === "Enter") {
    //   fetchData({ search: e.target.value });
    //   e.target.value = "";
    // }
    if(e.target.value !== ""){
      fetchData({ search: e.target.value });
    }
  }

  const handleCustomerExport = async () => {

    // credentials: 'include',
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/export-customer?format=xlsx`, {
      method: 'GET',
      credentials: 'include'
    })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'customer-list.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(blob);


  }

  return (
    <div className="h-full px-5 ">
      <Heading title="Customers">
        <div className="space-x-2">
          <Button style="secondary" onClick={handleCustomerExport}>
            Export
          </Button>
          <Button style="primary" onClick={() => navigate("new-customer")}>
            Add Customer
          </Button>
        </div>
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
                  onClick={() => tableButtonHandler("new")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "new" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                    }`}
                >
                  New
                </button>
                <button
                  onClick={() => tableButtonHandler("returning")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "returning"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Returning
                </button>
                <button
                  onClick={() => tableButtonHandler("abandoned")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "abandoned"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Abandoned Checkouts
                </button>
              </div>
              <div className="py-2 flex gap-1">
                <Input
                  type="text"
                  keyenter={handleSearch}
                  placeholder="Search"
                  styles="secondary"
                >
                  <img src={search} alt="" />
                </Input>
                <div className="flex ">
                  <CustomSelect
                    value={selectedCustomerStatus?.name}
                    options={customerStatuses}
                    onChange={customerStatusHandler}
                    bg="bg-white"
                    appearance="filter"
                  />
                </div>
                <button
                  className="border border-[#0000001f] p-2"
                  onClick={handleSorting}
                >
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>

            <Table type="customer" data={tableData} paginate={fetchData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
