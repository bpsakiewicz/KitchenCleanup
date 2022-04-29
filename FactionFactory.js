//ABSTRACT FACTORY
class FactionFactory{
    constructor(){
        this.name = "Word";
    }
}

//ABSTRACT FACTORY
class MasterChefFactionFactory extends FactionFactory{
    constructor(){
        super();
    }
    createWeapon(){
        return new Pea();
    }
    createArmor(){
        return new Apron();
    }
}

//ABSTRACT FACTORY
class SousChefFactionFactory extends FactionFactory{
    constructor(){
        super();
    }
    createWeapon(){
        return new Star();
    }
    createArmor(){
        return new Bandana();
    }
}