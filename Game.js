class Game {
    constructor(player){
        this.entities = [player]
        this.player = player;
        this.room = new Room(0)
    }
    // instantiate a new entity to be simulated
    instantiate(entity) {
        this.entities.push(entity);
    }
    // remove an entity from the game
    destroy(entity) {
        
    }
    // simulation
    run() {
        // check for collision
        // update entities
        // draw entities
    }
}