import { GridObject } from "./gridObject.js"

class EnemyObject extends GridObject {
  #stats = {
    name: null,
    attack: 0,
    defense: 0,
    hp: 0,
  }
  
  constructor(sprite, stats) {
    super(sprite)
    this.type = "enemy";
    this.#stats = stats;
  }
  getName() {
    return this.#stats.name;
  }
  getStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    }
  }
  describe() {
    const stats = this.#stats;
    console.log(`${this.sprite} you encountered ${stats.name}!`);
    console.log(`${stats.name} Stats: HP: ${stats.hp} ATK: ${stats.attack} DEF: ${stats.defense}`);
  }
}

export { EnemyObject }