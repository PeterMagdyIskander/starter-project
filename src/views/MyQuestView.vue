<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'My Quest'"></app-header>
        <QuestMoreInfo :quest="quest"></QuestMoreInfo>
        <div class="button-container" v-if="quest">
            <input type="password" v-model="password">
            <button @click="submit">SUBMIT</button>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { collection, doc, getFirestore, updateDoc, increment } from 'firebase/firestore';
import router from '@/router';
import QuestMoreInfo from '@/components/Quest/QuestMoreInfo.vue';
import AppHeader from '@/components/Shared/AppHeader.vue';
export default {
    name: "my-quest",
    computed: mapGetters(['getUser', 'getQuests']),
    components: {
        QuestMoreInfo,
        AppHeader
    },
    data() {
        return {
            quest: null,

            password: ""
        }
    },
    created() {
        this.quest = this.getQuests.filter(quest => quest.id === this.getUser.assignedQuestId)[0];
    },
    methods: {
        ...mapActions(['updateUser']),
        submit() {
            if (this.password.length >= 12 && this.password[0] === 's' && this.password[1] === 'e' && this.password[2] === 'c') {
                const firestore = getFirestore();
                const userCollectionReference = collection(firestore, 'users');
                const teamCollectionReference = collection(firestore, 'teams');
                const teamDoc = doc(teamCollectionReference, this.getUser.teamId);
                const userDoc = doc(userCollectionReference, this.getUser.uid)
                if (this.getUser.role.toLowerCase() === this.quest.role.toLowerCase()) {
                    updateDoc(userDoc, { assignedQuestId: "", exp: increment(this.quest.exp), gold: increment(this.quest.gold) })
                    updateDoc(teamDoc, {
                        gold: increment(this.quest.gold),
                    })
                } else {
                    updateDoc(userDoc, { assignedQuestId: "", exp: increment(this.quest.exp / 2), gold: increment(this.quest.gold / 2) })
                    updateDoc(teamDoc, {
                        gold: increment(this.quest.gold / 2),
                    })
                }
                let updatedUser = this.getUser;
                updatedUser.assignedQuestId = "";
                this.updateUser(updatedUser);
                router.push("/QuestCenter")
            } else {
                alert("please enter the correct password")
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.button-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 25px;
    margin-top: 50px;

    input {
        width: 271px;
        height: 40px;
        border: 2px solid #3E8898;
        border-radius: 6px;
    }

    button {
        width: 170px;
        padding: 10px;
        background-color: #3E8898;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #E5E5E5;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
    }
}
</style>