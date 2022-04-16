class SpriteState {
    // animation holds sprites and cycles through
    constructor(sprites) {
        this.period = 15;
        this.sprites = sprites;
        this.frame = 0; // index in sprites
        this.active = 0; // bool for active
        this.counter = 0; // counts updates
        // states are the "animations" currently being states, "walking" state etc
        this.states = ["default"]
    }
    update(deltaTime) {
        // change sprite if needed
        if (this.counter > this.period) {
            this.counter = 0;
            // circle back if needed
            if (this.frame == this.sprites.length-1) this.frame = 0;
            else this.frame++;
        }
        // also want like transfornations
        this.counter++;
    }
    // getters
    getSprite() {return this.sprites[this.frame]}
    // setters
    setActive() {return this.active}
    setPeriod(p) {this.period = p}
}