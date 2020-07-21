let heroAttackBtn = document.getElementById("heroAttackBtn");
let heroRetreatBtn = document.getElementById("heroRetreatBtn");
let alienAttackBtn = document.getElementById("alienAttackBtn");
let gameEnd = document.getElementById("gameOver");
let playAgain = document.getElementById("btnAgain");
let game;

function gameOver(finalMessage = "Game ending") {

    print("The game is over, try again!")
    disableButton(heroAttackBtn);
    disableButton(heroRetreatBtn);
    disableButton(alienAttackBtn);
    showObject(gameEnd);
    showObject(playAgain);
}
function heroRetreat() {
    print("Schwarzenegger retreating")
    gameOver("Schwarzenegger lost");
   
}
function startGame() {
    hideObject(gameEnd);
    hideObject(playAgain);
    logger.innerHTML = '';
    game = new SpaceBattleGame('HTML');
    updateGame();
    if (game.isGameOver) {
        showObject(playAgain);
    }

}
function heroAttack() {

    let attackResponse = game.performHeroAttack();
    updateGame();

}
function alienAttack() {
    let attackResponse = game.performAlienAttack();
    updateGame();
}
function disableButton(obj) {
    obj.disabled = true;

}

function enableButton(obj) {
    obj.disabled = false;

}
function hideObject(obj) {
    obj.style.visibility = "hidden";
}
function showObject(obj) {
    obj.style.visibility = "visible";
}

function updateTurn() {
    let isAttackerHero = game.isAttackerHero();
    if (isAttackerHero) {
        disableButton(alienAttackBtn);
        enableButton(heroAttackBtn);
        enableButton(heroRetreatBtn);

    } else {
        enableButton(alienAttackBtn);
        disableButton(heroAttackBtn);
        disableButton(heroRetreatBtn);

    }

}
function updateGame() {
    hero = game.hero;
    alien = game.alien;

    if (game.isGameOver) {
        let msg;
        if (game.winner) {
            msg = `The winner is ${game.winner.playerName}`;
            print(msg);
        }
        gameOver(msg);

    } else {
        updateTurn();
    }
    

}



