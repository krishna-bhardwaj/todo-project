import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homePage";
import LogIn from "../pages/login";
import SignUp from "../pages/signup";

const router = createBrowserRouter([
    {
        path: "/",
        Component:App,
        children: [
            {index: true, Component:HomePage },
            {path:"/login", Component:LogIn},
            {path:"/signup", Component:SignUp}
        ]
    }
]);

export default router;
