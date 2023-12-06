import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TfiDashboard } from "react-icons/tfi";
import { FaBook } from "react-icons/fa";
import { BsCalendar4Week } from "react-icons/bs";
import { FaPersonCircleQuestion } from "react-icons/fa6";

function Navigation() {
    const links = {
        Home: <CgProfile />,
        Search: <FaPersonCircleQuestion />,
        Login: <TfiDashboard />,
        Signup: <FaBook />,
        Profile: <BsCalendar4Week />,
    };
    const { pathname } = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success font-weight-bold">
            <span className="navbar-brand text-light">Bike Project</span>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav">
                    {Object.entries(links).map(([link, icon], index) => (
                        <li className="nav-item" key={index}>
                            <Link
                                to={`/Project/${link}`}
                                className={`nav-link text-light font-weight-bold ${pathname.includes(link) && "active"}`}
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
