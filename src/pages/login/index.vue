<template>
    <div class="login-root">
        <!-- Block-Element--Modifier-->
        <header>
            <img src="../../static/icons/icon128.png" />
        </header>

        <div class="login__body">
            <h2>Sign in</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
        },
        watch: {
            /* Notice: 写下说明 */
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .login-root {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    header {
        width: 128px;
        height: 128px;
        background-color: #fff;
        border-radius: 50%;
        text-align: center;
        margin-top: 10vh;
        border: 1px solid $basic-border-primary;
    }

    header img {
        width: 88px;
        height: 88px;
        margin-top: 10px;
    }

    .login__body {
        margin-top: 20px;
        width: 148px;
        height: 148px;
        background-color: #fff;
        color: #000;
    }
</style>