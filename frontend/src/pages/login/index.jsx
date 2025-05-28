import { useRef } from "react";
import { Button, Input, NavigationLink } from "../../components";
import { authApi } from "../../services";
import {APP_ROUTE} from "../../constants";
import { useSelector } from "react-redux";
import AlreadyLoggedInNotice from "../alreadyLoggedIn";
import LoginSuccess from "./loginSuccess";
import { usePageTitle } from "../../hooks";

const LogIn = () => {
  usePageTitle("Log In | Task Manager");
  
  const ref = useRef();
  const [login, {isSuccess}] = authApi.useLoginMutation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getFormData = () => {
    const formData = new FormData(ref.current);
    return Object.fromEntries(formData.entries());
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData();
    login(formData);
  };

  if(isSuccess) return <LoginSuccess />
  if(isAuthenticated)   return <AlreadyLoggedInNotice />

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Log in to manage your tasks efficiently
        </p>

        <Input  
          label="Username"
          name="username"
          required
          placeholder="Enter your username"
        />
        <Input 
          label="Password"
          type="password"
          name="password"
          required
          minLength={5}
          placeholder="Enter your password"
        />

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Input type="checkbox" name="rememeberMe" className="w-4 h-4 rounded focus:ring-0" defaultChecked={true}/>
          <label htmlFor="remember" className="select-none">
            Remember me
          </label>
        </div>

        <Button title="Log In" isbgThemeLight />

        <p className="text-xs text-gray-500 text-center">
          <span>Don’t have an account?</span>
          <NavigationLink title="Sign Up" path={APP_ROUTE.SIGN_UP}/>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
