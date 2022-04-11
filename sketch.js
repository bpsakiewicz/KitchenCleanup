
var player = new Entity(new p5.Vector(200,200), new p5.Vector(30,40), "player", 20,"box");
var g = new Game(player,new p5.Vector(800,800));
var TESTBUMPER = new Entity(new p5.Vector(320,360), new p5.Vector(0,0),"BUMPER",100,"box");
var timelastcalled;
function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  timelastcalled = millis();
  g.instantiate(TESTBUMPER);
}

function draw() {
  background(220);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  fill(color(0,0,0))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
