import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime } from "../services/weatherService";
import { iconUrlFromCode } from "../config/environment";
import { get, startCase } from "lodash";

const AhmedTempreatureAndDetails = ({ weatherResponse }) => {
  const temp_min = get(weatherResponse, "main.temp_min", "");
  const temp_max = get(weatherResponse, "main.temp_max", "");
  const feels_like = get(weatherResponse, "main.feels_like", "");
  const humidity = get(weatherResponse, "main.humidity", "");
  const temp = get(weatherResponse, "main.temp", "");
  const sunrise = get(weatherResponse, "sys.sunrise", "");
  const sunset = get(weatherResponse, "sys.sunset", "");
  const speed = get(weatherResponse, "wind.speed", "");
  const icon = get(weatherResponse, "weather[0].icon", "");
  const description = get(weatherResponse, "weather[0].description", "");
  const timezone = get(weatherResponse, "timezone", "");

  return (
    <div>
      <div className=" flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{startCase(description)}</p>
      </div>

      <div className=" flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className=" text-5xl">{`${temp.toFixed()}°`}</p>
        <div className=" flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Feels like:
            <span className=" font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className=" font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className=" font-medium ml-1">{`${speed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light"></p>
        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light"></p>
        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light"></p>
        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default AhmedTempreatureAndDetails;
