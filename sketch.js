var LOAD_IMAGES = 1
var player = new Entity(new p5.Vector(50,400), new p5.Vector(400,0), "player", 40,"box");
var g = new Game(player,new p5.Vector(1175,775));
var TESTBUMPER = new Entity(new p5.Vector(320,415), new p5.Vector(0,0),"BOX",100,"box");
var TESTBUMPER1 = new Entity(new p5.Vector(600,315), new p5.Vector(0,00),"CIRCLE",100,"circle");
var timelastcalled;
let img;
function preload() {
  if (LOAD_IMAGES) {
    img = loadImage("assets/sprites/classic_cook.png");
  }
}

function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  timelastcalled = millis();
  g.instantiate(TESTBUMPER);
  g.instantiate(TESTBUMPER1);
  player.setImage(img)
}

function draw() {
  console.log("drawing")
  background(100,100,130);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  fill(color(0,0,0))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
