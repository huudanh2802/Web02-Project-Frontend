/* eslint-disable */
import * as fa from "react-icons/fa";

import {  Nav, Navbar,Image, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuData } from "./MenuData";
import "./Menu.css";
import { IconContext } from "react-icons";

import "./Menu.css";

export default function Menu  ()  {

  return (
    <>
    <Container className="menu-container" >
      <Row>
      <Navbar className="navbar">
      <IconContext.Provider value={{ color: "#fff" }}>
        <Col lg={2} style={{height:"inherit"}}>
          <Image src="assets/kahot-logo.png" fluid className="logo"/>
        </Col>
     <Col lg={8} style={{height:"inherit"}}>
     <ListGroup className={"nav-menu"}>
          {MenuData.map((item, index) => {
            return (
              <ListGroup.Item
                key={index}
                className={item.cName}
              >
                <Link to={item.path}>
                  <p className="router-icon"> 
                  {item.icon}

                  </p>

                </Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
     </Col>
        <Col lg={2} style={{height:"inherit"}}>
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
        </Col>
        </IconContext.Provider>
        </Navbar>
      </Row>
    </Container>
    </>
  );
};

