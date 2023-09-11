import BlogCard from "../Components/UiElements/BlogCard/BlogCard";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import { posts } from "../Store/Data";
import Pagination from "../Components/UiElements/Paginate/Pagination";
import { useTitle } from "../Components/Hooks/useTitle";
import { useEffect, useState } from "react";
import { terminal } from "../contexts/terminal/Terminal";


const Blog = () => {
  useTitle("Latest Blog Posts");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const [query, setQuery] = useState(null)
  useEffect(() => {
    terminal.request({ name: 'allBlog' }).then(res => {setData(res); console.log(res)}).finally(()=> setLoading(false))
  }, []);

  useEffect(()=>{
    setLoading(true)
    terminal.request({name: 'allBlog', queries:{page: page, limit:20}})
    setLoading(false)
  },[page])
  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 px-5 sm:px-0 gap-8">
          {loading ? (
            <>
              {[...Array(20)].map((array, i) => (
                <div key={i} className="bg-white w-full rounded-md shadow-sm shadow-[#00000026] ">
                  <div className="rounded-t-md w-full h-60 lazy-loading" ></div>
                  <div className="p-5 flex flex-col justify-between gap-2">
                    <h4 className="font-semibold text-base line-clamp-2 w-full h-3 lazy-loading"></h4>
                    <h4 className="font-semibold text-base line-clamp-2 w-1/2 h-3 lazy-loading"></h4>
                    <p className="text-[#475569] text-justify line-clamp-3"></p>
                    <div className="text-secondary text-sm font-medium w-20 h-8  rounded p-2 mt-2 border lazy-loading"></div>
                  </div>
                </div>
              ))}
            </>

          ) : (
            <>
              {data?.docs?.map((post) => {
                console.log(post)
                return (
                  <BlogCard
                    key={post?.id}
                    id={post?.id} 
                    image={post?.banner}
                    title={post?.title}
                    description={post.description}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className={`justify-center my-12 ${5 > 1 ? "flex" : "hidden"}`}>
         {data?.totalPages >= 2 && <Pagination page={page} pageLimit={data?.totalPages} setPage={setPage} />}
        </div>
      </div>
    </>
  );
};

export default Blog;
