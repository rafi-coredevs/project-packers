/**
 * @params {
 * type => cost | request | order | complete | cancel
 * data => value
 * }
 * @returns jsx component
 *
 *
 */
const Card = ({ type, data }) => {
  const values = {
    cost: {
      title: "Total Cost",
      footer: "New cost",
    },
    request: {
      title: "Total Request",
      footer: "New request",
      color: "bg-[#A2EEE7]",
    },
    order: {
      title: "Total Order",
      footer: "New order",
      color: "bg-[#F2C852]",
    },
    complete: {
      title: "Completed",
      footer: "Completed order",
      color: "bg-[#16A34A]",
    },
    cancel: {
      title: "Cancelled",
      footer: "Cancelled order",
      color: "bg-[#EF4444]",
    },
  };
  return (
    <div className="py-5 bg-white">
      <p className="text-sm text-[#475569] font-medium">{values[type].title}</p>
      {type === "cost" ? (
        <h2 className="text-secondary text-xl font-semibold">
          ৳ {(+data / 1000).toFixed(2)}k
        </h2>
      ) : (
        <div className="flex gap-2 items-center">
          {" "}
          <h2 className="text-secondary text-xl font-semibold">{data}</h2>{" "}
          <div
            className={`h-2 w-2 rounded-full ${values[type].color}`}
          ></div>
        </div>
      )}

      <p className="text-xs text-[#475569] font-medium">
        {values[type].footer} last 30 days
      </p>
    </div>
  );
};

export default Card;
