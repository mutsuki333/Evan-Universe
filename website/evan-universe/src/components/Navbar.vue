<template lang="html">
  <div class="Navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
  </div>

</template>

<script>
export default {
  name:'Navbar'
}
</script>

<style lang="scss" scoped>
.Navbar {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
