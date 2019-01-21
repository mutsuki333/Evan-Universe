<template lang="html">
  <b-container>
    <h1>Welcome to {{username}}'s home'</h1>
  </b-container>
</template>

<script>
export default {
  name:'UserHome',
  props:['username']
}
</script>

<style lang="scss" scoped>
</style>
