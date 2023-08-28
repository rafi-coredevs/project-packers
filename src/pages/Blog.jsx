import BlogCard from "../Components/UiElements/BlogCard/BlogCard";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import { posts } from "../Store/Data";
import Pagination from "../Components/UiElements/Paginate/Pagination";
import { useTitle } from "../Components/Hooks/useTitle";
import { useEffect, useState } from "react";
const Blog = () => {
  useTitle("Latest Blog Posts");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // TODO  Data fetch here
    console.log(page);
    setLoading(false)
  }, [page]);
  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 px-5 sm:px-0 gap-8">
          {loading ? (
            <>
                {[...Array(20)].map((array, i) => (
                  <div className="bg-white w-full rounded-md shadow-sm shadow-[#00000026] ">
                    <div className="rounded-t-md w-full h-60 bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading" ></div>
                    <div className="p-5 flex flex-col justify-between gap-2">
                      <h4 className="font-semibold text-base line-clamp-2 w-full h-3 bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></h4>
                      <h4 className="font-semibold text-base line-clamp-2 w-1/2 h-3 bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></h4>
                      <p className="text-[#475569] text-justify line-clamp-3"></p>
                      <div className="text-secondary text-sm font-medium w-20 h-8  rounded p-2 mt-2 border bg-[length:400%] bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-loading"></div>
                    </div>
                  </div>
                ))}
              </>
     
          ) : (
            <>
              {posts.slice(0, 20).map((post) => {
                return (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    image={`https://source.unsplash.com/random/900×70${post.id}/?nature`}
                    title={post.title}
                    description={post.body}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="flex justify-center my-12">
          <Pagination page={1} pageLimit={20} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Blog;
