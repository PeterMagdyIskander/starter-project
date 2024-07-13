<template>
    <div>
    </div>
</template>
<script>
import { collection, getFirestore, getDoc, doc, updateDoc, increment } from 'firebase/firestore';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: "attendance-view",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        const uid = this.$route.path.split('/')[2]
        this.submitQuest(uid)
    },
    methods: {
        async submitQuest(uid) {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const teamCollectionReference = collection(firestore, 'teams');
            const userDoc = doc(userCollectionReference, uid);

            try {
                const docSnap = await getDoc(userDoc);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    let user = {
                        ...data
                    }
                    console.log(user)
                    let quest = this.getQuests.filter(quest => quest.id === user.assignedQuestId)[0];
                    const teamDoc = doc(teamCollectionReference, user.teamId);

                    updateDoc(userDoc, {
                        assignedQuestId: "",
                        gold: increment(quest.reward),
                    })
                    updateDoc(teamDoc, {
                        gold: increment(quest.reward),
                    })
                    alert("Quest points reflected successfuly!")
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error(error);
            }
        }

    }
}
</script>

<style lang="scss" scoped></style>