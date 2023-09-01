import { useEffect, useState } from "react";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import { LazyProductCard, ProductCard } from "../Components/UiElements/ProductCard/ProductCard";
import Category from "../Components/UiElements/Category/Category";
import { terminal } from "../contexts/terminal/Terminal";
import { useTitle } from "../Components/Hooks/useTitle";
import Pagination from "../Components/UiElements/Paginate/Pagination";
import no_product from '../assets/no_product.jpg'

const Shop = () => {
  useTitle("Trending Items");
  const [data, setData] = useState({});
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);

  console.log('shop', data);

  useEffect(() => {
    fetchdata();
  }, [query]);

  useEffect(() => {

    terminal.request({ name: 'allCategory' })
      .then(res => {
        setCategories(res)
      })
  }, []);
  useEffect(() => {
    
    fetchdata(page)
  }, [page])
  const fetchdata = (page = 1) => {
    setLoading(true);
    terminal.request({ name: 'allProduct', queries: { page: page, limit: 9, ...query } })
      .then(res => {
        setData(res);
        setLoading(false);

      })

  }

  const refatch = (data) => {
    setQuery(data);
  }

  return (
    <>
      <Breadcrumb />
      <div className="container py-12 mx-auto">
        <div className="lg:flex gap-4">
          <div className="lg:w-1/4 mb-4">
            <h3 className="font-semibold text-[28px] text-secondary mb-7">
              Trending Items
            </h3>
            <Category data={categories} refatch={refatch} />
          </div>
          <div className="lg:w-3/4 flex">
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
                  {
                    data?.docs?.length === 0 ? <section className='min-h-[60vh] flex items-center justify-center'>
                      <img src={no_product} />
                    </section> :
                      <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-3  mb-12">
                        {
                          data?.docs?.map((item) => {
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
                          })
                        }
                      </div>
                  }
                </div>
              )}
              <div className={`w-full  justify-center ${data?.totalPages > 1 ? "flex" : "hidden"}`}>
                <Pagination pageLimit={data?.totalPages} page={page} setPage={setPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
