import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import VueCarousel from 'vue-carousel';


Vue.use(VueCarousel);
Vue.use(SuiVue);


new Vue({
  el: '#app',
  render: h => h(App)
})
