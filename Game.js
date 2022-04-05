class Game {
    constructor(player){
        this.entities = [player]
        this.player = player;
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
            circle(this.entities[i].getPos().x,this.entities[i].getPos().y,40)
        }
    }
    // update entities and check collisions
    update() {
        this.entities.forEach(entity => {
            // update the entity
            entity.update();
            // move the entity
            // collide entities
        })
    }
}