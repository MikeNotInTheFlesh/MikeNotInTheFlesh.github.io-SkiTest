/*
author: Michael Grace
*/

function directionGraphic(skier) {
  // Change direction of graphic based on input and momentum
  if (moveX > 0 && moveY > 0){
    dirImg = img1;
  } else if (moveX > 0 && moveY < 0){
    dirImg = img4;
  } else if(moveX < 0 && moveY > 0){
    dirImg = img2;
  } else if (moveX < 0 && moveY < 0){
    dirImg = img3;
//////////////////////////////////////////
  } else if(moveX > 0 && skier.py > 0){
    dirImg = img1;
  } else if (moveX > 0 && skier.py < 0){
    dirImg = img4;
  } else if(moveX < 0 && skier.py > 0){
    dirImg = img2;
  } else if (moveX < 0 && skier.py < 0) {
    dirImg = img3;
//////////////////////////////////////////
} else if(skier.px > 0 && moveY > 0){
    dirImg = img1;
  } else if (skier.px > 0 && moveY < 0){
    dirImg = img4;
  } else if(skier.px < 0 && moveY > 0){
    dirImg = img2;
  } else if (skier.px < 0 && moveY < 0) {
    dirImg = img3;
  ////////////////////////////////////
  } else if (skier.px > 0 && skier.py > 0){
    dirImg = img1;
  } else if (skier.px > 0 && skier.py < 0 ){
    dirImg = img4;
  } else if(skier.px <= 0 && skier.py >= 0){
    dirImg = img2;
  } else if (skier.px <= 0 && skier.py <= 0) {
    var dirImg = img3;
  } else {
    dirImg = img1;
  }
  return dirImg;

}
