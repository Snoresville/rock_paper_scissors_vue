<script setup lang="ts">
import { Moves } from "../types";

const { backgroundName } = defineProps<{
    backgroundName: Moves;
}>();
</script>

<template>
    <Teleport to="body">
        <div
            :class="{
                background: true,
                background_rps: backgroundName == Moves.None,
                background_rock: backgroundName == Moves.Rock,
                background_paper: backgroundName == Moves.Paper,
                background_scissors: backgroundName == Moves.Scissors,
            }"
        />
    </Teleport>
</template>

<style>
.background {
    --background-image-size: 256px;

    position: absolute;
    width: 500%;
    height: 500%;

    z-index: -999;
    opacity: 0.5;
    animation: slide 2s linear infinite;

    transition: background-color 0.25s linear;
}

@keyframes slide {
    0% {
        transform: translate(0);
    }

    100% {
        transform: translate(
            calc(var(--background-image-size) * -1),
            calc(var(--background-image-size) * -1)
        );
    }
}

.background_rps {
    background: url("img/rps.png");
    background-size: var(--background-image-size) var(--background-image-size);
}

.background_rock {
    background: url("img/rock.png");
    background-size: var(--background-image-size) var(--background-image-size);
    background-color: rgb(177, 33, 33);
}

.background_paper {
    background: url("img/paper.png");
    background-size: var(--background-image-size) var(--background-image-size);
    background-color: rgb(52, 72, 250);
}

.background_scissors {
    background: url("img/scissors.png");
    background-size: var(--background-image-size) var(--background-image-size);
    background-color: rgb(51, 165, 66);
}
</style>
