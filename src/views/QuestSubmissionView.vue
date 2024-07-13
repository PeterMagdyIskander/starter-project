<template>
</template>
<script>
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: "attendance-view",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        console.log(this.$route)
        const uid = this.$route.query.redirect.split('/')[2]
        this.submitQuest(uid)
    },
    methods: {
        ...mapActions(['login']),
        submitQuest(uid) {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const teamCollectionReference = collection(firestore, 'teams');
            const userDoc = doc(userCollectionReference, uid);
            onSnapshot(userDoc, snapshot => {
                const data = snapshot.data();
                let user = {
                    uid: res.user.uid
                    , ...data
                }
                let quest = this.getQuests.filter(quest => quest.id === user.assignedQuestId)[0];
                const teamDoc = doc(teamCollectionReference, user.teamId);
                updateDoc(userDoc, {
                    gold: increment(quest.reward),
                })
                updateDoc(teamDoc, {
                    gold: increment(quest.reward),
                })
            })

            alert("Quest points reflected successfuly!")
        }

    }
}
</script>

<style lang="scss" scoped></style>