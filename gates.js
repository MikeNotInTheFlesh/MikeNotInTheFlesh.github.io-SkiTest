/*
author: Michael Grace
*/

function Gate(x, y, direction) {
  this.x = x;
  this.y = y;
  // this.w = 40;
  // this.h = 10;
  this.direction = direction;
  this.timeleft = random(30) +200;
  this.r = width / 120;
  if (this.direction == 'left' || this.direction === 'right'){
    this.w = width / 60;
    this.h = height / 7;
  } else {
    this.w = height / 7;
    this.h = width / 60;
  }
  this.show = function() {

    var sortedTime = [];
    for (i = 0; i < gates.length; i++) {
      append(sortedTime, gates[i].timeleft)
    }
    sort(sortedTime);

    noStroke();
    fill(0, 255, 0, 100);
    if (this.timeleft > 120) {
    rect(this.x - this.w/2, this.y - this.h / 2, this.w, this.h);
  } else if (this.timeleft % 10 < 5 && this.timeleft == sortedTime[0]) {

  }else{
    rect(this.x - this.w/2, this.y - this.h / 2, this.w, this.h);
  }


    if (this.direction == 'up') {
      image(upFlag, this.x - this.r*6, this.y - this.r*7,
        this.r * 14, this.r * 9);
    } else if (this.direction == 'down') {
      image(downFlag, this.x - this.r*6, this.y - this.r*2,
        this.r * 14, this.r * 9);
    } else if (this.direction == 'right') {
      image(rightFlag, this.x - this.r*2, this.y - this.r * 6,
        this.r * 9, this.r * 14);
    } else if (this.direction == 'left') {
      image(leftFlag, this.x - this.r*7, this.y - this.r*6,
        this.r * 9, this.r * 14);
    }
}


  this.collision = function(ship) {
    var dirCheck = false;
    if (this.direction == 'right' && ship.px > 0) {
      dirCheck = true;
    } else if (this.direction == 'left' && ship.px < 0) {
      dirCheck = true;
    } else if (this.direction == 'up' && ship.py < 0) {
      dirCheck = true;
    } else if (this.direction == 'down' && ship.py > 0) {
      dirCheck = true;
    } else{
      dirCheck = false;
    }

    var d = dist(this.x, this.y, ship.x, ship.y);
    var e = dist(this.x + this.w / 2, this.y, ship.x, ship.y);
    var f = dist(this.x - this.w / 2, this.y, ship.x, ship.y);
    if ((d < this.r + ship.r ||
        e < this.r + ship.r ||
        f < this.r + ship.r ) && dirCheck) {
      return true;
    } else {
      return false;
    }
  }
}
