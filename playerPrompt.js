import figlet from "figlet";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import gradient from "gradient-string";

const consoleWidth = 65; // Set the width of your console here

async function displayFigletText() {
  return new Promise((resolve, reject) => {
    figlet.text(
      "QUEST "+
      "FOR THE QUEEN",
      {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: consoleWidth,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          reject(err);
          return;
        }

        const lines = data.split("\n");
        const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
        const padding = Math.floor((consoleWidth - longestLineLength) / 2);
        const spacePadding = " ".repeat(padding);
        const centeredText = lines.map(line => spacePadding + line).join("\n");

        resolve(centeredText)
      }
    );
  });
}
async function displayLoseText() {
  return new Promise((resolve, reject) => {
    figlet.text(
      "GAME OVER",
      {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: consoleWidth,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          reject(err);
          return;
        }

        const lines = data.split("\n");
        const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
        const padding = Math.floor((consoleWidth - longestLineLength) / 2);
        const spacePadding = " ".repeat(padding);
        const centeredText = lines.map(line => spacePadding + line).join("\n");

        resolve(centeredText)
      }
    );
  });
}
async function displayWinText() {
  return new Promise((resolve, reject) => {
    figlet.text(
      "YOU WIN",
      {
        font: "Modular",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: consoleWidth,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          reject(err);
          return;
        }

        const lines = data.split("\n");
        const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
        const padding = Math.floor((consoleWidth - longestLineLength) / 2);
        const spacePadding = " ".repeat(padding);
        const centeredText = lines.map(line => spacePadding + line).join("\n");

        resolve(centeredText)
      }
    );
  });
}

async function promptPlayerForGame() {
  try {
    // Display the figlet text with chalk animation first
     const results = await inquirer.prompt({
      type: "list",
      name: "option",
      message: "Choose one",
      choices: ["Play", "Instructions", "Exit"],
     });
      return results.option;
  } catch(e) {
    console.error(e)
  }
}

export { displayFigletText, promptPlayerForGame, displayWinText, displayLoseText};
