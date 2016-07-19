$(document).ready(function() {
  mode = tabClick();
  canvasClick();
});

function tabClick() {
  var activeTab = $("li.active > a").attr('href');
  $(activeTab).show();

  $("li a").on("click", function(event){
    event.preventDefault();

    $("li.active").removeClass("active");
    $(this).parent().addClass("active");

    mode = $(this).attr('href').slice(1);
    return mode;
  })
}

clicks = [];
colorVals = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF"];

function canvasClick() {
  $('body').on('click', '#canvas', function(event) {
    if (typeof mode == 'undefined') {mode = 'twoclickrects'};
    if (mode == "twoclickrects") {
      twoclickrects(event);
    } else if (mode == "dragrects") {
      dragrects(event);
    } else if (mode == "somethingelse") {
      somethingelse(event);
    };
  })
}

function twoclickrects(event) {
  event.preventDefault();
  theCanvas = $('#canvas')[0];
  theContext = theCanvas.getContext("2d");
  var theClick = event.originalEvent;

  var xLoc = theClick.layerX;
  var yLoc = theClick.layerY;
  var clickLoc = {xLoc, yLoc};
  clicks.push(clickLoc);

  if (clicks.length >= 2) {
    var click2 = clicks.pop();
    var click1 = clicks.pop();
    grabAndDrawLastTwoClicks(click1, click2);
  };
}

function dragrects(theClick) {
  // do something, eventually
}

function somethingelse(theClick) {
  // do something, eventually
}

function grabAndDrawLastTwoClicks(click1, click2) {
  var x1 = click1["xLoc"];
  var y1 = click1["yLoc"];
  var x2 = click2["xLoc"];
  var y2 = click2["yLoc"];

  if (x2 >= x1) {
    x = x1;
    width = (x2 - x1);
  } else {
    x = x2;
    width = (x1 - x2);
  }

  if (y2 >= y1) {
    y = y1;
    height = (y2 - y1);
  } else {
    y = y2;
    height = (y1 - y2);
  }

  drawBox(x, y, width, height)
}

function drawBox(x, y, width, height) {
  var color1 = randomColor();
  sleep(30);
  var color2 = randomColor();
  sleep(30);
  var color3 = randomColor();
  sleep(30);
  var color4 = randomColor();
  sleep(30);
  var color5 = randomColor();

  // fillRect = semiRandomFillRectCoordinates(width, height);
  if (height >= width) {
    var fillRect = [0, 0, 0, height];
  } else {
    var fillRect = [0, 0, width, 0];
  }

  var theGradient = theContext.createLinearGradient(fillRect[0], fillRect[1], fillRect[2], fillRect[3]);
  theGradient.addColorStop(0, color1);
  theGradient.addColorStop(.25, color2);
  theGradient.addColorStop(.5, color3);
  theGradient.addColorStop(.75, color4);
  theGradient.addColorStop(1, color5);
  theContext.fillStyle = theGradient;
  theContext.fillRect(x, y, width, height);
}

function randomColor() {
  var redVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var greenVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var blueVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  return "#" + redVal + greenVal + blueVal;
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

// function semiRandomFillRectCoordinates(width, height) {
//   if (height >= width) {
//     var myHeight = Math.floor((height*2)/3) + Math.floor((height/3) * Math.random());
//     var myWidth = Math.floor((width/2) * Math.random());
//     // var myWidth = width;
//   } else {
//     var myWidth = Math.floor((width*2)/3) + Math.floor((width/3) * Math.random());
//     var myHeight = Math.floor((height/2) * Math.random());
//     // var myHeight = height;
//   }
//   return [randomIntFraction(width), randomIntFraction(height), myWidth, myHeight]
// }

// function randomIntFraction(number) {
//   return Math.floor(number * Math.random());
// }
