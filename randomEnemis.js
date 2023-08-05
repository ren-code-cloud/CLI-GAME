class Enemies {
  enemyResult;

  randomEnemy() {
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

(async () => {
  const enemy = new Enemies();
  const enemyObject = await enemy.randomEnemy();
  console.log(enemyObject);
})();

/*
The code provided is an Immediately Invoked Function Expression (IIFE). It's a way to execute a function immediately after its definition.

Here's a breakdown of the code:

(async () => { ... }): This part is an arrow function expression. The async keyword indicates that the function will use async/await syntax for handling asynchronous operations. The arrow function has an empty parameter list (), meaning it doesn't take any arguments.

{ ... }: This is the body of the arrow function. It contains the code that will be executed when the function is invoked.

const enemy = new Enemies();: This line creates an instance of the Enemies class by calling its constructor with the new keyword and assigns it to the variable enemy.

const enemyObject = await enemy.randomEnemy();: This line awaits the result of the randomEnemy method of the enemy object. Since randomEnemy returns a promise that resolves to a random enemy after a delay, using await here allows the code to pause and wait for the promise to resolve before continuing.

console.log(enemyObject);: This line logs the value of enemyObject to the console. enemyObject will hold the value of the resolved promise, which is the random enemy emoji.

console.log(enemy.enemyResult);: This line logs the enemyResult property of the enemy object to the console. This property is updated inside the randomEnemy method with the same value as enemyObject.

In summary, the IIFE creates an instance of the Enemies class, calls the randomEnemy method to get a random enemy, and then logs both the random enemy and the enemyResult property to the console.
*/