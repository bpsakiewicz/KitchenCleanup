var LOAD_IMAGES = 1
//var player = new Player("Knive","Bandana")
//var g = new Game(player,new p5.Vector(1175,775));
var timelastcalled;
var player;
var g;
var tomato;
var garlic;
var tomato;
var wall;
var ceil;
var floortile;
function preload() {
  classicCook = loadImage("assets/sprites/classic_cook.png"); //this is the player
  garlic = loadImage("assets/sprites/garlic/garlic1.png");
  tomato = loadImage("assets/sprites/tomato/tomato1.png");
  wall = loadImage("assets/sprites/tiles/tile1.png");
  ceiling =  loadImage("assets/sprites/tiles/tile0.png");
  floortile = loadImage("assets/sprites/tiles/tile2.png");
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
    //player.setImage(loadImage("assets/sprites/classic_cook.png"))
  }
  noSmooth()
  console.log(g)
}

function draw() {
  //console.log("drawing")
  background(100,100,130);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  //image(ceil,0,60,1200,60)
  // prints floor tiles
  //for (var i = 60; i < 600; i+=60) {for (var j = 0; j < 600; j+=60) {image(floortile,j,i,60,60)}}
  fill(color(0,0,0,50))
  g.draw();
  g.update(dt);
  timelastcalled = millis();
}
