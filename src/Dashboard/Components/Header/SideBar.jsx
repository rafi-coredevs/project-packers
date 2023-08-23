import Dashboard from "../../../assets/icons/cd-dashboard.svg";
import orders from "../../../assets/icons/cd-order.svg";
import products from "../../../assets/icons/cd-products.svg";
import customer from "../../../assets/icons/cd-user-list.svg";
import chat from "../../../assets/icons/cd-chat.svg";
import user from "../../../assets/icons/user-1.svg";
import NavItem from "../UiElements/NavItem/NavItem";
const SideBar = () => {
  return (
    <div className="bg-[#F8FAFC] h-full pt-8 pe-2 flex flex-col gap-2">
      <NavItem type="navlink" title="Dashboard" icon={Dashboard} url="/admin" end />
      <NavItem type="collapse" title="Orders" icon={orders}>
        <NavItem type="navlink" title="Item Request" url="request" />
        <NavItem type="navlink" title="All Orders" url="orders" />
      </NavItem>
      <NavItem type="collapse" title="Products" icon={products}>
        <NavItem type="navlink" title="All Products" url="products" />
        <NavItem type="navlink" title="Discount" url="discount" />
        <NavItem type="navlink" title="Category" url="category" />
      </NavItem>
      <NavItem
        type="navlink"
        title="Customers"
        icon={customer}
        url="customers"
      />
      <NavItem type="navlink" title="Support" icon={chat} url="chat" />
      <NavItem type="navlink" title="Staff" icon={user} url="staff" />
    </div>
  );
};

export default SideBar;
