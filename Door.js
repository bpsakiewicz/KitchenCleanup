class Door extends Entity {
    constructor(pos) {
        super(pos, new p5.Vector(0,0),"door","circle", new p5.Vector(80,80))
        this.setImage(loadImage("assets/sprites/shadow.png"));
        this.active = false;
    }
    onCollision(other) {
        if (other.getTag() == "player") {
            Game.getInstance().getLevel().loadNextRoom();
        }
    }
}