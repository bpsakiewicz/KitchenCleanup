class Enemy extends Entity{
    constructor(enemyType) {
        super(new p5.Vector(random(100, width - 100), random(100, height - 100)), new p5.Vector(2, 2), "enemy", "circle", new p5.Vector(100, 100))
        this.setImage(tomato)
        this.setSpriteState([loadImage("assets/sprites/tomato/tomato0.png"),loadImage("assets/sprites/tomato/tomato1.png")])
    }

    update(deltaTime) {
        // console.log(this)
        //if (this.startstate == null) this.setSpriteState([loadImage("assets/sprites/tomato/tomato0.png"),loadImage("assets/sprites/tomato/tomato1.png")])
        if (this.spritestate == null) throw new Error("nro what");
        this.spritestate.update(deltaTime);
        //let i = deltaTime;
    }
}