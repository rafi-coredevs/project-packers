import { useEffect, useState } from "react";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import { LazyProductCard, ProductCard } from "../Components/UiElements/ProductCard/ProductCard";
import Category from "../Components/UiElements/Category/Category";
import Paginate from "../Components/UiElements/Paginate/Paginate";
import { terminal } from "../contexts/terminal/Terminal";
import { useTitle } from "../Components/Hooks/useTitle";

const Shop = () => {
  useTitle("Trending Items");
  const [data, setData] = useState({});
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(null);


  useEffect(() => {
    fetchdata();
  }, [query]);

  useEffect(() => {

    terminal.request({ name: 'allCategory' })
      .then(res => {
        setCategories(res)
      })
  }, []);

  const fetchdata = (page = 1) => {
    terminal.request({ name: 'allProduct', queries: { page: page, limit: 9, ...query } })
      .then(res => {
        setData(res);
        setLoading(false);

      })

  }
  const handlePagination = (page) => {
    if (page !== data.page) {
      fetchdata(page);
    }
  };

  const refatch = (data) => {
    setQuery(data);


  }

  return (
    <>
      <Breadcrumb />
      <div className="container py-12 mx-auto">
        <div className="grid py-[1px] gap-5 grid-cols-12 px-2 sm:px-0">
          <div className="col-span-12 sm:col-span-3 pr-3">
            <h3 className="font-semibold text-[28px] text-secondary mb-7">
              Trending Items
            </h3>
            <Category data={categories} refatch={refatch} />
          </div>
          <div className="col-span-12 sm:col-span-9 flex">
            <div className="w-full h-full">
              {loading ? (
                <div className="flex justify-center">
                  <div className="grid grid-rows-2  grid-cols-1 sm:grid-cols-3  mb-12">
                    {
                      [...Array(12)].map((array, i) => <LazyProductCard key={i} />)
                    }
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="grid grid-rows-2  grid-cols-1 sm:grid-cols-3  mb-12">
                    {data?.docs?.map((item) => {
                      return (
                        <ProductCard
                          key={item?.id}
                          id={item?.id}
                          title={item?.name}
                          img={item?.images[0]}
                          price={item?.price + item?.tax + item?.fee}
                          isShop={true}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="w-full flex justify-center">
                <Paginate
                  // totalPage={data?.totalPages}
                  // onPageChange={handlePagination}
                  totalPage={20 }
                  onPageChange={(v)=> console.log(v)}
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
