class Game {
    constructor(player,bounds){
        // singleton
        if (Game.instance) {
            throw new Error("game is singleton!!");
        }
        Game.instance = this;

        this.entities = [player]
        this.player = player;
        this.bounds = bounds;
        this.debugmode = 0;
        this.level = new Level(1);
        for(const enemy in this.level.currentRoom.enemies) {
            this.instantiate(this.level.currentRoom.enemies[enemy])
        }
        this.gameState = "mainMenu"
        // console.log(this.level);
        //createCanvas(400, 400);
    }
    // singleton instance
    static getInstance() {
        return Game.instance;
    }

    // instantiate a new entit y to be simulated
    instantiate(entity) {
        // cant push null entity
        if (entity == null) throw new Error("entity instantiated is null!")
        this.entities.push(entity);
    }
    // remove an entity from the game
    destroy(entity) {
        let len = this.entities.length;
        if(entity.getTag().includes("_enemy")) {
            this.level.currentRoom.destroy(entity);
        }

        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === entity) 
                //console.log("DESTROTING ",entity.getTag());
                this.entities.splice(i,1);
        }
        //console.assert(len != this.entities.length)
    }

    // simulation
    draw() {
        this.level.drawLevel(this.entities);
    }

    // update entities and check collisions
    update(deltaTime) {
        //console.log(this.gameState)

        switch(this.gameState) {
            case "playing":
                if(!this.player.alive) {
                    this.gameState = "playerDied";
                    break;
                }
                // playing game     
                if(this.level.complete) {
                    console.log("here")
                    this.gameState = "beatLevel"
                    break;
                    // console.log(this.level.currentRoom)
                }
                this.level.update(deltaTime);
                for (var i = 0; i < this.entities.length; i++) {
                    var entity = this.entities[i];
                    if(entity.getTag() == "player") {
                        // update the entity
                        entity.update(deltaTime);
                    }

                    // update position
                    if (entity.pos.x < this.bounds.x)
                        entity.pos.x += entity.velocity.x * deltaTime;
                    if (entity.pos.y < this.bounds.y)
                        entity.pos.y += entity.velocity.y * deltaTime;
                    // collide entities
                    for (var j = i+1; j < this.entities.length; j++) {
                        //console.log(i,j);
                        if (entity.getTag() == this.entities[j].getTag()) continue; // temporary?????
                        //console.log(this.entities[i].getCollider());
                        if (entity.getCollider().checkCollision(this.entities[j].getCollider())) {
                            entity.onCollision(this.entities[j]);
                            if (this.entities[j] != null) this.entities[j].onCollision(entity);
                        }
                    }
                }
                break;
            case "playerDied":
                //console.log(this.gameState)
                this.reset();
                // player dies -> either restart or main menu
                break;
            default:
                break;


            // if(this.level.currentRoom.getExitHallway() != null) {
            //     if(this.level.currentRoom.getExitHallway().checkPlayerInHallway(this.player)) {
            //         this.level.currentRoom = this.level.rooms[this.level.roomNum + 1];
            //         for(const enemy in this.level.currentRoom.enemies) {
            //             this.instantiate(this.level.currentRoom.enemies[enemy]);
            //         }
            //     }
            // } 
        }
    }

    reset() {
        this.level = new Level(1);
        this.player.reset();
        this.gameState = "mainMenu";
        this.entities = [this.player];
        for(const enemy in this.level.currentRoom.enemies) {
            this.instantiate(this.level.currentRoom.enemies[enemy])
        }
    }
    // getters
    getDebugmode() {return this.debugmode}
    getLevel() {return this.level}
}
/* 
TODO LIAM
adjust box collider hitboxes
make enemies more red
*/