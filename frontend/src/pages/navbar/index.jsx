import { Link } from "react-router-dom";
import { Button } from "../../components";

const Navbar = () => {
  return (
    <nav className="bg-[#282c34] px-10 py-5 flex justify-between items-center text-[#ffd900]">
      <Link
        to="/"
        className="font-semibold text-2xl hover:underline hover:brightness-110 transition"
      >
        todo
      </Link>
      <div className="flex gap-3 items-center">
        <Link
          to="/signup"
        >
          <Button title={"Sign Up"}/>
        </Link>
        <Link
          to="/login"
        >
          <Button title={"Log In"}/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
