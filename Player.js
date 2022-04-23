class Player extends Entity{
    constructor(weapon,armor){
        //singleton
        if(Player.instance){
            throw new Error("Player already made!");
        }
        super(new p5.Vector(50,400), new p5.Vector(0,0), "player", "box", new p5.Vector(60,60));
        Player.instance = this;
        //creates default player    
        this.alive = true;
        this.weapon = weapon;
        this.armor = armor;
        this.health = 100;
        //this.ability = null; //implement abilitys??
        // sprite state
        this.idlestate = new SpriteState([loadImage("assets/sprites/cook/cookidle0.png"),loadImage("assets/sprites/cook/cookidle1.png"),loadImage("assets/sprites/cook/cookidle2.png")])
        this.walkstate = new SpriteState([loadImage("assets/sprites/cook/cookwalk0.png"),loadImage("assets/sprites/cook/cookwalk1.png"),loadImage("assets/sprites/cook/cookwalk2.png")])
        this.shootstate =  new SpriteState([loadImage("assets/sprites/shooter/shooter0.png"),loadImage("assets/sprites/shooter/shooter1.png"),loadImage("assets/sprites/shooter/shooter2.png"),loadImage("assets/sprites/shooter/shooter3.png")])
        this.walkstate.setPeriod(5);
        this.shootstate.setPeriod(1);
        this.shootFrames = 0;
        this.spritestate = this.idlestate;

    }
    //SINGLETON
    static getInstance(){
        return Player.instance;
    }

    onCollision(other) {
        // get hurt from enemy bullets here
        if (other.getTag() == "enemyprojectile") {
            this.takeDamage(other.getDamage())
            Game.getInstance().destroy(other)
            if(this.health <= 0) {
                // TODO: ADD DEATH STUFF HERE SEND PLAYER BACK TO MAIN MENU
                Game.getInstance().destroy(this);
            }
        }
    }

    update(){
        //adjusts position to velocity of player
        this.checkBoundaries();
        this.playerInput();
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        //console.log(this.getPos());
        //console.log(this.getVelocity());

        // updates sprite
        if (this.spritestate == null) throw new Error("nro what");
        this.spritestate.update(deltaTime);
        // if velocity isnt 0 set state to walk
        if (this.shootFrames == 0) {
            if (this.velocity.x != 0 || this.velocity.y != 0) this.spritestate = this.walkstate;
        else this.spritestate = this.idlestate;
        } else {
            this.shootFrames++;
            if (this.shootFrames > 4) {
                this.shootFrames = 0;
            }
        }
    }

    playerInput(){
        //takes player input from WASD and adjusts velocity
        document.body.onclick = function() {
            //console.log("plz")
            //console.log(player);
            // AIM EXAMPLE
            /*
            var mouse_dir = new p5.Vector(mouseX - this.pos.x, mouseY - this.pos.y)
            console.log(mouse_dir);
            var shoot_dir = p5.Vector.normalize(mouse_dir) * 200;
            var bullet = new Projectile(new p5.Vector(player.pos.x + 60,player.pos.y+30), shoot_dir);
            // console.log(bullet);
            g.instantiate(bullet);
            */
        }
        
        let dir = new p5.Vector(0,0,0);
        if (keyIsDown(65) || keyIsDown(37)) dir.x = -5;
        if (keyIsDown(68) || keyIsDown(39)) dir.x = 5;
        if (keyIsDown(87) || keyIsDown(38)) dir.y = -5;
        if (keyIsDown(83) || keyIsDown(40)) dir.y = 5;
        // implement rate of fire in this if condition maybe
        if (mouseIsPressed) {
            // shooting bullet
            // AIM EXAMPLE
            var mouse_dir = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
            mouse_dir = p5.Vector.normalize(mouse_dir);
            var m = Math.sqrt( (mouse_dir.x * mouse_dir.x) + (mouse_dir.y * mouse_dir.y) )
            mouse_dir = createVector(mouse_dir.x / m, mouse_dir.y / m);
            var shoot_dir = createVector(mouse_dir.x *1000, mouse_dir.y *1000);
            var bullet = new Projectile(new p5.Vector(player.pos.x + 60,player.pos.y+30), shoot_dir,"playerprojectile",500,50,bluebullet);
            // console.log(bullet);
            g.instantiate(bullet);
            // shooting animation
            this.spritestate = this.shootstate;
            this.shootFrames = 1;
        }
        this.velocity.x = (dir.x)
        this.velocity.y = (dir.y)
    }
    
    checkBoundaries(){
        /*if(this.pos.x < 0 || this.pos.x > 1200 || this.pos.y < 0 || this.pos.y > 800){
            this.vel.x = 0;
            this.vel.y = 0;
        }*/
        if(this.pos.x < 0) this.pos.x += 5.5;
        if(this.pos.x + this.dimensions.x > width) this.pos.x -=5.5;
        if(this.pos.y < 0) this.pos.y += 5.5;
        if(this.pos.y + this.dimensions.y > height) this.pos.y -=5.5;
    }

    takeDamage(damage) {
        console.log(this.health);
        this.health -= damage;
        this.hit()
        // console.log(this.health);
    }
}