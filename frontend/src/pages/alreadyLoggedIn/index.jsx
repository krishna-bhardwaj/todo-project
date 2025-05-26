import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../constants";
import { Button, NavigationLink } from "../../components";
import { useDispatch } from "react-redux";
import { authActions } from "../../reducers";
import { CheckCircle } from "lucide-react"; 

const AlreadyLoggedInNotice = () => {

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  }

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200 items-center">
        <div className="flex justify-center">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          You're already logged in
        </h2>
        <p className="text-gray-600 text-sm">
          You’re already logged into your account. You can go ahead and start managing your tasks right away.
        </p>

        <Link
          to={APP_ROUTE.TODO}
        >
          <Button title="Manage Your Tasks" isbgThemeLight />
        </Link>

        <p className="text-xs text-gray-400">
          If this isn't you, you can 
          <NavigationLink title="Log Out" onClick={handleLogOut}/>
          and sign in with another account.
        </p>
      </div>
    </div>
  );
};

export default AlreadyLoggedInNotice;
