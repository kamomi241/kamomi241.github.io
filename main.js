var c = document.createElement('canvas');
var ctx = c.getContext('2d');
var cw = c.width = window.innerWidth - 10;
var ch = c.height = 200;
document.body.appendChild(c);

ctx.font = 'normal 64px monospace';
ctx.textAlign = 'center';
ctx.textBaseline = 'top';
ctx.fillStyle = '#fff';
ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
ctx.shadowColor = '#3f3';
var page=0;

  var messagesArray= new Array(
     "",
    "",
    "",
    "",
    "",
    "",
    "Kazuki Takahashi",
    "",
    "",
    "",
    "Portfolio",
    "",
    "",
    "██████████████████████████████████",
  );

  var cursor = new Array(
    "",
    "█",
    "",
    "█",
    "",
    "█",
    "",
    "█",
    "_",
    "",
    "█",
    
  );



var messageArray = messagesArray[page].split('');
var totalMessages = messagesArray.length-1;
var messageLength = messageArray.length;
var pointer = 0;
var typeTick = 0;
var typeTickMax = 0;

var minTick=15;
var maxTick=30;
var typeResetTick = 0;
var typeResetMax = 15;
 
var updateTypeTick = function(){
  

  if(pointer < messageLength){
    if(typeTick < typeTickMax){
      typeTick++;
    } else {
      typeTick = 0;
      pointer++; 
      typeTickMax= Math.floor((Math.random()*maxTick)+minTick);
    }
  } else {
    if(typeResetTick < typeResetMax){
      typeResetTick++;
    } else { 
      typeResetTick = 0;
      typeTick = 0;
      pointer = 0;
        
      if(page<totalMessages)page++;
      else page=0;
      
      messageArray=messagesArray[page].split('');
      messageLength = messageArray.length;
 
    }
  }
}

var renderMessage = function(){
 var text;
  switch(cursor[page]){
    case "\n": 
      text= messageArray.slice(0, messageLength);
      break;
    default:
      text= messageArray.slice(0, pointer);
      text[pointer]=cursor[page];
      break;
  }
  ctx.shadowBlur = 9;
  ctx.fillText(text.join(''), cw / 2, 30);
  ctx.shadowBlur = 0;
  
  }
    
var renderLines = function(){
  ctx.beginPath();
  for(var i = 0; i < ch/2; i += 1){    
    ctx.moveTo(0, (i*2) + .5);
    ctx.lineTo(cw, (i*2) + .5);    
  } 
  ctx.stroke();
}

function resizeWindow(){
    cw = c.width = window.innerWidth - 10;
    ctx.font = 'normal 64px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'rgba(0, 0, 0, .3)';
    ctx.shadowColor = '#3f3';
}
var loop = function(){
    window.addEventListener('resize', resizeWindow);
    ctx.clearRect(0, 0, cw, ch);
    updateTypeTick();
    renderMessage();
    renderLines();
    setTimeout(loop, 2);
}

loop();
