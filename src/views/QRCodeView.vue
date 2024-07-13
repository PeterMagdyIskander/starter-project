<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'My QR Code'"></app-header>
        <div id="qrcode"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import QRCode from 'qrcode';
import AppHeader from '@/components/Shared/AppHeader.vue';
export default {
    components: { AppHeader },
    name: "LoginPage",
    computed: mapGetters(['getUser', 'getQuests', 'getLoading', 'getFailed', mapActions]),
    mounted() {
        const url = `secyouth.com/attendance/${this.getUser.uid}`;
        const qrCodeContainer = document.getElementById('qrcode');

        QRCode.toCanvas(url, { errorCorrectionLevel: 'H' }, function (error, canvas) {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);
            console.log('QR code generated!');
        });
    }
};
</script>

<style lang="scss" scoped>
#qrcode {
    text-align: center;
    padding-top: 150px;
}
</style>