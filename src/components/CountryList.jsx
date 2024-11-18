import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import style from "./CountryList.module.css";
import React from "react";
import CountryItem from "./CountryItem.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking a city on the map"}
      ></Message>
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return [...arr];
    }
  }, []);

  console.log(countries);

  return (
    <ul className={style.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}
