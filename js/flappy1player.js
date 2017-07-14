//Player 1 is the chipmunk. To jump, click the up arrow
//Player 2 is the squrrel. To jump, click the space bar
// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score1 = 0;
var labelScore1;
var player1;
var pipes = [];
var dead1 = false;
var delay = 0;
var highScoreMap = new Map();
var highwall = [];
var lowwall = [];
//alert("Welcome. Player 1 is the chipmunk (grey). To jump, click the up arrow. Player 2 is the squirrel (brown). To jump, click the space bar. Click to begin.");
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("player1Img", "../assets/chipmunk.png");
  game.load.image("backgroundImg", "../assets/volcanobackground.jpg");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe_red.png");
  game.load.image("star","../assets/star.png");
  game.load.image("pipeTopEnd","../assets/pipetopend.jpg");
  game.load.image("pipeBottomEnd","../assets/pipebottomend.jpg");
  game.load.image("pipeRedEnd","../assets/piperedend.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  // set the background colour of the scene
//  game.stage.setBackgroundColor("#99bbff");
  delay = 0;
  score1 = 0;
  var background = game.add.image(0, 0, "backgroundImg");
  background.width = 790;
  background.height = 400;

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.text(10, 6, "Press 'P' to Start!", {font: "26px Courier", fill: "#FFFFFF"});
  //game.add.sprite(10, 270, "playerImg");
  game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(spaceHandler);
  labelScore1 = game.add.text(10, 40, "Player 1 score = 0",{font: "20px Courier", fill: "#FFFFFF"});
  player1 = game.add.sprite(100, 200, "player1Img");
  player1.x = 100;
  player1.y = 200;
  player1.width = 40;
  player1.height = 40;
  game.physics.arcade.enable(player1);
  //player1.body.velocity.x = 100;
  //player1.body.velocity.y = -100;
  player1.body.gravity.y = 300;
  //player2.body.velocity.x = 100;
  //player2.body.velocity.y = -100;
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
   pipeInterval,
   generatePipe
  );
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(movePlayer1Left);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(movePlayer1Right);
  game.input.keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(movePlayer1Up);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(movePlayer1Down);
  game.input.keyboard
   .addKey(Phaser.Keyboard.UP)
   .onDown
   .add(player1Jump);
  generatePipe();
  game.input.keyboard.addKey(Phaser.Keyboard.P)
  .onDown.add(pause);
  game.paused = true;

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
   game.physics.arcade.overlap(
   player1,
   pipes,
   gameOver1);
   game.physics.arcade.overlap(
   player1,
   highwall,
   gameOver1);
   game.physics.arcade.overlap(
   player1,
   lowwall,
   gameOver1);
   if(player1.body.y < -50 || player1.body.y > 450){
     gameOver1();
   }

   changeScore();
   scores();

  }

  function gameOver1(){
   //location.reload();
   labelScore1.setText("Player 1 died. Final score : "+ score1,{font: "20px Courier", fill: "#FFFFFF"});
  //labelScore1.set Text("Player 1 died".toString());
   player1.kill();
   registerScore(score1);
   game.state.restart();
  }

function spaceHandler() {
  game.sound.play("score");
 }

 function movePlayer1Left() {
 player1.x -= 10;
 }

 function movePlayer1Right() {
 player1.x += 10;
 }

 function movePlayer1Up() {
 player1.y -= 10;
 }

 function movePlayer1Down() {
 player1.y += 10;
 }

 function player1Jump() {
  player1.body.velocity.y = -175;
 }

 function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipeBlock.width = 50;
  if (count < globalgap){
    highwall.push(pipeBlock);
  } else{
    lowwall.push(pipeBlock);
  }
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -275;
  pipeBlock = null;
 }

 function addEdge(x, y) {
  var pipeEnd = game.add.sprite(x,y,"pipeRedEnd");
  pipeEnd.width = 56;
  if (count == globalgap){
    highwall.push(pipeEnd);
  } else{
    lowwall.push(pipeEnd);
  }
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -275;
 }
/*
 function addPipeTop(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeTopEnd");
  pipeBlock.width = 50;
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -300;
 }

 function addPipeBottom(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBottomEnd");
  pipeBlock.width = 50;
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -300; var multArray = [[], [], []]
 }
*/
var count = -10;
var globalgap = 0;
function generatePipe() {
 var gap = game.rnd.integerInRange(1 ,5);
 globalgap = gap;
 for (count = -2; count < 8; count++) {
   if (count != gap && count != gap+1/* && count != gap-1 && count != gap+2*/) {
     addPipeBlock(750, count * 50);
   } else if (count == gap){
     addEdge(747, count *50);
   } else if (count == gap+1){
     var x = count*50;
     addEdge(747, x+38);
   }
 }
 pipes.push(highwall);
 pipes.push(lowwall);
 changeScore();
}


function changeScore() {
  if (delay > 1){
    score1 = score1 + 1;
    labelScore1.setText("Player 1 score : "+score1.toString());
} else{delay+=1;}
}


function destroywall() {
  var myStringArray = pipes[3];
  var arrayLength = myStringArray.length;
  for (var i = 0; i < arrayLength; i++) {
    myStringArray[i].kill();
    //Do something
}
}
