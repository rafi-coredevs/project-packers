import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recovery from "../pages/Recovery";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import { getApi } from "../Util/apiCall";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import About from "../pages/About";
import FaqPage from "../pages/FaqPage";
import Orders from "../pages/Orders";
import Notification from "../pages/Notification";
import Support from "../pages/Support";
// Dashboard
import DashboardLayout from "../Dashboard/Layouts/DashboardLayout";
import DashboardHome from "../Dashboard/Pages/DashboardHome";
import Secure from "../Dashboard/Components/Secure/Secure";
import AllOrders from "../Dashboard/Pages/AllOrders";
import RequestItems from "../Dashboard/Pages/RequestItems";
import RequestDetails from "../Dashboard/Pages/RequestDetails";
import OrderDetails from "../Dashboard/Pages/OrderDetails";
import Products from "../Dashboard/Pages/Products";
import Chat from "../Dashboard/Pages/Chat";
import NewProduct from "../Dashboard/Pages/NewProduct";
import Customer from "../Dashboard/Pages/Customer";
import NewCustomer from "../Dashboard/Pages/NewCustomer";
import CustomerDetails from "../Dashboard/Pages/CustomerDetails";
import Staff from "../Dashboard/Pages/Staff";
import Discount from "../Dashboard/Pages/Discount";
import NewDiscount from "../Dashboard/Pages/NewDiscount";
import Category from "../Dashboard/Pages/Category";
import Payment from "../Dashboard/Pages/Payment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset",
        element: <Recovery />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/shop",
        element: <Shop />,
        // loader: async () =>{
        //   return await
        // }
      },
      {
        path: "/success",
        element: <Shop />,
        loader: async () =>{
          return getApi('/user/social').then(res => res);
        }
      },
      {
        path: "shop/:productId",
        element: <Product />,
        loader: async ({ params }) => {
          return  getApi(`/product/${params.productId}`).then(res => res);
        },
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:postId",
        element: <BlogPost />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "account/orders",
        element: <Orders />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <Secure>
            <DashboardHome />
          </Secure>
        ),
      },
      {
        path: "orders",
        element: (
          <Secure>
            <AllOrders />
          </Secure>
        ),
      },
      {
        path: "orders/:orderId",
        element: (
          <Secure>
            <OrderDetails />
          </Secure>
        ),
      },
      {
        path: "request",
        element: (
          <Secure>
            <RequestItems />
          </Secure>
        ),
      },
      {
        path: "request/:requestId",
        element: (
          <Secure>
            <RequestDetails />
          </Secure>
        ),
      },
      {
        path: "products",
        element: (
          <Secure>
            <Products />
          </Secure>
        ),
        
      },
      {
        path: "products/new-product",
        element: (
          <Secure>
            <NewProduct />
          </Secure>
        ),
      },
      {
        path: "products/:productId",
        element: (
          <Secure>
            <NewProduct />
          </Secure>
        ),
      },
      {
        path: "discount",
        element: (
          <Secure>
            <Discount />
          </Secure>
        ),
      },
      {
        path: "discount/new-discount",
        element: (
          <Secure>
            <NewDiscount />
          </Secure>
        ),
      },
      {
        path: "category",
        element: (
          <Secure>
            <Category />
          </Secure>
        ),
      },
      {
        path: "chat",
        element: (
          <Secure>
            <Chat />
          </Secure>
        ),
      },
      {
        path: "customers",
        element: (
          <Secure>
            <Customer />
          </Secure>
        ),
      },
      {
        path: "customers/new-customer",
        element: (
          <Secure>
            <NewCustomer />
          </Secure>
        ),
      },
      {
        path: "customers/:customerId",
        element: (
          <Secure>
            <CustomerDetails />
          </Secure>
        ),
      },
      {
        path: "staff",
        element: (
          <Secure>
            <Staff />
          </Secure>
        ),
      },
      {
        path: "payment",
        element: (
          <Secure>
            <Payment />
          </Secure>
        ),
      },
    ],
  },
]);
