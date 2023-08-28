import React, { useEffect, useState } from 'react';
import ChatBubble from '../ChatBubble/ChatBubble';
import Button from '../Button/Button';
import { useUserCtx } from '../../../../contexts/user/UserContext';
import { terminal } from '../../../../contexts/terminal/Terminal';

const Messages = ({ activeChat, chatCardHandler }) => {
    const { user } = useUserCtx()
    const [modal, setModal] = useState(true)
    const [messages, setMessages] = useState()
    useEffect(() => {
        setModal(true)
        setMessages([])
        terminal.request({ name: 'getMessage', params: { id: activeChat?.id }, queries: { page: 1 } }).then(data => {
            data.docs?.length > 0 && setMessages(data.docs)
        })
        if (activeChat && activeChat.status !== 'pending') {
            setModal(false)
            terminal.socket.on('entry')
            terminal.socket.emit('entry', { "entry": true, "room": activeChat?.id })
            terminal.socket.on('message', (data) => {
                console.log(data);
                data.id && setMessages(prev => [data, ...prev])
            })
        }
        return () => {
            terminal.socket.emit('entry', { "entry": false, "room": activeChat?.id })
            terminal.socket.off('entry')
            terminal.socket.off('message')
        }
    }, [activeChat])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (activeChat && activeChat.status !== 'pending') {
            terminal.request({ name: 'sendMessage', params: { id: activeChat.id }, body: { data: { message: e.target.message.value } } })
        }
    }
    return (
        <>
            {modal && <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#0000004b] z-10">
                <div className="h-full w-full flex items-center justify-center">
                    <div className="flex gap-2">
                        <Button onClick={() => console.log('object')} style={"secondary"}>Decline</Button>
                        <Button onClick={() => terminal.request({ name: 'acceptSupport', params: { id: activeChat.id } }).then(data => {
                            if (data.id) { chatCardHandler({ id: data.id, status: data.status, type: data.type }) }
                        })} style={"primary"}>Accept</Button>
                    </div>
                </div>
            </div>}
            <div className="flex justify-between items-center px-8 py-3 shadow-sm">
                <div>
                    <div className="flex gap-2 items-center">
                        <span className={`h-2 w-2 rounded-full bg-green-600`}></span>
                        <p className="text-[#475569] font-medium first-letter:uppercase">
                            {activeChat.type}
                        </p>
                    </div>
                    <p className="text-sm font-medium">{activeChat.id}</p>
                </div>
                <div>
                    <select
                        className="bg-transparent outline-none cursor-pointer"
                        name=""
                        id=""
                    >
                        <option value="open" selected>
                            Open
                        </option>
                        <option value="close" selected>
                            Close
                        </option>
                    </select>
                </div>
            </div>
            <div className="px-8 py-2 relative h-[calc(100vh-215px)]  w-full">
                <div className="h-full overflow-y-auto flex  flex-col-reverse gap-12 pb-2 scrollbar">
                    {
                        messages?.length > 0 && messages.map((message) =>
                            <ChatBubble
                                key={message.id}
                                userId={user.id}
                                sender={message.sender.id}
                                name={message.sender.fullName || message.sender.email}
                                date={message.createdAt}
                                message={message.message}
                            />)
                    }
                </div>
                <form onSubmit={handleSubmit} className="p-3 border border-[#0000002a] rounded bg-white">
                    <div className="w-full flex ">
                        <input
                            className="outline-none w-full"
                            type="text"
                            name='message'
                            placeholder="Type text message"
                        />
                        <button type='submit' className="text-secondary bg-primary font-bold rounded-full py-[14px] px-[40px]">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Messages;