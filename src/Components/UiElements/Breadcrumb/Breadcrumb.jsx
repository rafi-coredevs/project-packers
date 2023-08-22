import { Link } from "react-router-dom";
import useBreadcrumb from "../../Hooks/BreadcrumbHook";

const Breadcrumb = ({title}) => {
  const breadcrumb = useBreadcrumb();
  return (
    <div className="bg-secondary w-full py-[14px] font-sans text-sm">
      <div className="container px-2 sm:px-0 mx-auto">
        <Link className="text-[#ffffff66] " to="/">
          Home
        </Link>
        {breadcrumb.map((item, index) => {
          return (
            <div className="inline" key={index}>
              {index !== breadcrumb.length  && (
                <span className="px-2 text-[#ffffff66]">/</span>
              )}
              <Link
                key={index}
                className={`${
                  index === breadcrumb.length - 1
                    ? "text-white"
                    : "text-[#ffffff66]"
                } capitalize`}
                to={item.url}
              >
                {title && index === breadcrumb.length - 1 ? title : item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
