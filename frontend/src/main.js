// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'
import VueClipboard from 'vue-clipboard2'
import 'muse-ui/dist/muse-ui.css'

// Muse
Vue.use(MuseUI)

// Clipboard
Vue.use(VueClipboard)

// Endpoint config
Vue.prototype.$endpoints = {
  streams: 'http://localhost:3000/api/streams',
  liveStreams: 'http://localhost:3000/api/streams/live'
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
