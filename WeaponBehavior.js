class WeaponBehavior{
    constructor(){
        this.shoot_period = 10;
    }
    //shoot();
}

class Pea extends WeaponBehavior{
    constructor(){
        super();
        this.name = "PeaShooter";
        this.shoot_period = .75;
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*1000, my *1000);
        var shoot_dir2 = createVector((mx-.2)*1000, (my-.2) *1000);
        var shoot_dir3 = createVector((mx+.2)*1000, (my+.2) *1000);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",200,100,peabullet,new p5.Vector(40,40)),new Projectile(new p5.Vector(px + 60,py+30), shoot_dir2,"playerprojectile",200,100,peabullet,new p5.Vector(40,40)),new Projectile(new p5.Vector(px + 60,py+30), shoot_dir3,"playerprojectile",200,100,peabullet,new p5.Vector(40,40))];
    }
}

class Bullet extends WeaponBehavior{
    constructor(){
        super();
        this.name = "Rifle";
        this.shoot_period = 0.5;
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*1000, my *1000);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",400,75,bluebullet,new p5.Vector(40,40))];
    }
}

class Star extends WeaponBehavior{
    constructor(){
        super();
        this.name = "NinjaStar";
        this.shoot_period = 0.25;
    }
    shoot(px,py,mx,my){
        var shoot_dir = createVector(mx*3000, my *3000);
        return [new Projectile(new p5.Vector(px + 60,py+30), shoot_dir,"playerprojectile",300,50,starbullet,new p5.Vector(40,40))/*,new Projectile(new p5.Vector(px + 50,py+30), shoot_dir,"playerprojectile",500,30,starbullet,new p5.Vector(40,40))*/];
    }
}