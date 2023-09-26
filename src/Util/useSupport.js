import { useState } from "react";

const useSupport = () => {
    const [supportState, setSupportState ] = useState(false)

    const enableSupport = () => setSupportState(true);
    const disableSupport = () => setSupportState(false);

    return {supportState, enableSupport, disableSupport}
};

export default useSupport;
