/**
* Brands component
* @params {array} args.data - array of urls 
* 
* @returns JSX element
*/
import nike from '../../assets/brand/nike.png';
import walmart from '../../assets/brand/walmart.png';
import ebay from '../../assets/brand/ebay.png';
import amazon from '../../assets/brand/amazon.png';
import ikea from '../../assets/brand/ikea.png';
import kroger from '../../assets/brand/kroger.png';


const Brands = ({ data }) => {
    // return <section className="max-w-screen-lg mx-auto mt-20">
    return <section className="container  items-center mx-auto text-center flex justify-center flex-col my-[34px] sm:my-[74px] px-5 gap-5">
        <h2 className="font-sans text-[18px] sm:text-[24px] text-secondary font-semibold max-w-[600px] text-center">Buy Real USA product from any band through our <br /> Project Packers platform</h2>
        <div className="flex flex-wrap gap-2 sm:gap-12 justify-center w-full items-center ">
            <img src={nike} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
            <img src={walmart} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
            <img src={ebay} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
            <img src={amazon} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
            <img src={ikea} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
            <img src={kroger} alt="Brand Icon" className='w-20 md:w-28 lg:w-32' />
        </div>
    </section>
};

export default Brands;
