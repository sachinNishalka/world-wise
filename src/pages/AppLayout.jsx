import React from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import Styles from "./AppLayout.module.css";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={Styles.app}>
      <Sidebar></Sidebar>
      <User></User>
      <Map></Map>
    </div>
  );
}
