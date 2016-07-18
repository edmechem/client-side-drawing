$(document).ready(function() {
  canvasClick();
});

function canvasClick() {
  $('body').on('click', '#canvas', function(event) {
    event.preventDefault();
    var theClick = event.originalEvent;
    var xLoc = theClick.layerX;
    var yLoc = theClick.layerY;
    var clickLoc = {xLoc, yLoc};
    // clickLoc = {theClick.layerX, theClick.layerY};
    console.log(clickLoc);
    // debugger;
  })
}
