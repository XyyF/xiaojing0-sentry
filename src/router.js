import Vue from 'vue'
import Router from 'vue-router'

import Login from './pages/login/index'
import Bugs from './pages/bugs/index'

Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {path: '', redirect: {name: RouteNamesChain.Login}},
        {path: 'login', name: RouteNamesChain.Login, component: Login},
        {path: 'bugs', name: RouteNamesChain.Bugs, component: Bugs},
    ]
});
