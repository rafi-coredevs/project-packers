import Heading from "../UiElements/Heading/Heading";
import Collapse from "../UiElements/Collapse/Collapse";
const DUMMY_DATA = {
  header: "Frequently Asked Questions",
  description:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
};
const Faq = () => {
  return (
    <div className="container mx-auto flex flex-col items-center my-[34px] sm:my-[74px]">
      <Heading title="Frequently Asked Questions" />
  
        {/* <div className="grid grid-cols-1 px-5 sm:p-0 sm:grid-cols-3 gap-4 justify-center items-start"> */}
        <div className="w-full px-4 lg:px-10 flex flex-col lg:flex-row justify-between">
          <div>
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
          </div>
          <div>
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
            <Collapse data={DUMMY_DATA} />
          </div>
          <div>
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
