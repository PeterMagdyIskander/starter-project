<template>
    <button v-for="option in options" :key="option" @click="show(option)" :class="{ active: activeId === option.id }">
        {{ option.name }}
    </button>
</template>

<script>
export default {
    name: "selection-bar",
    data() {
        return {
            activeId: 1,
        }
    },
    props: {
        options: {
            type: Array,
            required: true,
        }
    },
    methods: {
        show(option) {
            this.activeId = option.id;
            this.$emit("selected",option.id)
        }
    },
}
</script>

<style lang="scss" scoped>
button {
    all: unset;
    width: 80px;
    background-color: #444a5c;
    padding: 10px;
    font-family: 'ptmono';
    
}
.active {
    background-color: #162041;
}
</style>