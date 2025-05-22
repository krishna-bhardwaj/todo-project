import { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Button, Input } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services";
import {APP_ROUTE} from "../../constants";
import { authActions } from "../../reducers";

const LogIn = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { data }] = authApi.useLoginMutation();
  

  const getFormData = () => {
    const formData = new FormData(ref.current);
    return Object.fromEntries(formData.entries());
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    const {rememeberMe, ...credential} = getFormData();
    login({ ...credential});
  };

  useEffect(()=>{
    if(data) {
      const {token, user} = data;
      dispatch(authActions.saveUser(user));
      const {rememeberMe} = getFormData();
      if(rememeberMe) localStorage.setItem('token',token);
      else sessionStorage.setItem('token',token);
      navigate(APP_ROUTE.TODO);
    }
  },[data]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200 w-full max-w-md"
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
          <span className="mr-1">Don’t have an account?</span>
          <Link className="text-[#282c34] font-medium p-1 rounded-md hover:underline hover:text-[#ffd900] hover:bg-[#282c34]" to={APP_ROUTE.SIGN_UP}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
