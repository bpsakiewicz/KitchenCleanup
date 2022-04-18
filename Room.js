class Room {

    constructor(levelNum, xCoor, yCoor) {
        this.x = xCoor;
        this.y = yCoor;
        this.size = (width, height); 
        this.enemies = this.generateEnemies(levelNum);
        this.obstacles = [];
        this.levelNum = levelNum;
        // console.log(this.levelNum)
    }

    generateEnemies(levelNum) {
        const enemies = [];

        // ADD NEW ENEMY TYPES TO THIS ARRAY
        var enemyTypes = [["tomato", "circle"], ["garlic", "circle"]];

        for(let i = 0;  i < levelNum + sqrt(levelNum); i++) {
            enemies[i] = new Enemy(random(enemyTypes), levelNum);
        }
        // console.log(levelNum + "rooms")
        return enemies;
    }

    update() {
        for(const enemy in this.enemies) {
            this.enemies[enemy].update();
        }
    }
}