<template lang="html">
  <div class="Blog">
    <button type="button" @click="sub">SUBB</button>
    <!-- <div v-for="i in test"> -->
      <vue-markdown :source='test' @click.native="testT('d')"></vue-markdown>
      <textarea name="name" rows="3" :cols="co" v-model="test"></textarea>
      <!-- <b-form-input v-show="true" v-model="test"></b-form-input> -->
    <!-- </div> -->

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

//test
import axios from 'axios'

export default {
  name:'Blog',
  components:{
    VueMarkdown
  },
  data:()=>({
    test:'',
    co:80

  }),
  methods:{
    testT(tt){
      this.co++;
      console.log(tt);
    },
    sub(){
      axios.post('/blog/testI',{
        'content':this.test
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Blog{
  text-align: left;
}
textarea{
  // overflow: auto;
  overflow: scroll;
}
</style>
