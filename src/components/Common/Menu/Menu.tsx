/* eslint-disable */
import * as fa from "react-icons/fa";

import {  Nav, Navbar,Image, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuData } from "./MenuData";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

import "./Menu.css";

export default function Menu  ()  {
  const [user,setUser]=useState("");
  // Routing
  const navigate = useNavigate();

  useEffect(()=>{
    const localEmail=localStorage.getItem('email');
    if(localEmail){
      setUser(localEmail);      
    }  
  },[])
  return (
    <>
    <Container className="menu-container"  >
      <Row>
      <Navbar className="navbar">
      <IconContext.Provider value={{ color: "#fff" }}>
        <Col lg={2} style={{height:"inherit"}}>
          <Image src="/assets/kahot-logo.png" className="logo"/>
        </Col>
        <Col lg={7} style={{height:"inherit"}}>
        <ListGroup className={"nav-menu"}>
              {MenuData.map((item, index) => {
                return (
                  <ListGroup.Item
                    key={index}
                    className={item.cName}
                    style={{backgroundColor: "#318f9b", border: "#318f9b"}}
                  >
                    <Link to={item.path}>
                      <p className="router-icon" style={{ textAlign: "center" }}> 
                      {item.icon}
                      </p>

                    </Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
        </Col>
            <Col lg={3} style={{height:"inherit"}}>
            <Nav
                className="ms-auto"
                style={{ display: "flex", flexDirection: "row", padding: "0 1rem",  alignItems: "center" ,justifyContent:"flex-end"}}
              >

                <Nav.Link href="#profile" style={{ color: "white", alignItems: "center" , paddingTop: "12px", paddingLeft: "8px"}}>
                  <img
                    src="/assets/profileAvatar.png"
                    style={{ width: 30, height: 30, marginRight: "3px", marginBottom: "3px" }}
                  />
                  {user}
                </Nav.Link>
                <Nav.Link 
                  onClick={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    navigate("/login");
                  }} 
                  style={{ color: "white", textDecoration: "underline" }}>
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

