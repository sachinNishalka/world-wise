import React from "react";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>
      <Outlet></Outlet>

      <footer className={Styles.footer}>
        <p className={Styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
        </p>
      </footer>
    </div>
  );
}
