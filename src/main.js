import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from "./Routes"
import VueSession from "vue-session"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueSession)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
