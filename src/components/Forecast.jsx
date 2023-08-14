import React from "react";

const Forecast = () => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6 ">
        <p className=" text-white font-medium uppercase">Hourly Forecast</p>
      </div>
      <hr className="my-2" />
      <div className=" flex flex-row items-center justify-between text-white">
        <div className=" flex flex-col items-center justify-center">
          <p className=" font-light text-sm">04:30 PM</p>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Forecast;