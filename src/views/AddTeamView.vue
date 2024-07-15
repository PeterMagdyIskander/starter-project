<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Add Team'"></app-header>

        <form class="home-container" @submit.prevent="handleSubmit">
            <div class="input-container">
                <h3 class="title">Team Name</h3>
                <input type="text" v-model="form.name">
            </div>
            <div class="submit-container">
                <button type="submit" :disabled="!isFormValid" :class="{ 'disabled': !isFormValid }">SUBMIT</button>
            </div>

        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';

export default {
    name: "add-team-view",
    computed: {
        ...mapGetters(['getUser']),
        isFormValid() {
            return (
                this.form.name
            );
        }
    },
    components: {
        AppHeader,
    },
    data() {
        return {
            form: {
                name: '',
            },
        };
    },
    mounted() { },
    methods: {
        async handleSubmit() {
            try {
                const db = getFirestore();
                const teamRef = doc(db, 'teams', this.form.name);
                await setDoc(teamRef, {
                    gold: 0
                });
                alert('Team added successfully!');
                this.resetForm();
            } catch (error) {
                console.error('Error adding quest: ', error);
            }
        },
        resetForm() {
            this.form.name = '';
        }
    },
}
</script>
<style lang="scss" scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    margin-top: 50px;
}

.input-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    & .title {
        font-family: 'ptmono';
        font-size: 18px;
        color: #E5E5E5;
    }

    input {
        width: 100%;
        height: 50px;
        border: 2px solid #17182d;
        color: #E5E5E5;
        background-color: #252a52;
        border-radius: 6px;
        padding-left: 10px;
        font-family: "ptmono";
        font-size: 32px;

        @media only screen and (max-width: 767px) {
            font-size: 18px;
        }
    }
}

.submit-container {
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 15px;

    button {
        width: 170px;
        padding: 10px;
        background-color: #76bbca;
        border-radius: 6px;
        border: 1px solid #E5E5E5;
        color: #fff;
        font-size: 1.2rem;
        font-family: 'pressstart2p';
        cursor: pointer;
    }

    & .disabled {
        background-color: #3E8898;
        color: #eee;
        cursor: unset;
    }
}
</style>