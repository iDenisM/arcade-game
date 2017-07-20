// Global variables
var horisontal = 101, //use this to move horisontaly
    vertical = 83,  //use this to move verticaly
    currentLevel = 1, //set the level
    enemysNumber = 3;

// Create SuperClass
var Item = function(x , y, sprite) {
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
  ctx.beginPath();
  ctx.rect(this.bBoxX, this.bBoxY, this.bBoxWidth, this.bBoxHeight);
  ctx.stroke();
};

// This fucntion will create the new subclass object and constructor
var createSubClass = function(superclass, subclass) {
  subclass.prototype = Object.create(superclass.prototype);
  subclass.prototype.constructor = subclass;
};

/*
**ENEMY
*/

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
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
var randomSpeed = function() {
  return Math.random()*100 + 70;
};

// Generate a random value for the speed
var randomYPosition = function() {
  var min = 1,
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
var Player = function(x, y, sprite) {
  // Superclass call
  Item.call(this, x, y, sprite);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x * horisontal;
  this.y = y * vertical;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
  this.key = false;
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
  // var horisontal = 101,
      // vertical = 83;
  if (key === 'left' && this.x !== 0) {
    this.x -= horisontal;
  } else if (key === 'up' && this.y !== 0) {
    this.y -= vertical;
  } else if (key === 'right' && this.x !== horisontal * 4) {
    this.x += horisontal;
  } else if (key === 'down' && this.y !== vertical * 5) {
    this.y += vertical;
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
var Key = function(x, y, sprite) {
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
var Door = function(x, y, sprite) {
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
**PRINCESS
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var createEnemies = function(number) {
  var enemies = [];
  for (var i = 0; i < number; i++) {
    enemies.push(new Enemy());
    while (i > 0 && enemies[i - 1].y === enemies[i].y) {
      console.log("Changing enemy " + i + " y coordinate");
      enemies[i] = new Enemy();
      console.log("Enemy " + i + " y:" + enemies[i].y);
    }
  }
  return enemies;
},
    allEnemies = createEnemies(enemysNumber),
    //player = new Player(),
    key = new Key(),
    door = new Door();

var allPlayers = [];
allPlayers.push(new Player());
//player.startPosition();
allPlayers[0].startPosition();
var player = allPlayers[0];
key.startPosition();
door.startPosition();

//var allObjects = [player, key, door];

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
