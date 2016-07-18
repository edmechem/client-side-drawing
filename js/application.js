$(document).ready(function() {
  canvasClick();
});

clicks = [];

function canvasClick() {
  $('body').on('click', '#canvas', function(event) {
    event.preventDefault();
    theCanvas = this;
    theContext = theCanvas.getContext("2d");

    var theClick = event.originalEvent;
    var xLoc = theClick.layerX;
    var yLoc = theClick.layerY;
    var clickLoc = {xLoc, yLoc};
    clicks.push(clickLoc);
    // console.log(clickLoc);
    // console.log(clicks.length);

    if (clicks.length > 2) {
      var click2 = clicks.pop();
      var click1 = clicks.pop();
      grabAndDrawLastTwoClicks(click1, click2);
    };

  })
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

  theContext.fillRect(x, y, width, height);
}
