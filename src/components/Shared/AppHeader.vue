<template>
    <div class="header-container">
        <p class="logo">{{ title }}</p>
        <p class="title">{{ subtitle }}</p>
    </div>
</template>

<script>
export default {
    name: "app-header",
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },

    }
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 150px;
    background-color: #162041;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;

    & .logo {
        font-family: 'pressstart2p';
        color: #f4ee80;
        text-shadow: 1px 2px #a14759;
        font-size: 14px;
    }

    & .title {
        font-family: 'pressstart2p';
        font-size: 18px;

    }
}
</style>