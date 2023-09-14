/**
 * Overview Component
 * @param {Object} data Overview data 
 * @returns Overview 
 */
const Overview = ({ data }) => {
    return (
        <section>
            <div className='mt-6 pb-5 flex justify-between items-center border-b divide-x'>
                {
                    data.map((data, i) => (
                        <div
                            key={i}
                            className={`${data.title !== 'Total Cost' && 'lg:pl-16'}`}
                        >
                            <h4>{data.title}</h4>
                            {
                                data.title === 'Total Cost' ?
                                    <p className='text-secondary text-xl font-semibold'>৳ {(Number(data.total) / 1000).toFixed(1)}k</p> :
                                    <div className='flex items-center gap-2'>
                                        <p className='text-xl font-semibold'>
                                            {data.total}
                                        </p>
                                        <span
                                            className={`w-3 h-3 rounded-full
                                                ${data.title === 'Total Request' && 'bg-[#A2EEE7]'
                                                || data.title === 'Total Revenue' && 'bg-[#A2EEE7]'
                                                || data.title === 'Total Order' && 'bg-[#F2C852]'
                                                || data.title === 'Completed' && 'bg-[#16A34A]'
                                                || data.title === 'Canceled' && 'bg-[#EF4444]'}`}
                                        />
                                    </div>
                            }
                            <p className='text-gray-400'>{
                                data.title === 'Total Cost' && "New cost last 30 days"
                                || data.title === 'Total Request' && "New Request last 30 days"
                                || data.title === 'Total Order' && "New order last 30 days"
                                || data.title === 'Completed' && "Completed order last 30 days"
                                || data.title === 'Canceled' && "Canceled order last 30 days"
                                || data.title === 'Cancelled' && "Cancelled order last 30 days"
                                || data.title === 'Total Revenue' && "Total revenue last 30 days"
                            }</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Overview;
