/*
author: Michael Grace
*/

function Skier() {
  this.x = width / 2;
  this.y = height / 2;
  this.r = width / 25;
  this.px = 0;
  this.py = 0;
  this.speed = 2 * height / 400;


  this.show = function() {
   // fill(255, 0, 0, 200);
   // ellipse(this.x, this.y, this.r * 2, this.r * 2)

  }

  this.moveLR = function(dir = 1) {
//    this.x += 1 * dir;
    this.px += this.speed * dir;
    this.px *= 0.95;
  }
  this.moveUD = function(dir = 1) {
//    this.y += 1 * dir;
    this.py += this.speed * dir;
    this.py *= 0.95;
  }

  this.collision = function(sandTrap) {
    var d = dist(this.x, this.y, ship.x, ship.y);
    if (d < this.r + planet.r) {
      return true;
    } else {
      return false;
    }
  }
}
