import { useEffect, useRef, useState } from 'react';
import search from '../../../../assets/icons/cd-search2.svg';
import { Link } from 'react-router-dom';

/**
 * @returns Search Field component
 */
export const SearchField = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

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

    const searchHandler = e => {
        const searchValue = e.target.value;
        if (searchValue.length > 0) {
            setOpen(true);
        }
        else if (searchValue.length === 0) {
            setOpen(false);
        }
        
        console.log(searchValue);
    }


    return <div
        ref={ref}
    >
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
                {
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
                }
            </ul>
        </div>
    </div>
}
