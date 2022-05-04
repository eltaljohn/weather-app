const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {
  let opt;

  const searches = new Searches();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Show message
        const place = await readInput("City: ");
        console.log({ place });
        await searches.city(place);

        // Search places

        // Choose a place

        // Weather

        // Show Results
        console.log("\n City info\n".green);
        console.log("City:");
        console.log("Lat:");
        console.log("Lng:");
        console.log("Temperature:");
        console.log("Min:");
        console.log("Max:");
        break;

      case 2:
        console.log("Buscando historial");
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
