import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueJWT from 'vuejs-jwt'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VueMoment from 'vue-moment'

import App from '@/App'
import vuetify from '@/plugins/vuetify'
import router from './router/index'
import i18n from '@/plugins/i18next'
import store from '@/store'

Vue.config.productionTip = false
Vue.config.performance = false
Vue.use(VueAxios, axios)
Vue.use(VueJWT)
Vue.use(VueTimepicker)
Vue.use(Vuex)
Vue.use(VueMoment)


new Vue({
  vuetify,
  router,
  store,
  i18n: i18n,
  render: h => h(App),
}).$mount('#app')