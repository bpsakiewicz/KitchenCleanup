class SpriteState {
    // animation holds sprites and cycles through
    constructor(sprites) {
        this.period = 20;
        this.sprites = sprites;
        this.image = sprites[0];
        this.active = 0;
    }
    update(deltaTime) {
        // change sprite if needed
        // also want like transfornations
    }
    // getters
    getImage() {return this.image}
    // setters
    setActive() {return this.active}
}