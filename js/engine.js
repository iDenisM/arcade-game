/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);



    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);


    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
      createPreLevelsBlock();
      reset();
      lastTime = Date.now();
      main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
      updateEntities(dt);
      checkCollisions();
    }

    function checkLevelStatus() {

    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
      for (enem of allEnemies) {
        enem.update(dt);
      }
      for (life of allLives) {
        life.update(dt);
      }
      for (pl of allPlayers) {
        pl.update(dt);
      }
    }

    let playerCollide = (objectToCollide) => {
      for (pl of allPlayers) {
        if (objectToCollide.bBoxX < pl.bBoxX + pl.bBoxWidth &&
            objectToCollide.bBoxX + objectToCollide.bBoxWidth > pl.bBoxX &&
            objectToCollide.bBoxY < pl.bBoxY + pl.bBoxHeight &&
            objectToCollide.bBoxY + objectToCollide.bBoxHeight > pl.bBoxY) {
          return true;
        }
      }
      return false;
    }

    // Check if an Item in the game made a collision with teh player
    function checkCollisions() {
      // Check key collision
      for (key of allKeys) {
        if (playerCollide(key)) {
          // Add points on key collision
          if (!allPlayers[0].key)
            playerScore += 50;
          // Open the door
          for (door of allDoors) {
            door.openDoor();
          }
          // Change player status on key collision
          for (pl of allPlayers) {
            pl.key = true;
            key.bindKey(pl);
          }
        }
      }
      // Check rock collision
      for (rock of allRocks) {
        if (playerCollide(rock)) {
          rock.move = true;
          switch (rock.move) {
            case rock.direction === 'up':
              if (rock.y !== 0)
                rock.y -= vertical;
              rock.move = false;
            break;
            case rock.direction === 'right':
              if (rock.x !== 4 * horisontal)
                rock.x += horisontal;
              rock.move = false;
            break;
            case rock.direction === 'down':
              if (rock.y !== 5 *  vertical)
                rock.y += vertical;
              rock.move = false;
            break;
            case rock.direction === 'left':
              if (rock.x !== 0)
                rock.x -= horisontal;
              rock.move = false;
          }
          // Transfomr the rock in a stone block
          let row = rock.y/vertical,
              col = rock.x/horisontal;
          if (gameMap[row][col] === 'images/water-block.png') {
            gameMap[row][col] = 'images/stone-block.png';
            allRocks.splice(rock, 1);
          }
        }
      }

      // Check door collision
      for (door of allDoors) {
        for (pl of allPlayers) {
          if (playerCollide(door) && pl.key && currentLevel > 0) {
            playerScore += 150;
            pl.key = false;
            startPos(...allPlayers, ...allDoors, ...allKeys);
            allEnemies.push(new Enemy());
            if (currentLevel < Object.keys(levels).length) {
              currentLevel++;
              allRocks = createRocks(rocksNumber++);
              createMap(currentLevel);
            } else {
              gameWin();
            }
          }
        }
      }

      // Check Enemy collision
      for (enem of allEnemies) {
        if (playerCollide(enem)) {
          // check if any lives left
          if (allLives.length <= 1 && currentLevel > 0) {
            createEndLevelBlock();
          }
          else {
            playerScore -= 50;
            playerScore < 0 ? playerScore = 0 : playerScore = playerScore;
            allLives.pop();
            // reset player door and key position
            for (pl of allPlayers) {
              pl.startPosition();
              pl.key = false;
            }
            door.startPosition();
            key.startPosition();
          }
        }
      }

    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
      renderLevels(currentLevel);
      renderEntities();
    }

    function renderLevels(levelNumber) {
      /* This array holds the relative URL to the image used
       * for that particular row of the game level.
       */
      let numRows = 6,
          numCols = 5,
          row, col;




      /* Loop through the number of rows and columns we've defined above
       * and, using the rowImages array, draw the correct image for that
       * portion of the "grid"
       */
      // Create start level to choose a player character
      if (levelNumber === 0) {
        for (row = 0; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {
            ctx.drawImage(Resources.get('images/grass-block.png'), col * horisontal, row * vertical);
          }
        }
        // Draw the characters to choose
        ctx.drawImage(Resources.get('images/char-boy.png'), 0, 3 * vertical);
        ctx.drawImage(Resources.get('images/char-cat-girl.png'), 1 * horisontal, 3 * vertical);
        ctx.drawImage(Resources.get('images/char-horn-girl.png'), 2 * horisontal, 3 * vertical);
        ctx.drawImage(Resources.get('images/char-pink-girl.png'), 3 * horisontal, 3 * vertical);
        ctx.drawImage(Resources.get('images/char-princess-girl.png'), 4 * horisontal, 3 * vertical);
        // Draw the text
        ctx.font = '50px Arial';
        ctx.fillText('CHOOSE YOUR', 60, 120);
        ctx.fillText('CHARACTER', 100, 200);
        $("#level").text("You can choose you character");
      }
      // Create the game loose board
      else if (levelNumber === -1) {
        // Draw the board
        for (row = 0; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {
            ctx.drawImage(Resources.get('images/grass-block.png'), col * horisontal, row * vertical);
          }
        }
        // Draw the text on the board
        ctx.font = '50px Arial';
        ctx.fillText('TAKE ANOTHER', 70, 170);
        ctx.fillText('CHANCE', 150, 238);
        ctx.font = '100px Arial';
        ctx.fillText('N', 117, 378);
        ctx.fillText('Y', 317, 378);
        // Description text
        $("#level").text("You loose :(");
      }
      // Create the normal level board
      else if (levelNumber > 0) {
        for (row = 0; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.drawImage(Resources.get(gameMap[row][col]), col * horisontal, row * vertical);
          }
        }
        $("#level").text("Level " + levelNumber);
        $("#score").text("Score " + playerScore);
      } else {
        gameWin();
      }


    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
      /* Loop through all of the objects within the allEnemies array and call
       * the render function you have defined.
       */
      for (pl of allPlayers) {
       pl.render();
       pl.bBox(15, 5, horisontal, vertical);
      }
      if (currentLevel >= 1) {
        for (enem of allEnemies) {
          enem.render();
          enem.bBox(5, 5, horisontal, vertical);
        }

        for (life of allLives) {
          life.render();
        }

        for (key of allKeys) {
          key.render();
          key.bBox(5, 5, horisontal, vertical);
        }

        for (door of allDoors) {
          door.render();
          door.bBox(5, 5, horisontal, vertical);
        }
      }
      if (currentLevel >= 2) {
        for (rock of allRocks) {
          rock.render();
          rock.bBox(5, 5, horisontal, vertical);
        }
      }
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
    }

    function resetLevel() {

    }

    function clear() {
      allEnemies = [];
      allPlayers = [];
      allLives = [];
      allKeys = [];
      allDoors = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    }

    function gameLoose() {
      $("#level").text("");
      clear();
      console.log("GAME OVER");
    }


    function gameWin() {
      // Set the H3 tag with level id to empty
      $("#level").text("WINNER");
      clear();
      console.log("WONDERFULL");
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
      'images/stone-block.png',
      'images/water-block.png',
      'images/grass-block.png',
      'images/enemy-bug.png',
      'images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png',
      'images/closed-door.png',
      'images/open-door.png',
      'images/key-big.png',
      'images/key-small.png',
      'images/Heart.png',
      'images/Selector.png',
      'images/Rock.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
