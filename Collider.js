class Collider {
    constructor(pos){
        this.pos = pos;
    }
    getPos(){return this.pos}
}
class CircleCollider extends Collider {
    constructor(pos,radius) {
        super(pos);
        this.radius = radius;
    }
    checkCollision(other) {
        if (typeof other == 'CircleCollider') {
            if (p5.dist(this.pos.x,this.pos.y,other.getPos().x,other.getPos().y) == this.radius + other.getRadius())
                return true;
            else return false;
        }
    }
    getRadius(){return this.radius}
}

class BoxCollider extends Collider {
    constructor(upleft_pos,width,height) {
        this.pos = upleft_pos;
        this.width = width;
        this.height = height;
    }
}