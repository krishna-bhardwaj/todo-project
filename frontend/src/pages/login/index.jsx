import { useRef } from "react";
import { Button, Input } from "../../components";
import {Link} from "react-router-dom";

const LogIn = () => {
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(ref);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
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
          required
          placeholder="Enter your username"
        
        />
        <Input 
          label="Password"
          type="password"
          required
          minLength={5}
          placeholder="Enter your password"
        />

        <Button title="Log In" isbgThemeLight />

        <p className="text-xs text-gray-500 text-center">
          <span className="mr-1">Don’t have an account?</span>
          <Link className="text-[#282c34] font-medium p-1 rounded-md hover:underline hover:text-[#ffd900] hover:bg-[#282c34]" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
