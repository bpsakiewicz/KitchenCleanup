class Collider {
    constructor(pos,type){
        this.pos = pos;
        this.type = type;
    }
    getPos(){return this.pos}
    getType(){return this.type}
    
    // general collision detection
    check(collider1,collider2) {
        // get positions of each collider
        var pos1 = collider1.getPos();
        var pos2 = collider2.getPos();
        // check if same type
        if (collider1.getType() == collider2.getType()) {
            // circle, circle
            if (collider1.getType() == "circle") {
                if (dist(pos1.x, pos1.y, pos2.x, pos2.y) < collider1.getRadius() + collider2.getRadius())
                    return true;
                else return false;
            }
            // box, box
            if (collider1.getType() == "box") {
                // check each rectangle edge
                return (this.inRect(pos1,collider2) || 
                    this.inRect(new p5.Vector(pos1.x, pos1.y + collider1.getHeight()), collider2) || 
                    this.inRect(new p5.Vector(pos1.x + collider1.getWidth(), pos1.y), collider2) || 
                    this.inRect(new p5.Vector(pos1.x + collider1.getWidth(), pos1.y + collider1.getHeight()), collider2) 
                )
            }
        }
        // box, circle
        // figure out which collider is which, pos1 is circle, pos2 is rect
        if (collider1.getType() == "circle") {
            var circle = collider1;
            var rect = collider2;
            
        } else {
            var circle = collider2;
            var rect = collider1;
            // switcharoo!
            let temp = pos1;
            pos1 = pos2;
            pos2 = temp;
        }
        // check collision
        // https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
        // note: adjusted for p5 coord system here
        var distx = abs(pos1.x - (pos2.x + rect.getWidth() / 2));
        var disty = abs(pos1.y - (pos2.y + rect.getHeight() / 2));
        // check if circle is too far
        if (distx > rect.getWidth()/2 + circle.getRadius()) return false;
        if (disty > rect.getHeight()/2 + circle.getRadius()) return false;
        // easy check, see if circle is close enough to garentee intersection
        if (distx <= rect.getWidth()/2) return true;
        if (disty <= rect.getHeight()/2) return true;
        // edge case: circle intersects corner of rectangle
        var cdistsqr = (distx - rect.getWidth()/2)**2 + (disty - rect.getHeight()/2)**2;
        return cdistsqr <= circle.getRadius()**2;
        //if (collider2.getType() == "circle") return this.inRect(pos2,collider1);
    }

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
        return this.check(this,other);
    }
    getRadius(){return this.radius}
}

// BOXES
class BoxCollider extends Collider {
    constructor(upleft_pos,width,height) {
        super(upleft_pos,"box");
        this.width = width;
        this.height = height;
    }
    checkCollision(other) {
        return this.check(this,other);
    }
    getWidth() {return this.width}
    getHeight() {return this.height}
    // setters
    setWidth(width) {this.width = width}
    setHeight(height) {this.height = height}
}