import { useEffect, useRef, useState } from 'react';
import search from '../../../../assets/icons/cd-search2.svg';
import { Link } from 'react-router-dom';
import { terminal } from '../../../../contexts/terminal/Terminal';
/**
 * @returns Search Field component
 */
export const SearchField = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [open]);

    const fetchData = (queries) => {
        terminal.request({ name: 'globalSearchs', queries }).then((res) => {
            res.status === false ? '' : setSearchData(res)
        });
    };

    const searchHandler = e => {
        var searchValue = e.target.value;
        if (searchValue.length > 0) {
            setOpen(true);
        }
        else if (searchValue.length === 0) {
            setOpen(false);
        }

        fetchData({ term: searchValue })
    }

    return <div ref={ref} >
        <div className='relative flex-1'>
            <img
                src={search}
                alt='icon'
                className='absolute top-[calc(50%-12px)] left-2'
            />
            <input
                type='text'
                className='w-full py-2 pl-10 rounded-lg outline-none placeholder:text-black'
                placeholder='Search'
                onKeyUp={searchHandler}
            />
        </div>
        <div
            className={open ? 'block bg-slate-100 px-5 py-4 absolute w-[650px] mt-1 rounded-lg' : 'hidden'}
        >
            {/* <h1>Search Results :</h1> */}
            <ul className='divide-y'>
                {searchData.length && (
                    searchData.map((result) => {
                        if (result.from === 'product') {
                            return result.data.map((data, i) => (
                                <li
                                    key={i}
                                    className='w-full p-4 rounded-lg hover:bg-slate-200'
                                    onClick={() => setOpen(false)}
                                >
                                    <Link
                                        to={`/admin/products/${data?.id}`}
                                        className='flex justify-between items-end'
                                    >
                                        <div>
                                            <p className='text-xl'>{data?.name}</p>
                                            <p>Price : {data?.price}</p>
                                        </div>
                                        <p className='text-gray-500'><i>{result?.from}</i></p>
                                    </Link>
                                </li>
                            ))
                        }
                        if (result.from === 'request') {
                            return result.data.map((data, i) => (
                                <li
                                    key={i}
                                    className='w-full p-4 rounded-lg hover:bg-slate-200'
                                    onClick={() => setOpen(false)}
                                >
                                    <Link
                                        to={`/admin/request/${data?.id}`}
                                        className='flex justify-between items-end'
                                    >
                                        <div>
                                            <p className='text-xl'>{data?.name}</p>
                                            <p>#{data?.requestNumber} | {data?.customer}</p>
                                        </div>
                                        <p className='text-gray-500'><i>{result?.from}</i></p>
                                    </Link>
                                </li>
                            ))
                        }
                        if (result.from === 'order') {
                            return result.data.map((data, i) => (
                                <li
                                    key={i}
                                    className='w-full p-4 rounded-lg hover:bg-slate-200'
                                    onClick={() => setOpen(false)}
                                >
                                    <Link
                                        to={`/admin/orders/${data?.id}`}
                                        className='flex justify-between items-end'
                                    >
                                        <div>
                                            <p className='text-xl'>Order No : #{data?.orderNumber}</p>
                                            <p>By {data?.customer}</p>
                                        </div>
                                        <p className='text-gray-500'><i>{result?.from}</i></p>
                                    </Link>
                                </li>
                            ))
                        }
                        if (result.from === 'customer') {
                            return result.data.map((data, i) => (
                                <li
                                    key={i}
                                    className='w-full p-4 rounded-lg hover:bg-slate-200'
                                    onClick={() => setOpen(false)}
                                >
                                    <Link
                                        to={`/admin/customers/${data?.id}`}
                                        className='flex justify-between items-end'
                                    >
                                        <div>
                                            <p className='text-xl'>Name : {data?.name}</p>
                                            <p>Phone No : {data?.phone}</p>
                                        </div>
                                        <p className='text-gray-500'><i>{result?.from}</i></p>
                                    </Link>
                                </li>
                            ))
                        }
                    })
                )}
                {/* {
                    [...Array(4)].map((list, i) => <li
                        key={i}
                        className='w-full p-4 rounded-lg hover:bg-slate-200'
                        onClick={() => setOpen(false)}
                    >
                        <Link
                            to={`/admin`}
                            className='flex justify-between items-end'
                        >
                            <div>
                                <p className='text-xl'>Search</p>
                                <p>#1232323</p>
                            </div>
                            <p className='text-gray-500'><i>from Table name</i></p>
                        </Link>
                    </li>)
                } */}
            </ul>
        </div>
    </div>
}
