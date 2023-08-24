
import Faq from "../Components/Faq/Faq";
import { useTitle } from "../Components/Hooks/useTitle";
const FaqPage = () => {
    useTitle("Frequently asked questions")
    return (
        <main>
            <Faq />
        </main>
    );
};

export default FaqPage;