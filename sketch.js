var LOAD_IMAGES = 1
//var player = new Entity(new p5.Vector(50,400), new p5.Vector(400,0), "player", 40,"box");
var player = new Player("Knive","Bandana")
var g = new Game(player,new p5.Vector(1175,775));
var TESTBUMPER = new Entity(new p5.Vector(320,415), new p5.Vector(0,0),"BOX",100,"box");
var TESTBUMPER1 = new Entity(new p5.Vector(600,315), new p5.Vector(0,00),"CIRCLE",100,"box");
var timelastcalled;

function preload() {
  if (LOAD_IMAGES) {
    player.setImage(loadImage("assets/sprites/classic_cook.png"))
    TESTBUMPER.setImage(loadImage("assets/sprites/ghostly_garlic.png"))
    TESTBUMPER1.setImage(loadImage("assets/sprites/twisted_tomato.png"))
  }
}

function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  timelastcalled = millis();
  g.instantiate(TESTBUMPER);
  g.instantiate(TESTBUMPER1);
}

function draw() {
  //console.log("drawing")
  background(100,100,130);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  fill(color(0,0,0))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
