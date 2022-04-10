class Game {
    constructor(player,bounds){
        this.entities = [player]
        this.player = player;
        this.bounds = bounds;
        //this.room = new Room(0)
        //createCanvas(400, 400);
    }
    // instantiate a new entity to be simulated
    instantiate(entity) {
        this.entities.push(entity);
    }
    // remove an entity from the game
    destroy(entity) {
        
    }
    // simulation
    draw() {
        for (var i = 0; i < this.entities.length; i++) {
            circle(this.entities[i].getPos().x,this.entities[i].getPos().y,this.entities[i].getRadius())
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
            for (let e in this.entities) {
                //if (e == entity) console.log("SELF")
                //if (entity.getCollider().checkCollision(e.getCollider())) console.log("COLLISIONNNNNNNN");
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