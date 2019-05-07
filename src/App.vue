<template>
  <div id="app">
    <StarwarsContainer />
  </div>
</template>

<script>

import StarwarsContainer from './components/StarwarsContainer.vue';
import Elementui from './components/Elementui.vue';

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    StarwarsContainer,
    Elementui
  }
}
</script>

<style>

</style>
