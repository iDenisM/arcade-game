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
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

let Engine = (function(global) {
  /* Predefine the variables we'll be using within this scope,
  * create the canvas element, grab the 2D context for that canvas
  * set the canvas elements height/width and add it to the DOM.
  */
  let doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      playingGame = false,
      slideIndex = 1,
      lastTime,
      avatarImages = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
      ],
      gameMenuPanel = $('<div/>').attr('class', 'ingame-panel');

  canvas.width = 505;
  canvas.height = 606;
  $('#container').append(canvas);
  $('canvas').attr({id: 'board'});
  let mainMenu = $('<div/>').attr({
    id: 'main-menu'
  });
  $('#container').append(mainMenu);

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
    if (playingGame) {
      win.requestAnimationFrame(main);
    } else {
      win.cancelAnimationFrame(main);
      ctx.clearRect(0,0,1000,1000);
    }
  }

  /* This function does some initial setup that should only occur once,
  * particularly setting the lastTime variable that is required for the
  * game loop.
  */
  function init() {
    createMainMenu();
  }

  // Create the main menu buttons and their click funtions
  function createMainMenu() {

    let title = $('<p/>').text('crazy ladybug').attr({
          class: 'no-select',
          id: 'main-title'
        });
        playButton = $('<div/>').attr({
          class: 'button no-select',
          id: 'play-button'
        }),
        playButtonText = $('<p/>').text('play').attr('class', 'button-text'),
        characterPanel = $('<div/>').attr({
          id: 'character-panel'
        }),
        characterText = $('<p/>').text('choose your character').attr('class', 'no-select panel-text');
        leftButton = $('<div/>').attr({
          class: 'char-button arrow arrow-left',
          id: 'char-left'
        }),
        rightButton = $('<div/>').attr({
          class: 'char-button arrow',
          id: 'char-right'
        }),
        avatarContainer = $('<div/>').attr({
          id: 'avatar-container'
        });

    mainMenu.append(title).append(playButton).append(characterPanel);
    playButton.append(playButtonText);
    characterPanel.append(characterText).append(leftButton).append(avatarContainer).append(rightButton);

    for (let avatar of avatarImages) {
      let img = $('<img/>').attr({
        src: avatar,
        class: 'mySlides'
      });
      $('#avatar-container').append(img);
    }

    showSlides(slideIndex);

    $('#play-button').click(function() {
      $('#main-menu').empty();
      selectLevelMenu();
    });

    $('#char-left').click(function() {
      plusSlides(-1);
    });

    $('#char-right').click(function() {
      plusSlides(1);
    });
  }

  // Change the slide
  let plusSlides = (n) => {
    showSlides(slideIndex += n);
  }
  // Show slides function
  let showSlides = (n) => {
    let slides = $('.mySlides');
    // Set borders for the sliders
    if (n >= slides.length) {
      slideIndex = slides.length;
    }
    if (n < 1){
      slideIndex = 1;
    }
    // Set all children style to display none
    slides.css("display", "none");
    // Turn on only the one with corresponding slideIndex value
    $('.mySlides:nth-child('+ slideIndex +')').css('display', 'block');
  }


  // Select level menu
  let selectLevelMenu = () => {
    let top = 50;
    for (let item in levels) {
      let btValue = `Level ${parseInt(item) + 1}`,
          button = $('<div/>').attr({
            class: 'button button-level no-select',
            id: `${parseInt(item)}`
          }),
          buttonText = $('<p/>').text(btValue).attr('class', 'button-text'),
          button1 = $('<input/>').attr({
            type: 'button',
            value: btValue,
            class: 'button button-level',
            id: `${parseInt(item)}`
          }).css({
            top: `${top + (top * parseInt(item)) / 2}px`
          });
      mainMenu.append(button);
      button.append(buttonText);
    }

    let backButton = $('<div/>').attr({
          class: 'button no-select',
          id: 'back-button'
        }),
        backButtonText = $('<p/>').text('Main Menu').attr('class', 'button-text');
    mainMenu.append(backButton);
    backButton.append(backButtonText);

    $('.button-level').click(function() {
      // Create level from id
      resetLevel(this.id);
    });

    $('#back-button').click(function() {
      playingGame = false;
      mainMenu.empty();
      createMainMenu();

    });
  }

  // Game Menu Main Button
  let inGameMenuButton = () => {
    let mainButton = $('<div/>').attr({
          class: 'button no-select',
          id: 'button-ingame-main'
        }),
        mainButtonText = $('<p/>').text('menu').attr('class', 'button-text');

    mainMenu.append(mainButton);
    mainButton.append(mainButtonText);

    $('#button-ingame-main').click(function() {
      // Blur effect on menu pause
      $('#board').addClass('blur');
      // Player stop controller
      player.canMove = false;
      mainMenu.empty();
      inGameMenuAllButtons();
    });
  }

  // Game Menu All buttons
  let inGameMenuAllButtons = () => {
    let backToLevelsButton = $('<div/>').attr({
          class: 'button  button-ingame-menu no-select',
          id: 'button-ingame-back-levels'
        }),
        backToLevelsButtonText = $('<p/>').text('levels menu').attr('class', 'button-text'),
        resetLevelButton = $('<div/>').attr({
          class: 'button  button-ingame-menu no-select',
          id: 'button-ingame-reset'
        }),
        resetLevelButtonText = $('<p/>').text('reset').attr('class', 'button-text'),
        continuePlayButton = $('<div/>').attr({
          class: 'button  button-ingame-menu no-select',
          id: 'button-ingame-continue'
        }),
        continuePlayButtonText = $('<p/>').text('continue').attr('class', 'button-text');

    mainMenu.append(gameMenuPanel);
    gameMenuPanel.append(continuePlayButton).append(resetLevelButton).append(backToLevelsButton);
    backToLevelsButton.append(backToLevelsButtonText);
    resetLevelButton.append(resetLevelButtonText);
    continuePlayButton.append(continuePlayButtonText);

    $('#button-ingame-back-levels').click(function() {
      playingGame = false;
      $('#board').removeClass('blur');
      mainMenu.empty();
      selectLevelMenu();
      allGameObjects = [];
    });

    $('#button-ingame-continue').click(function() {
      player.canMove = true;
      $('#board').removeClass('blur');
      mainMenu.empty();
      inGameMenuButton();
    });

    $('#button-ingame-reset').click(function() {
      // Restart level
      // playingGame = false;
      resetLevel(parseInt(level.id));
    });
  }

  // Player win window
  let inGameMenuWin = () => {
    if (player.win) return;
    $('#board').addClass('blur');
    mainMenu.empty();
    let nextLevelButton = $('<div/>').attr({
          class: 'button  button-ingame-menu no-select',
          id: 'button-ingame-win-next'
        })
        nextLevelButtonText = $('<p/>').text('next level').attr('class', 'button-text');

    gameMenuPanel.empty();
    mainMenu.append(gameMenuPanel);
    gameMenuPanel.append(nextLevelButton);
    nextLevelButton.append(nextLevelButtonText);

    player.win = true;
    player.canMove = false;

    $('#button-ingame-win-next').click(function() {
      // Start next level
      resetLevel(parseInt(level.id) + 1);
    });
  }

  // Player loose window
  let inGameMenuLoose = () => {
    if (player.loose) return;
    $('#board').addClass('blur');
    mainMenu.empty();
    if (player.loose) return;
    let resetButton = $('<input/>').attr({
      type: 'button',
      value: 'Reset',
      class: 'button',
      id: 'button-ingame-loose-reset'
    });

    mainMenu.append(resetButton);

    player.loose = true;
    player.canMove = false;

    $('#button-ingame-loose-reset').click(function() {
      // Restart level
      resetLevel(parseInt(level.id));
    });
  }
  /*
  * use function name plus option to make function execute once
  * example: inGameMenuLoose.done = false;
  */


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
    if (!player.win) checkCollisions();
  }

  /* This is called by the update function and loops through all of the
  * objects within your allEnemies array as defined in app.js and calls
  * their update() methods. It will then call the update function for your
  * player object. These update methods should focus purely on updating
  * the data/properties related to the object. Do your drawing in your
  * render methods.
  */
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  /* This function initially draws the "game level", it will then call
  * the renderEntities function. Remember, this function is called every
  * game tick (or loop of the game engine) because that's how games work -
  * they are flipbooks creating the illusion of animation but in reality
  * they are just drawing the entire screen over and over.
  */
  function render() {
    renderAsset();
    renderEntities();
  }

  // Load the asset
  let renderAsset = () => {
    level.render();
  };

  /* This function is called by the render function and is called on each game
  * tick. Its purpose is to then call the render functions you have defined
  * on your enemy and player entities within app.js
  */
  let renderEntities = () => {
    /* Loop through all of the objects within the allEnemies array and call
    * the render function you have defined.
    */
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });

    player.render();

    for (let rock of allRocks) {
      rock.render();
    }

    for (let heart of allHearts) {
      heart.render();
    }

    key.render();
  }

  /* This function check if objects in game
  * collide with other objects in the games
  * and react in some way after collision
  */
  let checkCollisions = () => {
    if (allHearts.length > 0) {
      checkCollisionPlayerEnemy();
      checkCollisionPlayerRock();
      checkCollisionWithWater();
      checkCollisionWithKey();
    } else {
      inGameMenuLoose();
    }
  }

  // This function check's if player collide with enemy
  let checkCollisionPlayerEnemy = () => {
    if (objectCollideArray(player, allEnemies)) {
      // Player loose one life or loose game
      allHearts.pop();
      // Player move to start position
      resetPlayer();
    }
  }

  // This function check's if object is in water
  let collisionWithWater = (gameObject) => {
    let objX = gameObject.x / horisontal,
        objY = gameObject.y / vertical;
    // The value of 1 is used to indicate the water sprite in level class
    if (level.rowImages[objY][objX] === 1) {
      // Player move to start position
      // resetPlayer();
      return true;
    }
    return false;
  }

  // This function check's if something collide with water
  let checkCollisionWithWater = () => {
    // Player collide with water
    if (collisionWithWater(player)) resetPlayer();

    // Rock collide with water
    for (const [i, rock] of allRocks.entries()) {
      if (collisionWithWater(rock)) {
        // Modify the level cell to a new rock sprite
        let x = rock.x / horisontal,
            y = rock.y / vertical;
        level.rowImages[y][x] = 2;
        // Delete the rock that felt in water
        allRocks.splice(i, 1);
      }
    }
  }

  // This function check's if player collide with rock
  let checkCollisionPlayerRock = () => {
    if (objectCollideArray(player, allRocks)) {
      for (let rock of allRocks) {
        if (objectCollideObject(player, rock)) {
          // Player moved verticaly
          if (player.x == player.lastX) {
            // Player moved down
            if (player.y > player.lastY) {
              if (player.y / vertical == level.numRows - 1)
                rock.y = player.lastY
              else
                rock.y += vertical;
            }
            // Player moved up
            else {
              if (player.y == 0)
                rock.y = player.lastY
              else
                rock.y -= vertical;
            }
          }
          // Player moved horisontaly
          else {
            // Player moved right
            if (player.x > player.lastX) {
              if (player.x / horisontal == level.numCols - 1)
                rock.x = player.lastX
              else
                rock.x += horisontal;
            }
            // Player moved left
            else {
              if (player.x == 0)
                rock.x = player.lastX
              else
                rock.x -= horisontal;
            }
          }
        }
      }
    }
  }

  // This function check's if the player reached the key
  let checkCollisionWithKey = () => {
    if (objectCollideObject(player, key)) {
      inGameMenuWin();
    }
  }

  /* This function does nothing but it could have been a good place to
  * handle game reset states - maybe a new game menu or a game over screen
  * those sorts of things. It's only called once by the init() method.
  */
  function reset() {
    for (let enemy of allEnemies) {
      enemy.setStartPosition();
    }
    resetPlayer();
  }

  // This function resets only the player position
  let resetPlayer = () => {
    player.setStartPosition(2, 5);
  }

  // This function resets level
  let resetLevel = (id) => {
    $('#board').removeClass('blur');
    $('#main-menu').empty();
    inGameMenuButton();
    drawMapWithId(id);
    playingGame = true;
    player.sprite = avatarImages[slideIndex - 1];
    player.canMove = true;
    player.win = false;
    player.loose = false;
    reset();
    lastTime = Date.now();
    main();
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
    'images/enemy-bug-left.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    'images/Rock.png',
    'images/Heart.png',
    'images/Key.png'
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
  * object when run in a browser) so that developers can use it more easily
  * from within their app.js files.
  */
  global.ctx = ctx;
})(this);
