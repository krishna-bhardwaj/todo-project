import { useRef } from "react";
import { Button, Input } from "../../components";
import { Link } from "react-router-dom";
import { authApi } from "../../services";
import {APP_ROUTE} from "../../constants";

const SignUp = () => {
  const ref = useRef();

  const [signup,{isSuccess}] = authApi.useSignupMutation();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const credentials = Object.fromEntries(formData.entries());
    signup(credentials);
  };

  if (isSuccess) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center  bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold text-center text-[#282c34] mb-4">
          Registration Successful!
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mb-6">
          🎉 Your account has been created successfully. Welcome aboard! 
          You can now log in and start managing your tasks efficiently.
        </p>
        <Link
          to={APP_ROUTE.LOG_IN}
        >
          <Button title="Proceed to Log In" isbgThemeLight/>
        </Link>
      </div>
    );
  }


  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <form
        ref={ref}
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Join to start organizing your tasks effortlessly
        </p>

        <Input
          label="Email"
          type="email"
          name="email"
          required
          placeholder="Enter your email"
        />
        <p className="text-xs text-gray-400 -mt-4">We'll never share your email with anyone else.</p>

        <Input
          label="Username"
          type="text"
          name="username"
          required
          placeholder="Choose a username"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          required
          minLength={5}
          placeholder="Create a password"
        />

        <Button title="Sign Up" isbgThemeLight />

        <p className="text-xs text-gray-500 text-center">
          <span className="mr-1">Already have an account?</span>
          <Link
            className="text-[#282c34] font-medium p-1 rounded-md hover:underline hover:text-[#ffd900] hover:bg-[#282c34]"
            to={APP_ROUTE.LOG_IN}
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
