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
        for(const enemy in this.level.enemies) {
            this.instantiate(this.level.enemies[enemy])
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
        for (var i = 0; i < this.entities.length; i++) {
            var pos = this.entities[i].getPos();
            var col = this.entities[i].getCollider();
            if (this.entities[i].getImage() != null) {
                if (this.entities[i].getCollider().getType() == "circle") {
                    let rad = col.getRadius()
                    image(this.entities[i].getImage(),pos.x - rad,pos.y - rad,rad*2,rad*2)
                    if (this.debugmode) circle(pos.x,pos.y,col.getRadius()*2)
                }
                else if (this.entities[i].getCollider().getType() == "box") {
                    image(this.entities[i].getImage(),pos.x,pos.y,col.getHeight(),col.getWidth())
                    if (this.debugmode) rect(pos.x,pos.y,col.getHeight(),col.getWidth())
                }
            }
        }
    }

    // update entities and check collisions
    update(deltaTime) {
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            // update the entity
            entity.update(deltaTime);
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
liam TODO
entity.radius ins TEMPORARY
room loading
give collision angle with OnCollision
loading pictures
start menu as room/floor
*/