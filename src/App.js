import "./App.css";

import TopMenu from "./components/TopMenu";
import WeatherForm from "./components/WeatherForm";
import TimeAndLocation from "./components/TimeAndLocation";
import TempreatureAndDetails from "./components/TempreatureAndDetails";
import Forecast from "./components/Forecast";
import { getFormatedWeatherData } from "./services/weatherService";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AhmedTimeAndLocation from "./components/AhmedTimeAndLocation";
import useAsync from "./hooks/useAsync";
import { getWeatherData } from "./apis/getWeatherData";
import { get } from "lodash";

// TODO: Fuck you learn typescript.

function App() {
  const [query, setQuery] = useState("berlin"); // TODO: useState will be much easier if we store primitive types.
  const [units, setUnits] = useState("metric");
  const { value, error, status, execute } = useAsync(getWeatherData, false);

  const [weather, setWeather] = useState(null);

  // ! BITCH I ADDED THIS useMemo for better performance.
  const styleCss = useMemo(() => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  }, [weather, units]);

  const handleTopButtonClick = useCallback((buttonData) => {
    setQuery(buttonData);
  }, []);

  const handleQueryChange = useCallback(
    (inputData) => {
      setQuery(inputData);
    },
    [units]
  );

  const handleUnitChange = useCallback(
    (unitData) => {
      setUnits(unitData);
    },
    [query]
  );

  // useEffect(() => {
  //   // TODO: Imagine you have 2 or 3 or more fetches? also don't use the pattern async inside a useEffect as there are many libraries can do this shit
  //   const fetchWeather = async () => {
  //     const message = query.q ? query.q : "current location.";

  //     toast.info(`Fetching weather for ${message}`);

  //     // TODO: Always handle async operations with try and catch.
  //     const res = await getFormatedWeatherData({ ...query, units });
  //     setWeather(res);
  //     toast.success(
  //       `Successfully fetched weather for ${res.name}, ${res.country}`
  //     );
  //   };

  //   fetchWeather();
  // }, [query, units]);

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
        `Successfully fetched weather for ${value.name}, ${value.country}`
      );
    }
  }, []);

  useEffect(() => {
    execute({ infoType: "weather", q: query, units });
  }, [query, units, execute]);

  if (error) {
    toast.success(`API failed! ${error.message}`);

    return <div>API FAILED: {error.statusText}</div>;
  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${styleCss}`}
    >
      {/* // ! Learn the loosely couple component rather than tight couple component. @see https://nordicapis.com/the-difference-between-tight-coupling-and-loose-coupling/ !  */}
      {/* // TODO: SCSR Single Component Single Responsibility. SOLID principles */}
      <TopMenu onItemClick={handleTopButtonClick} />
      <WeatherForm
        units={units}
        onQueryChange={handleQueryChange}
        onUnitChange={handleUnitChange}
      />

      {value && (
        <div>
          <AhmedTimeAndLocation weatherResponse={value} />
        </div>
      )}

      {weather && (
        <div>
          {/* <TimeAndLocation weather={weather} /> */}
          <TempreatureAndDetails weather={weather} />

          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
