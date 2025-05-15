import { Outlet } from "react-router-dom";
import Navbar from "./pages/navbar";
import Footer from "./pages/pageFooter";

const App = () => {
    return <div className="flex flex-col h-full font-mono">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
};

export default App;
