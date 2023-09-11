import { useParams } from "react-router-dom";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import user from "../assets/Image/user.jpeg";
import img from "../assets/Image/blog-post.png";
import { useTitle } from "../Components/Hooks/useTitle";
import { useEffect, useState } from "react";
import { terminal } from "../contexts/terminal/Terminal";
// 
const BlogPost = () => {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(false)
  useTitle("replace-with-blog-title")

  const { postId } = useParams();
  useEffect(() => {
    setLoading(true)
    terminal.request({ name: 'singleBlog', params: { id: postId } }).then(res => { setData(res);  }).finally(() => setLoading(false))
  }, [postId])


  const dateFormatter = (value) => {
    const date = new Date(value)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    return `${day.toLowerCase()}-${month.toLowerCase()}-${year}`
  }
  return (
    <main>
      <Breadcrumb title={data?.title} />
      <div className="w-full h-[60vh] bg-black/50 bg-blend-overlay"
        style={{
          backgroundImage: `url(https://source.unsplash.com/random/900×700/?nature`,
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="max-w-[800px] grid gap-6 px-3 sm:px-0">
            <h3 className="text-[32px] sm:text-[40px] font-bold sm:font-semibold text-white">
              {data?.title || "No Title"}
            </h3>
            <div className="text-base font-medium text-white flex gap-4 items-center">
              {/* <div className="flex gap-2 items-center">
                <img className="rounded-full h-10 w-auto" src={user} alt="" />
                <p className="">Ralph Edwards</p>
              </div> */}
              <div className="h-2 w-2 bg-white rounded-full"></div>
              <p className="">{dateFormatter(data?.date)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-3 sm:p-0 sm:max-w-[800px] text-[#475569] grid gap-9 my-12">
        <h3 className="text-[32px] text-black font-semibold">
          {data?.title || "No Title"}
        </h3>
        <p className="">
         {data?.description}
        </p>
        <div dangerouslySetInnerHTML={{__html: data?.content}}></div>
        {/* {data?.content} */}
    
      </div>
    </main>
  );
};

export default BlogPost;
