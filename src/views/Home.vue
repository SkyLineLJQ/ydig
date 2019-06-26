<template>
  <div class="home">
    <img alt="Vue logo" :src="url">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Logo from '../assets/logo.png'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      url: Logo
    }
  }
}
</script>
