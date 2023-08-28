export const LazyChatCard = () => {
  return (
    <div className="relative">
      <div className={`border-l-2 absolute h-full left-0`}></div>
      <div className={`p-3 border-[#0000001c] border-b cursor-pointer hover:bg-[#3b3b3b10]`}>
        <div className="flex gap-2 items-center">
          <span className={`h-2 w-2 rounded-full ${styles[status]}`}></span>
          <p className="font-medium first-letter:uppercase bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></p>
        </div>
        <p className="font-medium bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></p>
        <p className="line-clamp-2 bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></p>
      </div>
    </div>
  );
};

/**
* @params status => open || close || pending
* @params type =>  account || payment || refund || order
* @params id => chat id
* @params message => message
*
* @returns Chat Card JSX Component
*/
const styles = {
  open: "bg-green-400",
  close: "bg-red-400",
  pending: "bg-yellow-400",
};
export const ChatCard = ({ onClick, active, status, type, id, message }) => {
  return (
    <div className="relative">
      <div className={`border-l-2 ${active === id ? 'border-primary' : 'border-white'}   absolute h-full left-0`}></div>
      <div
        onClick={() => onClick({ id, status, type })}
        className={`p-3 border-[#0000001c] border-b cursor-pointer hover:bg-[#3b3b3b10]`}
      >
        <div className="flex gap-2 items-center">
          <span className={`h-2 w-2 rounded-full ${styles[status]}`}></span>
          <p className="text-[#475569] font-medium first-letter:uppercase">
            {type || "No Data"}
          </p>
        </div>
        <p className="font-medium   ">Order Id #{id}</p>
        <p className="text-[#475569] line-clamp-2">{message}</p>
      </div>
    </div>
  );
};
