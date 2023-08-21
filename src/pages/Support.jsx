import Input from "../Components/UiElements/Input/Input";
import search from '../assets/icons/cd-search2.svg'
const Support = () => {
  return (
    <main>
      <div className="bg-secondary py-14 hidden sm:block">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <h1 className="text-white text-[48px] font-semibold">
              Support Center
            </h1>
            <Input type='text' placeholder="Search..."  >
                <img src={search} alt="" />
            </Input>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-12">Support</div>
    </main>
  );
};

export default Support;
