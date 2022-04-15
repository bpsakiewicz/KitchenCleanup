class Player extends Entity{
    constructor(weapon,armor){
        //singleton
        if(Player.instance){
            throw new Error("Player already made!");
        }
        super(new p5.Vector(50,400), new p5.Vector(0,0), "player", 60,"box");
        Player.instance = this;
        //creates default player    
        this.alive = true;
        this.weapon = weapon;
        this.armor = armor;
        //this.health = armor.health;
        //this.ability = null; //implement abilitys??

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
        console.log(this.getPos());
        //console.log(this.getVelocity());
    }

    playerInput(){
        //takes player input from WASD and adjusts velocity
        let dir = new p5.Vector(0,0,0);
        if (keyIsDown(65)) dir.x = -5;
        if (keyIsDown(68)) dir.x = 5;
        if (keyIsDown(87)) dir.y = -5;
        if (keyIsDown(83)) dir.y = 5;
        this.velocity.x = (dir.x)
        this.velocity.y = (dir.y)
    }
    
    checkBoundaries(){
        /*if(this.pos.x < 0 || this.pos.x > 1200 || this.pos.y < 0 || this.pos.y > 800){
            this.vel.x = 0;
            this.vel.y = 0;
        }*/
        if(this.pos.x < 0) this.pos.x += 5.5;
        if(this.pos.x > 1180) this.pos.x -=5.5;
        if(this.pos.y < 0) this.pos.y += 5.5;
        if(this.pos.y > 780) this.pos.y -=5.5;
    }
}