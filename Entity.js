class Entity {

    constructor(pos,velocity, tag, radius) {
        this.pos = pos; // float tuple 
        this.velocity = velocity; // float tuple
        this.tag = tag; // string
        this.radius = radius; // float
    }
    // action on collision
    onCollision(tag) {

    }
    // updates that take place every frame
    update(deltaTime) {

    }
    // getters
    getPos(){return this.pos}
    getVelocity(){return this.velocity}
    getTag(){return this.tag}
    getRadius(){return this.radius}
    // setters
    setPos(pos){this.pos = pos}
}