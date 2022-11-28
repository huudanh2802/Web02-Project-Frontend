/* eslint-disable */
import * as fa from "react-icons/fa";

import { Nav, Navbar } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuData } from "./MenuData";
import "./Menu.css";
import { IconContext } from "react-icons";

import "./Menu.css";

const Menu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Navbar className="navbar">
          <Link to="#" className="menu-bars">
            <fa.FaBars onClick={showSidebar} />
          </Link>
          <Nav
            className="ms-auto"
            style={{ display: "flex", flexDirection: "row", padding: "0 1rem",  alignItems: "center" }}
          >
            <Nav.Link href="#profile" style={{ color: "white", alignItems: "center" , paddingTop: "12px", paddingLeft: "8px"}}>
              <img
                src="/assets/profileAvatar.png"
                style={{ width: 30, height: 30, marginRight: "3px", marginBottom: "3px" }}
              />
              Khoi Doan
            </Nav.Link>
            <Nav.Link href="#logout" style={{ color: "white", textDecoration: "underline" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <ListGroup className={sidebar ? "nav-menu active" : "nav-menu"}>
          {MenuData.map((item, index) => {
            return (
              <ListGroup.Item
                onClick={showSidebar}
                key={index}
                className={item.cName}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </IconContext.Provider>
    </>
  );
};

export default Menu;
