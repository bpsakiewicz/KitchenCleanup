class Level {

    constructor(levelNum) {
        this.player = Player.getInstance();
        this.levelNum = levelNum;
        this.rooms = this.generateRooms();
        this.currentRoom = this.rooms[0];
        this.rooms.splice(0, 1);
        this.roomNum = 1;
        this.totalRooms = this.rooms.length;
    }

    generateRooms() {
        const rooms = [new Room(this.levelNum, 0, 0)];
        for(let i = 1; i < this.levelNum + sqrt(this.levelNum); i++) {
            let direction = random([0, 1, 2, 3]);
            switch(direction){
                case 0:
                    rooms[i] = new Room(this.levelNum, rooms[i - 1].x - 1, rooms[i - 1].y);
                    break;
                case 1:
                    rooms[i] = new Room(this.levelNum, rooms[i - 1].x, rooms[i - 1].y - 1);
                    break;
                case 2:
                    rooms[i] = new Room(this.levelNum, rooms[i - 1].x + 1, rooms[i - 1].y);
                    break;
                case 3:
                    rooms[i] = new Room(this.levelNum, rooms[i - 1].x, rooms[i - 1].y + 1);
                    break;
                default:
                    break;
            }
            rooms[i - 1].setExitHallway(new Hallway(rooms[i - 1], rooms[i]));
            rooms[i].setEntryHallway(rooms[i - 1].getExitHallway());
        }
        return rooms;
    }

    update(deltaTime) {
        this.currentRoom.update(deltaTime);

        if(this.currentRoom.enemies.length == 0) {
            if(this.currentRoom.getExitHallway() != null){
                this.currentRoom.getExitHallway().locked = false;
            }
        }

        if(this.currentRoom.getExitHallway() != null) {
            if(!this.currentRoom.getExitHallway().locked) {
                if(this.currentRoom.getExitHallway().checkPlayerInHallway(this.player)) {
                    console.log(this.currentRoom.getExitHallway());
                    this.rooms.splice(0, 1);
                    this.roomNum++;
                }
            }
        }
        return null;
    }

    drawLevel(entities) {
        textSize(32);
        textFont('ArcadeClassic');
        fill(color(250, 230, 215));
        // text("hello", width / 2, height/2)
        //tint(0,255)
        text("Level: " + this.levelNum, 10, height - 40);
        text("Room: " + this.roomNum + "/" + this.totalRooms, 10, height - 10);
        this.currentRoom.drawRoom(entities);
    }
}