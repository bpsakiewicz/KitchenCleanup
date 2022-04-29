class Room {

    constructor(levelNum, xCoor, yCoor) {
        this.x = xCoor;
        this.y = yCoor;
        this.size = (width, height); 
        this.enemies = [];
        this.obstacles = [];
        this.levelNum = levelNum;
        this.door = new Door(new p5.Vector(1150,400));
        this.exit_active = false;
    }

    generateEnemies(levelNum) {
        const enemies = [];
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
        //this.enemies[this.enemies.length] = new SauceBoss(levelNum);
        return enemies;
    }

    update(deltaTime) {
        for(const enemy in this.enemies) {
            this.enemies[enemy].update(deltaTime);
        }
        if (this.cleared() && !this.exit_active) {
            Game.getInstance().instantiate(this.door)
            this.exit_active = true;
        }
    }

    drawRoom(entities) {
        image(wall,0,0,1200,60);
        // console.log(this.hall)
        for (var i = 0; i < entities.length; i++) {
            entities[i].draw();
        }
    }

    destroy(entity) {
        // console.log(this.getExitHallway());
        this.enemies.splice(this.enemies.indexOf(entity), 1);
        // console.log(this.getExitHallway());
    }

    cleared() {
        return this.enemies.length == 0;
    }

    load() {
        let g = Game.getInstance()
        for(const enemy in this.enemies) {
            g.instantiate(this.enemies[enemy])
        }
    }

    getDoor() {return this.door}
}