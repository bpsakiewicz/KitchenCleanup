
var player = new Entity(new p5.Vector(200,200), new p5.Vector(20,20, "player", 20));
var g = new Game(player,new p5.Vector(800,800));
var timelastcalled;
function setup() {
  createCanvas(800, 800);
  timelastcalled = millis();
}

function draw() {
  background(220);
  var time = millis();
	var dt = (time - timelastcalled) / 1000;
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
