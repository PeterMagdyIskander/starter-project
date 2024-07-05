<template>
    <div class="attendance-container">
        ADDING ATTENDANCE
    </div>
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
            alert(uid)
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
.attendance-container {
    text-align: center;
    padding: 50px;
}

.drop-down {
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 30px;

    &-item {
        width: 100%;
        padding: 5px;
        margin: 5px;
        font-size: 14px;
        font-family: 'ptmono';
    }
}
</style>