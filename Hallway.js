class Hallway {
    constructor(currentRoom, nextRoom) {
        this.currentRoom = currentRoom;
        // this.nextRoom = nextRoom;
        this.width = 500;
        this.height = 450;
        this.locked = true;
        this.inHallway = false;
    }

    drawHallway() {
        if(this.locked) {
            image(ceiling,1000,240,200,60);
            image(wall,1000,300,200,60);
            fill(color(165,42,42));
            rect(1000, 240, 10, 300);
            fill(color(0,0,0,255));
            rect(1000,0,200,300);
            rect(1000,500,200,300);
        } else{
            image(ceiling,1000,240,200,60);
            fill(color(0,0,0,255));
            rect(1000,0,200,300);
            rect(1000,500,200,300);
            image(wall,1000,300,200,60);
        }
    }

    checkPlayerInHallway(player) {
        return player.getPos().x > 1000 && !this.locked;
    }
}