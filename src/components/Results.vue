<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Moves } from "../types";

const {
    data: { player, computer },
} = defineProps<{
    data: {
        player: Moves;
        computer: Moves;
    };
}>();

const emit = defineEmits<{
    closePopup: [];
}>();

const moveSymbol = (move: Moves) => {
    switch (move) {
        case Moves.Rock:
            return "./src/assets/rock.png";
        case Moves.Paper:
            return "./src/assets/paper.png";
        case Moves.Scissors:
            return "./src/assets/scissors.png";
        default:
            return "";
    }
};

const playerSymbol = computed(() => moveSymbol(player));
const computerSymbol = computed(() => moveSymbol(computer));

const playerWin = computed(() => player - 1 == computer % 3);
const playerMessage = computed(() =>
    playerWin.value
        ? "You Win!"
        : playerSymbol.value == computerSymbol.value
        ? "Draw!"
        : "You suck..."
);

// Only to do transition animations
const active = ref(false);
onMounted(() => {
    active.value = true;
});

const onClose = () => {
    active.value = false;
    setTimeout(() => {
        emit("closePopup");
    }, 500);
};
</script>

<template>
    <div class="modal" @click.self="onClose">
        <Transition name="result">
            <div v-if="active" class="results">
                <h1>{{ playerMessage }}</h1>
                <div class="results-content">
                    <div class="results-side">
                        <h2>You</h2>
                        <img :src="playerSymbol" width="128px" />
                    </div>
                    <h2 class="results-versus">vs.</h2>
                    <div class="results-side">
                        <h2>Computer</h2>
                        <img :src="computerSymbol" width="128px" />
                    </div>
                </div>

                <!-- <h2>
                    {{ playerSymbol }} (You) vs. {{ computerSymbol }} (Computer)
                </h2> -->
                <button @click="onClose">Close</button>
            </div>
        </Transition>
    </div>
</template>

<style>
div {
    color: black;
}

.modal {
    display: flex;

    position: absolute;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.527);
}

.result-enter-active {
    animation: bounce-in 0.5s;
}

.result-leave-active {
    animation: bounce-in 0.5s reverse;
}

.results {
    display: flex;
    flex-direction: column;

    align-self: center;
    align-items: center;

    margin: 0 auto;

    height: fit-content;
    width: 500px;
    background-color: white;
    padding: 15px;

    border-radius: 25px;
}

.results h1,
.results h2 {
    color: black;
}

.results-side {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 128px;
}

.results-side * {
    align-self: center;
    text-align: center;
}

.results-content {
    display: flex;
    flex-direction: row;
}

.results-versus {
    padding: 0px 50px;
    margin: auto 0;
    vertical-align: middle;
}

.results Button {
    background-color: rgb(255, 126, 126);
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>
