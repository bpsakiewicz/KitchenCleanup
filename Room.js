class Room {

    constructor(levelNum, xCoor, yCoor) {
        this.x = xCoor;
        this.y = yCoor;
        this.size = (width, height); 
        this.enemies = this.generateEnemies(levelNum);
        this.obstacles = [];
    }

    generateEnemies(levelNum) {
        const enemies = [];

        // ADD NEW ENEMY TYPES TO THIS ARRAY
        var enemyTypes = [p5.Vector("tomato", "circle"), p5.Vector("garlic", "circle")];

        console.log(random(enemyTypes))
        console.log("hello")
        for(let i = 0;  i < levelNum + sqrt(levelNum); i++) {
            enemies[i] = new Enemy(random(enemyTypes));
        }

        return enemies;
    }

    update() {
        for(const enemy in this.enemies) {
            this.enemies[enemy].update();
        }
    }
}