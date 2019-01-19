<template lang="html">
  <div class="UserPage">
    <h1>Hello {{user.name}}</h1><br>
    <router-view/>
    <button type="button" name="logout" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'UserPage',
  computed:{
    ...mapGetters('UserCtl',[
      'user',
      'AuthenticatedType'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'sayhi',
      'logout',
      'reload'
    ]),
    ...mapActions('System',[
      'setRouteBack'
    ])
  },
  beforeMount: function(){
    this.reload()
    .then((res) => {
      if(res==='unauthorized'){
        this.setRouteBack(this.$route.path);
        this.$router.push('/auth/login')
      }
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
