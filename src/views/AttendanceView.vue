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
        const uid=this.$route.query.redirect.split('/')[2]
        this.addAttendance(uid)
    },
    methods: {
        ...mapActions(['login', 'setQuests']),
        addAttendance(uid) {
            const firestore = getFirestore();
            const userCollectionReference = collection(firestore, 'users');
            const userDoc = doc(userCollectionReference, uid);
            updateDoc(userDoc, {
                humanityPoints: increment(25),
            })
            alert("Attendance points reflected successfuly!")
        }

    }
}
</script>

<style lang="scss" scoped>
</style>