class Level {

    constructor(levelNum) {
        this.player = Player.getInstance();
        this.levelNum = levelNum;
        this.rooms = this.generateRooms();
        this.currentRoom = this.rooms[0];
    }

    generateRooms() {
        const rooms = [new Room(this.levelNum, 0, 0, (width, height))];
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
    }
}