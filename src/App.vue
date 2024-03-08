<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Moves, StatCategory } from './types';
import Results from './components/Results.vue'
import Stats from "./components/Stats.vue"
import { DEFAULT_STATS_BOARD } from './constants';
import JSConfetti from 'js-confetti'
import Background from './components/Background.vue'

const playerMove = ref(Moves.None)
const computerMove = ref(Moves.None)

const closeResult = () => {
  computerMove.value = Moves.None
}

const statsKey = "rps-stats"
const stats = ref<Record<string, StatCategory>>({})

const selectComputerMove = () => {
  computerMove.value = Math.floor(Math.random() * 2) + 1
}

const jsConfetti = new JSConfetti()
const confettiEmojis = {
  [1]: ['🏆', '👑', '🚀'],
  [0]: ['🔫', '🤷', '🍆'],
  [-1]: ['😭', '❌', '🚫', '💩']
}
const throwConfetti = (gameState: -1 | 0 | 1) => {
  jsConfetti.clearCanvas()
  jsConfetti.addConfetti({
    emojis: confettiEmojis[gameState]
  })
}

const updateStats = (movePlayed: Moves, gameState: -1 | 0 | 1) => {
  switch (movePlayed) {
    case Moves.Rock:
      stats.value.movesPlayed.stats.Rocks += 1
      break;
    case Moves.Paper:
      stats.value.movesPlayed.stats.Papers += 1
      break;
    case Moves.Scissors:
      stats.value.movesPlayed.stats.Scissors += 1
      break;
  }

  switch (gameState) {
    case 1:
      stats.value.stats.stats.Wins += 1
      break;
    case 0:
      stats.value.stats.stats.Draws += 1
      break;
    case -1:
      stats.value.stats.stats.Losses += 1
      break;
  }

  localStorage.setItem(statsKey, JSON.stringify(stats.value))
}

const playGame = () => {
  selectComputerMove()

  const gameState = (playerMove.value - 1) == (computerMove.value % 3) ? 1 : playerMove.value == computerMove.value ? 0 : -1
  updateStats(playerMove.value, gameState)
  throwConfetti(gameState)
}

onMounted(() => {
  stats.value = JSON.parse(localStorage.getItem(statsKey) ?? JSON.stringify(DEFAULT_STATS_BOARD))
})
</script>

<template>
  <Background :background-name="playerMove" />

  <div>
    <div>
      <h1>Select your character!</h1>
    </div>
    <div>
      <button @click="playerMove = playerMove == Moves.Rock ? Moves.None : Moves.Rock" :class="{
    selected: playerMove == Moves.Rock
  }"><img src="./assets/rock.png" width="30px"></button>
      <button @click="playerMove = playerMove == Moves.Paper ? Moves.None : Moves.Paper" :class="{
    selected: playerMove == Moves.Paper
  }"><img src="./assets/paper.png" width="30px"></button>
      <button @click="playerMove = playerMove == Moves.Scissors ? Moves.None : Moves.Scissors" :class="{
    selected: playerMove == Moves.Scissors
  }"><img src="./assets/scissors.png" width="30px"></button>
    </div>
    <Transition>
      <button class="lets_go" v-if="playerMove! + Moves.None" @click="playGame">
        LET'S GO!
      </button>
    </Transition>
  </div>

  <Stats :data="stats" />

  <Teleport to="body">
    <Results v-if="computerMove != Moves.None" @close-popup="closeResult" :data="{
    player: playerMove,
    computer: computerMove
  }" />
  </Teleport>
</template>

<style scoped>
.selected {
  background-color: lightblue;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-active {
  animation: bounce-in 0.2s
}

.v-leave-active {
  animation: bounce-in 0.2s reverse
}

.lets_go {
  margin: 20px;
  background: rgb(2, 0, 36);
  background: linear-gradient(0deg, rgba(255, 0, 0, 1) 0%, #ff9c9c 100%);
}
</style>
