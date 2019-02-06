<template lang="html">
  <div class="" fluid v-show="!refresh">

    <b-card
      :title="blog.subtitle"
      bg-variant="secondary"
      text-variant="white"
      class="my-3"
      v-for="blog in blogs"
      footer-class="blogs-footer border-0 bg-secondary"
      header-class="pb-0">
      <div slot="header">
        <!-- sm -->
        <div class="d-none d-sm-block">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column user-info mb-3">
              <b-btn
                  class=" py-0 p-0 border-0 nametag"
                  variant="s"
                  :to="'/user/'+blog.username">{{blog.username}}</b-btn>
              <b-img-lazy
                  rounded="circle"
                  width="75px" height="75px"
                  :src="blog.pic"/>
            </div>
            <h1>{{blog.title}}</h1>
            <div class="d-flex align-items-end">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-end">
                  <chip :to='`/blogs/tags/${tag}`' active
                        noIcon lightBlue
                        v-for="tag in blog.tags" :value='tag' />
                </div>
                <div class="d-flex justify-content-end s">{{blog.post|date}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- xs -->
        <div class="d-block d-sm-none">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row">
              <div class="d-flex flex-column user-info mb-3">
                <b-btn
                    class="nametag py-0 p-0 border-0"
                    variant="s"
                    :to="'/user/'+blog.username">{{blog.username}}</b-btn>
                <b-img-lazy
                    rounded="circle"
                    width="75px" height="75px"
                    :src="blog.pic"/>
              </div>
              <div class="pl-2 pt-3">
                <chip :to='`/blogs/tags/${tag}`'
                    active noIcon lightBlue
                    v-for="tag in blog.tags" :value='tag' />
              </div>
            </div>
            <h1>{{blog.title}}</h1>
            <div class="d-flex align-items-end justify-content-end s">{{blog.post|date}}</div>
          </div>
        </div>

      </div>

      <b-container class="rounded bg-light text-dark" :to="`/blog/${blog.id}`">
        <vue-markdown
            class="preview limit"
        >{{blog.content}}</vue-markdown>
        <div class="d-flex justify-content-end">
          <b-btn
                 size="sm"
                 variant="link"
                 :to="`/blog/${blog.id}`">
                 {{sheet.more}}
          </b-btn>
        </div>
      </b-container>
    </b-card>


    <div class="loader mx-auto mt-4" v-if="load"></div>
    <div v-if="noResult" class="pt-5 d-flex justify-content-center">
      <h1>{{sheet.noResult}}</h1>
    </div>
    <p v-if="end" class="d-flex justify-content-center">End</p>

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'

import Chip from '@/components/SmallComponents/Chip.vue'

export default {
  name:'UserBlogs',
  components:{
    VueMarkdown,
    Chip
  },
  props:['test','username'],
  data:()=>({
    sheet:{},
    params:{isEmpty:true},
    load:true,
    noResult:false,
    refresh:false,
    end:false
  }),
  computed:{
    ...mapGetters('System',[

    ]),
    ...mapGetters('BlogCtl',[
      'blogs'
    ]),
  },
  methods:{
    ...mapActions('System',[
      'loadsheet',
      'highlight',
      'scrollToTop'
    ]),
    ...mapActions('BlogCtl',[
      'loadBlogs',
    ]),
    load_blogs(){
      this.params={isEmpty:false}
      this.params.username=this.username
      this.load=true;
      if(this.tag){this.params.tag=this.tag;this.params.isEmpty=false;}
      if(this.keyword){this.params.keyword=this.keyword;this.params.isEmpty=false;}
      this.loadBlogs(
        this.params
      ).then(()=>{
        // console.log(this.blogs);
        if(this.blogs.length==0)
          setTimeout(()=>{
            this.load=false;
            if(this.blogs.length==0)this.noResult=true;
          },1000)
        else this.load=false;
      })
    }
  },
  created(){
    let that = this;
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        if(that.end)return
        console.log('end');
        that.load=true;
        that.params.timeStmp=that.blogs[that.blogs.length-1].last_update;
        that.params.isEmpty=false;
        that.loadBlogs(that.params).then((res)=>{
          if(res=='end')that.end=true;
          that.load=false;
        })
      }
    };
  },
  beforeMount:function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
    this.load_blogs()
  },
  updated:function(){
    this.highlight();
  },
}
</script>

<style lang="scss" scoped>
.preview{
  img{
    max-width: 100%;
    height: auto;
  }
}
.limit{
  max-height: 20rem;
  overflow: hidden;

}

.blogs-footer{
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
.nametag{
  max-width: 75px;
  font-size: 0.5rem;
  border-radius: 15px;
  background-color: white;
  color: blue;
  font-weight: bold;
}
.user-info{
  max-width: 75px;
  border-radius: 5px;
  background-color: white;
}

.loader {
  z-index: 1;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
