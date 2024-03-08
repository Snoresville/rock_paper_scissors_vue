<script setup lang="ts">
import { StatCategory } from '../types';

const props = defineProps<StatCategory>()

</script>

<template>
    <h2 class="stat-title">{{ props.title }}</h2>
    <div class="stat-row" v-for="[statName, statCount] in Object.entries(props.stats)">
        <div>
            {{ statName }}
        </div>
        <div>
            {{ statCount }}
        </div>
    </div>
</template>

<style>
.stat-row {
    display: flex;
    justify-content: space-between;
}

.stat-title {
    margin: 0px;
}
</style>