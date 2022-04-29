class WeaponBehavior{
    constructor(){
        this.name = "Weapon"
    }
    //shoot();
}

class Pea extends WeaponBehavior{
    constructor(){
        super();
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*500, my *500);
        var shoot_dir2 = createVector((mx-.2)*500, (my-.2) *500);
        var shoot_dir3 = createVector((mx+.2)*500, (my+.2) *500);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",300,100,peabullet,new p5.Vector(40,40)),new Projectile(new p5.Vector(px + 60,py+30), shoot_dir2,"playerprojectile",300,100,peabullet,new p5.Vector(40,40)),new Projectile(new p5.Vector(px + 60,py+30), shoot_dir3,"playerprojectile",300,100,peabullet,new p5.Vector(40,40))];
    }
}

class Bullet extends WeaponBehavior{
    constructor(){
        super();
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*1000, my *1000);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",2000,75,bluebullet,new p5.Vector(40,40))];
    }
}

class Star extends WeaponBehavior{
    constructor(){
        super();
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*3000, my *3000);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",500,30,starbullet,new p5.Vector(40,40)),new Projectile(new p5.Vector(px + 50,py+30), shoot_dir,"playerprojectile",500,30,starbullet,new p5.Vector(40,40))];
    }
}