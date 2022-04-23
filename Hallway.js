class Hallway {
    constructor(currentRoom, nextRoom) {
        this.currentRoom = currentRoom;
        // this.nextRoom = nextRoom;
        this.width = 240;
        this.height = 450;
        this.locked = true;
        this.inHallway = false;
    }

    drawHallway() {
            // RIGHT
            //image(ceiling,1100,240,100,60);
            image(wall,1100,300,100,60);
            // filling out the black
            fill(color(0,0,0,255));
            rect(1100,0,100,300);
            rect(1100,500,100,300);
            // LEFT
            //image(ceiling,1100,240,100,60);
            image(wall,0,300,100,60);
            // filling out the black
            fill(color(0,0,0,255));
            rect(0,0,100,300);
            rect(0,500,100,300);
            // DOWN
            rect(100,700,400,100);
            rect(700,700,400,100);
        if(this.locked) {
            //making door
            fill(color(165,42,42));
            rect(1100, 300, 10, 200);
        }
    }

    checkPlayerInHallway(player) {
        return player.getPos().x > 1100 && !this.locked;
    }
}