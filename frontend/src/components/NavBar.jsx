import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav__brand">NovaSprout AI</div>
      <div className="nav__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/child">Child</NavLink>
        <NavLink to="/playground">Playground</NavLink>
        <NavLink to="/parent">Parent</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
