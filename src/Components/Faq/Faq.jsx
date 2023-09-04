/**
 * FAQ()
 * 
 * @returns JSX Element
 * 
 */

import Heading from "../UiElements/Heading/Heading";
import Collapse from "../UiElements/Collapse/Collapse";
const DUMMY_DATA = {
  header: "Frequently Asked Questions",
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
};
const Faq = () => {
  return (
    <div className="container mx-auto flex flex-col items-center px-5 sm:p-0 my-12 md:my-[9.25rem] min-h-[1178px] md:min-h-[730px] lg:min-h-[550px]">
      <Heading title="Frequently Asked Questions" />

      <div className="grid grid-cols-1   md:grid-cols-3 gap-8 justify-center items-start">
        <div className="flex flex-col">
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
        </div>
        <div className="flex flex-col">
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
        </div>
        <div className="flex flex-col">
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
          <Collapse data={DUMMY_DATA} />
        </div>
      </div>

    </div>
  );
};

export default Faq;
