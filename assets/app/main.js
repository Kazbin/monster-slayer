new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        player: {health: 100},
        monster: {health: 100},
        logStack: [],
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.log("The game is beginning!");
        },
        makeMove(action) {
            switch (action) {
                case "attack":
                    this.playerAttack(5, 15);
                    break;
                case "special":
                    this.playerAttack(1,25);
                    break;
                case "heal":
                    this.playerHeal(15, 20);
                    break;
                case "surrender":
                    this.reset();
                    break;
            }
            if (this.monster.health <= 0) {
                alert("You Won! Congratulations!");
                this.reset()
            } else if (action !== "surrender") {
                this.monsterAttack(5,20);
            } else {
                this.reset();
            }
        },
        getDamage(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        playerAttack(min, max) {
            let amount = this.getDamage(min, max);
            this.monster.health -= amount;
            this.log("You attack for " + amount + " damage!");
        },
        playerHeal(min, max) {
            let amount = this.getDamage(min, max);
            this.player.health += amount;
            this.log("You heal yourself by " + amount, 'is-success');
        },
        monsterAttack(min, max) {
            let amount = this.getDamage(min, max);
            this.player.health -= amount;
            this.log("The Monster hits for " + amount + " damage!", 'is-danger');
        },
        log(message, color = 'is-info') {
            let prop = {
                message: message,
                color: color
            }
            this.logStack.unshift(prop);
        },
        reset() {
            this.gameIsRunning = false;
            this.player.health = 100;
            this.monster.health = 100;
            this.logStack = [];
        }
    }
})