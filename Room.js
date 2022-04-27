class Room {

    constructor(levelNum, xCoor, yCoor) {
        this.x = xCoor;
        this.y = yCoor;
        this.size = (width, height); 
        this.enemies = [];
        this.obstacles = [];
        this.levelNum = levelNum;
        this.entry = null;
        this.exit = null;
    }

    generateEnemies(levelNum) {
        const enemies = [];

        // ADD NEW ENEMY TYPES TO THIS ARRAY
        var enemyTypes = [["tomato", "circle"], ["garlic", "circle"]];
        var enemyTypes = []
        for(let i = 0;  i < random(levelNum, levelNum + sqrt(levelNum)); i++) {
            let r = Math.random() * 3;
            // BENNY TODO
            // enemy spawn rates could change based on difficulty
            // enforce that some of level of diversity with larger amounts of enemies
            if (r > 2) this.enemies[i] = new EnemyCarrot(levelNum);
            else if (r > 1) this.enemies[i] = new EnemyTomato(levelNum);
            else this.enemies[i] = new EnemyGarlic(levelNum);
            //this.enemies[i] = new Enemy(random(enemyTypes), levelNum);
        }
        //this.enemies[this.enemies.length] = new EnemyCarrot(levelNum);
        this.enemies[this.enemies.length] = new SauceBoss(levelNum);
        return enemies;
    }

    update(deltaTime) {
        for(const enemy in this.enemies) {
            this.enemies[enemy].update(deltaTime);
        }

        if(this.enemies.length == 0) {
            this.getEntryHallway.locked = false;
        }
    }

    drawRoom(entities) {
        image(wall,0,0,1100,60);
        // console.log(this.hall)
        if(this.entry != null) {
            this.entry.drawHallway();
        }

        if(this.exit != null) {
            this.exit.drawHallway();
        }
        /*
        // Dear Benny,
            I moved draw specifics to entity class
            Sincereley,
            Liam
        */
        for (var i = 0; i < entities.length; i++) {
            entities[i].draw();
        }
    }

    destroy(entity) {
        // console.log(this.getExitHallway());
        this.enemies.splice(this.enemies.indexOf(entity), 1);
        // console.log(this.getExitHallway());
    }

    setEntryHallway(hallway) {
        this.entry = hallway;
    }

    setExitHallway(hallway) {
        this.exit = hallway;
    }

    getEntryHallway() {
        return this.entry;
    }

    getExitHallway() {
        return this.exit;
    }

    cleared() {
        return this.enemies.length == 0;
    }

    loadEnemies() {
        for(const enemy in this.enemies) {
            Game.getInstance().instantiate(this.enemies[enemy])
        }
    }
}