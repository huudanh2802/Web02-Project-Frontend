/* eslint-disable */
import * as md from "react-icons/md";
import * as fc from "react-icons/fc";
import * as fa from "react-icons/fa";
import * as ai from "react-icons/ai";

import { Card, Col, Row, Form, Navbar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuData } from "./MenuData";
import "./Menu.css"
import { IconContext } from "react-icons";

import "./Menu.css";

const Menu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Navbar className="navbar">
          <Link to="#" className="menu-bars">
            <fa.FaBars onClick={showSidebar} />
          </Link>
        </Navbar>
        <ListGroup className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          {MenuData.map((item, index) => {
            return (
              <ListGroup.Item onClick={showSidebar} key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </ListGroup.Item>
            )
          })}

          <ListGroup.Item>
            <Container>
              <Row className="m-auto">
                <Col class="md-6">
                  <h2 className="m-auto">Khoi Doan</h2>
                </Col>
                <Col class="md-6">
                  <img src="assets/avatar.svg" width="40px" />
                  <h3 className="m-auto">example@gmail.com</h3>
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
