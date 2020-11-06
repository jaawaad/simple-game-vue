new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isGamgeRunning: false,
    actionLogs: [],
  },
  methods: {
    //Start new game
    startNewGame: function () {
      this.isGamgeRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.actionLogs = [];
    },
    // Normall attack
    attack: function () {
      this.playerAttack();
      this.monsterAttack();
      this.checkWhoWin();
    },
    // Special Attacl
    specialAttack: function () {
      this.playerAttack(5, 15);
      this.monsterAttack();
      this.checkWhoWin();
    },
    // Heal Player
    heal: function () {
      const amountToFullHealth = 100 - this.playerHealth;
      // 10 Heal if player Health <= 90
      if (amountToFullHealth >= 10) {
        this.playerHealth += 10;
        this.actionLogs.unshift({
          isPlayer: true,
          text: 'Player heals for 10',
        });
        this.monsterAttack();
      } else if (amountToFullHealth < 10 && amountToFullHealth !== 0) {
        this.playerHealth += amountToFullHealth;
        this.actionLogs.unshift({
          isPlayer: true,
          text: 'Player heals for ' + amountToFullHealth,
        });
        this.monsterAttack();
      }
    },
    // Player Give up
    giveUp: function () {
      this.isGamgeRunning = false;
    },
    // Monster Attack
    monsterAttack: function (min = 1, max = 10) {
      const damage = this.randomDamage(min, max);
      this.playerHealth -= damage;
      this.actionLogs.unshift({
        isPlayer: false,
        text: 'Monster hits you hard for ' + damage,
      });
    },
    // Player Attack
    playerAttack: function (min = 1, max = 10) {
      const damage = this.randomDamage(min, max);
      this.monsterHealth -= damage;
      this.actionLogs.unshift({
        isPlayer: true,
        text: 'You hits Monster hard for ' + damage,
      });
    },
    // Random Damage Generator
    randomDamage: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Check who won or lost
    checkWhoWin: function () {
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        if (confirm('You lost! New Game?')) {
          this.startNewGame();
        } else {
          this.isGamgeRunning = false;
        }
      } else if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        if (confirm('You Won! New Game?')) {
          this.startNewGame();
        } else {
          this.isGamgeRunning = false;
        }
      }
    },
  },
});
