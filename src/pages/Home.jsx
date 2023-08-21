import Banner from "../Components/Banner/Banner";
import Brands from "../Components/Brands/Brands";
import Showcase from "../Components/Showcase/Showcase";
import About from "../Components/About/About";
import Carousel from "../Components/UiElements/Carousel/Carousel";
import Faq from "../Components/Faq/Faq";
import { carousel, brand } from "../Store/Data";
import { useEffect, useState } from "react";
import { getApi } from "../Util/apiCall";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getApi("/product?limit=8&paginate=true").then((res) => {
      if (res.status === 200) {
        setProducts(res?.data?.docs);
      } else {
        console.log(res?.response?.data);
      }
    });
  }, []);
  return (
    <>
      <Banner />
      <div className="-mt-[13rem]">
        <Carousel data={carousel} />
      </div>
      <Brands data={brand} />
      <Showcase
        type="trend"
        title="Trending products on  Project Packers"
        description="Get inspired by what people in your city are buying from abroad with the biggest savings"
        data={products}
      />
      <About />
      <Faq />
    </>
  );
};

export default Home;
