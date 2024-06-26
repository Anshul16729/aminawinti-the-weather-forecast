import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchCities, fetchInCities } from "../../api/OpenWeatherService";

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);

    return {
      options: citiesList.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const onChangeHandler = async (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
    await fetchInCities();
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
