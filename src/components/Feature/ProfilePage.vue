<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="`Hi ${getUser.name}`"></app-header>

    </div>
</template>

<script>
import AppHeader from '../Shared/AppHeader.vue';

import { mapGetters } from 'vuex';
export default {
    name: "profile-page",
    components: { AppHeader },
    computed: mapGetters(['getUser']),
}
</script>