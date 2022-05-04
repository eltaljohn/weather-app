require("colors");
const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("Seleccione una opción".white);
  console.log("======================\n".green);
  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "pause",
      message: `\n Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length == 0) {
          return "Please type a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancell",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirmation = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedAt ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Delete",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirmation,
  showCheckList,
};
