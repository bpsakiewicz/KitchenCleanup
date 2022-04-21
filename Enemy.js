class Enemy extends Entity{
    constructor(enemyType, levelNum) {
        super(new p5.Vector(random(width / 2, width - 100), random(100, height - 100)), new p5.Vector(0, 0), enemyType[0] + "_enemy", enemyType[1], new p5.Vector(80, 80));
        switch(enemyType[0]) {
            case "tomato":
                this.setImage(tomato);
                this.setSpriteState([loadImage("assets/sprites/tomato/tomato0.png"),loadImage("assets/sprites/tomato/tomato1.png")]);
                break;
            case "garlic":
                this.setImage(garlic)
                this.setSpriteState([loadImage("assets/sprites/garlic/garlic0.png"),loadImage("assets/sprites/garlic/garlic1.png")]);
                break;
            default:
                break;
        }

        this.lNum = levelNum;
        this.health = this.lNum * 100;
}

    onCollision(other) {
        // TEMPORARY EXAMPLE
        // checks to see if i collided with the player, and kills itself if so
        var tag = other.getTag()
        if (tag == "player") {
            Game.getInstance().destroy(this);
        }

        if(tag == "projectile") {
            this.takeDamage(new Projectile(other).getDamage());
            if(this.health <= 0) {
                Game.getInstance().destroy(this);
            }
        }
    }

    updateVelocity(targetPos) {
        var direction = createVector(this.getPos().x - targetPos.x, this.getPos().y - targetPos.y);
        this.velocity = direction.setMag(-this.lNum * 10);
    }

    update(deltaTime) {
        //if (this.startstate == null) this.setSpriteState([loadImage("assets/sprites/tomato/tomato0.png"),loadImage("assets/sprites/tomato/tomato1.png")])
        if (this.spritestate == null) throw new Error("nro what");
        this.spritestate.update(deltaTime);
        this.updateVelocity(Player.getInstance().getPos());
        //let i = deltaTime;
    }

    takeDamage(damage) {
        this.health -= damage;
        this.hit()
        // console.log(this.health);
    }
}