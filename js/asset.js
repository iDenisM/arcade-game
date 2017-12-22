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
    /* This array holds the relative URL to the image used
    * for that particular row of the game level.
    */
    var row, col;
    // Before drawing, clear existing canvas
    ctx.clearRect(0,0,this.numRows * 101,this.numCols * 101);

    /* Loop through the number of rows and columns we've defined above
    * and, using the rowImages array, draw the correct image for that
    * portion of the "grid"
    */
    for (row = 0; row < this.numRows; row++) {
      for (col = 0; col < this.numCols; col++) {
        /* The drawImage function of the canvas' context element
        * requires 3 parameters: the image to draw, the x coordinate
        * to start drawing and the y coordinate to start drawing.
        * We're using our Resources helpers to refer to our images
        * so that we get the benefits of caching these images, since
        * we're using them over and over.
        */

        // THIS ARRAY TYPE IS NOT WORKING CHANGE IT
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
level.id = 0;
let createLevel = (id) => {
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
