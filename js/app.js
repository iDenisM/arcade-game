// Global variables
const horisontal = 101, // set the cell horisontal width
      vertical = 83;  // set the cell vertical height

let currentLevel = 0, // set the current level
    enemiesNumber = 3, // set the starting enemies number
    lives = 3, // set the game life amount
    playerSprite = 1, // selects the player sprite to draw
    chooseYesNo = 0, // holds the position of the cursor
    allLives = [], // array holder for the player lives
    playerScore = 0; // this is the in game player score

// Create SuperClass
let Item = function(x , y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.collision = false;
};

// Update the items's position, required method for game
// Parameter: dt, a time delta between ticks
Item.prototype.update = function(dt) {

};

// Create the bounding box for the Item
Item.prototype.bBox = function(bX, bY, bW, bH) {
  // Create the rectangle for the bounding box
  this.bBoxX = this.x + bX;
  this.bBoxY = this.y + bY + 50;
  // set width and heigth to 0 or center it in the board cell
  this.bBoxWidth = bW <= 0 || bW < 2 * bX ? 0 : bW - 2 * bX;
  this.bBoxHeight = bH <= 0 || bH < 2 * bY ? 0 : bH - 2 * bY;
};

// Draw the item on the screen, required method for game
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  //Debugging bBox
  // ctx.beginPath();
  // ctx.rect(this.bBoxX, this.bBoxY, this.bBoxWidth, this.bBoxHeight);
  // ctx.stroke();
};

// This fucntion will create the new subclass object and constructor
let createSubClass = function(superclass, subclass) {
  subclass.prototype = Object.create(superclass.prototype);
  subclass.prototype.constructor = subclass;
};

/*
**ENEMY
*/

// Enemies our player must avoid
let Enemy = function(x, y, sprite) {
  // Superclass call
  Item.call(this, x, y, sprite);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = -horisontal;
  this.y = randomYPosition();
  this.sprite = 'images/enemy-bug.png';
  this.speed = randomSpeed();
};

// Create the Enemy object, and constructor
createSubClass(Item, Enemy);

// Generate a random value for the speed
let randomSpeed = function() {
  return Math.random()*100 + 70;
};

// Generate a random value for the speed
let randomYPosition = function() {
  let min = 1,
      max = 4;
  return (Math.floor(Math.random() * (max - min)) + min) * vertical;
};

// Update the items's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
    if(this.x >= 500) {
        this.x = -horisontal;
        this.y = randomYPosition();
        this.speed = randomSpeed();
    }
};



/*
**PLAYER
*/

// Player class
let Player = function(x, y, sprite) {
  // Superclass call
  Item.call(this, x, y, sprite);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x * horisontal;
  this.y = y * vertical;
  this.move = true;
  // this.sprite = sprite;
  this.key = false;
  switch (sprite) {
    case 0:
      this.sprite = 'images/Selector.png';
      break;
    case 1:
      this.sprite = 'images/char-boy.png';
      break;
    case 2:
      this.sprite = 'images/char-cat-girl.png';
      break;
    case 3:
      this.sprite = 'images/char-horn-girl.png';
      break;
    case 4:
      this.sprite = 'images/char-pink-girl.png';
      break;
    case 5:
      this.sprite = 'images/char-princess-girl.png';
  }
};

// Create the Player object, and constructor
createSubClass(Item, Player);

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

};

////////////FIX WITH A CONSOLE.LOG(e) stuff

// Handle the inputs from the players keybo
Player.prototype.handleInput = function(key) {
  console.log(`before chooseYesNo: ${chooseYesNo}`);
  if (this.move) {
    if (key === 'left') {
      switch (true) {
        case (currentLevel === 0):
          if (this.x !== 0) {
            playerSprite--;
            this.x -= horisontal;
            this.y = 3 * vertical;
            console.log(`playerSprite: ${playerSprite}`);
          }
          break;
        case (currentLevel === -1):
          if (this.x !== horisontal) {
            chooseYesNo = 0;
            this.x = horisontal;
            this.y = 3 * vertical;
            console.log(`chooseYesNo: ${chooseYesNo}`);
          }
          break;
        case (currentLevel >= 1):
          if (this.x !== 0) {
            this.x -= horisontal;
          }
      }
    } else if (key === 'up' && this.y !== 0 && currentLevel >= 1) {
      switch (true) {
        case (currentLevel >= 1):
          if (this.y !== 0) {
            this.y -= vertical;
          }
      }
    } else if (key === 'right') {
      switch (true) {
        case (currentLevel === 0):
          if (this.x !== 4 * horisontal) {
            playerSprite++;
            this.x += horisontal;
            this.y = 3 * vertical;
            console.log(`playerSprite: ${playerSprite}`);
          }
          break;
        case (currentLevel === -1):
          if (this.x !== 3 * horisontal) {
            this.x = 3 * horisontal;
            this.y = 3 * vertical;
            chooseYesNo = 1;
            console.log(`chooseYesNo: ${chooseYesNo}`);
          }
          break;
        case (currentLevel >= 1):
          if (this.x !== 4 * horisontal) {
            this.x += horisontal;
          }
      }
    } else if (key === 'down' && this.y !== vertical * 5 && currentLevel >= 1) {
      switch (true) {
        case (currentLevel >= 1):
          if (this.y !== 5 * vertical) {
            this.y += vertical;
          }
      }
    } else if (key === 'enter') {
      if (currentLevel === 0) {
        createLevelsBlock();
      }
      if (currentLevel === -1) {
        if (chooseYesNo === 1) {
          allLives = createLives(lives);
          createPreLevelsBlock();
        }
        else {
        }
      }
    }
  }
};

// Create a standart staring position for the Player
Player.prototype.startPosition = function() {
  this.x = 2 * horisontal;
  this.y = 5 * vertical;
};

/*
**KEY
*/
let Key = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
};

createSubClass(Item, Key);

Key.prototype.startPosition = function() {
  this.x = 1 * horisontal;
  this.y = 0 * vertical;
  this.sprite = 'images/key-big.png';
};

Key.prototype.bindKey = function(obj) {
  this.x = obj.x;
  this.y = obj.y;
  this.sprite = 'images/key-small.png';
};

/*
**DOOR
*/
let Door = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
};

createSubClass(Item, Door);

Door.prototype.startPosition = function() {
  this.x = 4 * horisontal;
  this.y = 5 * vertical;
  this.sprite = 'images/closed-door.png';
};

Door.prototype.openDoor = function() {
  this.sprite = 'images/open-door.png';
};

/*
** LIVES
*/
let Life = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
  this.x = 0;
  this.y = 5 * vertical;
  this.sprite = 'images/Heart.png';
};

createSubClass(Item, Life);

Life.prototype.update = function(dt) {

};

/*
** ROCK
*/
let Rock = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
  this.x = 3 * horisontal;
  this.y = 4 * vertical;
  this.sprite = 'images/stone-block.png';
};

createSubClass(Item, Rock);

Rock.prototype.update = function(dt) {

};

// Change the rock sprite when it is in the water
Rock.prototype.rockInWater = function() {
  this.sprite = 'images/stone-block.png';
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allKeys = [],
    allDoors = [],
    allPlayers = [],
    createEnemies = number => {
      let enemies = [];
      for (let i = 0; i < number; i++) {
        enemies.push(new Enemy());
        // Check if the last created enemy isn't on the same lane
        while (i > 0 && enemies[i - 1].y === enemies[i].y) {
          enemies[i] = new Enemy();
        }
      }
      return enemies;
    };

// This function loops the objs array and puts them in thery startPosition
let startPos = (...objs) => {
  for (obj of objs) {
    obj.startPosition();
  }
}

// This function clears all the array containers
let emptyAllContainers = () => {
  allEnemies = [];
  allPlayers = [];
  allLives = [];
  allKeys = [];
  allDoors = [];
};

// Create the pre level block
let createPreLevelsBlock = () => {
  currentLevel = 0;
  chooseYesNo = 0;
  playerSprite = 1;
  emptyAllContainers();
  allPlayers.push(new Player(0, 3, 0));
};

// Create the end level block
let createEndLevelBlock = () => {
  currentLevel = -1;
  emptyAllContainers();
  allPlayers.push(new Player(1, 3, 0));
};

// Create the level block
let createLevelsBlock = () => {
  currentLevel = 1;
  allPlayers = [];
  allPlayers.push(new Player(2, 5, playerSprite));
  allKeys.push(new Key());
  allDoors.push(new Door());
  allLives = createLives(lives);
  startPos(...allKeys, ...allDoors);
  allEnemies = createEnemies(enemiesNumber);
};

// Create lives container
let createLives = l => {
  let livesHolder = [];
  for (i = 0; i < l; i++) {
    livesHolder.push(new Life());
    livesHolder[i].x = i * 50;
  }
  return livesHolder;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
  };

  for (pl of allPlayers) {
    pl.handleInput(allowedKeys[e.keyCode]);
  }
});
