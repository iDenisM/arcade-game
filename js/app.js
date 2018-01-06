const horisontal = 101,
      vertical = 83,
      startEmeniesCount = 3;
let player,
    allEnemies = [],
    allGameObjects = [];

// Create super class for all game objects
class GameObject {
  constructor(sprite, id) {
    this.id = id;
    this.sprite = sprite;
  }

  // Set the start position of the game object on the canvas
  setStartPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // Bounding box
  bBox () {
    let bX = 5;
    let bY = 55;
    // Create the rectangle for the bounding box
    this.bBoxX = this.x + 5;
    this.bBoxY = this.y + 55;
    // set width and heigth to 0 or center it in the board cell
    this.bBoxWidth = horisontal - bX * 2;
    this.bBoxHeight = 171 - 50 * 2;
  }

  // Update the game object's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  // Draw the game object on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.bBox();

    //Debugging bBox
    ctx.beginPath();
    ctx.rect(this.bBoxX, this.bBoxY, this.bBoxWidth, this.bBoxHeight);
    ctx.stroke();
  }
};

// Calculate random int value from min and max
let randomIntFromInterval = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
};

// Enemies our player must avoid
class Enemy extends GameObject {
  constructor(sprite, id) {
    sprite = 'images/enemy-bug.png';
    super(sprite, id);
    this.speed = randomIntFromInterval(100, 250);
  }

  update(dt) {
    if (this.x <= mapCols * horisontal) {
      this.x += this.speed * dt;
    }
    else {
      this.setStartPosition(-horisontal, vertical * randomIntFromInterval(1, 3));
      this.speed = randomIntFromInterval(100, 250);
    }
  }
};

// Now write your own player class
class Player extends GameObject {
  constructor(sprite, id) {
    sprite = 'images/char-boy.png';
    super(sprite, id);
    this.speed = 10;
  }

  // Handle the control of the movement of the player
  handleInput(e) {
    if (e === 'left') {
      if (this.x > 0)
        this.x -= horisontal;
    }
    else if (e === 'right') {
      if (this.x < (mapCols - 1) * horisontal)
        this.x += horisontal;
    }
    else if (e === 'up') {
      if (this.y > 0)
        this.y -= vertical;
    }
    else if (e === 'down') {
      if (this.y < (mapRows - 1) * vertical)
        this.y += vertical;
    }
  }
};

// Now instantiate your objects.
// Create three enemies for the begining
for (let i = 0; i < startEmeniesCount; i++) {
  let enemy = new Enemy();
  enemy.id = i;
  allEnemies.push(enemy);
};

// Place the player object in a variable called player
player = new Player();
player.id = 'player';

// Check if an object collide another object
let objectCollideObject = (objectThatCollide, objectToCollide) => {
  if (objectToCollide.bBoxX < objectThatCollide.bBoxX + objectThatCollide.bBoxWidth &&
      objectToCollide.bBoxX + objectToCollide.bBoxWidth > objectThatCollide.bBoxX &&
      objectToCollide.bBoxY < objectThatCollide.bBoxY + objectThatCollide.bBoxHeight &&
      objectToCollide.bBoxY + objectToCollide.bBoxHeight > objectThatCollide.bBoxY)
    return true;
  else
    return false;
};

let objectCollideArray = (objectThatCollide, arrayToCollide) => {
  for (let index of arrayToCollide) {
    if (objectCollideObject(objectThatCollide, index)){
      return true;
    }
  }
  return false;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
        // Add touch movements
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
