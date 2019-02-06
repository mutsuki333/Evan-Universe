<template lang="html">
  <div class="HomeContent mx-auto pt-5">
    <b-jumbotron>
      <template slot="header">
        {{sheet.title}}
      </template>
      <template slot="lead">
        {{sheet.lead}}
      </template>
      <hr class="my-4">
      <p>
        {{sheet.content}}
      </p>
      <b-btn variant="primary" to="/games" class="mr-5">Games</b-btn>
      <b-btn variant="success" to="/blogs/home">Blogs</b-btn>
    </b-jumbotron>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name:'HomeContent',
  data:()=>({
    sheet:{}
  }),
  methods:{
    ...mapActions('System',[
      'loadsheet',
    ])
  },
  created: function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
  }
}
</script>

<style lang="scss" scoped>
.HomeContent{
  max-width: 55rem;
}
</style>
