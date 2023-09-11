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


const getLocationData = async ({ lat, lon, units = 'imperial' }) => {
  const onecallSearch = new URLSearchParams({
    units,
    appid: WEATHER_API_KEY,
    lat,
    lon,
    exclude: 'current,minutely,alerts'
  });

  const oncallLocationRes = await httpClient({
    url: `${BASE_URL}/onecall?${onecallSearch.toString()}`,
    method: "GET",
  });

  return oncallLocationRes
}


const getWeatherData = async ({ q, units = 'imperial' }) => {
  const weatherSearch = new URLSearchParams({
    q,
    units,
    appid: WEATHER_API_KEY,
  });

  const weatherLocationRes = await httpClient({
    url: `${BASE_URL}/weather?${weatherSearch.toString()}`,
    method: "GET",
  });

  const oncallLocationRes = await getLocationData({
    units,
    lat: weatherLocationRes.coord.lat,
    lon: weatherLocationRes.coord.lon,
  });

  console.log('==>>', {
    weatherLocationRes,
    oncallLocationRes
  })

  return {
    weatherLocationRes,
    oncallLocationRes
  }
}



export { getWeatherData, getLocationData };
