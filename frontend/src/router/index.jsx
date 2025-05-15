import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homePage";

const router = createBrowserRouter([
    {
        path: "/",
        Component:App,
        children: [
            {index: true, Component:HomePage },
        ]
    }
]);

export default router;
