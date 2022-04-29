class Level {

    constructor(levelNum) {
        this.player = Player.getInstance();
        this.levelNum = levelNum;
        this.rooms = this.generateRooms();
        this.currentRoom = this.rooms[0];
        this.totalRooms = int(this.levelNum + sqrt(this.levelNum));
        this.currentRoom.generateEnemies(this.levelNum);
        this.roomNum = 0;
        this.complete = false;
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
        }
        return rooms;
    }

    update(deltaTime) {
        this.currentRoom.update(deltaTime);

        // unlock current room's exit hallway
        if(this.currentRoom.cleared()) {
            if(this.roomNum + 1 == this.totalRooms) {
                this.complete = true;
                return;
            }
            this.loadNextRoom();
        }
    }

    loadNextRoom() {
        // update the current room to be the next one
        this.currentRoom = this.rooms[this.roomNum + 1];
        this.roomNum++;
        this.currentRoom.generateEnemies(this.levelNum);
        this.currentRoom.loadEnemies();
    }

    drawLevel(entities) {
        // render room before text
        this.currentRoom.drawRoom(entities);
        textSize(32);
        textFont('ArcadeClassic');
        fill(color(250, 230, 215));
        // text("hello", width / 2, height/2)
        //tint(0,255)ds
        text("Level: " + this.levelNum, 10, height - 40);
        text("Room: " + (this.roomNum + 1) + "/" + this.totalRooms, 10, height - 10);
    }
}