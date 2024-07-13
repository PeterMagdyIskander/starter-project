<template>
    <div class="quest-info-container">
        <div class="quest-info-container-details" v-if="quest">
            <p class="title">{{ quest.title }}</p>
            <p class="sub-title">Task: {{ quest.description }}</p>
            <div class="more-info">
                <div><img src="@/assets/exp-icon.svg" alt="exp icon">
                </div>
                <div class="difficulty">
                    <img v-if="quest.difficulty == 1" src="@/assets/easy.svg" alt="easy">
                    <img v-if="quest.difficulty == 2" src="@/assets/medium.svg" alt="medium">
                    <img v-if="quest.difficulty == 3" src="@/assets/hard.svg" alt="hard">
                </div>
            </div>
            <div class="more-info">
                <div> <img src="@/assets/gold-icon.svg" alt="exp icon">
                </div>
                <p>{{ quest.reward }}</p>
            </div>

            <div class="more-info">
                <div>
                    <p>Category</p>
                </div>
                <p>{{ quest.category }}</p>
            </div>
            
        
        </div>
        <div class="quest-info-container-details" v-else>
            <p class="title">Please select a quest first</p>
        </div>
    </div>
</template>

<script>
import AppHeader from '../Shared/AppHeader.vue'

export default {
  components: { AppHeader },
    name: "quest-more-info",
    
    props: {
        quest: {
            type: Object,
            required: true,
            default: null,
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
}

.quest-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 26px;
    text-align: center;

    &-details {
        width: 100%;
        background-color: #162041;
        padding: 35px;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        margin-top: 50px;
    }

    & .sub-title {
        font-size: 14px;
        font-family: 'ptmono';
    }
}


.more-info {
    display: flex;
    align-items: center;
    column-gap: 30px;
    margin: 7px auto;

    div {
        width: 102px;
        text-align: center;
    }

    & p:nth-child(1) {
        font-family: 'pressstart2p';
        font-size: 12px;
        color: #F09455;
    }

    & p:nth-child(2) {
        width: 90px;
        text-align: left;
        font-family: 'ptmono';
        font-size: 18px;
    }
}

.title {
    font-family: 'pressstart2p';
    font-size: 18px;
}

.icon {
    font-family: 'pressstart2p';
    color: #F09455;
}

.difficulty {
    text-align: left !important;
}

</style>