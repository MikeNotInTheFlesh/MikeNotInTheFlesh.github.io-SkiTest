/*
author: Michael Grace
*/

function SandTrap(x, y) {
  this.x = x;
  this.y = y;
  this.r = height / 10;

  this.show = function() {

    // noStroke();
    // rColor = Math.floor(Math.random()) *100 + 50;
    // fill(rColor);
    // ellipse(this.x, this.y, this.r * 2, this.r * 2);
    image(sand, this.x - this.r, this.y - this.r,
      this.r * 2, this.r * 2);
  }

  this.collision = function(skier) {
    var d = dist(this.x, this.y, skier.x, skier.y);
    if (d < this.r + skier.r - 10) {  // The + 10 is a fudge factor
      return true;
    } else {
      return false;
    }
  }
}
