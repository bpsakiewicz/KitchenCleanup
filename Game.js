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
            var pos = this.entities[i].getPos();
            //if (this.entities[i].getTag() == 'player') image(this.entities[i].getImage(),pos.x,pos.y)
            if (this.entities[i].getCollider().getType() == "circle") circle(pos.x, pos.y, this.entities[i].getRadius() * 2)
            else if (this.entities[i].getCollider().getType() == "box") rect(pos.x, pos.y, this.entities[i].getCollider().getWidth(), this.entities[i].getCollider().getHeight())
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
                //if (entity == this.entities[j]) continue;
                //console.log(this.entities[i].getCollider());
                if (entity.getCollider().checkCollision(this.entities[j].getCollider())) {
                    entity.onCollision(this.entities[j]);
                    this.entities[j].onCollision(entity);
                }
            }
        }
    }
}
/* 
liam TODO
entity.radius ins TEMPORARY
room loading
give collision angle with OnCollision
loading pictures
start menu as room/floor
*/