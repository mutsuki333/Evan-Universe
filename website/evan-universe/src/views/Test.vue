<template lang="html">
  <div class="Test">
  <button type="button" name="button" @click="anotherHi">HI</button>
  <md-card>
      <md-card-media>
        <img src="../assets/logo.png" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">Title goes here</div>
        <div class="md-subhead">Subtitle here</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button @click.native="checkState">Action</md-button>
            <md-button>Action</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button class="md-icon-button" @click.native="sayhi">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>


  </div>
</template>

<script>
import Vue from 'vue'
import { MdCard, MdButton, MdIcon } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
// import axios from 'axios'

import { mapGetters, mapActions } from 'vuex'

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdIcon)

export default {
  name: 'Test',
  computed: {
    ...mapGetters('login',[
      'user',
      'AuthenticatedType'
    ])

  },
  methods: {
    ...mapActions('login',[
    'checkState',
    'login',
    'logout',
    'register',
    'sayhi'
  ]),
  anotherHi(){console.log(this.AuthenticatedType)}
  },
  created:function(){this.checkState()},
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

.card-expansion {
    height: 480px;
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
