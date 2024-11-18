// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import ReactCountryFlag from "react-country-flag";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const { lat, lng } = useUrlPosition();

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(
    function () {
      // if there is no latitute and logitute no need to fetch the location
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeoCoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn`t seem to be a country. Click somewhere else 😊"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
          setIsLoadingGeoCoding(false);
        } catch (error) {
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeoCoding) return <Spinner></Spinner>;

  if (geoCodingError) return <Message message={geoCodingError}></Message>;

  if (!lat && !lng)
    return <Message message={"Start by clicking on the map"}></Message>;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag
            countryCode={emoji}
            svg
            style={{
              width: "1em",
              height: "1em",
            }}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
