import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homePage";
import LogIn from "../pages/login";
import SignUp from "../pages/signup";
import { APP_ROUTE } from "../constants";
import TaskManger from "../pages/task-manager";

const router = createBrowserRouter([
    {
        path: "/",
        Component:App,
        children: [
            {index: true, Component:HomePage },
            {path:APP_ROUTE.LOG_IN, Component:LogIn},
            {path:APP_ROUTE.SIGN_UP, Component:SignUp},
            {path:APP_ROUTE.TASKS, Component:TaskManger}
        ]
    }
]);

export default router;
