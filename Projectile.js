class Projectile extends Entity{
    constructor(pos,velocity){
        super(pos,velocity,"player","circle",new p5.Vector(20,20));
        this.setImage(loadImage("assets/sprites/bullets/star.png"));

        
        function delay(time) {return new Promise(resolve => setTimeout(resolve, time));}
        delay(500).then(() => g.destroy(this));
    }
}