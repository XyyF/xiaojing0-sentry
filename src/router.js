import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('./pages/login/index'/* webpackChunkName: "sentry_login" */)
const Bugs = () => import('./pages/bugs/index'/* webpackChunkName: "sentry_bugs" */)

Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {path: '', redirect: {name: RouteNamesChain.Login}},
        {path: '/login', name: RouteNamesChain.Login, component: Login},
        {path: '/bugs', name: RouteNamesChain.Bugs, component: Bugs},
    ]
});
