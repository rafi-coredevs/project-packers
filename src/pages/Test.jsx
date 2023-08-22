import PriceCard from "../Components/PriceCard/PriceCard";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";

// const data = [
//     {
//         id: 1,
//         title: "Iphone 14 max pro",
//         price: 1099
// },{
//     id: 1,
//         title: "Iphone 14 max pro",
//         price: 1099
// }]
const Test = () => {
    return (
   <div className="container mx-auto ">
   {/* <PriceCard type="product" origin="United States of America" source='apple.com' price={450} arrival="1 - 2 Weeks" />
   <PriceCard type="cart" sellerTakes={22590} />
   <PriceCard type="checkout" products={data} /> */}
   <Breadcrumb />
   </div>
    );
};

export default Test;