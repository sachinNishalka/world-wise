import styles from "./CountryItem.module.css";
import ReactCountryFlag from "react-country-flag";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <ReactCountryFlag
        countryCode={country.emoji}
        svg
        style={{
          width: "2em",
          height: "2em",
        }}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
