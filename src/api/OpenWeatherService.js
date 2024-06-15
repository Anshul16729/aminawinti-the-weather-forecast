const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "c19a178f93408f4e48150a7f38397bac";

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

const options = {
  method: "GET",
  url: "https://open-weather13.p.rapidapi.com/city/fivedaysforcast/30.438/-89.1028",
  headers: {
    "X-RapidAPI-Key": "22b2234109msh63555a57d9b85bdp11a1c4jsn028e87ac2484",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  },
};

export async function fetchInCities() {
  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    console.error(error);
  }
}
