jQuery("#scoresbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<p>" + "High Scores only avaliable on the 1 player version" + "</p>"
 );
});
jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Game created by Neil!" + "</div>"
 );
});

jQuery("#restartbtn").on("click", function() {
 location.reload();
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
 "<ul>"
 + "<li>" + " If you are Player 1 (the chipmunk()), press W arrow to jump." + "</li>"
 + "<li>" + "If you are Player 2 (the squirel()), press SPACE to jump." + "</li>"
 + "<li>" + "If you are Player 3 (the flying squirel()), press the Up arrow to jump." + "</li>"
 + "<li>" + "Avoid the pipes." + "</li>"
 + "<li>" + "If you get more points you win!" + "</li>"
 + "<li>" + "Press P to pause" + "</li>"
 + "</ul>"
);
});

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
