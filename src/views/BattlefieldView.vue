<template>
    <div class="attack-container">
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Battlefield'"></app-header>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';

export default {
    name: "attack-view",
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
.attack-container {
    height: 100%;
    width: 100%;
    position: relative;
}
.planets-battlefield {
    height: inherit;
    position: relative;
}

#NW {
    position: absolute;
    width: 50%;
    height: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#NE {
    position: absolute;
    width: 50%;
    height: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#SW {
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

#SE {
    position: absolute;
    width: 50%;
    height: 45%;
    top: 45%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

#SE,
#SW {
    border-top: 1px solid #3E8898;
}

#NE,
#SE {
    border-left: 1px solid #3E8898;
}
</style>