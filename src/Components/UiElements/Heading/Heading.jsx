
const Heading = ({title, description}) => {
    return (
        <div className="flex text-center mx-auto mb-9 md:mb-12 flex-col gap-3 md:gap-4 max-w-[590px]">
            {title && <p className="text-[28px] font-sans font-semibold sm:text-[32px] sm:font-bold text-secondary leading-10 tracking-[-0.64px]">{title}</p>}
            {description && <p className="text-[16px] font-sans font-normal sm:text-[18px] text-[#475569] leading-7">{description}</p>}
        </div>
    );
};

export default Heading;