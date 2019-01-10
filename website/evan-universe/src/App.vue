<template>
  <div id="app">
    <Navbar/>
    <b-container fluid>
      <Notifications/>
      <div class="content">
        <router-view/>
      </div>
      <Footer/>
    </b-container>
  </div>
</template>

<script>
import Navbar from  './components/Home/Navbar.vue'
import Notifications from './components/Home/Notifications.vue'
import Footer from './components/Home/Footer.vue'

export default {
  name:'app',
  components:{
    Navbar,
    Notifications,
    Footer
  }
}
</script>

<style lang="scss">
@import 'styles';
</style>
