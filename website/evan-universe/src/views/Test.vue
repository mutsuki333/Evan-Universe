<template lang="html">
  <div class="Test">
  <button type="button" name="button" @click="anotherHi">HI</button>

  <b-jumbotron header="Bootstrap Vue"
                      lead="Bootstrap 4 Components for Vue.js 2"
         >
           <p>For more information visit our website</p>
           <b-btn variant="primary" href="#">More Info</b-btn>
         </b-jumbotron>

  </div>
</template>

<script>
// import axios from 'axios'

import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'Test',
  computed: {
    ...mapGetters('UserCtl',[
      'user',
      'AuthenticatedType'
    ])

  },
  methods: {
    ...mapActions('UserCtl',[
    'login',
    'logout',
    'register',
    'sayhi'
  ]),
  anotherHi(){console.log(this.AuthenticatedType)}
  },
  mounted:function(){
    this.$nextTick(()=>{
      this.login({
        email:"evanchen333@gmail.com",
        password:"admin333",
        // real_name:"陳逸帆",
        // name:"mutsuki333"
      })
      // .then(c=>console.log(c))
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
