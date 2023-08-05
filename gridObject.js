class GridObject {
  #trees = ["🌴","🌳","🌲","🌵"]
  constructor(sprite, type = "undiscovered") {
    if (!sprite) {
      const random = Math.floor(Math.random() * this.#trees.length );
      this.sprite = this.#trees[random];
    }else {
      this.sprite = sprite;
    }
    this.type = type;
  }
  describe(name) {
    const random = Math.random();
    if(random < 0.33){
      console.log(`${name} says : I sense a hint of déjà vu.\nThere's more to this place than meets the eye`)
    }else if(random < 0.66) {
      console.log(`${name} says : Ah, the memories are flooding back.\nI remember facing a tough enemy around here once.`);
    } else {
      console.log(`${name} says : Hey, looks like familiar territory.\nI must be getting closer to something important!`);
    }
  }
}

export {GridObject}

