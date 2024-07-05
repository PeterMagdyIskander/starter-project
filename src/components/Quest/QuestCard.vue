<template>
    <div class="card-container" @click="reroute">
        <div class="title">
            <img src="@/assets/quest-dot.svg" alt="quest dot">
            <p>{{ title }}</p>
        </div>
        <div class="difficulty">
            <img v-if="difficulty == 1" src="@/assets/easy.svg" alt="easy">
            <img v-if="difficulty == 2" src="@/assets/medium.svg" alt="medium">
            <img v-if="difficulty == 3" src="@/assets/hard.svg" alt="hard">
        </div>
    </div>
</template>

<script>
import router from '@/router'
export default {
    name: "quest-card",
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        difficulty: {
            type: Number,
            required: true,
        }
    },
    methods: {
        reroute() {
            router.push(`/QuestCenter/${this.id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
}

.card-container {
    width: 100%;
    display: flex;
    align-items: center;
    height: 62px;
    cursor: pointer;
    background-color: #162041;
    margin: 18px 0;

    & .title {
        width: 77%;
        height: 100%;
        display: flex;
        align-items: center;

        p {
            font-family: 'ptmono';
            color: #E5E5E5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        img {
            width: 18px;
            height: 18px;
            margin: 0 18px;
        }
    }

    & .difficulty {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
    }
}
</style>