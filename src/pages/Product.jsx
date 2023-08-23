import { useLoaderData } from "react-router-dom";
import PriceCard from "../Components/PriceCard/PriceCard";
import Showcase from "../Components/Showcase/Showcase";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import GalleryCard from "../Components/UiElements/GalleryCard/GalleryCard";
import { useEffect, useState } from "react";
import { terminal } from "../contexts/terminal/Terminal";

 import Slider from "../Components/UiElements/Slider/Slider";

const Product = () => {
  const product = useLoaderData();
  
  const [relatedProduct, setrelatedProduct] = useState([]);
  useEffect(()=> {
    terminal.request({ name: 'allProduct', query: { category: product?.category?.id, subcategory: product?.subcategory}})
    .then(res=> {
      setrelatedProduct(res.docs.filter(item=> item.id!==product.id))
     
    })
  },[product]);
 console.log(relatedProduct);
  const requsetItemHandler = () => {

  }
 
  return (
    <>
      <main>
        <Breadcrumb title={product?.name} />
        <div className="container mx-auto my-12">
          <div className="grid grid-cols-5 px-2 sm:px-0 gap-8">
            <div className="col-span-5 sm:col-span-3">
              <GalleryCard data={product?.images} />
            </div>
            <div className="col-span-5 sm:col-span-2">
              <PriceCard
                type={"product"}
                price={product?.price + product?.tax + product?.fee}
                source={new URL(product?.link).hostname.replace(/^www\./, '') }
                origin={product?.origin}
                arrival={
                  '1 - 2 weeks'
                }
                onSubmit={requsetItemHandler}
              />
            </div>
          </div>
          <div className="px-[20px] sm:px-0 my-12">
            <h3 className="text-secondary text-[20px] sm:text-[28px] font-semibold mb-4">
              {product?.data?.name}
            </h3>
            <p className=" text-[#475569] max-w-[800px]">
              {product?.data?.desc}
            </p>
          </div>
          <div className=" my-10 sm:my-36 text-center mx-auto px-[20px] sm:px-0">
            <Showcase
              type="slide"
              title="Related Items"
              description="Get inspired by what people in your city are buying from abroad with the biggest savings"
              data={relatedProduct}
            />
            {/* <Slider items={relatedProduct} /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
