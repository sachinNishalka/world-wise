import React from "react";
import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";

export default function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo></Logo>
      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink className={style.ctaLink} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
