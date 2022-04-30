class Room {

    constructor(levelNum, xCoor, yCoor,index) {
        this.x = xCoor;
        this.y = yCoor;
        this.index = index;
        this.size = (width, height); 
        this.enemies = [];
        this.obstacles = [];
        this.levelNum = levelNum;
        //console.log(this.index);
        this.exit = new Door(new p5.Vector(1175,400),"exit",this);
    }

    generateEnemies() {
        const enemies = [];
        //levelNum += 1;
        for(let i = 0;  i < random(this.levelNum, this.levelNum + 1); i++) {
            let r = Math.random() * 3;
            // BENNY TODO
            // enemy spawn rates could change based on difficulty
            // enforce that some of level of diversity with larger amounts of enemies
            if (r > 2) this.enemies[i] = new EnemyCarrot(this.levelNum);
            else if (r > 1) this.enemies[i] = new EnemyTomato(this.levelNum);
            else this.enemies[i] = new EnemyGarlic(this.levelNum);
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
        if (this.cleared() && !this.exit.getActive()) {
            Game.getInstance().instantiate(this.exit)
            this.exit.setActive(true);
        }
    }

    drawRoom(entities) {
        image(wall,0,0,1200,60);
        
        image(wall,1150,325,50,60);
        image(wall,0,325,50,60);
            // filling out the black
            fill(color(0,0,0,255));
            rect(1175,25,50,600);
            rect(1175,800,50,600);
            rect(25,25,50,600);
            rect(25,800,50,600);
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
        g.instantiate(this.exit)
    }
    // getters
    getExit() {return this.exit}
    getIndex() {return this.index}
}

// boss romm
class BossRoom extends Room {
    constructor(levelNum, xCoor, yCoor,index) {
        super(levelNum, xCoor, yCoor,index)
        console.log("boss here");
    }
    // generate boss
    generateEnemies() {
        console.log("boss her gen e");
        this.enemies = [new SauceBoss(this.levelNum)];
    }
}