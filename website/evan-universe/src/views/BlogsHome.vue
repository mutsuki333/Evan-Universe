<template lang="html">
  <div class="">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name:'BlogsHome',
  data:()=>({
    sheet:{}
  }),
  methods:{
    ...mapActions('System',[
      'loadsheet'
    ])
  },
  beforeMount: function(){
    this.loadsheet('Blogs')
    .then(sheet => this.sheet=sheet)
  }
}
</script>

<style lang="scss" scoped>
.blogsSearch{
  max-width: 70rem;
}
</style>
