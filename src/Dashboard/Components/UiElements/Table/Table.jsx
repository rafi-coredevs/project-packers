/**
 * 
 * @prams {type} args.type - to determine where the table is to be used 
 * @params {array} args.data - the data table will hold
 * @params {function} args.reFatch - handle the request for next or previous page data
 * @params {} args.pageItem - number of item the table supposed to hold. plays role in pagination
 * @returns table JSX Element.
 */

import Badge from "../../../../Components/UiElements/Badge/Badge";
import arrowRight from "../../../../assets/icons/cd-arrow-right-2.svg";
import edit from "../../../../assets/icons/cd-edit.svg";
import dlt from "../../../../assets/icons/cd-delete.svg";
import arrowLeft from "../../../../assets/icons/cd-arrow-left-1.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../../../Util/apiCall";

const head = {
  orders: ["Order ID", "Product Name", "Date", "Customer", "Status", "Items", "Total", "Action"],
  request: ["ID", "Product Name", "Link", "Date", "Customer", "Status"],
  products: ["", "Product", "Inventory", "Price", "Category", "Publish Date"],
  customers: ["Customer Name", "Phone Number", "Location", "Orders", "Amount spent"],
  customerDetails: ["", "Products", "Status", "Price"],
  discount: ["Code", "Coupon type", "Coupon Amount", "Description", "Usage/Limit", "Expiry Date"],
  category: ["Name", "Slug", "Post"],
  payment: ["payment ID", "Customer Name", "Payment Date", "Amount", "Payment Status"],
};

const Table = ({data, paginate}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = pathname.split('/')[pathname.split('/').length - 1];
  const tableHeadData = head[location];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const selectHandler = (id)=> {

    console.log(id);

  }

  console.log(data);
  return (
    <div className="relative overflow-x-auto">
      <table className='w-full'>
        <thead>
          <tr className="bg-[#F8FAFC] border-y border-[#0000001c]">
            <th className="text-left py-[10px] pl-4 w-[10px]">
              <input type="checkbox" className="accent-yellow-300" />
            </th>
            {tableHeadData?.map((item, index) => (
              <th
                key={index}
                className="text-sm text-[#475569] font-medium text-left py-[10px] px-4"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            data?.length === 0 || data?.docs?.length===0
              ? "Loading"
              : <>
                { //Products  Data Table
                   location === 'products' &&  data?.docs?.map((item,index)=> <tr
                   key={index}
                   className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
                 >
                   <td className="text-left py-[10px] pl-4 w-[10px]">
                     <input type="checkbox" className="accent-yellow-300" />
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     <img
                       className="w-10 h-10 rounded border border-[#0000001c]"
                       src={BASE_URL + "/api/" + item?.images[0]}
                       alt=""
                     />
                   </td>
                   <td
                     onClick={() => navigate(`/admin/products/${item?.id}`)}
                     className="px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2"
                   >
                     {item?.name}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {item?.quantity} in Stock
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     ${item?.price}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {item?.category?.name}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item?.createdAt))|| "Not available"}
                   </td>
                 </tr>)
                }
                { //All Orders Data Table
                  (location === 'orders' || location === 'admin') && data?.docs?.map((item, index)=><tr
                  key={index}
                  className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
                >
                  <td className="text-left py-[10px] pl-4 w-[10px]">
                    <input type="checkbox" className="accent-yellow-300" />
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    #{item?.id}
                  </td>
                  <td
                   onClick={() => navigate(`/admin/orders/${item?.id}`)}
                    className="px-4 py-[18px] text-black text-sm cursor-pointer"
                  >
                    { item?.products?.length > 0 ? item?.products[0]?.product?.name : ''}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item?.date))}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.user?.fullName || item.user.email}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    <Badge text={item?.status} styles="" />{" "}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item?.products.length}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item?.total} Tk
                  </td>
                  <td className="">
                    <div className="flex gap-2">
                      <img
                        className="cursor-pointer opacity-70"
                        onClick={() => console.log("Edit row")}
                        src={edit}
                        alt=""
                      />
                      <img
                        className="cursor-pointer opacity-70"
                        onClick={() => console.log("Delete row")}
                        src={dlt}
                        alt=""
                      />
                    </div>
                  </td>
                </tr>)
                }

                { //Requested Items Data Table
                 location === 'request' && data?.docs?.map((item,index)=><tr
                 key={index}
                 className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
               >
                 <td className="text-left py-[10px] pl-4 w-[10px]">
                   <input type="checkbox" className="accent-yellow-300" />
                 </td>
                 <td className="px-4 py-[18px] text-black text-sm ">
                   #{item?.id}
                 </td>
                 <td
                   onClick={() => selectHandler(item?.id)}
                   className="px-4 py-[18px] text-black text-sm cursor-pointer"
                 >
                   {item?.products[0]?.product?.name}
                 </td>
                 <td className="px-4 py-[18px] text-black text-sm ">
                 {new URL(item?.products[0]?.product?.link).hostname.replace('www.', '') }
                 </td>
                 <td className="px-4 py-[18px] text-black text-sm ">
                 {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(item?.date))|| "Not available"}
                 </td>
                 <td className="px-4 py-[18px] text-black text-sm ">
                   {item?.user?.fullName || item?.user?.email || ''}
                 </td>
                 <td className="px-4 py-[18px] text-black text-sm ">
                   <Badge text={item?.status} styles="" />{" "}
                 </td>
               </tr>)

                }
                { //Category and Subcategory Data Table
                  location === 'category' && data?.slice(startIndex, endIndex).map((item, index)=><tr
                  key={index}
                  className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
                >
                  <td className="text-left py-[10px] pl-4 w-[10px]">
                    <input type="checkbox" className="accent-yellow-300" />
                  </td>
              
                  <td
                    onClick={() => selectHandler(item.id)}
                    className="px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2"
                  >
                    {item.name}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.slug}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.post}
                  </td>
                </tr>)
                }
                {
                   location === 'customers' && data?.docs?.map((item, index)=><tr
                   key={index}
                   className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
                 >
                   <td className="text-left py-[10px] pl-4 w-[10px]">
                     <input type="checkbox" className="accent-yellow-300" />
                   </td>
               
                   <td
                     onClick={() => selectHandler(item.id)}
                     className="px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2"
                   >
                     {item?.name}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {item?.phone}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {item?.location}
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm ">
                     {item?.orders} items
                   </td>
                   <td className="px-4 py-[18px] text-black text-sm">
                     ${item?.spent}
                   </td>
                 </tr>)
                }
                
                {
                  location === 'discount' && data?.docs?.map((item, index)=> <tr
                  key={index}
                  className="border-y border-[#0000001c] hover:bg-[#FEF9DC]"
                >
                  <td className="text-left py-[10px] pl-4 w-[10px]">
                    <input type="checkbox" className="accent-yellow-300" />
                  </td>
              
                  <td
                    onClick={() => selectHandler(item.id)}
                    className="px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2"
                  >
                    {item.code}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.type}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    ${item.amount}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.description}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.usage}
                  </td>
                  <td className="px-4 py-[18px] text-black text-sm ">
                    {item.expiry}
                  </td>
                </tr>)
                }




              </>
          }
        </tbody>
      </table>
      {
         //Pagination for  category and subcategory
        location==='category'&& <div className="flex justify-between items-center py-6 px-4">
        <p className="text-[#475569] text-sm">
          Showing {data?.slice(startIndex, endIndex).length} of {data?.length} results
        </p>
        <div className="flex">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border p-2"
          >
            <img src={arrowLeft} alt="" />
          </button>
          <button
          disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border p-2"
            
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
      
      }
      {
        location!=='category' && <div className="flex justify-between items-center py-6 px-4">
        <p className="text-[#475569] text-sm">
          Showing {data?.docs?.length} of {data?.totalDocs} results
        </p>
        <div className="flex">
          <button
          disabled={data?.prevPage===null}
            onClick={() => paginate(data?.prevPage)}
            className="border p-2"
          >
            <img src={arrowLeft} alt="" />
          </button>
          <button
          disabled={data?.nextPage===null}
            onClick={() => paginate(data?.nextPage)}
            className="border p-2"
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
      }
      
    </div>
  );
};

export default Table;
