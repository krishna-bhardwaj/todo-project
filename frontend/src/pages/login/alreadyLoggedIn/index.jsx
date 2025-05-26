import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../../constants";

const AlreadyLoggedInNotice = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200 w-full max-w-md text-center">
        <div className="flex justify-center">
          X
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          You're already logged in
        </h2>
        <p className="text-gray-600 text-sm">
          You’ve already logged into your account. You can go ahead and start managing your tasks right away.
        </p>

        <Link
          to={APP_ROUTE.TODO}
          className="bg-[#282c34] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#1f1f1f] transition"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-gray-400">
          If this wasn't you, you can <span className="underline cursor-pointer text-red-600">log out</span> and sign in with another account.
        </p>
      </div>
    </div>
  );
};

export default AlreadyLoggedInNotice;
