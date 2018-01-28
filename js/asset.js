let player,
    allEnemies = [],
    allRocks = [],
    allHearts = [],
    allGameObjects = [];

//-----------LEVEL LOADER-----------
class Level {
  constructor(id, numRows, numCols) {
    this.id = id;
    this.numRows = 0;
    this.numCols = 0;
    this.rowImages = [];
    this.enemies = 0;
  }

  generateMap() {
    // Before drawing, clear existing canvas
    ctx.clearRect(0,0,this.numRows * 101,this.numCols * 101);

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        let source = getMapSprite[this.rowImages[row][col]];
        ctx.drawImage(Resources.get(source), col * 101, row * 83);
      }
    }
  }

  render() {
    this.generateMap();
  }
};

let level = new Level();
level.id = 1;
let drawMapWithId = (id) => {
  // Create Map
  level.id = id;
  level.numRows = levels[id].rows.length;
  level.numCols = levels[id].columns;
  level.enemies = levels[id].enemies;

  for (let row = 0; row < level.numRows; row++) {
    level.rowImages[row] = [];
    for (let col = 0; col < level.numCols; col++) {
      level.rowImages[row][col] = levels[id].rows[row];
    }
  }

  if (levels[id].blocks) {
    for (let block = 0; block < levels[id].blocks.length; block++) {
      let row = levels[id].blocks[block][0],
          col = levels[id].blocks[block][1],
          sprite = levels[id].blocks[block][2];
      level.rowImages[row][col] = sprite;
    }
  }

  // Instantiate game objects.
  allGameObjects = [];
  createAllEnemies(level.enemies, level.numCols);
  createPlayer();
  (levels[id].rocks) ? createRocks(levels[id].rocks) : createRocks([]);
  createHearts(3);
};

// Create Enemies fucntion
let createAllEnemies = (enemies, columns) => {
  allEnemies = [];
  for (let i = 0; i < enemies; i++) {
    let enemy = new Enemy();
    enemy.id = 'e' + i;
    enemy.maxColumns = columns;
    allEnemies.push(enemy);
    allGameObjects.push(enemy);
  };
}

// Create Player
let createPlayer = () => {
  // Place the player object in a variable called player
  player = new Player();
  player.id = 'player';
  allGameObjects.push(player);
}

// Create Rock
let createRocks = (rocks) => {
  let newRock;
  allRocks = [];
  for(const [i, rock] of rocks.entries()) {
    newRock = new Rock();
    newRock.id = 'r' + i;
    newRock.setStartPosition(rock[0], rock[1]);
    allRocks.push(newRock);
    allGameObjects.push(newRock);
  }
}

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

    if (player.canMove) player.handleInput(allowedKeys[e.keyCode]);
});

// Create Hearts
let createHearts = (hearts) => {
  let newHeart;
  allHearts = [];
  for (let i = 0; i < 3; i++) {
    newHeart = new Heart();
    newHeart.id = 'h' + i;
    newHeart.x = i * 40;
    newHeart.y = -10;
    allHearts.push(newHeart);
    allGameObjects.push(newHeart);
  }
}
