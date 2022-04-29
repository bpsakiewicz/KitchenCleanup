class Level {

    constructor(levelNum) {
        this.player = Player.getInstance();
        this.levelNum = levelNum;
        this.totalRooms = 5;
        this.rooms = []
        this.generateRooms();
        this.currentRoom = this.rooms[0];
        this.currentRoom.generateEnemies(this.levelNum);
        this.roomNum = 0;
        this.complete = false;
        //Game.getInstance().instantiate(new Door(new p5.Vector(500,500)))
    }

    generateRooms() {
        this.rooms = [new Room(this.levelNum, 0, 0)];
        for(let i = 1; i < this.totalRooms; i++) {
            // attach first room
            let direction = random([0, 1, 2, 3]);
            switch(direction){
                case 0:
                    this.rooms[i] = new Room(this.levelNum, this.rooms[i - 1].x - 1, this.rooms[i - 1].y);
                    break;
                case 1:
                    this.rooms[i] = new Room(this.levelNum, this.rooms[i - 1].x, this.rooms[i - 1].y - 1);
                    break;
                case 2:
                    this.rooms[i] = new Room(this.levelNum, this.rooms[i - 1].x + 1, this.rooms[i - 1].y);
                    break;
                case 3:
                    this.rooms[i] = new Room(this.levelNum, this.rooms[i - 1].x, this.rooms[i - 1].y + 1);
                    break;
                default:
                    break;
            }
        }
    }

    update(deltaTime) {
        this.currentRoom.update(deltaTime);

        // unlock current room's exit hallway
        if(this.currentRoom.cleared()) {
            if(this.roomNum + 1 == this.totalRooms) {
                this.complete = true;
                Game.getInstance().destroy(this.currentRoom.getExit())
            }
            //this.loadNextRoom();
        }
    }

    loadNextRoom() {
        let d = this.currentRoom.getExit()
        this.player.teleport(new p5.Vector(BOUNDS.x - d.getPos().x, d.getPos().y))
        Game.getInstance().destroy(d)
        // update the current room to be the next one
        this.currentRoom = this.rooms[this.roomNum + 1];
        this.roomNum++;
        // load new level
        this.currentRoom.generateEnemies(this.levelNum);
        this.currentRoom.load();
    }

    drawLevel(entities) {
        // render room before text
        this.currentRoom.drawRoom(entities);
        textSize(32);
        fill(color(250, 230, 215));
        textAlign(LEFT)
        // text("hello", width / 2, height/2)
        //tint(0,255)ds
        text("Level: " + this.levelNum, 10, height - 40);
        text("Room: " + (this.roomNum + 1) + "/" + this.totalRooms, 10, height - 10);
        //can put this whereever or not use
        text("Health: " + player.health, 800, height - 60);
        text("Weapon: " + player.weaponBehavior.name, 800, height - 30);
        text("Armor: " + player.armor.name, 800, height - 0);
    }
}