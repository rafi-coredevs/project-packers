/**
 * 
 * @params {} args.type - defines style for chat bubble depending on whether a chat is from customer-end or staff-end  
 * @params {string} args.name - name of person involved in a particular chat room
 * @params {string} args.date - the time a particular message been published by it's sender 
 * @params  {string} message - message itself
 * 
 * @returns Chat card JSX element
 */

import UserIcon from "../../../../Components/UiElements/UserIcon/UserIcon";


const ChatBubble = ({ sender, name, date, message, userId }) => {
    function formatDate(inputDate) {
        const currentDate = new Date();
        const date = new Date(inputDate);
        const timeDifference = currentDate - date;
        const secondsDifference = Math.floor(timeDifference / 1000);

        if (secondsDifference < 60) {
            return "just now";
        } else if (secondsDifference < 3600) {
            const minutes = Math.floor(secondsDifference / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (secondsDifference < 86400) {
            const hours = Math.floor(secondsDifference / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (date.getDate() === currentDate.getDate() + 1) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `tomorrow at ${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' : ''}${minutes}${hours >= 12 ? 'pm' : 'am'}`;
        } else {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year} at ${date.getHours() % 12 === 0 ? 12 : date.getHours() % 12}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'}`;
        }
    }


    return (
        <div className={`flex gap-3 h-fit min-w-[350px] max-w-[400px] ${sender === userId ? "ml-auto flex-row-reverse" : ""}`}>
            <span className="h-10 w-10 flex items-center justify-center shrink-0 rounded-full font-bold text-amber-800 bg-pink-400"><UserIcon name={name} /></span>
            <div className={`p-2 ${sender === userId ? 'bg-[#CFF6EF]' : 'bg-secondary'} w-full grid gap-2  rounded-md`}>
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
                <div className={sender === userId ? "text-[#000316CC]" : "text-[#a7a7a7]"}>
                    {message}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;