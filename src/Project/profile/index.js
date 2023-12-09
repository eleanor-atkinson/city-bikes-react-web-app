// import React, { useState, useEffect } from "react";
// import { profile, logout, profileThunk, logoutThunk } from "../users/service";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import * as client from "../client";
// import * as userService from "../users/service";
import { Link } from "react-router-dom";
// import moment from "moment";
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as service from "../client";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [likes, setLikes] = useState([]);
  
  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  }

  const fetchUser = async () => {
    const account = await client.account();
    setCurrentUser(account);
    await fetchLikes(account._id);
  };
  const save = async () => {
    await client.updateUser(currentUser);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };

  // const [currentUser, setCurrentUser] = useState({});

  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-50">
      <h1>Account</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      {currentUser && (
        <div>
          <input value={currentUser.password}
            onChange={(e) => setCurrentUser({ ...currentUser,
              password: e.target.value })}/>
          <input value={currentUser.firstName}
            onChange={(e) => setCurrentUser({ ...currentUser,
              firstName: e.target.value })}/>
          <input value={currentUser.lastName}
            onChange={(e) => setCurrentUser({ ...currentUser,
              lastName: e.target.value })}/>
          <select onChange={(e) => setCurrentUser({ ...currentUser,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
          </select>
          <button onClick={save}>
            Save
            </button>
            <button onClick={signout}>
              Signout
              </button>
              <Link to="/project/admin/users" className="btn btn-warning w-100">
                Users
                </Link>
                <hr/>
                <h3>Stations I like</h3>
                <div className="list-group">
                  {
                    likes.map(like =>
                      <Link className="list-group-item"
                      to={`/project/details/${like.station.networkId}/stationdetails/${like.stationId}`}>
                        {like.station.name}
                        {like.station.networkId}
                      </Link>)
                  }
                  </div>
                <pre>
                  {JSON.stringify(likes, null, 2)}
                </pre>

        </div>
      )}
    </div>
  );
}
export default Profile;