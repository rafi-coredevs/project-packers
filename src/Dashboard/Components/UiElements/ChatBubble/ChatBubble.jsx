/**
 * 
 * @params {} args.type - defines style for chat bubble depending on whether a chat is from customer-end or staff-end  
 * @params {string} args.name - name of person involved in a particular chat room
 * @params {string} args.date - the time a particular message been published by it's sender 
 * @params  {string} args.message - message itself
 * 
 * @returns Chat card JSX element
 */

import UserIcon from "../../../../Components/UiElements/UserIcon/UserIcon";
import escape from "../../../../Util/escapeHtml";


const ChatBubble = ({ sender, name, date, message, userId,images }) => {
    return (
        <div className={`flex gap-3 h-fit min-w-[350px] max-w-[50%] ${sender === userId ? "ml-auto flex-row-reverse" : ""}`}>
            <span className="h-10 w-10 flex items-center justify-center shrink-0 rounded-full font-bold text-amber-800 bg-pink-400"><UserIcon name={name} /></span>
            <div className={`p-2 ${sender === userId ? 'bg-[#CFF6EF]' : 'bg-secondary'} w-full grid gap-2  rounded-md `}>
                <div className="flex justify-between w-full">
                    <p className="text-[#3E949A] font-medium text-sm">{name}</p>
                    <p className="text-[#64748B] text-[10px] font-semibold">{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }).format(new Date(date))}</p>
                </div>
                <div className="">
                    <div className={`${sender === userId ? "text-[#000316CC]" : "text-[#a7a7a7]"} break-all`}>
                        <span className="">
                            {/* {message} */}
                            {escape(message)}
                        </span>
                    </div>
                    {images && 
                    images.map((image, index) => {
                        return <a key={index} target="_blank" href={import.meta.env.VITE_SERVER_URL + "/" + image}>
                          <img className="py-[2px] w-full" src={import.meta.env.VITE_SERVER_URL + "/" + image} alt="" />
                        </a>
                      })
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;