import { useParams } from "react-router-dom";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import user from "../assets/Image/user.jpeg";
import img from "../assets/Image/blog-post.png";
import { useTitle } from "../Components/Hooks/useTitle";
// 
const BlogPost = () => {

  useTitle("replace-with-blog-title")
  
  const { postId } = useParams();
  console.log(postId);
  return (
    <main>
      <Breadcrumb />
      <div className="w-full h-[60vh] relative">
        <div className="h-full w-full absolute bg-[#00000094]"></div>
        <img
          className="w-full h-full object-fill"
          src="https://source.unsplash.com/random/900×700/?nature"
          alt=""
        />
        <div className="absolute w-full top-0 h-full flex items-center justify-center">
          <div className="max-w-[800px] grid gap-6 px-3 sm:px-0">
            <h3 className="text-[32px] sm:text-[40px] font-bold sm:font-semibold text-white">
              UBS is a multinational investment bank based in Switzerland,
              active.
            </h3>
            <div className="text-base font-medium text-white flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <img className="rounded-full h-10 w-auto" src={user} alt="" />
                <p className="">Ralph Edwards</p>
              </div>
              <div className="h-2 w-2 bg-white rounded-full"></div>
              <p className="">June 13, 2020</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-3 sm:p-0 sm:max-w-[800px] text-[#475569] grid gap-9 my-12">
        <h3 className="text-[32px] text-black font-semibold">
          UBS is a multinational investment bank based in Switzerland, active in
          all major financial centers and with offices in over 50 countries.
        </h3>
        <p className="">
          It’s been named as one of the Most Innovative Companies in 2019 by
          “Fast Company”. <br /> <br />
          The digital transformation journey started back in 2015, when KW
          decided to reposition itself as a tech company. The company invested
          heavily in its own software, the cloud, and AI. It has scooped up top
          talent from the market and created its own Labs division, KW Labs. KW
          Labs acts as the innovation hub of Keller Williams, working in a
          similar fashion to Google and Amazon.
          <br /> <br />
          To stay ahead of competitors, Keller Williams have also undertaken one
          of the most ambitious projects in the industry – to leverage their
          data to boost artificial intelligence-powered technology.
        </p>
        <img className="w-full h-[450px]" src={img} alt="" />
        <p className="">
          It’s been named as one of the Most Innovative Companies in 2019 by
          “Fast Company”. <br /> <br />
          The digital transformation journey started back in 2015, when KW
          decided to reposition itself as a tech company. The company invested
          heavily in its own software, the cloud, and AI. It has scooped up top
          talent from the market and created its own Labs division, KW Labs. KW
          Labs acts as the innovation hub of Keller Williams, working in a
          similar fashion to Google and Amazon.
          <br /> <br />
          To stay ahead of competitors, Keller Williams have also undertaken one
          of the most ambitious projects in the industry – to leverage their
          data to boost artificial intelligence-powered technology.
        </p>
        <h3 className="text-[32px] text-black font-semibold">
          UBS is a multinational investment bank based in Switzerland, active in
          all major financial centers and with offices in over 50 countries.
        </h3>
        <p className="">
          It’s been named as one of the Most Innovative Companies in 2019 by
          “Fast Company”. <br /> <br />
          The digital transformation journey started back in 2015, when KW
          decided to reposition itself as a tech company. The company invested
          heavily in its own software, the cloud, and AI. It has scooped up top
          talent from the market and created its own Labs division, KW Labs. KW
          Labs acts as the innovation hub of Keller Williams, working in a
          similar fashion to Google and Amazon.
          <br /> <br />
          To stay ahead of competitors, Keller Williams have also undertaken one
          of the most ambitious projects in the industry – to leverage their
          data to boost artificial intelligence-powered technology.
        </p>
      </div>
    </main>
  );
};

export default BlogPost;
