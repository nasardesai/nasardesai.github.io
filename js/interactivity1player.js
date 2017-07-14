function sortNumber(a,b) {
    return a - b;
}
 var ispaused = false;
 var scorelist = [0,0,0];
 var playerName = ["No name", "Also no name", "Another no name"];
 //var scoredict = {"No name": 0,"Also name": 0,"Another no name": 0};
 jQuery("#scoresbtn").on("click", function() {
 jQuery("#content").empty();
 scorelist.sort(sortNumber);
 scorelist.reverse();
 first = scorelist[0];
 second = scorelist[1];
 third = scorelist[2];
 var firstplayer = highScoreMap.get(first);
 var secondplayer = highScoreMap.get(second);
 var thirdplayer = highScoreMap.get(third);
 jQuery("#content").append(
 "<ol>" +
 "<li class = \"gold\">" + firstplayer + " : " +  first.toString() + "</li>" +
 "<li class = \"silver\">" + secondplayer + " : " +  second.toString() + "</li>" +
 "<li class = \"bronze\">" + thirdplayer + " : " +  third.toString() + "</li>" +
 "</ol>"
 );
});
jQuery("#restartbtn").on("click", function() {
 location.reload();
 });

 jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Game created by Neil!" + "</div>"
 );
});
jQuery("#pausebtn").on("click", function() {
  jQuery("#content").empty();
  if (game.paused == false) {
    game.paused = true;
    jQuery("#content").append(
    "<div>" + "Game Paused" + "</div>"
    );
  } else{
    game.paused = false;
  }
});

 jQuery("#helpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<ul>" + "<li>" + "Press the Up arrow to jump." + "</li>" + "<li>" + "Avoid the pipes and get as many points as possible." + "</li>" + "<li>" + "Click P to pause" + "</li>" + "<li>" + "Pressing the SpaceBar will throw an acorn. This will cost 500 points so it can only be used if you have more than 500 points" + "</li>" +"</ul>"
);
});


function registerScore(score1){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + " : " + score1.toString() + "</li>";
  highScoreMap.set(score1, playerName);
  scorelist.push(score1);
  score1 = 0;
  delay = 0;
}

function scores(){
  jQuery("#scoreboard").empty();
  scorelist.sort(sortNumber);
  scorelist.reverse();
  first = scorelist[0];
  second = scorelist[1];
  third = scorelist[2];
  var firstplayer = highScoreMap.get(first);
  var secondplayer = highScoreMap.get(second);
  var thirdplayer = highScoreMap.get(third);
  jQuery("#scoreboard").append(
  "<ol>" +
  "<li class = \"gold\">" + firstplayer + " : " +  first.toString() + "</li>" +
  "<li class = \"silver\">" + secondplayer + " : " +  second.toString() + "</li>" +
  "<li class = \"bronze\">" + thirdplayer + " : " +  third.toString() + "</li>" +
  "</ol>"
  );
}

function pause(){
  jQuery("#content").empty();
  if (game.paused == false) {
    game.paused = true;
    jQuery("#content").append(
    "<div>" + "Game Paused" + "</div>"
    );
  } else{
    game.paused = false;
  }
}
