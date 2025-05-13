import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../store/loginContext";
const Navbar = () => {
  const { logged_in, dispatchTasks } = useContext(LoginContext);
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1>todo</h1>
      </Link>
      <div className="links">
        {!logged_in ? (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"signup"}>Sign Up</Link>
          </>
        ) : (
          <Link
            to={"/"}
            onClick={() => {
              dispatchTasks({ type: "LOG_OUT" });
            }}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
