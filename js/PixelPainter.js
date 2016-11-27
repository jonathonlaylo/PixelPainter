var pixelPainter = document.createElement('div');
var pixelPainterCanvas = document.createElement('div');
var colorSwatchesCanvas = document.createElement('div');
var eraseButton = document.createElement('button');
var clearButton = document.createElement('button');
var saveButton = document.createElement('button');
var loadButton = document.createElement('button');

var whenClicked = null;
var color = ['262c04', 'ffc0cb', 'f2df4f', 'eeeeee', 'c6e2ff', '4169e1', '3b411d', 'f10714', '0d8163', '255083', '5f4236', '3496fa', 'fa02d4', '3ff206', '560e3f', '00fa9a', 'violet', '8b0000',
'ff6666', '000080', 'd3ffce', '7ffd4', 'b0e0e6', 'b6bb54', 'aa3b4e', 'b08125', 'orange', 'blue', 'purple', 'gray', 'black', 'teal', 'turquoise', 'red', 'yellow', 'green', '8A2BE2', 'gold', '00FFFF', 'ADFF2F', 'DC143C', '90EE90', '4B0082', 'FF4500'];

pixelPainter.id = 'palette';
document.body.appendChild(pixelPainter);

colorSwatchesCanvas.className = 'colorCanvas';
pixelPainter.appendChild(colorSwatchesCanvas);

eraseButton.className = 'buttons';
eraseButton.innerHTML = "Erase";
pixelPainter.appendChild(eraseButton);
eraseButton.addEventListener('click', erase);

clearButton.className = 'buttons';
clearButton.innerHTML = "Clear";
pixelPainter.appendChild(clearButton);
clearButton.addEventListener('click', clear);

saveButton.className = 'buttons';
saveButton.innerHTML = "SAVE";
pixelPainter.appendChild(saveButton);
saveButton.addEventListener('click', save);

loadButton.className = 'buttons';
loadButton.innerHTML = "LOAD";
pixelPainter.appendChild(loadButton);
loadButton.addEventListener('click', load);

pixelPainterCanvas.className = 'ppCanvas';
pixelPainter.appendChild(pixelPainterCanvas);

//Swatch Canvas
function swCanvas(pixelSize) {
  for (var x = 0; x < pixelSize; x++) {
    var swatchCanvasPixel = document.createElement('div');
    swatchCanvasPixel.className = 'swatchCanvasPixel';
    colorSwatchesCanvas.appendChild(swatchCanvasPixel);
    swatchCanvasPixel.style.backgroundColor = color[x];
    swatchCanvasPixel.addEventListener('click', storeColorPicker);
  }
}

//Pixel Painter Canvas
function ppCanvas(pixelSize) {
  for (var x = 0; x < pixelSize; x++) {
    var canvasPixel = document.createElement('div');
    canvasPixel.className = 'canvasPixelCell';
    pixelPainterCanvas.appendChild(canvasPixel);
    // --------- EVENTLISTENERS -----------
    canvasPixel.addEventListener('click', insertColorPicker);
    canvasPixel.addEventListener('mousedown', function(event) {mouseDown(event);
    });
    canvasPixel.addEventListener('mouseover', function(event) {mouseOver(event);
    });
    canvasPixel.addEventListener('mouseup', function(event) {mouseUp(event);
    });
  }
}

ppCanvas(2500);
swCanvas(44);

function storeColorPicker(event) {
  currentColor = event.target.style.backgroundColor;
  console.log(event);
}

function insertColorPicker(event) {
  if (event.target.style.backgroundColor === 'white') {
    event.target.style.backgroundColor = currentColor;
  } else if (event.target.style.backgroundColor !== 'white') {
    event.target.style.backgroundColor = currentColor;
  }
}

function mouseDown(event) {
  whenClicked = true;
  if (whenClicked === true) {
    event.target.style.backgroundColor = currentColor;
  }
}

function mouseOver(event) {
  if (whenClicked === true) {
    event.target.style.backgroundColor = currentColor;
  }
}

function mouseUp(event) {
  whenClicked = false;
  if (whenClicked === false) {
    event.target.style.backgroundColor = currentColor;
  }
}

function erase(event) {
  currentColor = 'white';
}

function clear(event) {
  for(var i = 0; i < document.querySelectorAll('.canvasPixelCell').length; i++) {
    document.querySelectorAll('.canvasPixelCell')[i].style.backgroundColor = 'white';
  }
}

function save(event){
  var dataArray = [];
  var saveCell = document.querySelectorAll('.canvasPixelCell');
  for (var i = 0; i < saveCell.length; i++) {
    dataArray.push(saveCell[i].style.backgroundColor);
  }
  //local storage thing goes here i guess
  localStorage.setItem('saveCellDrawing', JSON.stringify(dataArray));
  //console.log('just DataArray', dataArray);
  console.log('data Stringified', JSON.stringify(dataArray));
}

function load(event){
  var data = JSON.parse(localStorage.getItem('saveCellDrawing'));
  console.log('LOADED DATA', data);
  var dataDrawing = document.querySelectorAll('.canvasPixelCell');
  for (var i = 0; i < dataDrawing.length; i++) {
    dataDrawing[i].style.backgroundColor = data[i];
  }
}