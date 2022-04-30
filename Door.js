class Door extends Entity {
    constructor(pos,tag,room) {
        super(pos, new p5.Vector(0,0),tag,"circle", new p5.Vector(50,200))
        this.setImage(loadImage("assets/sprites/shadow.png"));
        this.room = room;
        this.active = false;
    }
    draw() {
        if (!this.active) rect(this.pos.x,this.pos.y,this.dimensions.x,this.dimensions.y);
    }

    onCollision(other) {
        if (other.getTag() == "player" && this.active) {
            Game.getInstance().getLevel().loadRoom(this.room.getIndex() + 1);
        }
    }

    destroy() {
        Game.getInstance().destroy(this)
    }

    setActive(bool) {this.active = bool};
    getActive() {return this.active}
}