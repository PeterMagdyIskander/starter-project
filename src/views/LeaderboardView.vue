<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Leaderboard'"></app-header>

        <h1>Leaderboard</h1>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>User ID</th>
                    <th>Gold</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in leaderboard" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.gold }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

import AppHeader from '@/components/Shared/AppHeader.vue';
export default {
    name: "leaderboard",
    components: {
        AppHeader,
    },
    data() {
        return {
            leaderboard: []
        };
    },
    created() {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, orderBy('gold', 'desc'));

        onSnapshot(q, (querySnapshot) => {
            const leaderboard = [];
            querySnapshot.forEach((doc) => {
                leaderboard.push({ id: doc.id, ...doc.data() });
            });
            this.leaderboard = leaderboard;
        });
    }
};
</script>