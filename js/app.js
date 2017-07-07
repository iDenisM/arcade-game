// Global variables
var horisontal = 101, //use this to move horisontaly
    vertical = 83;  //use this to move verticaly

// Create SuperClass
var Item = function(x , y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

// Update the items's position, required method for game
// Parameter: dt, a time delta between ticks
Item.prototype.update = function(dt) {

};

// Draw the item on the screen, required method for game
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Create the bounding box
Item.prototype.bBox = function() {

};

// This fucntion will create the new subclass object and constructor
var createSubClass = function(subclass, superclass) {
  subclass.prototype = Object.create(superclass.prototype);
  subclass.prototype.constructor = subclass;
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

};

// Create the Enemy object, assdf
createSubClass(Enemy, Item);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x * horisontal;
  this.y = y * vertical;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
};
createSubClass(Player, Item);

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 0, 'images/enemy-bug.png'), new Enemy(101, 83, 'images/enemy-bug.png')];
var player = new Player(2, 5);

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
