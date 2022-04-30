class Enemy extends Entity{
    constructor(enemyType, levelNum) {
        let spawn_range = 400;
        super(new p5.Vector(random(spawn_range, width - spawn_range), random(spawn_range, height - spawn_range)), new p5.Vector(0, 0), enemyType[0] + "_enemy", enemyType[1], new p5.Vector(80, 80));
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
        this.shoot_time = .2;
        this.shoot_behavior = [.5,1];// min shoot time, randomness
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
        play_sound(shoot1_sound);
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
        play_sound(hit_sound)
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
        this.shoot_behavior = [.75,2]
    }

    shoot() {
        play_sound(shoot1_sound);
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
        play_sound(shoot1_sound);
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
        super(["spag",""],levelNum)
        this.setSpriteState([loadImage("assets/sprites/spaghetti/spaghetti0.png"),loadImage("assets/sprites/spaghetti/spaghetti1.png")]);
        this.collider = new BoxCollider(this.pos, 640, 320)
        this.health = 1500;
        this.shoot_behavior = [.3,.5]
        //this.teleport(BOUNDS.x / 2, BOUNDS.y / 2);
    }

    
    shoot() {
        play_sound(shoot1_sound);
        let d = random([0,1])
        let xc = this.pos.x + this.dimensions.x * 4;
        let yc = this.pos.y + this.dimensions.y;
        if (d) {
            let speed = 500;
            let bullets = [
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(0,speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(-speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(0,-speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(- speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                new Projectile(new p5.Vector(xc,yc), new p5.Vector(- speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40))
            ]
            for (var i = 0; i < bullets.length; i++) g.instantiate(bullets[i]);
        }
        else {
            // ENEMY AIM
            let pl_dir = createVector(Player.getInstance().getPos().x - xc , Player.getInstance().getPos().y - yc);
            pl_dir = p5.Vector.normalize(pl_dir);
            let m = Math.sqrt( (pl_dir.x * pl_dir.x) + (pl_dir.y * pl_dir.y) )
            pl_dir = createVector(pl_dir.x / m, pl_dir.y / m);
            let shoot_dir = createVector(pl_dir.x *800, pl_dir.y *800);
            let bullet = new Projectile(new p5.Vector(xc,yc), shoot_dir,"enemyprojectile",5000,50,redbullet,new p5.Vector(80,80));
            // console.log(bullet);
            g.instantiate(bullet);
        }
    }
    
    /*
    shoot() {
        let center = new p5.Vector(this.pos.x + this.dimensions.x * 4, this.pos.y + this.dimensions.y * 4);
        console.log(center.x, this.pos.x)
        let d = random([0,1])
        let pl_dir = createVector(Player.getInstance().getPos().x - center.x , Player.getInstance().getPos().y - center.y);
        pl_dir = p5.Vector.normalize(pl_dir);
        let m = Math.sqrt( (pl_dir.x * pl_dir.x) + (pl_dir.y * pl_dir.y) )
        pl_dir = createVector(pl_dir.x / m, pl_dir.y / m);
        let shoot_dir = createVector(pl_dir.x *800, pl_dir.y *800);
        switch (d) {
            case 0: 
                play_sound(shoot1_sound);
                let bullet = new Projectile(new p5.Vector(center.x,center.y), shoot_dir,"enemyprojectile",2500,50,redbullet,new p5.Vector(80,80));
                g.instantiate(bullet);
                break;
            case 1:
                    play_sound(shoot1_sound);
                    let speed = 500;
                    let bullets = [
                        new Projectile(center, new p5.Vector(speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(0,speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(-speed,0),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(0,-speed),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(- speed / 2, speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40)),
                        new Projectile(center, new p5.Vector(- speed / 2, - speed / 2),"enemyprojectile",1000,25,redbullet,new p5.Vector(40,40))
                    ]
                    for (var i = 0; i < bullets.length; i++) g.instantiate(bullets[i]);
                break;
        }
    }
    */

}