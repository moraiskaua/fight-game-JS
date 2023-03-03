class Character {

    _hp = 1;
    maxHp = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get hp() {
        return this._hp;
    }

    set hp(newLife) {
        this._hp = newLife < 0 ? 0 : newLife
    }
}

class Knight extends Character {

    constructor(name) {
        super(name);
        this.hp = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxHp = this.hp
    }
}

class Mage extends Character {

    constructor(name) {
        super(name);
        this.hp = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxHp = this.hp;
    }
}

class LittleMonster extends Character {

    constructor() {
        super('Little Monster');
        this.hp = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxHp = this.hp;
    }
}

class BigMonster extends Character {

    constructor() {
        super('Big Monster');
        this.hp = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxHp = this.hp;
    }
}

class Stage {
    
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    Start() {
        this.Update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    Update() {
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - HP: ${this.fighter1.hp.toFixed(1)}`;
        let f1Pct = (this.fighter1.hp / this.fighter1.maxHp) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;


        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - HP: ${this.fighter2.hp.toFixed(1)}`;
        let f2Pct = (this.fighter2.hp / this.fighter2.maxHp) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {

        if (attacking.hp <= 0) {
            this.log.addMessage(`${attacking.name} não pode atacar, ele está morto.`)
            return;
        } else if (attacked.hp <= 0) {
            this.log.addMessage(`${attacking.name} não pode mais atacar, ${attacked.name} já está no chão.`)
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacking.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            attacked.hp -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano.`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu se esquivar.`);
        }

        this.Update();
    }
}

class Log {
    
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.Render();
    }

    Render() {
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}