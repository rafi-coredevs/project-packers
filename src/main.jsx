import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import SocketProviders from "./Providers/SocketProviders";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <Provider store={store}>
            <SocketProviders>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </SocketProviders>
        </Provider>
        <Toaster />
    </>

);
