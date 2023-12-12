import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHome4Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsCalendar4Week } from "react-icons/bs";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { Navbar, Nav, Button } from "react-bootstrap";
import { VscThreeBars } from "react-icons/vsc";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFaceKissWinkHeart } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { FaPersonBiking } from "react-icons/fa6";

function Navigation() {
    const links = {
        home: <RiHome4Fill />,
        search: <BsFillPatchQuestionFill />,
        login: <FaPersonCircleQuestion />,
        register: <PiPencilSimpleLineFill />,
        profile: <FaPersonBiking />,
        credits: <FaFaceKissWinkHeart />,
    };
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isUserProfile = pathname === "/profile";

    // Transform links into breadcrumbs when the screen is small
    const isSmallScreen = window.innerWidth <= 768;

    const handleBreadcrumbClick = (link) => {
        navigate(link === "profile" && !isUserProfile ? "/profile" : `/${link}`);
    };

    return (
        <Navbar bg="success" expand="lg" variant="dark" className="font-weight-bold">
            <Navbar.Brand className="text-light font-custom"> CityBikes.com</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                {isSmallScreen && (
                    <Nav className="mr-auto flex-column">
                        <Button variant="outline-light" onClick={() => handleBreadcrumbClick("")}>
                            <VscThreeBars style={{ color: "white" }} />
                        </Button>
                        {Object.entries(links).map(([link, icon], index) => (
                            <Button
                                key={index}
                                onClick={() => handleBreadcrumbClick(link)}
                                variant="outline-light"
                                className={`font-weight-bold pl-2 ${link === "profile" && isUserProfile && "active"} ${link !== "profile" && pathname.includes(link) && "active"}`}
                            >
                                {icon} {link}
                            </Button>
                        ))}
                    </Nav>
                )}
                {!isSmallScreen && (
                    <Nav className="mr-auto">
                        {Object.entries(links).map(([link, icon], index) => (
                            <Nav.Item key={index}>
                                <Link
                                    to={link === "profile" && !isUserProfile ? "/profile" : `/${link}`}
                                    className={`nav-link text-light font-weight-bold ${link === "profile" && isUserProfile && "active"} ${link !== "profile" && pathname.includes(link) && "active"}`}
                                >
                                    <span className="float-right pr-3"> {icon} </span>
                                    {link}
                                </Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
