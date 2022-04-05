class Level {

    constructor(levelNum) {
        this.rooms = this.generateRooms(levelNum);
    }

    generateRooms(levelNum) {
        const rooms = [];
        for(let i = 0; i < levelNum + sqrt(levelNum); i++) {
            rooms[i] = new Enemy();
        }
        return rooms;
    }
}