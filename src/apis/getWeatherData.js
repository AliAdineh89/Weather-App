import { BASE_URL, WEATHER_API_KEY } from "../config/environment";

const httpClient = (conf) => {
  return fetch(conf.url, {
    method: conf.method,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw response;
  });
};

const getWeatherData = async (input) => {
  const url = new URL(`${BASE_URL}/${input.infoType}`);
  url.search = new URLSearchParams({
    q: input.q,
    units: input.units,
    appid: WEATHER_API_KEY,
  });

  return httpClient({
    url: url.href,
    method: "GET",
  });
};

export { getWeatherData };
