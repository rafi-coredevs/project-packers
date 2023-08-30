import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();
  
  return (
    <div
      id={id}
      className="bg-white  rounded-md shadow-sm shadow-[#00000026] group hover:shadow-lg overflow-hidden"
    >
      <div className="overflow-hidden">
        <img className="rounded-t-md w-full h-60 duration-500 group-hover:scale-105" src={image} alt="" />
      </div>
      <div className="p-5 flex flex-col justify-between">
        <h4 className="font-semibold text-base line-clamp-2">{title}</h4>
        <p className="text-[#475569] text-justify line-clamp-3">
          {description}
        </p>

        <button
          className="text-secondary text-sm font-medium w-fit rounded p-2 mt-2 border"
          onClick={(e) => navigate(`/blog/${id}`)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
