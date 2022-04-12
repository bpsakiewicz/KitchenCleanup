
var player = new Entity(new p5.Vector(50,400), new p5.Vector(400,0), "player", 20,"box");
var g = new Game(player,new p5.Vector(1175,775));
var TESTBUMPER = new Entity(new p5.Vector(320,415), new p5.Vector(0,0),"BOX",100,"box");
var TESTBUMPER1 = new Entity(new p5.Vector(600,315), new p5.Vector(0,00),"CIRCLE",100,"circle");
var timelastcalled;
function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  timelastcalled = millis();
  g.instantiate(TESTBUMPER);
  g.instantiate(TESTBUMPER1);
}

function draw() {
  background(200,200,230);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  fill(color(0,0,0))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
