const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "08e70e98a977ea7655a046685d428266"; // TODO: Set a proper naming bitch from API_KEY to WEATHER_API_KEY

export { BASE_URL, WEATHER_API_KEY, iconUrlFromCode };
