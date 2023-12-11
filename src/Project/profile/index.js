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
import { current } from "@reduxjs/toolkit";
import "./index.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);


  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  }

  const fetchUser = async () => {

    try {
      const account = await client.account();
      setCurrentUser(account);

      if (account) {
      await fetchLikes(account._id);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setCurrentUser(null);
    }
  };

  // handles when the user edits the profile and clicks save
  const save = async () => {
    await client.updateUser(currentUser);
  };

  // handles when the user signs out 
  const signout = async () => {
    await client.signout();
    navigate("/signin");
  };

  // Function to format join date
  const formatJoinDate = (joinDate) => {
    // Format the joinDate to a more readable format
    return new Date(joinDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  // useEffect hook to fetch user details and likes on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-50">
      <br></br>
      {currentUser ? (
        <div>
          <h1>Check out your profile!</h1>
          <br></br>
          {/* {currentUser && (
            <pre>{JSON.stringify(currentUser, null, 2)}</pre>
          )} */}
          <div className="light-green-text-bubble-profile pt-2">Public Information:</div>
          <br></br>
          {currentUser && (
            <div>
              <h3>Rider Details</h3>
              <div className="list-group">
                <div className="list-group-item">
                  <h3>{currentUser.username}</h3>
                </div>
                <div className="list-group-item"><p>
                  Joined on {formatJoinDate(currentUser.dateOfJoin)}  </p></div>
              </div>
              <br></br>
              <h3>Stations You Like!</h3>
              <div className="list-group">
                {
                  likes.map(like =>
                    <Link className="list-group-item"
                      to={`/details/${like.station.networkId}/stationdetails/${like.stationId}`}>
                      {like.station.name}
                      {like.station.networkId}
                    </Link>)
                }
              </div>
              <br></br>
              <div className="green-text-bubble-profile pt-2">
                Private Information.
              </div>
              <br></br>
              <h3>Click the input fields to edit your profile:</h3>
              <form>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={currentUser.password}
                    onChange={(e) => setCurrentUser({
                      ...currentUser,
                      password: e.target.value
                    })} />
                </div>
                <div className="col-12">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={currentUser.firstName}
                    onChange={(e) => setCurrentUser({
                      ...currentUser,
                      firstName: e.target.value
                    })} />
                </div>
                <div className="col-12">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={currentUser.lastName}
                    onChange={(e) => setCurrentUser({
                      ...currentUser,
                      lastName: e.target.value
                    })} />
                </div>
                {/* <div className="col-12">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                onChange={(e) => setCurrentUser({
                  ...currentUser,
                  role: e.target.value
                })}>
                <option value="USER">User</option>
                <option value="MODERATOR">Moderator</option>
              </select>
            </div> */}
                <br></br>
                <button onClick={save} className="btn btn-success">
                  Save
                </button>
                <button onClick={signout} className="btn btn-danger">
                  Signout
                </button>
              </form>
              <br></br>
              
              {currentUser.role === "MODERATOR" && (
                <>
                Because you are a moderator, you can add and remove users by clicking here.
                  <Link to="/admin/users" className="btn btn-warning w-100">
                    Users
                  </Link>
                </>
              )}
              <br></br>
              <br></br>
              {/* <hr />
              <h3>Stations I like</h3>
              <div className="list-group">
                {
                  likes.map(like =>
                    <Link className="list-group-item"
                      to={`/details/${like.station.networkId}/stationdetails/${like.stationId}`}>
                      {like.station.name}
                      {like.station.networkId}
                    </Link>)
                }
              </div>
              <pre>
                {JSON.stringify(likes, null, 2)}
              </pre> */}

            </div>
          )}
        </div>
         ) : (
          <p>Please log in to view your profile or register if you don't have an account.</p>
        )}
    </div>
  );
}
export default Profile;