/* eslint-disable */
import * as fa from "react-icons/fa";

import { Card, Col, Row, Form, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
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

          <ListGroup.Item style={{ marginTop: "auto" }}>
            <Container>
              <Row>
                <Col>
                  <img src="assets/avatar.svg" width="40px" alt="" />
                </Col>
                <Col>
                  <Row>
                    <h3 className="m-auto">Khoi Doan</h3>
                  </Row>
                  <Row>
                    <h4 className="m-auto">example@gmail.com</h4>
                  </Row>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        </ListGroup>
      </IconContext.Provider>
    </>
  );
};

export default Menu;
