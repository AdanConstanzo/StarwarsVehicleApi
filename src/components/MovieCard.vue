<template>
	<slide>
		<sui-image class="Movie" v-bind:src="image" center />
		<p>{{movie}}</p>
	</slide>
</template>


<script>
	import { Slide } from 'vue-carousel';

	
  export default {
      name: 'MovieCard',
      data () {
          return {
					
          }
			},
			props: ['movie', 'image'],
			components: {
				Slide
			},
      methods: {
      }
  }
</script>

<style scoped >
	.Movie{
		width: 100px;
		height: 150px;;
	}
</style>