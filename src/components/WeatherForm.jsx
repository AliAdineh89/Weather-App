import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { toast } from "react-toastify";

// TODO: That is a form and not an input bitch!!!

const WeatherForm = ({ units, onQueryChange, onUnitChange }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") onQueryChange({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users current Location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        onQueryChange({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) onUnitChange(selectedUnit);
  };

  // TODO: Change into form structure to handle keyboard enter properly.
  return (
    <form>
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
    </form>
  );
};

export default WeatherForm;
