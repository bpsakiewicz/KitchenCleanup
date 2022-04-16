class SpriteState {
    // animation holds sprites and cycles through
    constructor(sprites) {
        this.period = 15;
        this.sprites = sprites;
        this.frame = 0; // index in sprites
        this.active = true; // bool for active
        this.repeat = true;
        this.counter = 0; // counts updates
        // states are the "animations" currently being states, "walking" state etc
        this.states = ["default"]
        this.flipped = 0;
    }
    update(deltaTime) {
        if (this.active) {
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
    }
    // getters
    getSprite() {return this.sprites[this.frame]}
    // setters
    setRepeat(r) {this.repeat = r}
    setPeriod(p) {this.period = p}
}