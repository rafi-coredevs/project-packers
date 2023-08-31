import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Components/UiElements/Heading/Heading";
import Button from "../Components/UiElements/Button/Button";
import Input from "../Components/UiElements/Input/Input";
import Table from "../Components/UiElements/Table/Table";
import filter from "../../assets/icons/cd-filter.svg";
import sort from "../../assets/icons/cd-arrow-data-transfer-vertical-round.svg";
import search from "../../assets/icons/cd-search2.svg";
import { getApi } from "../../Util/apiCall";
import { useTitle } from "../../Components/Hooks/useTitle";
import { terminal } from "../../contexts/terminal/Terminal";
import CustomSelect from "../../Components/UiElements/Input/CustomSelect";

const productStatuses = [{ id: 1, name: "All", value: "all" }, { id: 2, name: "Paid", value: "paid" }, { id: 3, name: "Pending", value: "pending" }]


const Products = () => {
  useTitle("Products");
  const [active, setActive] = useState("all");
  const [tableData, setTabledata] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt:asc');
  const [loading, setLoading] = useState(true);
  const [selectedProductStatus, setSelectedProductStatus] = useState({ name: 'Select', value: null, id: 0 });

  function productStatusHandler(id) {
    setSelectedProductStatus(productStatuses.find(item => item.id === id))
  }
  useEffect(() => {
    fetchData();

  }, [sortBy, active]);

  const fetchData = (page = 1) => {
    setLoading(true);
    terminal.request({ name: 'allProduct', queries: { page, sortBy, status: active } }).then((res) => {
      res.status === false ? '' : setTabledata(res), setLoading(false);
    });
  };

  const navigate = useNavigate();

  return (
    <div className="h-full px-5 ">
      <Heading title="Products">
        <Button style="primary" onClick={() => navigate("new-product")}>
          Add New Product
        </Button>
      </Heading>
      <div className="grid grid-cols-3 gap-5 py-5">
        <div className="col-span-3 sm:col-span-3">
          <div className="w-full bg-white p-5 border border-[#0000001f] rounded-md">
            <div className="flex justify-between">
              <div className="py-2 my-auto">
                <button
                  onClick={() => setActive("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActive("active")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "active"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActive("draft")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "draft"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Draft
                </button>
                <button
                  onClick={() => setActive("archived")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${active === "archived"
                    ? "bg-[#CFF6EF] rounded"
                    : "bg-transparent"
                    }`}
                >
                  Archived
                </button>
              </div>
              <div className="py-2 flex gap-1 ">
                <Input type="text" placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>
                <div className="flex ">
                  <CustomSelect value={selectedProductStatus.name} options={productStatuses} onChange={productStatusHandler} bg="bg-white" appearance="filter" />
                </div>
                <button onClick={() => setSortBy(sortBy === 'createdAt:desc' ? 'createdAt:asc' : 'createdAt:desc')} className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>

            <Table type="products" data={tableData} paginate={fetchData} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
