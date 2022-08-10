const fs = require("fs");

const { default: axios } = require("axios");

class Searches {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    // TODO: Read DB if exists
    this.readDB();
  }

  get historyCapitalaized() {
    return this.history.map((place) => {
      let words = place.split(" ");
      words = words.map((w) => w[0].toUpperCase() + w.substring(1));

      return words.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async city(place = "") {
    try {
      // HTTP request

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      })); // Return matches places
    } catch (error) {
      return [];
    }
  }

  async weatherByPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          ...this.paramsOpenWeather,
        },
      });

      const resp = await instance.get();

      return {
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
        temp: resp.data.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.history = this.history.splice(0, 5);

    this.history.unshift(place.toLocaleLowerCase());

    // Save on DB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);
    console.log("data", data);

    this.history = data.history;
  }
}

module.exports = Searches;
