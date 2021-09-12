const { useState, useEffect } = require("react");

const Weather = () => {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  //   const [url, setURL] = useState();
  //   const [celsius, setCelsius] = useState(0);
  //   const [icon, setIcon] = useState();
  const [data, setData] = useState([]);

  let temperatureVal = document.querySelector("#temp-val");
  let location = document.querySelector("#location");
  let temperatureDesc = document.querySelector("#temp-desc");
  let iconCanvas = document.querySelector("#icon");

  const getWeather = (lat, lon) => {
    const apiKey = process.env.WEATHER_APIKEY; // API key
    const baseURL = `https://api.openweathermap.org/data/2.5/weather`; // Base URL
    let queryString = `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // Query for URL
    let url = baseURL + queryString;

    // Function: Convert data into JSON format
    const waitForData = (res) => {
      if (res.ok) {
        return res.json();
      }
    };

    const mapData = (data) => {
      const mapped = {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      };

      return mapped;
    };

    // Function: Extract data
    const storeData = (weatherData) => {
      if (Object.entries(weatherData).length) {
        const extractedData = mapData(weatherData);
        return extractedData;
      }
    };

    // Function: Catch errors and display in console
    const displayErr = (err) => {
      console.log(err.textStatus);
    };

    return fetch(url, {
      method: "GET",
    })
      .then(waitForData)
      .then(storeData);
  };

  useEffect(() => {
    // Get locational data from device
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude && position.coords.longitude) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      }
    });

    getWeather(lat, lon)
      .then((apiData) => {
        setData(apiData);
      })
      .catch(displayErr);
  }, [lat, lon]);

  // Function: Set icon based on weather API code
  const setSkycon = () => {
    // Corresponding skycon name based on weather API code
    const iconName = {
      "01d": "clear-day",
      "01n": "clear-night",
      "02d": "partly-cloudy-day",
      "02n": "partly-cloudy-night",
      "03d": "cloudy",
      "03n": "cloudy",
      "04d": "cloudy",
      "04n": "cloudy",
      "09d": "showers-day",
      "09n": "showers-night",
      "10d": "rain",
      "10n": "rain",
      "11d": "thunder-rain",
      "11n": "thunder-rain",
      "13d": "snow",
      "13n": "snow",
      "50d": "fog",
      "50n": "fog",
    };

    const skycon = new Skycons({ monochrome: false });
    skycon.play();
    return skycon.set(iconCanvas, iconName[data.icon]);
  };

  const toggleTempUnit = () => {
    if (document.querySelector(".temp-val span").innerHTML === "C") {
      document.querySelector(".temp-val span").innerHTML = "F";
      temperatureVal.innerHTML = ((data.temp * 9) / 5 + 32).toFixed(2);
    } else {
      document.querySelector(".temp-val span").innerHTML = "C";
      temperatureVal.innerHTML = data.temp.toFixed(2);
    }
  };

  return (
    <div id="weather-section">
      <div className="location">
        <input
          type="text"
          name="location"
          id="location"
          placeholder={`${data.city} | ${data.country}`}
        />
        <canvas
          id="icon"
          width="128"
          height="128"
          onChange={setSkycon}
        ></canvas>
      </div>
      <div className="temperature">
        <div className="temp-val" onClick={toggleTempUnit}>
          <h2 id="temp-val">{data.temp.toFixed(2)}</h2>
          <span>C</span>
        </div>
        <h4 id="temp-desc">{data.description}</h4>
      </div>
    </div>
  );
};

module.exports = Weather;
