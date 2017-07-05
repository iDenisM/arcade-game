frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

//GAME ROOLS
1. Use the keyboard arrow keys to move on the board
2. Take the key to open the door

//GAME MECHANICS
//--PLAYER
- can move up right down and left
- can pick lives and gems
- can push rocks
- can pick keys
- if moved on water then fall and loose one life or loose the game
- if collided with an enemy then loose one life or loose the game
- if loose life then restart level
- if loose game then move to main menu
- to win the level take the key to the door
- to save the princess first open the door then bring all the gems to her
//--ENEMY
- move on the board from right to left or left to right
- if collides with a rock then jump over (or maybe die)
- if collides with water then jump over
//--ROCKS
- if fall in water then player can pass on it and player can not push it anymore
//--DOOR
- the door in the right bottom corner of the game
//--KEY
- the key randomly on the board
//--PRINCESS
- appears in the left bottom corner of the board
- takes gems to go to the door (as an idea for one gem move one square to the door)

//IDEAS FOR THE GAME
- create a game with levels, at every level do:
  - add key so that the player can open the door to the next level
  - remote some stone blocks from the field
  - add rocks (as an idee you can make the rocks be moved to the water
    so that the player can take some objects from the water) think to add rocks
    on the grass first (may be latter on the sones too)
  - use the princess character as a goal to save her
  - give the princess the gems to convince her to go with you to the next level!

//Resources
closed door - http://mobga.me/dragon-mania-legends/events/the-forgotten-castle-level-2/#
