<template lang="html">
  <b-container class="Blog" fluid>
    <b-card
      :title="blog.username"
      bg-variant="secondary"
      text-variant="white">
      <b-row>
        <b-col sm="2">
          <b-card-img :src="blog.pic"alt="Image" />


        </b-col>
        <b-col>
          <b-card :sub-title="blog.subtitle"
                  text-variant="dark">
                  <div slot="header">
                    {{blog.title}}
                    <div class="float-right" v-for="tag in blog.tags">
                      <chip noIcon :value='tag' />
                    </div>
                  </div>
                  <div class="border mb-5"></div>
                  <vue-markdown :source="blog.content" class=""/>
                  <div class="blog-footer" slot="footer">
                    <div class="float-right">
                      <p>{{blog.post}}</p>
                    </div>
                  </div>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'

import Chip from '@/components/SmallComponents/Chip.vue'

//test
import axios from 'axios'

export default {
  name:'Blog',
  components:{
    VueMarkdown,
    Chip
  },
  props: ['id'],
  data:()=>({
    test:'',

  }),
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType',
      'user'
    ]),
    ...mapGetters('system',[

    ]),
    ...mapGetters('BlogCtl',[
      'blog'
    ]),
  },
  methods:{
    ...mapActions('system',[
      'loadsheet',
      'setNote'
    ]),
    ...mapActions('BlogCtl',[
      'loadBlog'
    ]),
  },
  beforeMount:function(){
    this.loadBlog(this.id)
    .then(()=>{
      console.log(this.blog.post);
    })

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
</style>
