import { Link } from "react-router-dom";
import { Button } from "../../components";
import { APP_ROUTE } from "../../constants";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Take Control of Your Day
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-6">
        Plan, prioritize, and stay productive with our intuitive task manager. Simplify your work and personal life in one place.
      </p>
      <Link to={APP_ROUTE.TODO}>
        <Button title={"Add Your First Task"} isbgThemeLight />
      </Link>
    </div>
  );
};

export default HomePage;
