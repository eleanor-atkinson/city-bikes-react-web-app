import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { BsCalendar4Week } from "react-icons/bs";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import './index.css';

function Navigation() {
    const links = {
        home: <CgProfile />,
        search: <FaPersonCircleQuestion />,
        login: <FaPersonCircleQuestion />,
        register: <FaBook />,
        profile: <BsCalendar4Week />,
    };
    const { pathname } = useLocation();
    // Check if the current route is the user's own profile
    const isUserProfile = pathname === "/profile";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success font-weight-bold">
            <span className="navbar-brand text-light font-custom"> CityBikes.com</span>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav">
                    {Object.entries(links).map(([link, icon], index) => (
                        <li className="nav-item" key={index}>
                              <Link
                                to={link === "profile" && !isUserProfile ? "/profile" : `/${link}`}
                                className={`nav-link text-light font-weight-bold ${link === "profile" && isUserProfile && "active"} ${link !== "profile" && pathname.includes(link) && "active"}`}
                            >
                                <span className="float-right pr-3"> {icon} </span>
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
        </nav>
    );
}

export default Navigation;
