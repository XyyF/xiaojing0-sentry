<template>
    <div id="sentry">
        <router-view class="page-root"></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'

    Vue.use(VueRouter)

    export default {
        name: 'app',
        components: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    #sentry {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 232px;
        background-color: #fff !important;
        z-index: 2;
        border-right: 1px solid $basic-border-primary;
    }
</style>
