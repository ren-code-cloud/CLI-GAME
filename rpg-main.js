import {GridObject} from "./gridObject.js";
import { ItemObject } from "./itemObject.js";
import { EnemyObject } from "./enemyObject.js";
import { Player } from "./player.js"
import { displayFigletText, 
         promptPlayerForGame, 
         displayWinText,
         displayLoseText} from "./playerPrompt.js"
import { createSpinner } from 'nanospinner'
import inquirer from "inquirer";
import clear from "console-clear";
import gradient from "gradient-string";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import fs from 'fs-extra'


class Grid {
  #currentObject;
  constructor(rows, cols, playerX = 0, playerY = rows -1){
    this.rows = rows;
    this.cols = cols;
    this.playerX = playerX;
    this.playerY = playerY;
    this.player = new Player("Warrior", {attack: 20, defense: 10, hp: 20});
    this.grid = []
    for (let i = 0; i < this.rows; i++) {
      let row = []
      for (let j = 0; j < this.cols; j++) {
        row.push(new GridObject());
      }
      this.grid.push(row);
    }
    this.grid[this.rows - 1][0] = new GridObject("🧝", "Player")
    this.grid[0][this.cols - 1] = new GridObject("👸", "queen");
    //this.startGame();
    this.introGame();
  }
  
  async introGame() {
    clear(true);
    console.log("\n\n\n");
    const name = await displayFigletText();
    console.log(`\n${gradient.passion(name)}\n`);
    console.log(`\t\t\t${chalk.hex('#F11A7B').bgHex("#3E001F").bold("  ADVENTURE  ")}`);
    console.log("\n\n\n");
    const prompt = await promptPlayerForGame();
    if(prompt === "Play") {
      clear(true);
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n")
      const spinner = createSpinner('Loading....').start();
      setTimeout(() => {
      spinner.success();
      this.startGame();
      }, 3000);
      } else if(prompt === "Instructions") {
      clear(true);
     
      (async () => {
       try {
          const data = await fs.readFile('./readme.txt', 'utf8');
          console.log(data);
          const back = await inquirer.prompt({
                    type: "list",
                    name: "backOp",
                    message: "🔙 :",
                    choices: ["Back", "Exit"],
                    });

                   if (back.backOp === "Back") {
                   this.introGame();
                   } else {
                   console.log("Exiting...");
                   return;
                    }
           } catch (err) {
           console.error('Error reading the file:', err);
           }
        })();
        clear(true);
    } else {
      process.exit();
    }
  }

 async startGame() {
   console.clear();
   this.displayGrid();
   this.promptDirection = async () => {
      const { direction } = await inquirer.prompt([
        {
          type: "input",
          name: "direction",
          message: "Enter direction :"+
                   "\nW = 🔺 : S = 🔻 : D = ▶️ : A = ◀️ : Q - EXIT\n :",
        }]);
        if (direction === "d") {
          this.moveRight();
        } else if (direction === "a") {
          this.moveLeft();
        } else if (direction === "w") {
          this.moveUp();
        } else if (direction === "s") {
          this.moveDown();
        } else if (direction === 'q') {
          return;
        } else {
          console.log("Invalid input");
        }
       console.clear();
       this.displayGrid();
       this.promptDirection(); // Recursively ask for the next direction
    }
    this.promptDirection();
}
async displayGrid() {
    console.log("\n\n\n");
    if(this.#currentObject != undefined){
      if(this.#currentObject.type === "discovered") {
       this.#currentObject.describe(this.player.name);
      }
     if(this.#currentObject.type === "item") {
       this.#currentObject.describe();
       const itemStats = this.#currentObject.getStats();
       this.player.addToStats(itemStats);
     }
     if(this.#currentObject.type === "enemy") {
     this.#currentObject.describe();
     const enemyStats = this.#currentObject.getStats();
     const enemyName = this.#currentObject.getName();
     const playerStats = this.player.getStats();
     if(enemyStats.defense > playerStats.attack) {
       //console.log(`You lose - ${enemyStats.name} was too powerful`);
       const name = await displayLoseText();
       console.log(`\n${gradient.passion(name)}\n`);
       process.exit();
     }
     let totalPlayerDamage = 0;
     while(enemyStats.hp > 0 ){
       const enemyDamageTurn = playerStats.attack - enemyStats.defense;
       const playerDamageTurn = enemyStats.attack - playerStats.defense;
       if(enemyDamageTurn > 0) {
         enemyStats.hp -= enemyDamageTurn;
         console.log("Enemy Hp : " + enemyStats.hp);
         console.log(`Enemy Damage : ${enemyDamageTurn}`)
         if(enemyStats.hp < 0) {
           console.log(`Total Enemy Damage : ${totalPlayerDamage}`);
         }
       }
       if(playerDamageTurn > 0) {
         playerStats.hp -= playerDamageTurn;
         totalPlayerDamage += playerDamageTurn;
         console.log(`Player HP : ${playerStats.hp}`);
         console.log(`Player Damage : ${enemyDamageTurn}`);
       }
     
     }
      if(playerStats.hp <= 0) {
         console.log(`Total Enemy Damage : ${totalPlayerDamage}`);
         console.log(`You lose - ${enemyName} was too powerful`);
         process.exit();
       }
       this.player.addToStats({hp: - totalPlayerDamage})
       console.log(`You defeated the ${enemyName}! Your udated Status! `);
     }
    }
    console.log("-----------------------------------------------")
    this.player.describe();
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        process.stdout.write(this.grid[row][col].sprite);
        process.stdout.write("  ");
      }
      process.stdout.write("\n");
    }
  }
  
 generateGridObject() {
     const  spider = {name: "Spider", char: "🕷️", attack: 10, defense : 5, hp: 10};
     const  dino = {name: "Dino", char: "🦖", attack: 15, defense: 10, hp: 15};
     const dragon = {name: "Dragon", char: "🐉", attack: 20, defense: 15,hp: 20};
     const enemies = [spider,dino,dragon]
     const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
     const random = Math.random();
     console.log(random)
     let object;
    
    if(random < 0.15) {
      object = new ItemObject("⚔️", {
        name: "Swords",
        attack: 3,
        defense: 1,
        hp: 0,
      });
    } else if (random < 0.40) {
         object = new EnemyObject(randomEnemy.char,
          {
           name: randomEnemy.name,
           attack: randomEnemy.attack,
           defense: randomEnemy.defense,
           hp: randomEnemy.hp,
          });
    } else {
      object = new GridObject("👣", "discovered");
    }
    return object;
  }
  
  async executeTurn() {
    if (this.grid[this.playerY][this.playerX].type === "queen") {
    const winGame = await `\t   🎊 Congrats warrior you save the Queen! 🎉`;
    const name = await displayWinText();
    console.log(`\n${gradient.passion(name)}\n`);
    console.log(winGame);
    process.exit();
    }
  }
   moveRight() {
     if (this.playerX === this.cols - 1) {
        console.log("Bawal na jan tanga");
        return;
      }
      
      this.grid[this.playerY][this.playerX] = new GridObject("👣","discovered");
      this.playerX += 1;
      
      if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridObject("🧝");
      return;
      }
       this.#currentObject = this.generateGridObject();
       this.executeTurn();
       this.grid[this.playerY][this.playerX] = new GridObject("🧝");
  }
   moveLeft() {
      if (this.playerX === 0) {
        console.log("Bawal ma jan tanga");
        return;
      }
      this.grid[this.playerY][this.playerX] = new GridObject("👣","discovered");
      this.playerX -= 1;
      
      if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridObject("🧝");
      return;
      }
       this.#currentObject = this.generateGridObject();
       this.executeTurn();
       this.grid[this.playerY][this.playerX] = new GridObject("🧝");
  }
   moveUp() {
      if (this.playerY === 0) {
        console.log("Bawal ma jan tanga");
        return;
      }
      this.grid[this.playerY][this.playerX] = new GridObject("👣","discovered");
      this.playerY -= 1;
      
      if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridObject("🧝");
      return;
      }
       this.#currentObject = this.generateGridObject();
       this.executeTurn();
       this.grid[this.playerY][this.playerX] = new GridObject("🧝");
  }
   moveDown() {
      if (this.playerY === this.rows - 1) {
        console.log("Bawal ma jan tanga");
        return;
      }
      this.grid[this.playerY][this.playerX] = new GridObject("👣","discovered");
      this.playerY += 1;
      
      if (this.grid[this.playerY][this.playerX].type === "discovered") {
      this.grid[this.playerY][this.playerX].describe();
      this.grid[this.playerY][this.playerX] = new GridObject("🧝");
      return;
      }
       this.#currentObject = this.generateGridObject();
       this.executeTurn();
       this.grid[this.playerY][this.playerX] = new GridObject("🧝");
  }
}

new Grid(15,15);