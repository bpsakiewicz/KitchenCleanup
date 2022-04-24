class Projectile extends Entity{
    constructor(pos,velocity,tag,time,damage,image,dim){
        super(pos,velocity,tag,"circle",dim);
        this.setImage(image);

        // set damage of the projectile
        // should be changed according to weapon
        this.damage = damage

        function delay(time) {return new Promise(resolve => setTimeout(resolve, time));}
        delay(time).then(() => g.destroy(this));
    }

    // on collision
    onCollision(entity) {
        // removed oncollision logic because it depends on who shot the projectile
    }

    // return the damage
    getDamage() {
        return this.damage;
    }
}