const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer");
const Searches = require("./models/searches");
require("dotenv").config();

const main = async () => {
  let opt;

  const searches = new Searches();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Show message
        const term = await readInput("Ciudad: ");

        // Search places
        const places = await searches.city(term);

        // Choose a place
        const idSelected = await listPlaces(places);
        if (idSelected === "0") continue;

        const placeSelected = await places.find((p) => p.id === idSelected);
        const { name, lng, lat } = placeSelected;

        // Save at cache
        searches.addHistory(name);

        // Weather
        const weather = await searches.weatherByPlace(lat, lng);
        const { desc, min, max, temp } = weather;

        // Show Results
        console.clear();
        console.log("\nCity info\n".green);
        console.log("City:", name);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperature:", temp);
        console.log("Min:", min);
        console.log("Max:", max);
        console.log("Description", desc);
        break;

      case 2:
        searches.historyCapitalaized.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
