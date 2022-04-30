class Door extends Entity {
    constructor(pos,tag,room) {
        super(pos, new p5.Vector(0,0),tag,"circle", new p5.Vector(80,80))
        this.setImage(loadImage("assets/sprites/shadow.png"));
        this.room = room;
        this.active = false;
    }
    onCollision(other) {
        if (other.getTag() == "player") {
            Game.getInstance().getLevel().loadRoom(this.room.getIndex() + 1);
        }
    }
}