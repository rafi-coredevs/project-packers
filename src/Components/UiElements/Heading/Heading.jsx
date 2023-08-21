
const Heading = ({title, description}) => {
    return (
        <div className="flex text-center mx-auto mb-[37px] sm:mb-[48px] flex-col gap-3 sm:gap-4 max-w-[590px]">
            {title && <p className="text-[28px] font-sans font-semibold sm:text-[32px] sm:font-bold text-secondary">{title}</p>}
            {description && <p className="text-[16px] font-sans font-normal sm:text-[18px] text-[#475569]">{description}</p>}
        </div>
    );
};

export default Heading;