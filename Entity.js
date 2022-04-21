class Entity {

    constructor(pos,velocity, tag, collider_type, dimensions) {
        this.pos = pos; // float tuple 
        this.velocity = velocity; // float tuple
        this.tag = tag; // string
        this.img = null;
        if (collider_type == "circle") this.collider = new CircleCollider(pos,dimensions.x / 2);
        if (collider_type ==  "box") this.collider = new BoxCollider(pos, dimensions.x, dimensions.y);
        this.spritestate = null;
        this.dimensions = dimensions;
        this.got_hit = false
    }
    // action on collision, other is the entity that is collided with
    // both entities have this function called on a collision
    onCollision(other) {
    }
    // updates that take place every frame
    // this is where you would update the entities velocity for example, or outline its behavior
    // deltaTime is the change in time between updates, only really necessary if you want to measure the time passed since an event
        // like bullet lifetimes, timing of enemy behavior etc 
    update(deltaTime) {
        if (this.tag == "gun") {
            var playa = Player.getInstance();
            var ppos = playa.getPos();
            this.pos.x = ppos.x;
            this.pos.y = ppos.y;
            if (true) {
                this.spritestate.setActive(true);
            }
            //if ( this.spritestate != null) this.startstate.update(deltaTime)
        }
        //this.startstate.update(deltaTime)
    }

    // adjusts image if needed and draw entity
    draw() {
        // store size variables to streamline the drawing process
        var sizex,sizey;
        var posx = this.pos.x;
        var posy = this.pos.y;

        if (this.collider.getType() == "circle") {
            sizex = this.collider.getRadius()*2;
            sizey = sizex;
            posx = this.pos.x - sizex/2;
            posy = this.pos.y - sizex/2;
        }
        if (this.collider.getType() == "box") {
            sizex = this.collider.getWidth();
            sizey = this.collider.getHeight();
        }
         // cast a shadow
         tint(255,60)
         if (this.tag != "projectile") image(shadow,posx + sizex*0.05, posy + 10, sizex*0.9, sizey)
         noTint();
        // damage flash and sounds
        if (this.got_hit) {
            tint(255,0,255);
            this.got_hit = false;
        }
        // flip image based on velocity
        if (this.velocity.x < 0) {
            push();
            scale(-1, 1)
            image(this.getImage(),-posx - sizex, posy, sizex, sizey)
            pop();
          } else image(this.getImage(),posx,posy,sizex, sizey)
         noTint();
    }

    // call when entity gets hit
    hit() {
        this.got_hit = true;
        // insert hit sound here
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