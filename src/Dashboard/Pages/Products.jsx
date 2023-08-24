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

const Products = () => {
  useTitle("Products");
  const [active, setActive] = useState("all");
  const [tableData, setTabledata] = useState([]);
  useEffect(() => {
    getApi("/product?limit=10&paginate=true&page=1").then((res) => {
      if (res.status === 200) {
        setTabledata(res.data);
      }
    });
  }, []);

  const reFatch = (page) => {
    getApi(`/product?limit=10&paginate=true&page=${page}`).then((res) => {
      if (res.status === 200) {
        setTabledata(res.data);
      }
    });
  };

  const navigate = useNavigate();
  const tableButtonHandler = (value) => {
    setActive(value);
    console.log(value);
  };

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
                  onClick={() => tableButtonHandler("all")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "all" ? "bg-[#CFF6EF] rounded" : "bg-transparent"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => tableButtonHandler("active")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "active"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => tableButtonHandler("draft")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "draft"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Draft
                </button>
                <button
                  onClick={() => tableButtonHandler("archived")}
                  className={`py-2 px-3 text-[#475569] text-xs font-semibold ${
                    active === "archived"
                      ? "bg-[#CFF6EF] rounded"
                      : "bg-transparent"
                  }`}
                >
                  Archived
                </button>
              </div>
              <div className="py-2 flex gap-1">
                <Input type="text" placeholder="Search" styles="secondary">
                  <img src={search} alt="" />
                </Input>
                <button className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={filter} alt="" />
                </button>
                <button className="border border-[#0000001f] p-2  ">
                  <img className="opacity-70" src={sort} alt="" />
                </button>
              </div>
            </div>

            <Table type="products" data={tableData} reFatch={reFatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
