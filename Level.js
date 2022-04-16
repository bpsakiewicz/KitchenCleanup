class Level {

    constructor(levelNum) {
        this.rooms = this.generateRooms(levelNum);
        this.currentRoom = this.rooms[0];
        this.enemies = [];
        for(const room in this.rooms) {
            for(const enemy in this.rooms[room].enemies) {
                this.enemies.push(this.rooms[room].enemies[enemy]);
            }
        }
    }

    generateRooms(levelNum) {
        const rooms = [new Room(levelNum, 0, 0, (width, height))];
        for(let i = 1; i < levelNum + sqrt(levelNum); i++) {
            let direction = random([0, 1, 2, 3]);
            switch(direction){
                case 0:
                    rooms[i] = new Room(levelNum, rooms[i - 1].x - 1, rooms[i - 1].y);
                    break;
                case 1:
                    rooms[i] = new Room(levelNum, rooms[i - 1].x, rooms[i - 1].y - 1);
                    break;
                case 2:
                    rooms[i] = new Room(levelNum, rooms[i - 1].x + 1, rooms[i - 1].y);
                    break;
                case 3:
                    rooms[i] = new Room(levelNum, rooms[i - 1].x, rooms[i - 1].y + 1);
                    break;
                default:
                    break;
            }
        }
        return rooms;
    }

    update() {
        this.currentRoom.update();
    }
}