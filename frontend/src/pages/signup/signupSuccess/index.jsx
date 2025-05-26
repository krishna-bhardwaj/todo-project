import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../../constants";
import { Button } from "../../../components";

const SignUpSucces = () => {
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

export default SignUpSucces;