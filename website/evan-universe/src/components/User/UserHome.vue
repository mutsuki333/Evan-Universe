<template lang="html">
  <b-container>
    <h1>Welcome to {{username}}'s home'</h1>
    <h1 v-if="own">Edit</h1>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'UserHome',
  props:{
    username:String
  },
  data:()=>({
    sheet:{}
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'user',
      'own'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
    ]),
    ...mapActions('System',[
      'loadsheet',
      'addNote'
    ])
  },
  created: function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
  }

}
</script>

<style lang="scss" scoped>
</style>
