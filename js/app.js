const horisontal = 101,
      vertical = 80,
      startEmeniesCount = 3;

// Create super class for all game objects
class GameObject {
  constructor(sprite) {
    this.sprite = sprite;
  }

  // Draw the game object on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Set the start position of the game object on the canvas
  setStartPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // Update the game object's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

  }
};

// Calculate random int value from min and max
let randomIntFromInterval = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
};

// Enemies our player must avoid
class Enemy extends GameObject {
  constructor(sprite) {
    sprite = 'images/enemy-bug.png';
    super(sprite);
    this.speed = randomIntFromInterval(100, 250);
  }

  update(dt) {
    if (this.x <= 505) {
      this.x += this.speed * dt;
    }
    else {
      this.setStartPosition(-horisontal, vertical * randomIntFromInterval(1, 3))
      this.speed = randomIntFromInterval(100, 250);
    }
  }
};

// Now write your own player class
class Player extends GameObject {
  constructor(sprite) {
    sprite = 'images/char-boy.png';
    super(sprite);
  }

  // Handle the control of the movement of the player
  handleInput(e) {
    if (e === 'left') {
      this.x -= horisontal;
    }
    else if (e === 'right') {
      this.x += horisontal;
    }
    else if (e === 'up') {
      this.y -= vertical;
    }
    else if (e === 'down') {
      this.y += vertical;
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Create three enemies for the begining
for (let i = 0; i < startEmeniesCount; i++) {
  let enemy = new Enemy();
  enemy.setStartPosition(0, vertical * randomIntFromInterval(1, 3));
  allEnemies.push(enemy);
};
// Place the player object in a variable called player
const player = new Player();
player.setStartPosition(2 * horisontal, 3 * vertical);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
