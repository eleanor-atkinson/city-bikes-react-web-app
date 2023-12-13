import Home from "./Home";
import { Routes, Route, Link, Navigate } from "react-router-dom";
// import { useState } from "react";
// import UserList from "./users/list";
// import UserDetails from "./users/details";
// import SignIn from "./users/signin";
// import Account from "./users/account";
// import store from "./store";
// import { Provider } from "react-redux";
import Navigation from "./Navigation";
import Search from "./Search/search";
import Details from "./Details";
import StationDetails from "./StationDetails";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ProfileOthers from "./profile/profile-others";
import Signin from "./users/signin";
import Profile from "./profile";
import UserTable from "./users/table";
import Signup from "./users/signup";
import "./index.css";
import API from "./api-credits";


// import CurrentUser from "./users/currentUser";

function Project() {
    
    // const [key, setKey] = useState("home"); // state variable 

    return (
        <Provider store={store}>
        <div>
            <div>
                    <Navigation />
                    </div>
                    <div className="container-fluid px-3 background-color">
                            <Routes>
                            <Route path="/*" element={<Navigate to="/home"/>} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/login" element={<Signin />} />
                                <Route path="/register" element={<Signup />} />
                                <Route path="/admin/users" element={<UserTable />} />
                                <Route path="/search" element={<Search/>} />
                                <Route path="/search/:searchTerm" element={<Search/>} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="profile/:userId" element={<ProfileOthers />} />
                                <Route path="/details/:resultId" element={<Details/>} />
                                <Route path="/credits" element={<API/>} />
                                <Route path="/details/:resultId/stationdetails/:stationId" element={<StationDetails />} />
                            </Routes>
                        </div>
                    </div>
                    </Provider>
            );
}

            export default Project;