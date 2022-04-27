class Enemy extends Entity{
    constructor(enemyType, levelNum) {
        super(new p5.Vector(random(width / 2, width - 100), random(100, height - 100)), new p5.Vector(0, 0), enemyType[0] + "_enemy", enemyType[1], new p5.Vector(80, 80));
        switch(enemyType[0]) {
            case "tomato":
                this.setImage(tomato);
                this.setSpriteState([loadImage("assets/sprites/tomato1/stomato0.png"),loadImage("assets/sprites/tomato1/stomato1.png")]);
                break;
            case "garlic":
                this.setImage(garlic)
                this.setSpriteState([loadImage("assets/sprites/garlic/garlic0.png"),loadImage("assets/sprites/garlic/garlic1.png")]);
                break;
            case "carrot":
                this.setImage(garlic)
                this.setSpriteState([loadImage("assets/sprites/carrot/carrot0.png"),loadImage("assets/sprites/carrot/carrot1.png")]);
                this.collider = new BoxCollider(this.pos, 80, 160)
                    break;
            default:
                break;
        }

        this.lNum = levelNum;
        this.health = this.lNum * 100;
        // for shoot behavior
        this.shoot_time = 0;
        this.shoot_behavior = [1,1.5];// min shoot time, randomness
        this.shoot_period = this.shoot_behavior[0] + Math.random() * this.shoot_behavior[1]
}

    onCollision(other) {
        // TEMPORARY EXAMPLE
        // checks to see if i collided with the player, and kills itself if so
        var tag = other.getTag()

        if(tag == "playerprojectile") {
            this.takeDamage(other.getDamage());
            Game.getInstance().destroy(other)
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
        if (this.shoot_time > this.shoot_period) {
            this.shoot_time = 0;
            this.shoot_period = this.shoot_behavior[0] + Math.random() * this.shoot_behavior[1]
            this.shoot()
        }
    }

    // function for shooting behavior
    shoot() {
        pistol_sound.play();
        // ENEMY AIM
        let pl_dir = createVector(Player.getInstance().getPos().x - this.pos.x , Player.getInstance().getPos().y - this.pos.y);
        pl_dir = p5.Vector.normalize(pl_dir);
        let m = Math.sqrt( (pl_dir.x * pl_dir.x) + (pl_dir.y * pl_dir.y) )
        pl_dir = createVector(pl_dir.x / m, pl_dir.y / m);
        let shoot_dir = createVector(pl_dir.x *1000, pl_dir.y *1000);
        let bullet = new Projectile(new p5.Vector(this.pos.x,this.pos.y), shoot_dir,"enemyprojectile",1000,50,redbullet,new p5.Vector(40,40));
        // console.log(bullet);
        g.instantiate(bullet);
    }

    takeDamage(damage) {
        console.log(this.health);
        this.health -= damage;
        this.hit()
        // console.log(this.health);
    }
}

// classes for each specific enemy
// behavior is the same, but shoot is overloaded?
// classic enemy
class EnemyGarlic extends Enemy {
    constructor(levelNum) {
        super(["garlic","circle"],levelNum)
    }
}
// CIRCLE SHOOT enemy
class EnemyTomato extends Enemy {
    constructor(levelNum) {
        super(["tomato","circle"],levelNum)
        this.shoot_behavior = [1,2]
    }

    shoot() {
        let speed = 500;
        let bullets = [
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(0,speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(-speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(0,-speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(- speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
            new Projectile(new p5.Vector(this.pos.x,this.pos.y), new p5.Vector(- speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40))
        ]
        for (var i = 0; i < bullets.length; i++) g.instantiate(bullets[i]);
    }
}

// MEGA SHOOT enemy
class EnemyCarrot extends Enemy {
    constructor(levelNum) {
        super(["carrot","box"],levelNum)
        this.shoot_behavior = [0.25,.75]
    }
    shoot() {
        // ENEMY AIM
        let pl_dir = createVector(Player.getInstance().getPos().x - this.pos.x , Player.getInstance().getPos().y - this.pos.y);
        pl_dir = p5.Vector.normalize(pl_dir);
        let m = Math.sqrt( (pl_dir.x * pl_dir.x) + (pl_dir.y * pl_dir.y) )
        pl_dir = createVector(pl_dir.x / m, pl_dir.y / m);
        let shoot_dir = createVector(pl_dir.x *800, pl_dir.y *800);
        let bullet = new Projectile(new p5.Vector(this.pos.x + 40,this.pos.y + 40), shoot_dir,"enemyprojectile",5000,50,redbullet,new p5.Vector(40,40));
        // console.log(bullet);
        g.instantiate(bullet);
    }
}

// BOSS
class SauceBoss extends Enemy {
    constructor (levelNum) {
        super(["",""],levelNum)
        this.setSpriteState([loadImage("assets/sprites/spaghetti/spaghetti0.png"),loadImage("assets/sprites/spaghetti/spaghetti1.png")]);
        this.collider = new BoxCollider(this.pos, 640, 320)
        this.health = 2000;
    }

    shoot() {
        // ENEMY AIM
        let pl_dir = createVector(Player.getInstance().getPos().x - this.pos.x , Player.getInstance().getPos().y - this.pos.y);
        pl_dir = p5.Vector.normalize(pl_dir);
        let m = Math.sqrt( (pl_dir.x * pl_dir.x) + (pl_dir.y * pl_dir.y) )
        pl_dir = createVector(pl_dir.x / m, pl_dir.y / m);
        let shoot_dir = createVector(pl_dir.x *600, pl_dir.y *600);
        let bullet = new Projectile(new p5.Vector(this.pos.x + 160,this.pos.y + 40), shoot_dir,"enemyprojectile",5000,50,redbullet,new p5.Vector(80,80));
        // console.log(bullet);
        g.instantiate(bullet);
    }

}