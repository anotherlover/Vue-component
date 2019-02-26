import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import utils from './global/utils'
import iView from 'iview'
import filters from './filter/filter'
import locale from 'iview/dist/locale/en-US'

import './global/installComponents'
import 'iview/dist/styles/iview.css'

Vue.use(iView, { locale })
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
Vue.use(utils)
Vue.use(filters)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
