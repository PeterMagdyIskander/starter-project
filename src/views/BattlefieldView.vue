<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Battlefield'"></app-header>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';

export default {
    name: "battlefield-view",
    computed: {
        ...mapGetters(['getUser']),
    },
    components: {
        AppHeader,
    },
    data() {
        return {
        }
    },
    mounted() 
    {}, 
    methods: {}
}
</script>
<style lang="scss" scoped>

</style>