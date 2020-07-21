class Player {
    constructor( playerName,hull, accuracy, firePower) {
        this.hull = hull;
        this.accuracy = accuracy;
        this.firePower = firePower;
        this.maxHull = hull;
        this.playerName = playerName;
    }

    /* Printing properties for all players */
    stats() {
        return `${this.playerName}: Hull: ${this.hull}, Accuracy: ${this.accuracy}, FirePower: ${this.firePower}`;
    }
}

class Hero extends Player {
    retreat() {
        print("Schwarzenegger is retreating now");
    }
}

class Alien extends Player {
}

class AttackResponse {
    damageDone;
    isTargetDestroyed;

    constructor(damageDone, isTargetDestroyed) {
        this.damageDone = damageDone;
        this.isTargetDestroyed = isTargetDestroyed;
    }
}

let logger = document.getElementById("logger");

/*Making console.log into print statement, creating <p> for html and printing all game messages. */
const print = function (text) {
    console.log(text);
    if (logger != null) {
        logger.innerHTML += `<p>${text}</p>`;
        logger.scrollTop = logger.scrollHeight;
    }

}

class SpaceBattleGame {

    constructor() {
        this.setupPlayers();
    }

    TOTAL_ALIENS = 6;
    
    /**Intialize Schwarzenegger ship */
    setupHero() {
        this.hero = new Hero('Schwarzenegger', 20, 0.7, 5);
        print("Stats : "+this.hero.stats() )
    }

    /*Intializes Alien ships total of 6 */ 
    setupAliens() {
        this.aliens = [];
        for (let i = 0; i < this.TOTAL_ALIENS; i++) {
            let fire = Math.round((Math.random() * (4 - 2)) + 2);
            let hull = Math.round((Math.random() * (6 - 3)) + 3);
            let accu = ((Math.random() * (.8 - .6)) + .6).toFixed(1);
            let playerName ='Alien'+(i + 1);
            let alien = new Alien(playerName,hull, accu, fire);
            this.aliens.push(alien);
            print("Stats : " + alien.stats())
        }
    }

    attacker;
    target;
    isGameOver;
    alien;
    winner;

    setupPlayers() {
        print("The Game has just been hosted")
        this.setupHero();
        this.setupAliens();
        this.printGameInfo();
        this.isGameOver = false;
        this.attacker = this.hero;
        this.alien = this.findEnemy();
        this.target = this.alien;
        this.winner = undefined;

    }

    setGameOver(winner) {
        this.isGameOver = true;
        this.winner = winner;
    }
    /**Determine hit/miss */
    attack(attacker, target) {
        let damageDone = 0;
        let isTargetDestroyed;
        let randomChance = Math.random();
        if (randomChance <= attacker.accuracy) {
            damageDone = attacker.firePower;
            print(attacker.playerName + " hit " + target.playerName);

            isTargetDestroyed = this.inflicitDamage(target, damageDone);
        } else {
            print("Attack missed by " + attacker.playerName);
        }

        let attackResponse = new AttackResponse(damageDone, isTargetDestroyed);
        return attackResponse;
    }
    /**Recalculating Hull */
    inflicitDamage(target, damageDone) {
        let isTargetDestroyed = false;
        if (damageDone != 0) {
            let oldHull = target.hull;
            target.hull = oldHull - damageDone;
            if (target.hull <= 0) {
                print(target.playerName +" has been destroyed by "+ damageDone+" fire power");
                isTargetDestroyed = true;
            } else {
                print( target.playerName + " hull has been reduced to " + target.hull);
            }
        }
        return isTargetDestroyed;
    }

    printGameInfo() {
        print("Game is ready to play. It has a Schwarzenegger Ship and " + this.TOTAL_ALIENS + " Aliens");
    }
    /**Finds next ship if previous destroyed */
    findEnemy() {
        let enemy;
        for (let i = 0; i < this.aliens.length; i++) {

            if (this.aliens[i].hull > 0) {
                enemy = this.aliens[i];
                break;
            }
        }
        return enemy;
    }

    isAttackerHero() {
        return (this.attacker instanceof Hero);
    }

    performHeroAttack() {
        let attackResponse = this.attack(this.attacker, this.target);
        if (!this.findEnemy()) {
            print(`Schwarzenegger has won the battle, remaining hull: ${this.hero.hull}`);
            this.setGameOver(this.hero);
        } else {
            this.alien = this.findEnemy();
            this.attacker = this.alien;
            this.target = this.hero;
        }
        return attackResponse;
    }

    performAlienAttack() {
        let attackResponse = this.attack(this.attacker, this.target);
        if (attackResponse.isTargetDestroyed) {
            print(`Schwarzenegger has lost the battle`);
            this.setGameOver(this.alien);
        }
        this.alien = this.findEnemy();
        this.target = this.alien;
        this.attacker = this.hero;
        return attackResponse;
    }

}

