<template>
    <div>
        <app-header :title="'Rise Of The Kingdom'" :subtitle="'Add Quest'"></app-header>

        <form class="home-container" @submit.prevent="handleSubmit">
            <div class="input-container">
                <h3 class="title">Title</h3>
                <input type="text" v-model="form.title">
            </div>
            <div class="input-container">
                <h3 class="title">Description</h3>
                <input type="text" v-model="form.description">
            </div>
            <div class="input-container">
                <h3 class="title">Reward</h3>
                <input type="number" v-model="form.reward">
            </div>

            <div class="input-container">
                <h3 class="title">Difficulty</h3>

                <div class="difficulty">
                    <div class="difficulty-item" @click="form.difficulty = 1"
                        :class="{ 'selected': form.difficulty == 1 }">
                        <img src="@/assets/easy.svg" alt="attack-icon">
                    </div>
                    <div class="difficulty-item" @click="form.difficulty = 2"
                        :class="{ 'selected': form.difficulty == 2 }">
                        <img src="@/assets/medium.svg" alt="quest-center-icon">

                    </div>
                    <div class="difficulty-item" @click="form.difficulty = 3"
                        :class="{ 'selected': form.difficulty == 3 }">
                        <img src="@/assets/hard.svg" alt="my-quest-icon">
                    </div>
                </div>
            </div>

            <div class="input-container">
                <h3 class="title">Category</h3>

                <div class="difficulty">
                    <div class="difficulty-item" @click="form.category = 'physical'"
                        :class="{ 'selected': form.category == 'physical' }">
                        <img src="@/assets/attack-icon.svg" alt="attack-icon">
                    </div>
                    <div class="difficulty-item" @click="form.category = 'social'"
                        :class="{ 'selected': form.category == 'social' }">
                        <img src="@/assets/defend-icon.svg" alt="quest-center-icon">

                    </div>
                    <div class="difficulty-item" @click="form.category = 'spiritual'"
                        :class="{ 'selected': form.category == 'spiritual' }">
                        <img src="@/assets/heal-icon.svg" alt="my-quest-icon">
                    </div>
                </div>
            </div>



            <div class="submit-container">
                <button type="submit" :disabled="!isFormValid"
                    :class="{ 'disabled': !isFormValid }">SUBMIT</button>
            </div>

        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { collection, getFirestore, onSnapshot, doc, updateDoc, increment,addDoc } from 'firebase/firestore';
import AppHeader from '@/components/Shared/AppHeader.vue';

export default {
    name: "add-quest-view",
    computed: {
        ...mapGetters(['getUser']),
        isFormValid() {
            return (
                this.form.title &&
                this.form.description &&
                this.form.difficulty &&
                this.form.category &&
                this.form.reward !== null
            );
        }
    },
    components: {
        AppHeader,
    },
    data() {
        return {
            form: {
                title: '',
                description: '',
                difficulty: 0,
                category:'',
                reward: null,
            },
        };
    },
    mounted() { },
    methods: {
        async handleSubmit() {
            try {
                const db = getFirestore();
                await addDoc(collection(db, 'quests'), {
                    title: this.form.title,
                    description: this.form.description,
                    difficulty: this.form.difficulty,
                    reward: this.form.reward,
                    category:this.form.category,
                    assignedTo: [],
                });
                alert('Quest added successfully!');
                this.resetForm();
            } catch (error) {
                console.error('Error adding quest: ', error);
            }
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

    & .difficulty {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-item {
            padding: 13px;
            cursor: pointer;
        }

        & .selected {
            border: 2px solid #3E8898;
            border-radius: 6px;
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