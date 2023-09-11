import "./App.css";

import TopMenu from "./components/TopMenu";
import WeatherForm from "./components/WeatherForm";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AhmedTimeAndLocation from "./components/AhmedTimeAndLocation";
import useAsync from "./hooks/useAsync";
import { getWeatherData } from "./apis/getWeatherData";
import AhmedTempreatureAndDetails from "./components/AhmedTempreatureAndDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [query, setQuery] = useState("berlin");
  const [units, setUnits] = useState("metric");
  const { value, error, status, execute } = useAsync(getWeatherData, false);

  const styleCss = useMemo(() => {
    if (!value) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (value.weatherLocationRes.main.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  }, [value, units]);

  const handleTopButtonClick = useCallback((query) => {
    setQuery(query);
    execute({ q: query, units });
  }, [units, execute]);

  const handleQueryChange = useCallback(
    (query) => {
      setQuery(query);
      execute({ q: query, units });
    },
    [units, execute]
  );

  const handleUnitChange = useCallback(
    (units) => {
      setUnits(units);
      execute({ q: query, units });
    },
    [query, execute]
  );


  useEffect(() => {
    if (status === "pending") {
      const message = query ? query : "current location.";
      toast.info(`Fetching weather for ${message}`);
    } else if (status === "error") {
      toast.error(`API failed!!! Fuck you Ali`);
    }
  }, []);

  useEffect(() => {
    if (status === "success") {
      toast.success(
        `Successfully fetched weather for ${query}, ${value.weatherLocationRes.sys.country}`
      );
    }
  }, [status, query, value]);

  useEffect(() => {
    execute({ q: query, units });
  }, []);

  if (error) {
    toast.success(`API failed! ${error.message}`);
  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${styleCss}`}
    >
      {/* // ! Learn the loosely couple component rather than tight couple component. @see https://nordicapis.com/the-difference-between-tight-coupling-and-loose-coupling/ !  */}
      <TopMenu onItemClick={handleTopButtonClick} />
      <WeatherForm
        units={units}
        onQueryChange={handleQueryChange}
        onUnitChange={handleUnitChange}
      />

      {value && (
        <div>
          <AhmedTimeAndLocation weatherResponse={value.weatherLocationRes} weatherOnecallResponse={value.oncallLocationRes} />
          <AhmedTempreatureAndDetails weatherResponse={value.weatherLocationRes} weatherOnecallResponse={value.oncallLocationRes} />

          <DailyForecast oncallLocationRes={value.oncallLocationRes} icon={value.weatherLocationRes.weather[0].icon} />

          <HourlyForecast oncallLocationRes={value.oncallLocationRes} icon={value.weatherLocationRes.weather[0].icon} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
