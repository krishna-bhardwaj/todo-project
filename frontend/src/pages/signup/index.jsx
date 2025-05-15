import React from "react";
import "../styles/signup.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const response = await fetch("http://localhost:5000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    const json = await response.json(); 
    if(json.message === "You have registered.") {
      alert("You have registered. Proceed to Log In.");
      navigate("/login");
    }
    else alert(json.message);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleRegister}>
        <div className="signup-row">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="signup-row">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="username"
            name="username"
          />
        </div>
        <div className="signup-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            minLength={5}
            required
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" id="signup" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
