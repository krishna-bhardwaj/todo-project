import "../styles/HomePage.css";
import { useContext } from "react";
import { LoginContext } from "../store/loginContext";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { logged_in } = useContext(LoginContext);
  const navigate = useNavigate();
  const handleClick = (e) =>{
    e.preventDefault();
    if(logged_in){
      navigate("/addTask");
    }else{
      alert("You must log in first.")
    }
  }
  return (
    <div className="home-page">
      <div className="home-page-container">
        <h1 className="home-page-heading">Organize your Work and Life</h1>
        <p>
          Become focused, organised and calm with todo app. The world's #1 task
          manager app.
        </p>

        <button
          className="add-todo-button"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default HomePage;
