class Door extends Entity {
    constructor(currentRoom, nextRoom, pos) {
        super(pos, new p5.Vector(0,0),"door","box", new p5.Vector(80,80))
        this.setImage("assets/sprites/shadow.png");
        this.currentRoom = currentRoom;
        this.nextRoom = nextRoom;
        this.active = false;
    }
    onCollision(other) {
        //if (other.getTag() == "player")
    }
}