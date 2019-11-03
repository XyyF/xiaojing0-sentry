import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.onload = () => {
  const instance = new Vue(App).$mount()
    document.querySelector('body').appendChild(instance.$el)
}
