const { default: axios } = require("axios");

class Searches {
  history = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {
    // TODO: Read DB if exists
  }

  async city(place = "") {
    // Request
    console.log(place);
    const resp = await axios.get("https://reqres.in/api/users?page=2");
    console.log(resp.data);

    return []; // Return matches places
  }
}

module.exports = Searches;
