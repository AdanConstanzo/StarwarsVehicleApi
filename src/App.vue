<template>
  <div id="app">
    <star
        v-for="index in 100" :key="index"
    />
    <StarwarsContainer />
  </div>
</template>

<script>

import StarwarsContainer from './components/StarwarsContainer.vue';
import Star from './components/Star.vue';

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    StarwarsContainer,
    Star,
  }
}
</script>

<style>
  body{
    background-color: black;
  }
</style>
