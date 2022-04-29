class Armor{
    constructor(){
        this.health = 10;
    }
}

class Apron extends Armor{
    constructor(){
        super();
        this.health = 300;
        this.name = "Apron";
    }
}

class Bandana extends Armor{
    constructor(){
        super();
        this.health = 100;
        this.name = "Bandana";
    }
}

class Scrubs extends Armor{
    constructor(){
        super();
        this.health = 200;
        this.name = "Hazmat";
    }
}