const Badge = ({ text = "completed" }) => {
  const data = {
    completed: {
      text: "Completed",
      bg: "bg-[#E4E5E7]",
      dot: "bg-[#808181]",
    },
    pending: {
      text: "Pending",
      bg: "bg-[#F7DA7C]",
      dot: "bg-[#f3c633]",
    },

    processing: {
      text: "Processing",
      bg: "bg-[#F7DA7C]",
      dot: "bg-[#f3c633]",
    },
    shipping: {
      text: "Shipping",
      bg: "bg-[#F7DA7C]",
      dot: "bg-[#f3c633]",
    },

    cancelled: {
      text: "Cancelled",
      bg: "bg-[#FECACA]",
      dot: "bg-[#e95555]",
    },
    paid: {
      text: "Paid",
      bg: "bg-[#86EFAC]",
      dot: "bg-[#4aca79]",
    },
    refunded: {
      text: "Refunded",
      bg: "bg-[#E4E5E7]",
      dot: "bg-[#808181]",
    },
    refundProcessing: {
      text: "Processing",
      bg: "bg-[#FECACA]",
      dot: "bg-[#e95555]",
    },
    refundCancelled: {
      text: "Cancelled",
      bg: "bg-[#FECACA]",
      dot: "bg-[#e95555]",
    },
    abandoned: {
      text: "Abandoned",
      bg: "bg-[#86EFAC]",
      dot: "bg-[#4aca79]",
    },
    estimate: {
      text: "Estimate Sent",
      bg: "bg-[#E4E5E7]",
      dot: "bg-[#808181]",
    },
    closed: {
      text: "Closed",
      bg: "bg-[#FECACA]",
      dot: "bg-[#e95555]",
    },
  };
  return (
    <div
      className={`flex items-center gap-2 ${data[text].bg} rounded-full py-2 px-4 w-fit`}
    >
      <span className={`w-3 h-3 rounded-full ${data[text].dot}`}></span>
      <p className="text-black">{data[text].text || "No Text"}</p>
    </div>
  );
};

export default Badge;
