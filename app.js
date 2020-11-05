new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    startGame: false,
  },
  methods: {
    runGame: function () {
      this.startGame = true;
    },
    attack: {},
    specialAttack: {},
    heal: {},
    giveUp: {},
  },
});
