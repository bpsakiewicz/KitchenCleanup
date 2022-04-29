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
            rooms[i - 1].setExitHallway(new Hallway(rooms[i - 1], rooms[i]));
            rooms[i].setEntryHallway(rooms[i - 1].getExitHallway());
        }
        return rooms;
    }

    update(deltaTime) {
        this.currentRoom.update(deltaTime);

        // unlock current room's exit hallway
        if(this.currentRoom.cleared()) {
            if(this.currentRoom.getExitHallway()){
                this.currentRoom.getExitHallway().locked = false;
            }

            if(this.roomNum + 1 == this.totalRooms) {
                this.complete = true;
                return;
            }
        }
        if(this.currentRoom.getExitHallway() != null) {
            if(!this.currentRoom.getExitHallway().locked && this.currentRoom.getExitHallway().checkPlayerInHallway(this.player)) {
                this.loadNextRoom();
            }
        }
    }

    loadNextRoom() {
        // update the current room to be the next oned
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
        //can put this whereever or not use
        text("Health: " + player.health, 900, height - 60);
        text("Weapon: " + player.weaponBehavior.name, 900, height - 30);
        text("Armor: " + player.armor.name, 900, height - 0);
    }
}