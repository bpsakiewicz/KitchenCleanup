var LOAD_IMAGES = 1
//var player = new Entity(new p5.Vector(50,400), new p5.Vector(400,0), "player", 40,"box");
// var player = new Player("Knive","Bandana")
// var g = new Game(player,new p5.Vector(1175,775));
// var TESTBUMPER = new Entity(new p5.Vector(320,415), new p5.Vector(0,0),"tag","box",new p5.Vector(100,100));
// var TESTBUMPER1 = new Entity(new p5.Vector(600,315), new p5.Vector(0,00),"tag1","circle",new p5.Vector(100,100));
var timelastcalled;
var player;
var g;
function preload() {
  if (LOAD_IMAGES) {
    classicCook = loadImage("assets/sprites/classic_cook.png");
    garlic = loadImage("assets/sprites/ghostly_garlic.png");
    tomato = loadImage("assets/sprites/twisted_tomato.png");
    coolCook = loadImage("assets/sprites/cool_cook.png")
  }
}

function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  player = new Player("Knive","Bandana")
  g = new Game(player,new p5.Vector(1175,775));
  timelastcalled = millis();
  // g.instantiate(TESTBUMPER);
  // g.instantiate(TESTBUMPER1);
  noSmooth()
  console.log(g)
}

function draw() {
  //console.log("drawing")
  background(100,100,130);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  fill(color(0,0,0,50))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
