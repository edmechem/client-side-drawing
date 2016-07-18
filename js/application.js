$(document).ready(function() {
  canvasClick();
});

clicks = [];
colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];

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

    if (clicks.length >= 2) {
      var click2 = clicks.pop();
      var click1 = clicks.pop();
      grabAndDrawLastTwoClicks(click1, click2);
    };

    // debugger;

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
  theContext.fillStyle = randomColor();
  theContext.fillRect(x, y, width, height);
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
