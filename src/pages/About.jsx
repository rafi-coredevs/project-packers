import { useTitle } from "../Components/Hooks/useTitle";
import Breadcrumb from "../Components/UiElements/Breadcrumb/Breadcrumb";
import Carousel from "../Components/UiElements/Carousel/Carousel";
import Heading from "../Components/UiElements/Heading/Heading";
import { carousel } from "../Store/Data";
import about from "../assets/Image/about.png";
import about1 from "../assets/Image/about1.png";
import about2 from "../assets/Image/about2.png";
const About = () => {
  useTitle("About");
  return (
    <main>
      <Breadcrumb />
      <div className="w-full h-[60vh] relative">
        <div className="h-full w-full absolute bg-[#00000094]"></div>
        <img className="w-full h-full object-fill" src={about} alt="" />
        <div className="absolute w-full top-0 h-full flex items-center justify-center">
          <div className="max-w-[800px] grid gap-6 px-3 sm:px-0 text-left sm:text-center">
            <h5 className="text-[24px] font-bold text-[#6BCCCB]">About Us</h5>
            <h3 className="text-[32px] sm:text-[40px] font-bold sm:font-semibold text-white">
              UBS is a multinational investment bank based in Switzerland,
              active.
            </h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center py-20">
          <div className="grid gap-9">
            <h4 className="text-[32px] font-semibold ">Our Story</h4>
            <p className="text-[#475569]">
              It’s been named as one of the Most Innovative Companies in 2019 by
              “Fast Company”. <br /> <br /> The digital transformation journey
              started back in 2015, when KW decided to reposition itself as a
              tech company. The company invested heavily in its own software,
              the cloud, and AI. It has scooped up top talent from the market
              and created its own Labs division, KW Labs. KW Labs acts as the
              innovation hub of Keller Williams, working in a similar fashion to
              Google and Amazon. <br /> <br /> To stay ahead of competitors,
              Keller Williams have also undertaken one of the most ambitious
              projects in the industry – to leverage their data to boost
              artificial intelligence-powered technology.
            </p>
          </div>
          <img
            className="w-full max-h-[420px] rounded-3xl"
            src={about1}
            alt=""
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center py-20">
          <img
            className="w-full max-h-[420px] rounded-3xl"
            src={about2}
            alt=""
          />
          <div className="grid gap-9">
            <h4 className="text-[32px] font-semibold ">Our Values</h4>
            <p className="text-[#475569]">
              It’s been named as one of the Most Innovative Companies in 2019 by
              “Fast Company”. <br /> <br /> The digital transformation journey
              started back in 2015, when KW decided to reposition itself as a
              tech company. The company invested heavily in its own software,
              the cloud, and AI. It has scooped up top talent from the market
              and created its own Labs division, KW Labs. KW Labs acts as the
              innovation hub of Keller Williams, working in a similar fashion to
              Google and Amazon. <br /> <br /> To stay ahead of competitors,
              Keller Williams have also undertaken one of the most ambitious
              projects in the industry – to leverage their data to boost
              artificial intelligence-powered technology.
            </p>
          </div>
        </div>
        <div className="mx-auto">

          <Heading title="Our users love  Project Packers" />
          <div className='mb-16'>
            <Carousel isHome={false} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
