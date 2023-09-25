
import Faq from "../Components/Faq/Faq";
import { useTitle } from "../Components/Hooks/useTitle";
const FaqPage = () => {
    useTitle("Frequently asked questions")
    return (
        <main className="mb-36">
            <Faq />
        </main>
    );
};

export default FaqPage;