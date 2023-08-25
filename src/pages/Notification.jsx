import { useTitle } from "../Components/Hooks/useTitle";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Icon from "../Components/UiElements/Icon/Icon";
import cart from "../assets/icons/cd-order.svg";
const DUMMY_NOTIFICATION = [
  {
    id: 1,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 2,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 3,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
  {
    id: 4,
    title: "We've reviewed item #3163652",
    description: "(Fitbit Versa...). You can now take it to checkout!",
    time: "9 minutes ago",
  },
];
/**
 * 
 * @returns JSX for user notifican list view
 */
const Notification = () => {
  useTitle("My Notifications");
  const clickHandler = (v) => {
    console.log(v);
  };
  return (
    <main>
      <Breadcrumb />
      <div className="container mx-auto py-12 px-5 sm:px-0">
        <div className="max-w-[800px] mx-auto">
          <h3 className="text-2xl font-semibold text-secondary mt-[20px] mb-[12px]">
            Notification
          </h3>
          {DUMMY_NOTIFICATION?.map((item) => {
            return (
              <div
                onClick={() => clickHandler(item.id)}
                key={item.id}
                className="cursor-pointer flex gap-3 py-2 border-t border-[#0000001A]"
              >
                <div className="h-12 w-12">
                  <Icon icon={cart} />
                </div>

                <div className="">
                  <p className="font-sans font-medium text-sm overflow-hidden">
                    {item.title}
                  </p>
                  <p className="font-sans font-medium text-sm overflow-hidden">
                    {item.description}
                  </p>
                  <p className="font-sans font-normal text-xs text-[#00000066] overflow-hidden">
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Notification;
