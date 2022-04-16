class Enemy extends Entity{
    constructor(enemyType) {
        super(new p5.Vector(random(100, width - 100), random(100, height - 100)), new p5.Vector(2, 2), "enemy", "box", new p5.Vector(100, 100))
        //this.setImage(tomato)
    }

    update(deltaTime) {
        // console.log(this)
    }
}