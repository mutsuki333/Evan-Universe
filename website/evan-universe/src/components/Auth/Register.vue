<template lang="html">
  <div class="Register">
    <h1>{{sheet.register}}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'Register',
  data:()=>({
    sheet:{}
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType'
    ]),
    ...mapGetters('System',[
      'lang'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
      'register'
    ]),
    ...mapActions('System',[
      'loadsheet'
    ])
  },
  created: function(){
    this.loadsheet('Register')
    .then(sheet => this.sheet=sheet)
    this.reload()
    .then((res) => {
      if(res!='unauthorized')
        this.$router.push('/user/home')
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
