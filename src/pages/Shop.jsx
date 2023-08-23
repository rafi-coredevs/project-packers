import { useEffect, useLayoutEffect, useState } from "react";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import ProductCard from "../Components/UiElements/ProductCard/ProductCard";
import Category from "../Components/UiElements/Category/Category";
import Paginate from "../Components/UiElements/Paginate/Paginate";
import { getApi } from "../Util/apiCall";
import loader from "../assets/loader.svg";
const Shop = () => {
  const [data, setData] = useState([]);
  const [categories,setCategories]= useState(null)
  const [loading, setLoading] = useState(false);
  
  useLayoutEffect(() => {
    fetchData();
   
  }, []);


  useEffect(()=>{
    getApi(`/category?paginate`)
    .then(res=> {
      console.log(res);
      if(res.status===200){
        setCategories(res.data)
      }
    })


  },[])

  const fetchData = (page=1)=>{
    setLoading(true)
    getApi(`/product?page=${page}&limit=9&paginate=true`).then((res) => {
      if (res.status === 200) {
        setData(res?.data);
        setLoading(false)
        
      } else {
        console.log(res?.response?.data);
      }
    });
  }
  const handlePagination = (e) => {
    fetchData(e)
  };
  return (
    <>
      <Breadcrumb />
      <div className="container py-12 mx-auto">
        <div className="grid py-[1px] gap-5 grid-cols-12 px-2 sm:px-0">
          <div className="col-span-12 sm:col-span-3 pr-3">
            <h3 className="font-semibold text-[28px] text-secondary mb-7">
              Trending Items
            </h3>
            <Category data={categories} />
          </div>
          <div className="col-span-12 sm:col-span-9 flex">
            <div className="w-full h-full">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <img className="h-28 w-auto" src={loader} alt="" />
                </div>
              ) : (
              <div className="flex justify-center">
                <div className="grid gap-[3px] grid-rows-2  grid-cols-2 sm:grid-cols-3  mb-12">
                  {data?.docs?.map((item) => {
                    return (
                      <ProductCard
                        key={item?._id}
                        id={item?._id}
                        title={item?.name}
                        url={item?.thumbnails[0]}
                        price={item?.price}
                      />
                    );
                  })}
                </div>
              </div>
              )}
              <div className="w-full flex justify-center">
                <Paginate
                  totalPage={data?.totalPages}
                  onPageChange={handlePagination}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
