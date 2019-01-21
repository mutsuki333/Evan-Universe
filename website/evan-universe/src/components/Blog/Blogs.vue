<template lang="html">
  <b-container class="Blog pb-5" fluid>
    <b-card
      title="start"
      bg-variant="secondary"
      text-variant="white">
    </b-card>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'

import Chip from '@/components/SmallComponents/Chip.vue'
import Etextarea from '@/components/Etextarea.vue'

//test
import axios from 'axios'

export default {
  name:'Blog',
  components:{
    VueMarkdown,
    Chip,
    Etextarea
  },
  props: ['Bid'],
  data:()=>({
    sheet:{},
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType',
      'user'
    ]),
    ...mapGetters('System',[

    ]),
    ...mapGetters('BlogCtl',[
      'blog'
    ]),
  },
  methods:{
    ...mapActions('System',[
      'loadsheet',
      'addNote',
      'highlight'
    ]),
    ...mapActions('BlogCtl',[
      'loadBlogs',
    ]),

  },
  beforeMount:function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
    this.loadBlogs('ss')
  },
  updated:function(){
    this.highlight();
  }
}
</script>

<style lang="scss" scoped>
.Blog{
  text-align: left;
  max-width: 60rem;
}
.blog-footer{
  font-size: 0.5rem;
}
.s{
  font-size: 0.4rem;
}
.in::placeholder{
  font-size: 0.4rem;
}
.in{
  input{
    background-color: LightGray;
  }
}
</style>
