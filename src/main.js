import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import {Carousel, Slide} from 'vue-carousel';

Vue.component('carousel', Carousel)
Vue.component('slide', Slide)
Vue.use(SuiVue);


new Vue({
  el: '#app',
  render: h => h(App)
})
