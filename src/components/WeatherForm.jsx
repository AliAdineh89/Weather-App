import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import useAsync from "../hooks/useAsync";
import { getLocationData } from "../apis/getWeatherData";
import { useCallback } from "react";

const WeatherForm = ({ units, onQueryChange, onUnitChange }) => {
  const locationApi = useAsync(getLocationData, false);
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") onQueryChange(city);
  };

  const handleLocationClick = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const locationRes = await locationApi.execute({
          units,
          lat,
          lon,
        });

        onQueryChange(locationRes.timezone.split("/")[1]);
      });
    }
  }, [locationApi, onQueryChange]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) onUnitChange(selectedUnit);
  };

  return (
    <div className=" flex flex-row justify-center my-6">
      <div className=" flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search...."
          className="text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none"
        />
        <UilSearch
          size={25}
          className=" text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={25}
          className=" text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className=" flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className=" text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className=" text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className=" text-xl text-white font-light hover:scale-125 transition ease-out"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default WeatherForm;
