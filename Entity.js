class Entity {

    constructor(pos,velocity, tag, collider_type, dimensions) {
        this.pos = pos; // float tuple 
        this.velocity = velocity; // float tuple
        this.tag = tag; // string
        this.img = null
        if (collider_type == "circle") this.collider = new CircleCollider(pos,dimensions.x / 2);
        if (collider_type ==  "box") this.collider = new BoxCollider(pos, dimensions.x, dimensions.y);
        this.spritestate = null;
    }
    // action on collision, other is the entity that is collided with
    // both entities have this function called on a collision
    onCollision(other) {
        // TEMPORARY EXAMPLE
        // checks to see if i collided with the player, and kills itself if so
        var tag = other.getTag()
        if (tag == "player") {
            Game.getInstance().destroy(this);
        }
    }
    // updates that take place every frame
    // this is where you would update the entities velocity for example, or outline its behavior
    // deltaTime is the change in time between updates, only really necessary if you want to measure the time passed since an event
        // like bullet lifetimes, timing of enemy behavior etc 
    update(deltaTime) {
        this.startstate.update(deltaTime)
    }

    // getters
    getPos(){return this.pos}
    getVelocity(){return this.velocity}
    getTag(){return this.tag}
    getRadius(){return this.radius}
    getCollider(){return this.collider}
    getImage(){return this.spritestate.getSprite()}
    // setters
    setPos(pos){this.pos = pos} // AVOID SETTING POSITION ONLY USED IN GAME CLASS
    setImage(img){
        this.img = img;
        this.spritestate = new SpriteState([img]);
    }
    setSpriteState(sprite_list) {this.spritestate = new SpriteState(sprite_list)}


}