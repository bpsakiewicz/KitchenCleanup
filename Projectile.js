class Projectile extends Entity{
    constructor(pos,velocity){
        super(pos,velocity,"player","circle",new p5.Vector(50,50));
        this.setImage(loadImage("assets/sprites/bullets/flame.png"));

        
        function delay(time) {return new Promise(resolve => setTimeout(resolve, time));}
        delay(500).then(() => g.destroy(this));
    }
}