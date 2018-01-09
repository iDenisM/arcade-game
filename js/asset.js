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
  level.numRows = levels[id].map.length;
  level.numCols = levels[id].map[0].length;
  for (let r = 0; r < level.numRows; r++) {
    level.rowImages[r] = [];
    for (let c = 0; c < level.numCols; c++) {
      level.rowImages[r][c] = levels[id].map[r][c];
    }
  }


};
