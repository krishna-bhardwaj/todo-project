import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button } from "../../components";
import {APP_ROUTE} from "../../constants";
import authApi from "../../services/auth";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [logout] = authApi.useLogoutMutation();


  return (
    <nav className="bg-[#282c34] px-10 py-5 flex justify-between items-center text-[#ffd900]">
      <Link
        to="/"
        className="font-semibold text-2xl hover:underline hover:brightness-110 transition"
      >
        todo
      </Link>
      <div className="flex gap-3 items-center">
        {
          isAuthenticated ?
            <Link to={APP_ROUTE.HOME}>
              <Button title="Log Out" onClick={logout}/>
            </Link>
          : <>
            <Link
              to={APP_ROUTE.SIGN_UP}
            >
              <Button title={"Sign Up"} />
            </Link>
            <Link
              to={APP_ROUTE.LOG_IN}
            >
              <Button title={"Log In"}/>
            </Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
