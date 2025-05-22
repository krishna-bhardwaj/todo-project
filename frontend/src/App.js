import { Outlet } from "react-router-dom";
import Navbar from "./pages/navbar";
import Footer from "./pages/pageFooter";
import { authApi } from "./services";
import { useEffect } from "react";

const PageLoader = () => {
  return <div className="h-full flex justify-center items-center bg-black/30">
    <img src="./assets/pageLoader.svg" className="w-24 h-24"/>
  </div>
}

const App = () => {
    const [verify,{isFetching, isUninitialized}] = authApi.useLazyVerifyQuery();

    useEffect(() => {
      verify();
    },[]);

    if(isFetching || isUninitialized) return <PageLoader />

    return <div className="flex flex-col h-full font-mono">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
};

export default App;
