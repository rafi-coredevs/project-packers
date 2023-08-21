/**
 * Brands component
 * @params array of urls 
 * 
 * @returns JSX element
 */


const Brands = ({data}) => {
    return (
        <div className='container  items-center mx-auto text-center flex justify-center flex-col my-[34px] sm:my-[74px] px-5 gap-5'>
            <p className="font-sans text-[18px] sm:text-[24px] text-secondary font-semibold max-w-[600px] text-center">Buy Real USA product from any band through our Project Packers platform </p>
            <div className="flex gap-2 sm:gap-12 justify-between w-full items-center px-5 overflow-x-auto no-scrollbar">
                {data?.map((item, index) => <img key={index}  src={item } alt="" className="h-12 w-[72px] sm:w-[150px] sm:h-[100px]" />)}
               
            </div>
        </div>
    );
};

export default Brands;