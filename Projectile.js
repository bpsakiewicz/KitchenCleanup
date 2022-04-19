class Projectile extends Entity{
    constructor(pos,velocity){
        super(pos,velocity,"projectile","circle",new p5.Vector(50,50));
        this.setImage(loadImage("assets/sprites/bullets/flame.png"));

        // set damage of the projectile
        // should be changed according to weapon
        this.damage = 50

        function delay(time) {return new Promise(resolve => setTimeout(resolve, time));}
        delay(500).then(() => g.destroy(this));
    }

    // on collision
    onCollision(entity) {

        // if projectile collides with an enemy, enemy takes damage
        if(entity.getTag().includes("enemy")) {
            Game.getInstance().destroy(this);
            entity.takeDamage(this.damage);
        }
    }

    // return the damage
    getDamage() {
        return this.damage;
    }
}