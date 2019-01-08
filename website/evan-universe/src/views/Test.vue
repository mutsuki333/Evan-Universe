<template lang="html">
  <div class="Test">
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
            <md-button>Action</md-button>
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

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdIcon)

export default {
  name: 'Test',
  methods:{
    sayhi:function(){
      alert('HI');
    }
  },
  mounted:function(){
    this.$nextTick(()=>{
      console.log('dad');
      // axios
      // .get('http://54.71.220.94/EU/site/')
      // .then((response) => {console.log(response);})
      // .catch((err) => {console.log(err);})
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
