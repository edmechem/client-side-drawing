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
    if (typeof mode == 'undefined') {mode = 'gradientrects'};
    if (mode == "gradientrects") {
      gradientrects(event);
    } else if (mode == "loopingpano") {
      loopingpano(event);
    } else if (mode == "solarsystem") {
      solarsystem(event);
    };
  })
}

function gradientrects(event) {
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

function loopingpano(event) {
  var ctx = document.getElementById('canvas').getContext('2d');

  // ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,1000,600); // clear canvas

  var img = new Image();

  // User Variables - customize these to change the image being scrolled, its
  // direction, and the speed.

  img.src = 'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';
  var CanvasXSize = 1000;
  var CanvasYSize = 600;
  var speed = 8; //lower is faster
  var scale = 3.1;
  var y = -4.5; //vertical offset

  // Main program

  var dx = 0.75;
  var imgW;
  var imgH;
  var x = 0;
  var clearX;
  var clearY;
  var ctx;

  img.onload = function() {
      imgW = img.width*scale;
      imgH = img.height*scale;
      if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
      if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
      else { clearX = CanvasXSize; }
      if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
      else { clearY = CanvasYSize; }
      //Get Canvas Element
      ctx = document.getElementById('canvas').getContext('2d');
      //Set Refresh Rate
      return setInterval(draw, speed);
  }

  function draw() {
      //Clear Canvas
      ctx.clearRect(0,0,clearX,clearY);
      //If image is <= Canvas Size
      if (imgW <= CanvasXSize) {
          //reset, start from beginning
          if (x > (CanvasXSize)) { x = 0; }
          //draw aditional image
          if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
      }
      //If image is > Canvas Size
      else {
          //reset, start from beginning
          if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
          //draw aditional image
          if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
      }
      //draw image
      ctx.drawImage(img,x,y,imgW,imgH);
      //amount to move
      x += dx;
  }
}

function solarsystem(theClick) {
  var sun = new Image();
  var moon = new Image();
  var earth = new Image();
  function init(){
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
  }

  function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,1000,600); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150,150);

    // Earth
    var time = new Date();
    ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
    ctx.translate(105,0);
    ctx.fillRect(0,-12,50,24); // Shadow
    ctx.drawImage(earth,-12,-12);

    // Moon
    ctx.save();
    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
    ctx.translate(0,28.5);
    ctx.drawImage(moon,-3.5,-3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun,0,0,300,300);

    window.requestAnimationFrame(draw);
  }

  init();
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

function randomOneToThree() {
  return Math.floor(Math.random() * 3) + 1;
}

function randomColor() {
  var redVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var greenVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var blueVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  if (randomOneToThree == 1) {
    return "#" + redVal + greenVal + blueVal;
  } else if (randomOneToThree == 2) {
    return "#" + greenVal + blueVal + redVal;
  } else {
    return "#" + blueVal + redVal + greenVal;
  }
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

