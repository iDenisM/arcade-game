//-----------LEVEL LOADER-----------
let mapRows = 6,
    mapCols = 5;

class Level {
  constructor(id, numRows, numCols) {
    this.id = id;
    this.numRows = numRows;
    this.numCols = numCols;
    this.rowImages = [];
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
  level.id = id;
  level.numRows = levels[id].rows.length;
  level.numCols = levels[id].columns;
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
};
