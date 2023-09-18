import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./Checkout.module.css";

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);
  return (
    <Select
      className={styles.checkCountry}
      options={countries}
      value={selectedCountry}
      onChange={(selectedOption) => setSelectedCountry(selectedOption)}
    />
  );
};

export default CountrySelect;
