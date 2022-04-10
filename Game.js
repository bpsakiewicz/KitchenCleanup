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
        //this.room = new Room(0)
        //createCanvas(400, 400);
    }
    // singleton instance
    static getInstance() {
        return Game.instance;
    }

    // instantiate a new entity to be simulated
    instantiate(entity) {
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
            circle(this.entities[i].getPos().x,this.entities[i].getPos().y,this.entities[i].getRadius() * 2)
        }
    }

    // update entities and check collisions
    update(deltaTime) {
        this.entities.forEach(entity => {
            // update the entity
            entity.update(deltaTime);
            // update position
            if (entity.pos.x < this.bounds.x)
                entity.pos.x += entity.velocity.x * deltaTime;
            if (entity.pos.y < this.bounds.y)
                entity.pos.y += entity.velocity.y * deltaTime;
            // collide entities
            for (var i = 0; i < this.entities.length; i++) {
                if (entity == this.entities[i]) continue;
                //console.log(this.entities[i].getCollider());
                if (entity.getCollider().checkCollision(this.entities[i].getCollider())) {
                    entity.onCollision(this.entities[i].getTag());
                    this.entities[i].onCollision(entity.getTag());
                }
            }
        })
    }
}
/* 
special weapon ideas
    pea shooter
    hot chili pepper
    spatula
*/