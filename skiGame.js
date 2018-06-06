/*
author: Michael Grace
*/

var skier;
var sandTraps = [];
var moveX = 0;
var moveY = 0;
var score = 0;
var dirImg = undefined;
var gates = [];
var sortedGates = [];
var gateScore = 0;
var way = ['left', 'right', 'up', 'down']
//var test = [4, 1, 456, 22, 88, 32, 5, 66, 3, 65, 32, 12, 9]
var gateSound;
var levelSound;
var mbutton;
var highScore = 0;
var newGame = false;
var ngame;
var soundIcon;


function preload(){
  img1 = loadImage("bski2.gif");
  img2 = loadImage("bski3.gif");
  img3 = loadImage("bski4.gif");
  img4 = loadImage("bski5.gif");
  upFlag = loadImage("upFlag.gif");
  downFlag = loadImage("downFlag.gif");
  rightFlag = loadImage("rightFlag.gif");
  leftFlag = loadImage("leftFlag.gif");
  ice = loadImage("ice.jpg");
  sand = loadImage("sand2.gif");
  soundOn = loadImage("soundOn.gif");
  soundOff = loadImage("soundOff.gif");
  // gateSound = loadSound("gateSound.mp3");
  // levelSound = loadSound("levelSound.mp3");

}

function setup() {
	createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
  // createCanvas(windowWidth * 3 / 4, windowHeight * 3 / 4);
//  createCanvas(600, 400);
  frameRate(30);
  textFont("Impact, Charcoal, sans-serif");

  skier = new Skier();
  mbutton = new modeButton();
  ngame = new newGame2();
  soundIcon = new soundButton();

  for (var i = 0; i < 2; i++) {
    sandTraps[i] = new SandTrap(random(width), random(height));
  }
  for (var i = 0; i < 8; i++) {
    gates[i] = new Gate(random(width), random(height), random(way));
  }

  highScore = getCookie("Score");
//  console.log(highScore);
}

function draw() {
  background(255);
  image(ice, 0, 0, width, height)

  for (var i = 0; i < sandTraps.length; i++) {
    sandTraps[i].show();
    if (sandTraps[i].collision(skier)) {
      score -= 0.5;
      skier.px *= 0.75;
      skier.py *= 0.75;
    }
  }

// Adds a obstacle when score gets high and makes obstacles bigger
  if ((sandTraps.length -1) * 1000 < score) {
    append(sandTraps, new SandTrap(random(width), random(height), random(way)));
    // if (soundIcon.mode == 'on') {
      // levelSound.setVolume(0.3);
      // levelSound.play();
    }
    for (let trap of sandTraps) {
      trap.r += 1;
    }
  }

  mbutton.show(); //mode mbutton
  soundIcon.show();

  textFont("Impact, Charcoal, sans-serif");
  fill(0);
  textSize(width / 20);
  text("Score: " + round(score), width / 60, height / 10);
  textSize(width / 30);
  text("High Score: " + highScore, width / 60, height - height / 10);

  if (gates.length < 1) {
    gameover();
  } else {
  for (var i = 0; i < gates.length; i++) {
    gates[i].show();
    gates[i].timeleft -= 1;

    if (gates[i].collision(skier)) {
      score += 100;
      // if (soundIcon.mode == 'on') {
        // gateSound.setVolume(0.2);
        // gateSound.play();
      }
      for (let gate of gates){
        gate.timeleft += 60;
      }
      // console.log(gates[i]);
      // console.log("Score: " + score);
      gates.splice(i, 1);
      gateScore += 1;
      if (gates.length > 3) { // replacing a gate
      append(gates, new Gate(random(width), random(height), random(way)));
      // If only one or two gates left, two will be added
    } else {
      append(gates, new Gate(random(width), random(height), random(way)));
      append(gates, new Gate(random(width), random(height), random(way)));
    }
    }
    if (gates[i].timeleft < 0){
      gates.splice(i, 1);
      for (i = 0; i < gates.length - 1; i++){
        gates[i].timeleft += 60;
      }
      }


}
  skier.show();
  dirImg = directionGraphic(skier);
  image(dirImg, skier.x - skier.r, skier.y - skier.r, skier.r * 2, skier.r * 2);
    score += sqrt(skier.px * skier.px + skier.py * skier.py) / 1000;
    // wraps skier around screen border
    skier.x += skier.px / (width / (8 + sandTraps.length));
    skier.x %= width;
    skier.y += skier.py / (width / (8 + sandTraps.length));
    skier.y %= height;

    if (skier.x < 0) {
      skier.x = width
    }
    if (skier.y < 0) {
      skier.y = height
    }
    skier.moveLR(moveX);
    skier.moveUD(moveY);
    }

    if (!newGame) {
      ngame.show();
    }

}

function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode == "68") {
    moveX = height / 40;
  }
  else if (keyCode === LEFT_ARROW || keyCode == "65") {
    moveX = -height / 40;
  }
  else if (keyCode === UP_ARROW || keyCode == "87") {
    moveY = -width / 40;
  }
  else if (keyCode === DOWN_ARROW || keyCode =="83") {
    moveY = width / 40;
  } else if (keyCode == "32") {
    skier.px *= 0.10;
    skier.py *= 0.10;
  }

}
function keyReleased() {
  if ((keyCode === RIGHT_ARROW || keyCode =="68") && mbutton.mode == 'Liz') {
    moveX = 0;
  }
  else if ((keyCode === LEFT_ARROW || keyCode =="65") && mbutton.mode == 'Liz') {
    moveX = 0;
  }
  else if ((keyCode === UP_ARROW || keyCode =="87") && mbutton.mode == 'Liz') {
    moveY = 0;
  }
  else if ((keyCode === DOWN_ARROW || keyCode =="83") && mbutton.mode == 'Liz') {
    moveY = 0;
  }

}

function gameover() {
  textSize(width * 0.2);
  fill(255, 0, 0, 255);
  rectMode(CENTER);
  textAlign(CENTER);
  textFont("Impact, Charcoal, sans-serif");
  text("GAME OVER", width / 2, height / 2 + height / 10);
  if (score > highScore) {
  setCookie("Score", round(score), 365);
  }
  textSize(width * 0.1);
  fill(50);
  if (score > highScore){
    text("NEW HIGH SCORE!!!", width / 2, height / 2 + height / 4);
  }
  ngame.show();
//  noLoop();
}

function addTime() {
  if (gates.length > 0){
    for (i = 0; i < gates.length - 1; i++){
      gates[i].timeleft += 30;
    }
  }
}

function mouseClicked() {
  if (dist(mbutton.x, mbutton.y, mouseX, mouseY) < mbutton.r) {
  mbutton.change();
} else if (!newGame &&
    ngame.x - ngame.w / 2 < mouseX && mouseX < ngame.x + ngame.w / 2 &&
    ngame.y - ngame.h / 2 < mouseY && mouseY < ngame.y + ngame.h / 2
){
  newGame = true;
  pop();
  loop();
} else if (newGame && gates.length == 0 &&
    ngame.x - ngame.w / 2 < mouseX && mouseX < ngame.x + ngame.w / 2 &&
    ngame.y - ngame.h / 2 < mouseY && mouseY < ngame.y + ngame.h / 2
          ) {
  location.reload();
  } else if (
    soundIcon.x - soundIcon.r / 2 < mouseX
    && mouseX < soundIcon.x + soundIcon.r / 2
    && soundIcon.y - soundIcon.r / 2 < mouseY
    && mouseY < soundIcon.y + soundIcon.r / 2
  ) {
    soundIcon.change();
  }
}
