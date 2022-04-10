
var player = new Entity(new p5.Vector(200,200), new p5.Vector(20,20), "player", 20,"circle");
var g = new Game(player,new p5.Vector(800,800));
var TESTBUMPER = new Entity(new p5.Vector(400,400), new p5.Vector(0,0),"BUMPER",100,"circle");
var timelastcalled;
function setup() {
  createCanvas(800, 800);
  timelastcalled = millis();
  g.instantiate(TESTBUMPER);
}

function draw() {
  background(220);
  var time = millis();
	var dt = (time - timelastcalled) / 1000;
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
