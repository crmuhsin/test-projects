import Vue from 'vue'
import router from './router';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
