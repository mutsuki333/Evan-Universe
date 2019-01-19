<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <HomeContent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HomeContent from '@/components/HomePage/HomeContent.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    HomeContent
  }
}
</script>
