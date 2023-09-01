/**
 *
 * @param {object} args.data - table field data
 * @param {number} args.paginate - Number of table
 * @param {boolean} args.loading - loading state
 * @param {string} args.dashboardToogle - types of table. heads will render depends on this
 * @param {boolean} args.modalHandler - modal hide show 
 * @param {function} args.getData - Callback function to return selected items to the parent
 * @returns table JSX Element.
 */

import Badge from '../../../../Components/UiElements/Badge/Badge';
import arrowRight from '../../../../assets/icons/cd-arrow-right-2.svg';
import edit from '../../../../assets/icons/cd-edit.svg';
import dlt from '../../../../assets/icons/cd-delete.svg';
import arrowLeft from '../../../../assets/icons/cd-arrow-left-1.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const head = {
  orders: [
    'Order ID',
    'Product Name',
    'Date',
    'Customer',
    'Status',
    'Items',
    'Total',
    'Action',
  ],
  request: ['ID', 'Product Name', 'Link', 'Date', 'Customer', 'Status'],
  products: ['', 'Product', 'Inventory', 'Price', 'Category', 'Publish Date'],
  customers: [
    'Customer Name',
    'Phone Number',
    'Location',
    'Orders',
    'Amount spent',
  ],
  customerDetails: ['Products', 'Status', 'Price'],
  discount: [
    'Code',
    'Coupon type',
    'Coupon Amount',
    'Description',
    'Usage/Limit',
    'Expiry Date',
  ],
  category: ['Name', 'Slug'],
  payment: [
    'payment ID',
    'Customer Name',
    'Payment Date',
    'Amount',
    'Payment Status',
  ],
};

const Table = ({ data, paginate, loading, dashboardToogle, modalHandler, getData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = pathname.split('/')[pathname.split('/').length - 1];
  const tableHeadData = head[dashboardToogle || location];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.docs?.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const [selectedItem, setSelectItem] = useState([]);

useEffect(()=>{
  getData &&  getData(selectedItem)
},[selectedItem])

  const checkboxHandler = (status) => {
    const ele = document.getElementsByName('check');
    if (status.target.checked) {
      setSelectItem([]);
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = true;
          setSelectItem(prev => [...prev, ele[i].id])
     
      }
    } else {
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = false;
      }
      setSelectItem([]);
    }

  }
  const changeHandler = (event) =>{
    if(event.target.checked){
      setSelectItem(prev => [...prev, event.target.id]);
    }else{
      const updateItem = selectedItem.filter((item)=> item != event.target.id );
      setSelectItem(updateItem);
    }

  }

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='bg-[#F8FAFC] border-y border-[#0000001c]'>
            <th className='text-left py-[10px] pl-4 w-[10px]'>
              <input type='checkbox' onChange={checkboxHandler} className='accent-yellow-300' />
            </th>
            {tableHeadData?.map((item, index) => (
              <th
                key={index}
                className='text-sm text-[#475569] font-medium text-left py-[10px] px-4'
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            loading ? (
              [...Array(10)].map((arr, i) => <tr key={i}>
                <td className='py-8 border-b lazy-loading' />
                {
                  tableHeadData?.map((item, index) => (
                    <td
                      key={index}
                      className='py-8 border-b lazy-loading'
                    />))
                }
              </tr>)
            ) : (data?.docs == null || data?.docs?.length === 0) ? <tr><td className='w-full'>No data found</td></tr> : (
              <>
                {
                  //Products  Data Table
                  location === 'products' &&
                  data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input onChange={changeHandler} type='checkbox' name="check" id={item?.id} className='accent-yellow-300' />
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        <img
                          className='w-10 h-10 rounded border border-[#0000001c]'
                          src={`${import.meta.env.VITE_SERVER_URL}/${item?.images[0]}`}
                          alt=''
                        />
                      </td>
                      <td
                        onClick={() => navigate(`/admin/products/${item?.id}`)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2'
                      >
                        {item?.name}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.quantity} in Stock
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        ${item?.price}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.category?.name}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.createdAt && new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(item?.createdAt)) || 'Not available'}
                      </td>
                    </tr>
                  ))
                }
                {
                  //All Orders Data Table
                  (location === 'orders' || (location === 'admin' && dashboardToogle === 'orders')) &&
                  data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' name='check' className='accent-yellow-300' />
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        #{item?.id}
                      </td>
                      <td
                        onClick={() => navigate(`/admin/orders/${item?.id}`)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer'
                      >
                        {item?.products?.length > 0
                          ? item?.products[0]?.product?.name
                          : ''}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.date && new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(item?.date))}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item.user?.fullName || item.user.email}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        <Badge text={item?.status} styles='' />{' '}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.products?.length}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.total} Tk
                      </td>
                      <td className=''>
                        <div className='flex gap-2'>
                          <img
                            className='cursor-pointer opacity-70'
                            onClick={() => navigate(`/admin/orders/${item?.id}`)}
                            src={edit}
                            alt=''
                          />
                          <img
                            className='cursor-pointer opacity-70'
                            onClick={() => modalHandler(item?.id)}
                            src={dlt}
                            alt=''
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                }

                {
                  //Requested Item Data Table
                  (location === 'request' || dashboardToogle === 'request') &&
                  data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' name='check' className='accent-yellow-300' />
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        #{item?.id}
                      </td>
                      <td
                        onClick={() => navigate(`/admin/request/${item?.id}`)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer'
                      >
                        {item?.name}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {/* {new URL(
                          item?.products[0]?.product?.link,
                        ).hostname.replace('www.', '')} */}
                        {item?.link}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.createdAt && new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(item?.createdAt)) || 'Not available'}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.user?.fullName || item?.user?.email || ''}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        <Badge text={item?.status} styles='' />{' '}
                      </td>
                    </tr>
                  ))
                }
                {
                  //Category and Subcategory Data Table
                  location === 'category' &&
                  data?.docs?.slice(startIndex, endIndex).map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' name='check' className='accent-yellow-300' />
                      </td>

                      <td
                        onClick={() => selectHandler(item.id)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2'
                      >
                        {item.name}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item.slug}
                      </td>
                      
                    </tr>
                  ))
                }
                {location === 'customers' &&
                  data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                      onClick={() => navigate(`/admin/customers/${item._id}`)}
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' name='check' className='accent-yellow-300' />
                      </td>

                      <td
                        onClick={() => selectHandler(item.id)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2'
                      >
                        {item?.fullName}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.phone}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.shippingAddress?.city || 'No Data'}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.totalOrder} items
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm'>
                        ৳{item?.totalSpent}
                      </td>
                    </tr>
                  ))}

                  {dashboardToogle === 'customerDetails' && data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' className='accent-yellow-300' />
                      </td>
                      <td
                        onClick={() => selectHandler(item.id)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2'
                      >
                        {item?.products?.length > 0 ? item?.products[0]?.product?.name : item?.requests?.length > 0 ? item?.requests[0]?.request?.name : ''}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.status}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.total}
                      </td>
                    </tr>
                  ))}

                {location === 'discount' &&
                  data?.docs?.map((item, index) => (
                    <tr
                      key={index}
                      className='border-y border-[#0000001c] hover:bg-[#FEF9DC]'
                    >
                      <td className='text-left py-[10px] pl-4 w-[10px]'>
                        <input type='checkbox' name='check' className='accent-yellow-300' />
                      </td>

                      <td
                        onClick={() => selectHandler(item?.id)}
                        className='px-4 py-[18px] text-black text-sm cursor-pointer line-clamp-2'
                      >
                        {item?.code}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.amount ? 'Fixed' : 'Percentage'}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.amount ? '৳  ' + item?.amount : item?.percentage + '  %'}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.description || 'N/A'}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.limit}
                      </td>
                      <td className='px-4 py-[18px] text-black text-sm '>
                        {item?.expiry_date ? new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }).format(new Date(item?.expiry_date)) : 'Not Available'}
                      </td>
                    </tr>
                  ))}
              </>
            )}
        </tbody>
      </table>
      {
        //Pagination for  category and subcategory
        (location === 'category' && data?.docs?.length!==0) && (
          <div className='flex justify-between items-center py-6 px-4'>
            <p className='text-[#475569] text-sm'>
              
              Showing {currentPage===1? '1':((currentPage-1)*10)+1} -  {currentPage===1? data?.docs?.slice(startIndex, endIndex).length : ((currentPage-1)*10)+ data?.docs?.slice(startIndex, endIndex).length } of{' '}
              {data?.docs?.length} results
            </p>
            <div className='flex'>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className='border p-2'
              >
                <img src={arrowLeft} alt='' />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className='border p-2'
              >
                <img src={arrowRight} alt='' />
              </button>
            </div>
          </div>
        )
      }
      {(location !== 'category' && loading === false && data?.docs?.length!==0) && (
        <div className='flex justify-between items-center py-6 px-4'>
          <p className='text-[#475569] text-sm'>
            Showing {data?.page === 1 ? 1 : (((data?.page - 1) * 10)+1)} - {data?.page === 1 ? data?.docs?.length : ((data?.page - 1) * 10) + data?.docs?.length} of {data?.totalDocs} results
          </p>
          <div className='flex'>
            <button
              disabled={data?.prevPage === null}
              onClick={() => paginate(data?.prevPage)}
              className='border p-2'
            >
              <img src={arrowLeft} alt='' />
            </button>
            <button
              disabled={data?.nextPage === null}
              onClick={() => paginate(data?.nextPage)}
              className='border p-2'
            >
              <img src={arrowRight} alt='' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
