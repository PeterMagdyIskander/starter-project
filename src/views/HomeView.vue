<template>
  <div class="home">
    <LoginPage v-if="getUser == null" />
    <profile-page v-else></profile-page>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '@/components/LoginPage.vue'
import { mapGetters } from 'vuex';
import ProfilePage from '../components/Feature/ProfilePage.vue'
import Attendance from './AttendanceView.vue';
export default {
  name: 'HomeView',
  components: {
    LoginPage,
    ProfilePage,
    Attendance
  },
  computed: mapGetters(['getUser']),
 
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
