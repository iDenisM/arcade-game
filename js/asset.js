//-----------LEVEL LOADER-----------
let mapRows = 6,
    mapCols = 5;

let getImage = {
  1: 'images/water-block.png',
  2: 'images/stone-block.png',
  3: 'images/grass-block.png'
};

class Level {
  constructor() {

  }

  render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
            getImage[1],   // Top row is water
            getImage[2],   // Row 1 of 3 of stone
            getImage[2],   // Row 2 of 3 of stone
            getImage[2],   // Row 3 of 3 of stone
            getImage[3],   // Row 1 of 2 of grass
            getImage[3]    // Row 2 of 2 of grass
            //'images/char-boy.png'
        ],
        numRows = 6,
        numCols = 5,
        row, col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0,0,606,505);

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
  }
};

let level = new Level();
