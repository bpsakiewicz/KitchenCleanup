class Entity {

    constructor(pos,velocity, tag, radius,collider_type) {
        this.pos = pos; // float tuple 
        this.velocity = velocity; // float tuple
        this.tag = tag; // string
        this.radius = radius; // float
        if (collider_type == "circle") this.collider = new CircleCollider(pos,this.radius);
        if (collider_type ==  "box") this.collider = new BoxCollider(pos, this.radius, this.radius);
    }
    // action on collision
    onCollision(tag) {
        // TEMPORARY
        if (tag == "player") {
            Game.getInstance().destroy(this);
        }
    }
    // updates that take place every frame
    update(deltaTime) {

    }
    // getters
    getPos(){return this.pos}
    getVelocity(){return this.velocity}
    getTag(){return this.tag}
    getRadius(){return this.radius}
    getCollider(){return this.collider}
    // setters
    setPos(pos){this.pos = pos}
}