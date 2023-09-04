import { useEffect, useState } from "react";
import { useTitle } from "../Components/Hooks/useTitle";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import acc from "../assets/icons/Avatar.svg";
import prod from "../assets/icons/cd-products.svg";
import { useUserCtx } from "../contexts/user/UserContext";
import { terminal } from "../contexts/terminal/Terminal";
import formatTimeAgo from "../Util/formatTimeAgo";
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
  const [notifications, setNotifications] = useState([]);
  const { user } = useUserCtx();
  const currentDate = new Date();
  const sevenDaysAgoTimestamp = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  const sevenDaysAgoDate = new Date(sevenDaysAgoTimestamp);
  const sevenDaysAgoISO = sevenDaysAgoDate.toISOString();

  useEffect(() => {
    user?.id &&
      terminal
        .request({
          name: "getNotification",
          queries: { limit: 100, time: { $gte: sevenDaysAgoISO } },
        })
        .then((data) => data.docs && setNotifications(data.docs));
  }, [user]);
  return (
    <main>
      <Breadcrumb />
      <div className="container mx-auto py-12 px-5 sm:px-0">
        <div className="max-w-[800px] mx-auto">
          <h3 className="text-2xl font-semibold text-secondary mt-[20px] mb-[12px]">
            Notification
          </h3>
          {notifications?.length > 0 &&
            notifications?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="cursor-pointer flex gap-3 py-2 border-t border-[#0000001A]"
                >
                  <div className="h-12 w-12">
                    {item.type === "account" ? (
                      <img src={acc} />
                    ) : (
                      <img className="bg-[#CFF6EF] p-1 rounded-md" src={prod} />
                    )}
                  </div>

                  <div className="">
                    <p className="font-sans font-medium text-sm overflow-hidden">
                      {item.message}
                    </p>
                    <p className="font-sans font-normal text-xs text-[#00000066] overflow-hidden">
                      {formatTimeAgo(item.time)}
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
