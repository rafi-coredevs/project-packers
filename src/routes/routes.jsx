import { createBrowserRouter, redirect } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recovery from "../pages/Recovery";
import Signup from "../pages/Signup";
import Test from "../pages/Test";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
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
import ProtectedRoute from "./ProtectedRoute";
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
import { terminal } from "../contexts/terminal/Terminal";
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
        element: <ProtectedRoute accessTo="login"><Login /></ProtectedRoute>,
      },
      {
        path: "/reset",
        element: <ProtectedRoute accessTo="general"><Recovery /></ProtectedRoute>,
      },
      {
        path: "/signup",
        element: <ProtectedRoute accessTo="signup"><Signup /></ProtectedRoute>,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "shop/:productId",
        element: <Product />,
        loader: async ({ params }) => await terminal.request({ name: 'singleProduct', params: { id: params.productId } }),
      },
      {
        path: "/cart",
        element: <ProtectedRoute accessTo="general"><Cart /></ProtectedRoute>,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute accessTo="general"><Checkout /></ProtectedRoute>,
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
        path: "/account",
        loader:  () => redirect('/account/orders')
      },
      {
        path: "account/orders",
        element: <ProtectedRoute accessTo={"general"}><Orders /></ProtectedRoute>,
      },
      {
        path: "/notification",
        element: <ProtectedRoute accessTo={"general"}><Notification /></ProtectedRoute>,
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
          <ProtectedRoute accessTo={"dashboard"}>
            <DashboardHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute accessTo={"order"}>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoute accessTo={"order"}>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "request",
        element: (
          <ProtectedRoute accessTo={"request"}>
            <RequestItems />
          </ProtectedRoute>
        ),
      },
      {
        path: "request/:requestId",
        element: (
          <ProtectedRoute accessTo={"request"}>
            <RequestDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute accessTo={"product"}>
            <Products />
          </ProtectedRoute>
        ),

      },
      {
        path: "products/new-product",
        element: (
          <ProtectedRoute accessTo={"product"}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:productId",
        element: (
          <ProtectedRoute accessTo={"product"}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "discount",
        element: (
          <ProtectedRoute accessTo={"discount"}>
            <Discount />
          </ProtectedRoute>
        ),
      },
      {
        path: "discount/new-discount",
        element: (
          <ProtectedRoute accessTo={"discount"}>
            <NewDiscount />
          </ProtectedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <ProtectedRoute accessTo={"category"}>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "support",
        element: (
          <ProtectedRoute accessTo={"support"}>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "customers",
        element: (
          <ProtectedRoute accessTo={"customer"}>
            <Customer />
          </ProtectedRoute>
        ),
      },
      {
        path: "customers/new-customer",
        element: (
          <ProtectedRoute accessTo={"customer"}>
            <NewCustomer />
          </ProtectedRoute>
        ),
      },
      {
        path: "customers/:customerId",
        element: (
          <ProtectedRoute accessTo={"customer"}>
            <CustomerDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "staff",
        element: (
          <ProtectedRoute accessTo={"staff"}>
            <Staff />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute accessTo={"payment"}>
            <Payment />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
