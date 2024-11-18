import React from "react";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking a city on the map"}
      ></Message>
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}></CityItem>
      ))}
    </ul>
  );
}
