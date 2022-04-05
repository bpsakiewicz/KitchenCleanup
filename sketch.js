
var player = new Entity(new p5.Vector(200,200), new p5.Vector(20,20, "player", 20));
var g = new Game(player);
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  g.draw();
}
