var LOAD_IMAGES = 1
//var player = new Player("Knive","Bandana")
//var g = new Game(player,new p5.Vector(1175,775));
var timelastcalled;
var player;
var g;
// canvas bounds
var BOUNDS = new p5.Vector(1200, 800);
// sounds
var song;
var hit_sound;
var hit1_sound;
var shoot_sound;
var shoot1_sound;
// images
var tomato;
var garlic;
var tomato;
var wall;
var ceiling;
var floortile;
var shadow;
var bluebullet;
var redbullet;
function preload() {
  garlic = loadImage("assets/sprites/garlic/garlic1.png");
  tomato = loadImage("assets/sprites/tomato/tomato1.png");
  wall = loadImage("assets/sprites/tiles/wall.png");
  ceiling =  loadImage("assets/sprites/tiles/tile0.png");
  floortile = loadImage("assets/sprites/tiles/tile2.png");
  shadow = loadImage("assets/sprites/shadow.png");
  // bullets
  bluebullet = loadImage("assets/sprites/bullets/bulletb_ultra.png");
  redbullet = loadImage("assets/sprites/bullets/bulletr_ultra.png");
  peabullet = loadImage("assets/sprites/bullets/pea.png")
  starbullet = loadImage("assets/sprites/bullets/star.png")
  // sounds
  song= loadSound("assets/song.mp3");
  hit_sound = loadSound("assets/UI_Electric_11.mp3");
  hit1_sound = loadSound("assets/Arcade Creature Hit Pop 4.wav")
  shoot_sound = loadSound("assets/Play Game Mech Hit 7.wav");
  shoot1_sound = loadSound("assets/UI Hits Game 1.wav")
  shoot_sound.setVolume(0.5);
  shoot1_sound.setVolume(0.5);
  hit1_sound.setVolume(0.5);
}
// function to randomize sound pitch
function play_sound(sound) {
  let diff = 0.25 - Math.random() * 0.5;
  sound.rate(1 + diff);
  sound.play();
}

function setup() {
  var c = createCanvas(BOUNDS.x, BOUNDS.y);
  c.parent("canvas-div");
  timelastcalled = millis();
  // g.instantiate(TESTBUMPER);
  // g.instantiate(TESTBUMPER1);
  player = new Player("Knive","Bandana")
  g = new Game(player,new p5.Vector(1175,775));
  if (LOAD_IMAGES) {
    //player.setImage(loadImage("assets/sprites/classic_cook.png"))
  }
  textFont("ArcadeClassic");
  noSmooth()
  song.loop();
}

function draw() {
  //console.log("drawing")
  background(120,80,80);
  var time = millis();
  var dt = (time - timelastcalled) / 1000;
  //image(ceil,0,60,1200,60)
  // prints floor tiles
  //for (var i = 60; i < 600; i+=60) {for (var j = 0; j < 600; j+=60) {image(floortile,j,i,60,60)}}
  fill(color(0,0,0,50))
  switch(g.gameState) {
    case "mainMenu":
      // draw menu
      console.log("main menu")
      fill(130, 100, 100);
      rect(width / 2, height / 2, 500, 100);
      fill(250, 230, 215);
      textAlign(CENTER);
      textSize(50);
      text("Welcome    to    Kitchen    Cleanup!", width / 2, height / 4);
      rectMode(CENTER);
      text("PLAY", width / 2, height / 2 + 20)
      break;
    case "playing":
      g.draw();
      g.update(dt);
      break;
    case "playerDied":
      g.reset();
    default:
      break;
      // g.gameState = "mainMenu"
  }

  timelastcalled = millis();
}

function mouseClicked() {
  switch(g.gameState) {
    case "mainMenu":
      if(mouseX >= width / 2 - 250 && mouseX <= width / 2 + 250 && mouseY >= height / 2 - 50 && mouseY <= height / 2 + 50) {
        g.gameState = "playing";
      }
      break;
    case "playing":
      player.shoot();
      break;
  }
  // player.shoot();
}
