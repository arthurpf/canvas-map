function draw(){

  var canvas = document.getElementById('ingresso-map');

  var config = {
    mapStartPointX:0,
    mapStartPointY:0,
    seatSize:20,
    spaceX:0,
    spaceY:0
  };

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var map;

    ajax("http://localhost:8080/data/ingresso-map-example.json", function(){
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          map = JSON.parse(httpRequest.responseText);
          drawMap(map, ctx);
        }
      }
    });

  } else {
    // codigo para quando o canvas nao for suportado aqui
  }

  function drawMap(map, ctx) {
    var seatCoord;
    for(var i=0, mapLines = map.lines.length;i < mapLines;i++){
      for(var j=0, lineSeats = map.lines[i].seats.length; j < lineSeats;j++){
        drawSeat(setSeatPlace(config, map.lines[i].seats[j].column, map.lines[i].seats[j].line));
        //console.log("line: "+map.lines[i].seats[j].line);
      }
    }
    ctx.fill();
    console.log('drawMap');
  }

  function ajax(url, callback) {
    httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = callback;

    httpRequest.open('GET', url);
    httpRequest.send();

    return httpRequest;
  }

  function drawSeat(coord){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.rect(coord[0],coord[1],config.seatSize,config.seatSize);
    console.log('drawSeat');
  }

  function setSeatPlace(config, col, line) {
    var posX = 0;
    var posY = 0;

    posX = config.mapStartPointX + col*config.seatSize + config.spaceX*2;
    posY = config.mapStartPointY + line*config.seatSize + config.spaceY*2;
    console.log('setSeatPlace');
    return [posX, posY];
  }
}
