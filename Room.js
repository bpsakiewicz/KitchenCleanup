class Room {

    constructor(levelNum) {
        this.enemies = this.generateEnemies(levelNum);
        this.obstacles = [];
    }

    generateEnemies(levelNum) {
        const enemies = [];
        for(let i = 0; i < levelNum + sqrt(levelNum); i++) {
            enemies[i] = new Enemy();
        }
        return enemies;
    }
}