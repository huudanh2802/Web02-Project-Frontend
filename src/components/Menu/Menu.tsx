/* eslint-disable */
import * as md from "react-icons/md";
import * as fc from "react-icons/fc";
import * as fa from "react-icons/fa";
import * as ai from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuData } from "./MenuData";
import "./Menu.css"
import { IconContext } from "react-icons";

const Menu = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
    return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <fa.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
                <Link to ="#" className="menu-bars"/>
            </li>
            {MenuData.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to ={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
      </nav>
      </IconContext.Provider>
      {/* <div className="menu">
        <h1>Menu</h1>
        <div className="container">
          <div className="image">
            <md.MdGroups />
          </div>
          <div className="text">
            <h3>Group List</h3>
          </div>
        </div>

        <div className="container">
          <div className="image">
            <fc.FcInvite />
          </div>
          <div className="text">
            <h3>Invite Member</h3>
          </div>
        </div>

        <div className="container">
          <div className="image">
            <md.MdCreateNewFolder />
          </div>
          <div className="text">
            <h3>New Group</h3>
          </div>
        </div>

        <div className="container">
          <div className="image">
            <md.MdManageAccounts />
          </div>
          <div className="text">
            <h3>Manage User</h3>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Menu;
