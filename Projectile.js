class Projectile extends Entity{
    constructor(pos,velocity, entityFrom){
        super(pos,velocity,"projectile","circle",new p5.Vector(40,40));
        this.setImage(loadImage("assets/sprites/bullets/bulletb_ultra.png"));

        // set damage of the projectile
        // should be changed according to weapon
        this.damage = 50
        this.entityFrom = entityFrom;

        function delay(time) {return new Promise(resolve => setTimeout(resolve, time));}
        delay(500).then(() => g.destroy(this));
    }

    // on collision
    onCollision(entity) {

        // if projectile collides with an enemy, enemy takes damage
        if(entity.getTag().includes("enemy") && this.entityFrom == "player") {
            Game.getInstance().destroy(this);
        }
    }

    // return the damage
    getDamage() {
        return this.damage;
    }
}