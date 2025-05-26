import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../../constants";
import { Button } from "../../../components";
import { CheckCircle } from "lucide-react";

const LoginSuccess = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" strokeWidth={1.5} />
      <h2 className="text-3xl font-bold text-center text-[#282c34] mb-4">
        You're Logged In!
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mb-6">
        🚀 Welcome back! You're successfully logged in. Head over to your dashboard to start adding and managing your tasks with ease.
      </p>
      <Link to={APP_ROUTE.TODO}>
        <Button title="Manage Your Tasks" isbgThemeLight />
      </Link>
    </div>
  );
};

export default LoginSuccess;
