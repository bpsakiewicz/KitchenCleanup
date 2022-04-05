class Room {
    
    constructor(levelNum) {
        this.enemies = generateEnemies(levelNum);
    }

    generateEnemies(levelNum) {
        const enemies = [];
        for(let i = 0; i < levelNum + sqrt(levelNum); i++) {
            enemies[i] = new Enemy();
        }
        return enemies;
    }
}