import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signin() {

  // username and password are set to empty strings
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // navigate to different pages/routes
  const navigate = useNavigate();

  // handle sign in logic 
  const signin = async () => {
    await client.signin(credentials);
    navigate("/profile");
  };

  // input values are bound to credentials state 
  return (
    <div>
      <br></br>
      <h1>Login</h1>
      <input value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <input value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button onClick={signin}> Signin </button>
    </div>
  );
}
export default Signin;