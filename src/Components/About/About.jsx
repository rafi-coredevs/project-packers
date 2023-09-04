/**
 * About Section
 * 
 * @returns JSX Element
 */
import Player from "../UiElements/Player/Player";
import Query from "../UiElements/Query/Query";
import video from "../../assets/Image/video1.mp4";
const About = () => {
  return (
    <div className=" bg-[#cff6ef33]">
      <div className="container mx-auto py-12 md:py-[6.25rem] flex flex-wrap px-5 md:px-0 justify-center gap-16 ">
        <div className="">
          <p className="text-secondary text-[1.75rem] md:text-4xl leading-[2.75rem] tracking-[-0.75px] font-semibold font-sans">
            How Project Packers works
          </p>
          <p className="mt-4 max-w-[480px] font-sans text-base  md:text-lg font-normal leading-7 text-[#475569]">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <div className="sm:h-auto md:w-[595px] mt-8 rounded-[30px] overflow-hidden">
            <Player url={video} />
          </div>
        </div>
        <div className="grid gap-12">
          <Query
            title="Tell us about the item you are looking for"
            description="Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US."
          />
          <Query
            title="Wait for product offer to make delivery"
            description="Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US."
          />
          <Query
            title="Place your order"
            description="Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US."
          />
          <Query
            title="Place your order"
            description="Thousands of deals on gadgets, shoes, cosmetics, watches - everything from the US."
          />
        </div>
      </div>
    </div>
  );
};

export default About;
