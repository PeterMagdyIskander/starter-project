<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Quest Info'"></app-header>
        <QuestMoreInfo :quest="quest[0]"></QuestMoreInfo>

        <div class="button-container">
            <button @click="accept">START</button>
            <button class="reject" @click="decline">REJECT</button>
        </div>
    </div>
</template>
<script>
import router from '@/router'
import { mapGetters, mapActions } from 'vuex';
import { collection, doc, getFirestore, updateDoc, arrayUnion } from 'firebase/firestore';
import QuestMoreInfo from '@/components/Quest/QuestMoreInfo.vue';
import AppHeader from '@/components/Shared/AppHeader.vue';
export default {
    name: "quest-more-info-view",
    components: {
        QuestMoreInfo,
        AppHeader
    },
    data() {
        return {
            quest: {

            }
        }
    },
    computed: mapGetters(['getUser', 'getQuests']),
    created() {
        this.quest = this.getQuests.filter(quest => quest.id === this.$route.params.id);
    },
    methods: {
        ...mapActions(['updateUser']),
        accept() {
            console.log(this.getUser.uid,this.$route.params.id)
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const questCollectionReference = collection(firestore, 'quests');
            const userDoc = doc(userCollectionReference, this.getUser.uid)
            const questDoc = doc(questCollectionReference, this.$route.params.id)
            if (this.getUser.assignedQuestId === "") {
                updateDoc(userDoc, { assignedQuestId: this.$route.params.id })
                let updatedUser = this.getUser;
                updatedUser.assignedQuestId = this.$route.params.id;
                this.updateUser(updatedUser);
                updateDoc(questDoc, { assignedTo: arrayUnion(this.getUser.uid) })
                alert("Assigned successfuly!");
                router.push('/MyQuest');
            }else{
                alert("You already have a quest, please finish it first!");
            }
        },
        decline() {
            router.push(`/QuestCenter`)
        }
    }
}
</script>
<style lang="scss" scoped>
.button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 30px;
    margin-top: 50px;

    button {
        width: 150px;
        padding: 15px;
        background-color: #3E8898;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #E5E5E5;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
    }

    .reject {
        background-color: #18182E;
        box-shadow: 0px -3px 6px #0000005C;
        border: 1px solid #FFFFFF;
        border-radius: 6px;
    }
}
</style>