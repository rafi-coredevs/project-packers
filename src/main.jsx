import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/user/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
        />
    </>

);
