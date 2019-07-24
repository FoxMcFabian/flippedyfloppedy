var game = new Array(16)
var colors = ["green","red"]
var startTime;
var tookLast;
var count = 1;

function initialize(){
  startTime = performance.now();
  node = document.getElementById('game')
  while (node.firstChild) {
    node.removeChild(node.firstChild);
}
  for (i = 0; i < 16; i++) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "field"+i);
    newDiv.setAttribute("class", "field");
    newDiv.setAttribute("pos", i);
    rnd = Math.floor(Math.random() * Math.floor(colors.length));
    makeField(newDiv,rnd);
    newDiv.setAttribute("onClick", "clickOnField("+i+")");
    document.getElementById('game').appendChild(newDiv)
  }
}

function clickOnField(i){
  field = document.getElementById("field"+i);
  current = parseInt(field.getAttribute("stat"))+1;
  if(current==colors.length){
    current = 0;
  }
  makeField(field,current);
  checkWin();
}

function makeField(field,i){
  field.setAttribute("class", "field " + colors[i] + "Field");
  game[field.getAttribute("pos")] = i;
  field.setAttribute("stat", i);
}

function checkGreen(val){
  return val==0;
}

function checkRed(val){
  return val==1;
}

function checkWin(){
  console.log("checking...")

  if(game.every(checkGreen)||game.every(checkRed)){
    took=performance.now()-startTime;
    
    if(count==1) {
      tookAvg = took
    }
    if(count==2) {
      tookAvg = (took+tookLast)/2
    }
    if(count>2) {
      tookAvg = (tookAvg*(count-1)+took)/count
    }
    
    if(took/1000>4){
    	stat="LOST!"
    } else {
	stat="WON!"
    }

    text = "You took ... "+Math.round(took/10)/100+"sek - Last:"+Math.round(tookLast/10)/100+"sek"+" Counter:"+count
    +" Avg: "+Math.round(tookAvg/10)/100+"sek Status:"+stat;

    tookLast = took;
    console.log(text);
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById('log').appendChild(para);

    count = count + 1;
  }


}
