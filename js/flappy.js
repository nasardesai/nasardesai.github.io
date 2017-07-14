//Player 1 is the chipmunk. To jump, click the up arrow
//Player 2 is the squrrel. To jump, click the space bar
// the Game object used by the phaser.io library
/*
var num = 100;
if (num%2==0){
  alert("Even");
} else{
  alert("odd");
}

*/

var stateActions = { preload: preload, create: create, update: update };
var score1 = 0;
var score2 = 0;
var labelScore1;
var labelScore2;
var player1;
var player2;
var pipes = [];
var dead1 = false;
var dead2 = false;
var delay = 0;
var bothdead = false;
// like a dictionary in python key will be name and value will be highScore
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
  game.load.image("player2Img", "../assets/squirrel.png");
  game.load.image("backgroundImg", "../assets/volcanobackground.jpg");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe_red_edited.png");
  game.load.image("pipeRedEnd","../assets/piperedend.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  // set the background colour of the scene
//  game.stage.setBackgroundColor("#99bbff");

  var background = game.add.image(0, 0, "backgroundImg");
  background.width = 790;
  background.height = 400;

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.text(10, 6, "Press 'P' to Start!", {font: "26px Courier", fill: "#FFFFFF"});
  //game.add.sprite(10, 270, "playerImg");
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(spaceHandler);
  labelScore1 = game.add.text(10, 40, "Player 1 score = 0",{font: "20px Courier", fill: "#FFFFFF"});
  labelScore2 = game.add.text(10, 60, "Player 2 score = 0",{font: "20px Courier", fill: "#FFFFFF"});
  player1 = game.add.sprite(100, 200, "player1Img");
  player1.x = 100;
  player1.y = 200;
  player1.width = 40;
  player1.height = 40;
  player2 = game.add.sprite(100, 250, "player2Img");
  player2.x = 100;
  player2.y = 250;
  player2.width = 40;
  player2.height = 40;
  game.physics.arcade.enable(player1);
  game.physics.arcade.enable(player2);
  //player1.body.velocity.x = 100;
  //player1.body.velocity.y = -100;
  if (dead1==false){
player1.body.gravity.y = 300;
}
  //player2.body.velocity.x = 100;
  //player2.body.velocity.y = -100;
  if (dead2==false){
  player2.body.gravity.y = 300;
}
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
   pipeInterval,
   generatePipe
  );
  if (dead1 == false){
  game.input.keyboard
   .addKey(Phaser.Keyboard.UP)
   .onDown
   .add(player1Jump);
}
  if (dead2 == false){
  game.input.keyboard
   .addKey(Phaser.Keyboard.SPACEBAR)
   .onDown
   .add(player2Jump);
}
  game.input.keyboard.addKey(Phaser.Keyboard.P)
  .onDown.add(pause);
  game.paused = true;
  game.input.keyboard.addKey(Phaser.Keyboard.R)
  .onDown.add(reloadgame);
  game.paused = true;
  generatePipe();
  changeScore();

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
   player2,
   pipes,
   gameOver2);
   changeScore();
   if (bothdead == true) {
     pipes = null;
   }
   if(player1.body.y < -50 || player1.body.y > 450){
     gameOver1();
   }
   if(player2.body.y < -50 || player2.body.y > 450){
     gameOver2();
   }
  }

  function gameOver1(){
   //location.reload();
   labelScore1.setText("Player 1 died. Final score = "+ score1,{font: "20px Courier", fill: "#FFFFFF"});
  //labelScore1.setText("Player 1 died".toString());
   dead1 = true;
   player1.kill();
   if (dead2){gameOver();}
  }

  function gameOver2(){
   //location.reload();
   labelScore2.setText("Player 2 died. Final score = "+ score2,{font: "20px Courier", fill: "#FFFFFF"});
//labelScore2.setText("Player 2 died".toString());
   dead2 = true;
   player2.kill();
   if (dead1){gameOver();}
  }

  function gameOver(){
    bothdead = true;
  // game.destroy();
  }

function spaceHandler() {
  game.sound.play("score");
 }

 function player1Jump() {
  player1.body.velocity.y = -175;
 }
 function player2Jump() {
 player2.body.velocity.y = -175;
 }

 function reloadgame() {
 location.reload();
 }

 function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -275;
 }

 function addEdge(x, y) {
  var pipeEnd = game.add.sprite(x,y,"pipeRedEnd");
  pipeEnd.width = 56;
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -275;
 }

 function generatePipe() {
  var gap = game.rnd.integerInRange(50 ,300);
  console.log(gap);
  var pipeBlock = game.add.sprite(750,0,"pipeBlock");
  pipeBlock.height = gap;
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -275;
  pipes.push(pipeBlock);
  var pipeEnd = game.add.sprite(747,gap,"pipeRedEnd");
  pipeEnd.width = 56;
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -275;
  var pipeEnd = game.add.sprite(747,gap+100,"pipeRedEnd");
  pipeEnd.width = 56;
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -275;
  var pipeBlock = game.add.sprite(750,gap+112,"pipeBlock");
  pipeBlock.height = 400-gap;
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -275;
  pipes.push(pipeBlock);

}
function changeScore() {
  if (delay > 1){
  if (dead1 == false){
    score1 = score1 + 1;
    labelScore1.setText("Player 1 score = "+score1.toString());
  }
  if (dead2 == false){
    score2 = score2 + 1;
    labelScore2.setText("Player 2 score = "+score2.toString());
  }
} else{delay+=1;}
}
