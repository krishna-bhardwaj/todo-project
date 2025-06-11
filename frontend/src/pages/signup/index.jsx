import { useRef } from "react";
import { Button, Input, NavigationLink } from "../../components";
import { authApi } from "../../services";
import { APP_ROUTE } from "../../constants";
import SignUpSucces from "./signupSuccess";
import { useSelector } from "react-redux";
import AlreadyLoggedInNotice from "../alreadyLoggedIn";
import { usePageTitle } from "../../hooks";

const SignUp = () => {
  usePageTitle("Sign Up | Task Manager");

  const ref = useRef();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [signup, { isSuccess }] = authApi.useSignupMutation();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const credentials = Object.fromEntries(formData.entries());
    signup(credentials);
  };

  if (isSuccess) return <SignUpSucces />;

  if (isAuthenticated) return <AlreadyLoggedInNotice />;

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
        <p className="text-xs text-gray-400 -mt-4">
          We'll never share your email with anyone else.
        </p>

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
          <span>Already have an account?</span>
          <NavigationLink title="Log In" path={APP_ROUTE.LOG_IN} />
        </p>
      </form>
    </div>
  );
};

export default SignUp;
