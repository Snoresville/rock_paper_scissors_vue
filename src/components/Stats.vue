<script setup lang="ts">
import { StatCategory } from "../types";
import StatsCategory from "./StatsCategory.vue"

const { data } = defineProps<{
    data: Record<string, StatCategory>
}>()
</script>

<template>
    <div class="stats">
        <StatsCategory v-for="d in data" :title="d.title" :stats="d.stats" />
    </div>
</template>

<style>
.stats {
    position: absolute;
    right: 0px;
    top: 0px;

    margin: 25px;
    padding: 10px;
    background-color: rgba(128, 128, 128, 0.281);
    border: 2px solid black;
}
</style>