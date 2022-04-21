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
        // for shoot behavior
        this.shoot_time = 0;
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

        this.shoot_time += deltaTime;
        // time to shoot!
        if (this.shoot_time > 3) {
            console.log("pow");
            // ENEMY AIM
            var mouse_dir = createVector(Player.getInstance().getPos().x - this.pos.x , Player.getInstance().getPos().y - this.pos.y);
            mouse_dir = p5.Vector.normalize(mouse_dir);
            var m = Math.sqrt( (mouse_dir.x * mouse_dir.x) + (mouse_dir.y * mouse_dir.y) )
            mouse_dir = createVector(mouse_dir.x / m, mouse_dir.y / m);
            var shoot_dir = createVector(mouse_dir.x *1000, mouse_dir.y *1000);
            var bullet = new Projectile(new p5.Vector(this.pos.x + 60,this.pos.y+30), shoot_dir);
            this.shoot_time = 0;
            // console.log(bullet);
            g.instantiate(bullet);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        this.hit()
        // console.log(this.health);
    }
}