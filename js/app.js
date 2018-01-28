const horisontal = 101,
      vertical = 83;


// Create super class for all game objects
class GameObject {
  constructor(sprite, id) {
    this.id = id;
    this.sprite = sprite;
  }

  // Set the start position of the game object on the canvas
  setStartPosition(x, y) {
    this.x = x * horisontal;
    this.y = y * vertical;
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
    ctx.scale(1, 1);
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
    this.direction = randomIntFromInterval(0, 1);
    this.maxColumns = 0;
  }

  setStartPosition() {
    this.direction = randomIntFromInterval(0, 1);
    if (this.direction == 0) {
      // set x coordinate
      this.x = -horisontal;
      // set sprite direction
      this.sprite = 'images/enemy-bug.png';
    } else {
      // set x coordinate
      this.x = this.maxColumns * horisontal;
      // set sprite direction
      this.sprite = 'images/enemy-bug-left.png';
    }
    // set y coordinate
    this.y = vertical * randomIntFromInterval(1, 3);
  }

  update(dt) {
    // direction to move is right
    if (this.direction == 0) {
      // move the enemy to right
      if (this.x <= this.maxColumns * horisontal) {
        this.x += this.speed * dt;
      }
      // reset position
      else {
        // vertical position
        this.setStartPosition();
        // reset speed
        this.speed = randomIntFromInterval(100, 250);
      }
    }
    // direction to move is left
    else if (this.direction == 1) {
      // move the enemy to left
      if (this.x >= -horisontal) {
        this.x -= this.speed * dt;
      }
      // reset position
      else {
        // vertical position
        this.setStartPosition();
        // reset speed
        this.speed = randomIntFromInterval(100, 250);
      }
    }

  }
};

// Now write your own player class
class Player extends GameObject {
  constructor(sprite, id) {
    sprite = 'images/char-boy.png';
    super(sprite, id);
    this.speed = 10;
    this.canMove = false;
    this.win = false;
    this.loose = false;
  }

  // Player last position used for rock collision
  setlastPosition() {
    this.lastX = this.x;
    this.lastY = this.y;
  }

  // Handle the control of the movement of the player
  handleInput(e) {
    if (e === 'left') {
      if (this.x > 0) {
        this.setlastPosition();
        this.x -= horisontal;
      }
    }
    else if (e === 'right') {
      if (this.x < (level.numCols - 1) * horisontal) {
        this.setlastPosition();
        this.x += horisontal;
      }
    }
    else if (e === 'up') {
      if (this.y > 0) {
        this.setlastPosition();
        this.y -= vertical;
      }
    }
    else if (e === 'down') {
      if (this.y < (level.numRows - 1) * vertical) {
        this.setlastPosition();
        this.y += vertical;
      }
    }
  }
};


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

// Create the rock class
class Rock extends GameObject {
  constructor(sprite, id) {
    sprite = 'images/Rock.png';
    super(sprite, id);
  }
};

// Create Hearts class
class Heart extends GameObject {
  constructor(sprite, id) {
    sprite = 'images/Heart.png'
    super(sprite, id);
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 35, 55);
  }
}
