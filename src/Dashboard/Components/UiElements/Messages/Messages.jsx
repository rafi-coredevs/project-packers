import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from '../ChatBubble/ChatBubble';
import Button from '../Button/Button';
import { useUserCtx } from '../../../../contexts/user/UserContext';
import { terminal } from '../../../../contexts/terminal/Terminal';
import send from '../../../../assets/icons/send.png';
import toaster from '../../../../Util/toaster';
import loader from '../../../../assets/icons/cd-reload.svg'

const styles = {
    open: "bg-green-400",
    close: "bg-red-400",
    pending: "bg-yellow-400",
};

const Messages = ({ activeChat, chatCardHandler, setSupportData }) => {
    const { user } = useUserCtx()
    const [modal, setModal] = useState(true)
    const [messages, setMessages] = useState([])
    const messageBody = useRef(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)

    useEffect(() => {
        setLoading(true)
        setModal(true)
        setMessages([])
        terminal.request({ name: 'getMessage', params: { id: activeChat?.id }, queries: { page: 1 } }).then(data => {
            data.docs?.length > 0 && setMessages(data.docs), setTotalPage(data.totalPages), setPage(data.page), setLoading(false);
        })
        if (activeChat && activeChat.status !== 'pending') {
            setModal(false)
            terminal.socket.emit('entry', { "entry": true, "room": activeChat.id })
            terminal.socket.on('message', (data) => {
                data.id && setMessages(prev => [data, ...prev])
            })
        }
        return () => {
            terminal.socket.emit('entry', { "entry": false, "room": activeChat?.id })
            terminal.socket.off('message')
        }
    }, [activeChat])

    let throttleTimer;
    const debounce = (callback, time) => {
        if (throttleTimer) return;
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    };

    const handleScroll = () => {
        if (messageBody.current.scrollTop - messageBody.current.clientHeight + messageBody.current.scrollHeight < 1) {
            setLoading(true);
            if (page < totalPage) {
                const nextPage = page + 1;
                debounce(() => {
                    terminal.request({ name: 'getMessage', params: { id: activeChat?.id }, queries: { page: nextPage } }).then(data => {
                        if (data.docs?.length > 0) {
                            setMessages(prev => [...prev, ...data.docs]);
                        }
                        setLoading(false);
                    });
                }, 500)
                setPage(nextPage);
            } else {
                setLoading(false);
                toaster({ type: 'error', message: 'No more messages available' })
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (activeChat && activeChat.status !== 'pending') {
            terminal.request({ name: 'sendMessage', params: { id: activeChat.id }, body: { data: { message: e.target.message.value } } })
            e.target.message.value = "";
        }
    }

    const handleStatus = (e) => {
        terminal.request({ name: 'updateSupport', params: { id: activeChat.id }, body: { status: e.target.value, user: null } }).then(data => {
            if (data.id) {
                chatCardHandler({ id: data.id, status: data.status, type: data.type });
                toaster({ type: 'success', message: 'Status updated successfully' })
                return
            }
            toaster({ type: 'error', message: 'An error occurred' })
        })
    }
    return (
        <>
            {modal && <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#0000004b] z-10">
                <div className="h-full w-full flex items-center justify-center">
                    <div className="flex gap-2">
                        <Button onClick={() => setSupportData(prev => {
                            return prev.filter(item => item.id !== activeChat.id)
                        })} style={"secondary"}>Decline</Button>
                        <Button onClick={() => terminal.request({ name: 'acceptSupport', params: { id: activeChat.id } }).then(data => {
                            if (data.id) { chatCardHandler({ id: data.id, status: data.status, type: data.type }) }
                        })} style={"primary"}>Accept</Button>
                    </div>
                </div>
            </div>}
            <div className="flex justify-between items-center px-8 py-3 shadow-sm">
                <div>
                    <div className="flex gap-2 items-center">
                        <span className={`h-2 w-2 rounded-full ${styles[activeChat.status]}`}></span>
                        <p className="text-[#475569] font-medium first-letter:uppercase">
                            {activeChat.type}
                        </p>
                    </div>
                    <p className="text-sm font-medium">{activeChat.number}</p>
                </div>
                <div>
                    <select
                        className="bg-transparent outline-none cursor-pointer w-20"
                        onChange={handleStatus}
                    >
                        <option value="open" selected={activeChat.status === 'open'}>
                            Open
                        </option>
                        <option value="close" selected={activeChat.status === 'close'}>
                            Close
                        </option>
                    </select>
                </div>
            </div>
            <div className="px-8 py-2 relative h-[calc(100vh-215px)]  w-full">
                {
                    loading &&
                    <div className='absolute flex w-full justify-center text-primary'>
                        <img src={loader} alt="" className='animate-spin' />
                    </div>
                }
                <div ref={messageBody} onScroll={handleScroll} className="h-full overflow-y-auto flex  flex-col-reverse gap-12 pb-2 scrollbar">

                    {
                        messages?.length > 0 && messages.map((message) =>
                            <ChatBubble
                                key={message?.id}
                                userId={user?.id}
                                sender={message?.sender?.id}
                                name={message?.sender?.fullName || message?.sender?.email}
                                date={message?.createdAt}
                                message={message?.message}
                            />)
                    }
                </div>
                <form onSubmit={handleSubmit} className="p-2 border border-[#0000002a] rounded bg-white">
                    <div className="w-full flex overflow-hidden">
                        <input
                            className="outline-none w-full"
                            type="text"
                            name='message'
                            placeholder="Type text message"
                            maxLength={600}
                            required

                        />
                        <button type='submit'>
                            <img
                                src={send}
                                alt='send'
                                className='w-24 py-3 pl-10 pr-4 flex-1 text-lg cursor-pointer active:animate-send'
                            />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Messages;