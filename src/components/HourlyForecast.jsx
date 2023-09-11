import React from "react";
import { iconUrlFromCode } from "../config/environment";
import { formatToLocalTime } from "../services/weatherService";

const HourlyForecast = ({ oncallLocationRes, icon }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 ">
        <p className=" text-white font-medium uppercase">Hourly Forecast</p>
      </div>
      <hr className="my-2" />
      <div className=" flex flex-row items-center justify-between text-white">
        {oncallLocationRes.hourly.slice(0, 6).map(({ temp, dt }) => {
          return (
            <div className=" flex flex-col items-center justify-center">
              <p className=" font-light text-sm">
                {formatToLocalTime(dt, oncallLocationRes.timezone, "hh:mm a")}
              </p>
              <img src={iconUrlFromCode(icon)} className=" w-12 my-1" alt="" />
              <p className=" font-medium">{`${temp.toFixed()}°`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
