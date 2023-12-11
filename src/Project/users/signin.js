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
      <div className="col-12">
      <label htmlFor="username" className="form-label">
                    Enter your username:
                  </label>
      <input 
      type="text"
      className="form-control"
      id="username"
      value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      </div>
      <div className="col-12">
      <label htmlFor="password" className="form-label">
                    Enter your password:
                  </label>
      <input 
       type="text"
       className="form-control"
       id="password"
       value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      </div>
      <br></br>
      <button className="btn btn-success" onClick={signin}> Login </button>
      <br></br>
      <br></br>
      <div className="pb-2">
                      <img src="../bike-login.jpg" class="img-fluid" alt="Description of the image"></img>
                    </div>
    </div>
  );
}
export default Signin;