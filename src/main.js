import Vue from 'vue'
import App from './App.vue'
window.Vue = Vue;

import Welcome from './components/Welcome.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Welcome
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')