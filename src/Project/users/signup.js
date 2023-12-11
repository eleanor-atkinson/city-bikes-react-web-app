import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/profile");
    } catch (err) {
        console.error("Signup error:", err);
      
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred during signup");
        }
      }
  };
  return (
    <div>
      <br></br>
      <h1>Register/Signup</h1>
      {error && <div>{error}</div>}
      <div className="col-12">
      <label htmlFor="username" className="form-label">
                    Enter a username:
                  </label>
      <input
      type="text"
      className="form-control"
      id="username"
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value })} />
          </div>
          <div className="col-12">
          <label htmlFor="password" className="form-label">
                    Enter a password:
                  </label>
      <input
       type="text"
       className="form-control"
       id="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value })} />
          </div>
          <br></br>
      <button className="btn btn-success" onClick={signup}>
        Register
      </button>
      <br></br>
      <br></br>
      <div className="pb-2">
                      <img src="../bike-register.jpg" class="img-fluid" alt="Description of the image"></img>
                    </div>
    </div>
  );
}
export default Signup;