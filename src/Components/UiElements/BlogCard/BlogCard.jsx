import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, image, title, description }) => {
    const navigate = useNavigate();
  const clickHandler = (element) => {
    navigate(`/blog/${element.currentTarget.id}`)
  };
  return (
    <div
      onClick={clickHandler}
      id={id}
      className="bg-white  rounded-md shadow-sm shadow-[#00000026] cursor-pointer hover:shadow-lg"
    >
      <img className="rounded-t-md w-full h-60" src={image} alt="" />
      <div className="p-5 flex flex-col justify-between">
        <h4 className="font-semibold text-base line-clamp-2">{title}</h4>
        <p className="text-[#475569] text-justify line-clamp-3">
          {description}
        </p>

        <button
         
         
          className="text-secondary text-sm font-medium w-fit rounded p-2 mt-2 border"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
