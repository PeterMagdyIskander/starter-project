<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'My Quest'"></app-header>
        <QuestMoreInfo :quest="quest"></QuestMoreInfo>
        <div id="submissionQRCode"></div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import QuestMoreInfo from '@/components/Quest/QuestMoreInfo.vue';

import QRCode from 'qrcode';
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
        }
    },
    mounted() {
        this.quest = this.getQuests.filter(quest => quest.id === this.getUser.assignedQuestId)[0];
        if(!this.quest)return
        const url = `secyouth.com/questSubmission/${this.getUser.uid}`;
        const qrCodeContainer = document.getElementById('submissionQRCode');
        QRCode.toCanvas(url, { errorCorrectionLevel: 'H' }, function (error, canvas) {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);
            console.log('QR code generated!');
        });
    },
}
</script>

<style lang="scss" scoped>
#submissionQRCode {
    text-align: center;
    padding-top: 20px;
}
</style>