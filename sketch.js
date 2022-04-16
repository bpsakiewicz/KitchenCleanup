var LOAD_IMAGES = 1
//var player = new Entity(new p5.Vector(50,400), new p5.Vector(400,0), "player", 40,"box");
//var player = new Player("Knive","Bandana")
//var g = new Game(player,new p5.Vector(1175,775));
var timelastcalled;
var player;
var g;
var tomato;
var garlic;
var tomato;
function preload() {
  classicCook = loadImage("assets/sprites/classic_cook.png"); //this is the player
  garlic = loadImage("assets/sprites/garlic/garlic1.png");
  tomato = loadImage("assets/sprites/tomato/tomato1.png");
}

function setup() {
  var c = createCanvas(1200, 800);
  c.parent("canvas-div");
  timelastcalled = millis();
  // g.instantiate(TESTBUMPER);
  // g.instantiate(TESTBUMPER1);
  player = new Player("Knive","Bandana")
  g = new Game(player,new p5.Vector(1175,775));
  if (LOAD_IMAGES) {
    player.setImage(loadImage("assets/sprites/classic_cook.png"))
  }
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
