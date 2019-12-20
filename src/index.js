import Vue from 'vue'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

const instance = new Vue({
    router,
    render: h => h(App),
}).$mount()
window.onload = () => {
    document.querySelector('body').appendChild(instance.$el)
}
