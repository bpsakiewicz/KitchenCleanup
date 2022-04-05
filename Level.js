class Level {

    constructor(levelNum) {
        this.rooms = this.generateRooms(levelNum);
        this.enemies = []
        for(let room in this.rooms) {
            this.enemies.push(room.enemies);
        }
    }

    generateRooms(levelNum) {
        const rooms = [];
        for(let i = 0; i < levelNum + sqrt(levelNum); i++) {
            rooms[i] = new Room(levelNum);
        }
        return rooms;
    }
}