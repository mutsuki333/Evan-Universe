<template lang="html">
  <div class="notfound">
    <h1>Page not found, <br>will redirect to home page in {{time}}</h1><br>
    <md-button>back to home</md-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdButton)

export default {
  name: 'notfound',
  data(){
    return {time:1}
  },
  methods:{
    goto(){
      console.log("a");
    }
  },
  mounted:function(){
    this.$nextTick(()=>{let timer=setInterval(()=>{
      this.time-=1;
      if(this.time<=0){
        clearInterval(timer);
        // console.log(this.$router);
        this.$router.push('/home')
      }
    },1000)})
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
