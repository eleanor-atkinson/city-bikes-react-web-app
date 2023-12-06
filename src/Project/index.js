import Home from "./home";
import { Routes, Route, Link } from "react-router-dom";
// import { useState } from "react";
// import UserList from "./users/list";
// import UserDetails from "./users/details";
// import SignIn from "./users/signin";
// import Account from "./users/account";
// import store from "./store";
// import { Provider } from "react-redux";
import Navigation from "./Navigation";
import LogIn from "./login";
import Signup from "./signup";
import Profile from "./profile";
import Search from "./search";
import Details from "./Details";
import StationDetails from "./StationDetails";

// import CurrentUser from "./users/currentUser";

function Project() {
    // const [key, setKey] = useState("home"); // state variable 

    return (
        <div className="container-fluid">
            <div>
                    <Navigation />
                    </div>
                    <div>
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/search" element={<Search/>} />
                                <Route path="/login" element={<LogIn />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/details/:resultId" element={<Details/>} />
                                <Route path="/details/:resultId/stationdetails/:stationId" element={<StationDetails />} />
                            </Routes>
                        </div>
                    </div>
            );
}

            export default Project;