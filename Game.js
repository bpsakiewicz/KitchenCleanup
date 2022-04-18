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
        //createCanvas(400, 400);
    }
    // singleton instance
    static getInstance() {
        return Game.instance;
    }

    // instantiate a new entity to be simulated
    instantiate(entity) {
        // cant push null entity
        if (entity == null) throw new Error("entity instantiated is null!")
        this.entities.push(entity);
    }
    // remove an entity from the game
    destroy(entity) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === entity) 
                this.entities.splice(i,1);
        }
    }
    // simulation
    draw() {
        textSize(32);
        textFont('ArcadeClassic');
        text("Level: " + this.level.levelNum, 10, 30);
        text("Room: " + (this.level.rooms.indexOf(this.level.currentRoom) + 1), 10, 60);
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            var pos = entity.getPos();
            var col = entity.getCollider();
            if (entity.getImage() != null) {
                if (entity.getCollider().getType() == "circle") {
                    let rad = col.getRadius()
                    image(entity.getImage(),pos.x - rad,pos.y - rad,rad*2,rad*2)
                    if (this.debugmode) circle(pos.x,pos.y,col.getRadius()*2)
                }
                else if (entity.getCollider().getType() == "box") {
                    image(entity.getImage(),pos.x,pos.y,col.getHeight(),col.getWidth())
                    if (this.debugmode) rect(pos.x,pos.y,col.getHeight(),col.getWidth())
                }
            }
        }
    }

    // update entities and check collisions
    update(deltaTime) {
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
    }
    // getters
    getDebugmode() {return this.debugmode}
}
/* 
IDEAAAAA
aim with wasd, i to shoot
shift to walk really really slow so you can aim
give enemies lots of heath and high rate of fire!!!!!!
*/