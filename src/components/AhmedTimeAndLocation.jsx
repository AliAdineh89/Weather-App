import React from "react";
import { formatToLocalTime } from "../services/weatherService";

const AhmedTimeAndLocation = ({ weatherResponse, weatherOnecallResponse }) => {
  return (
    <div>
      <div className=" flex items-center justify-center my-6">
        <p className=" text-white text-xl font-extralight">
          {formatToLocalTime(
            weatherResponse.dt,
            weatherOnecallResponse.timezone
          )}
        </p>
      </div>
      <div className=" flex items-center justify-center my-3">
        <p className=" text-white text-3xl font-medium">{`${weatherResponse.name}, ${weatherResponse.sys.country}`}</p>
      </div>
    </div>
  );
};

export default AhmedTimeAndLocation;
