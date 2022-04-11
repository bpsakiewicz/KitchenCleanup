class Collider {
    constructor(pos,type){
        this.pos = pos;
        this.type = type;
    }
    getPos(){return this.pos}
    getType(){return this.type}
    // helpers
    inRect(point, rect) {
        var rpos = rect.getPos();
        var x = point.x > rpos.x && point.x < rpos.x + rect.getWidth();
        var y = point.y > rpos.y && point.y < rpos.y + rect.getHeight();
        return x && y;
    }
    lineCircle(pt1, pt2, circle) {
        // do math here
        var p = circle.getPos();
        var d = dist(pt1.x,pt1.y, pt2.x,pt2.y);
        if (((p.x - pt1.x) * (pt2.y - pt1.y) - (p.y - pt1.y) * (pt2.x - pt1.x)) / d <= circle.getRadius() )
            return true;
        return false;
    }
}

// CIRCLES
class CircleCollider extends Collider {
    constructor(pos,radius) {
        super(pos,"circle");
        this.radius = radius;
    }
    checkCollision(other) {
        if (other.getType() == "circle") {
            if (dist(this.pos.x,this.pos.y,other.getPos().x,other.getPos().y) < this.radius + other.getRadius())
                return true;
            else return false;
        }
        if (other.getType() == "box") return this.inRect(this.pos,other);
        return false;
    }
    getRadius(){return this.radius}
}

// BOXES
// https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
class BoxCollider extends Collider {
    constructor(upleft_pos,width,height) {
        super(upleft_pos,"box");
        this.width = width;
        this.height = height;
    }
    checkCollision(other) {
        var opos = other.getPos();
        // check each edge of rect for collision
        return this.inRect(opos, this)
        //return this.lineCircle(opos, new p5.Vector(opos.x,opos.y - this.getHeight()), other)
    }
    getWidth() {return this.width}
    getHeight() {return this.height}
}