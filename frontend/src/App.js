import Navbar from "./components/navbar";
import Footer from "./components/pageFooter";

const App = () => {
    return <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1">
        this is main page
      </div>
      <Footer />
    </div>
};

export default App;
