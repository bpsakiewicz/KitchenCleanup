class Player extends Entity{
    constructor(weapon,armor){
        //singleton
        if(Player.instance){
            throw new Error("Player already made!");
        }
        super(new p5.Vector(50,400), new p5.Vector(0,0), "player", "box", new p5.Vector(80,80));
        Player.instance = this;
        //creates default player    
        this.alive = true;
        this.weapon = weapon;
        this.armor = armor;
        //asdwasdwthis.setImage(coolCook)
        //this.health = armor.health;
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
            var bullet = new Projectile(new p5.Vector(player.pos.x + 80,player.pos.y+40), new p5.Vector(1000,0));
            // console.log(bullet);
            g.instantiate(bullet);
        }
        
        let dir = new p5.Vector(0,0,0);
        if (keyIsDown(65) || keyIsDown(37)) dir.x = -5;
        if (keyIsDown(68) || keyIsDown(39)) dir.x = 5;
        if (keyIsDown(87) || keyIsDown(38)) dir.y = -5;
        if (keyIsDown(83) || keyIsDown(40)) dir.y = 5;
        if (keyIsDown(73)) {
            // shooting bullet
            var bullet = new Projectile(new p5.Vector(player.pos.x + 80,player.pos.y+40), new p5.Vector(1000,0));
            console.log(bullet);
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
}