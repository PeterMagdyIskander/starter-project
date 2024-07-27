<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Quest Center'"></app-header>

        <selection-bar :options="options" @selected="handleOptionSelection"></selection-bar>
        <quest-card v-for="quest in questList" :key="quest.id" :title="quest.title" :id="quest.id"
            :difficulty="quest.difficulty"></quest-card>
    </div>
</template>
<script>
import QuestCard from "@/components/Quest/QuestCard.vue"

import { mapGetters } from 'vuex';
import AppHeader from '@/components/Shared/AppHeader.vue';
import SelectionBar from '@/components/Shared/SelectionBar.vue';
export default {
    name: "quest-center-view",
    components: { QuestCard, AppHeader, SelectionBar },
    computed: mapGetters(['getUser', 'getQuests']),
    data() {
        return {
            questList: [],
            showingRole: "",
            options: [
                {
                    name: "Physical",
                    id: 1,
                },
                {
                    name: "Social",
                    id: 2,
                },
                {
                    name: "Spiritual",
                    id: 3,
                }
            ]
        }
    },
    methods: {
        handleOptionSelection(id) {
            this.questList = this.getQuests.filter(quest => quest.category === this.options.filter(option => option.id === id)[0].name.toLocaleLowerCase() && !quest.assignedTo.includes(this.getUser.uid))
        }
    },
    created() {
        this.showingRole = 'Physical';
        this.questList = this.getQuests.filter(quest => quest.category === this.showingRole.toLowerCase() && !quest.assignedTo.includes(this.getUser.uid))
    }
}
</script>
<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
}

.active {
    background-color: #162041;
}
</style>