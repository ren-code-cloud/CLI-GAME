// Define the Character class (base class for Player and Enemy)
class Character {
  constructor(name, health, damage) {
    this.name = name;
    this.health = health;
    this.damage = damage;
  }

  attack(target) {
    console.log(`${this.name} attacks ${target.name}!`);
    const damage = Math.floor(Math.random() * this.damage) + 1;
    target.takeDamage(damage);
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`${this.name} takes ${damage} damage. Current health: ${this.health}`);
    if (this.health <= 0) {
      console.log(`${this.name} has been defeated.`);
    }
  }
  static randomEnemy() {
    const enemies = ["🦖", "🐉", "🐊"];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.enemyResult = randomEnemy;
        resolve(randomEnemy);
      }, 1000);
    });
  }
}

// Define the Player class (inherits from Character)
class Player extends Character {
  constructor(name, health, damage) {
    super(name, health, damage);
  }
}

// Define the Enemy class (inherits from Character)
class Enemy extends Character {
  constructor(name, health, damage) {
    super(name, health, damage);
  }
}

// Function to simulate player's turn
function playerTurn(player, enemy) {
  return new Promise((resolve) => {
    // Simulate player's action, for example, you could get input from the user in a real game
    setTimeout(() => {
      player.attack(enemy);
      resolve();
    }, 1000);
  });
}

// Function to simulate enemy's turn
function enemyTurn(player, enemy) {
  return new Promise((resolve) => {
    // Simulate enemy's action (e.g., enemy attacks player)
    const damage = Math.floor(Math.random() * enemy.damage) + 1;
    player.takeDamage(damage);
    setTimeout(resolve, 1000);
  });
}

export { Character, Player, Enemy, playerTurn, enemyTurn};