<template lang="html">
  <b-container class="Blogs pb-5 px-0 px-sm-1" fluid v-show="!refresh">
    <b-navbar
      class="rounded blogsSearch mx-auto mt-1 py-0"
      type="dark" variant="info" >
      <b-navbar-brand href="#">Blogs</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mr-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-dropdown size="sm" split :text="selected" class="m-2">
              <b-dropdown-item-button
                  v-for="t in type"
                  @click="selected=t">{{t}}</b-dropdown-item-button>
            </b-dropdown>
            <b-button size="sm" class="my-2 my-sm-0" type="button">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/post">{{sheet.post}}</b-nav-item>
        </b-navbar-nav>

      </b-navbar>

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
                  class="nametag py-0 p-0 border-0"
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

        <!-- <b-carousel id="carousel1"
              controls
              indicators
              background="#ababab"
              :interval="4000"
              v-if="hasImg(blog)"
              >
          <b-carousel-slide v-for="img in blog.imgs">
            <img slot="img" :src="img" fluid thumbnail />
          </b-carousel-slide>
        </b-carousel> -->

      </b-container>

      <!-- <div slot="footer" class="s">
        <b-row>
          <b-col>
            <b-btn class=""
                   size="lg"
                   variant="link"
                   @click="extend[blog.post]=true">
                   ...
            </b-btn>
          </b-col>

          <b-col>
            <div class="d-flex justify-content-end">
            <b-btn
                   size="sm"
                   variant="link"
                   :to="`/blog/${blog.id}`">
                   comment
            </b-btn>
            </div>
          </b-col>
        </b-row>
      </div> -->

    </b-card>

    <div class="loader mx-auto mt-4" v-if="load"></div>
    <div v-if="noResult" class="pt-5 d-flex justify-content-center">
      <h1>{{sheet.noResult}}</h1>
    </div>
    <p v-if="end" class="d-flex justify-content-center">End</p>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment-timezone'

import Chip from '@/components/SmallComponents/Chip.vue'
import { imgs, blogContentFilter } from '@/rules'

//test
import axios from 'axios'

export default {
  name:'Blogs',
  components:{
    VueMarkdown,
    Chip
  },
  watch: {
    $route: {
       handler() {
         this.end=false;
         this.refresh=true;
         this.load_blogs();
         setTimeout(()=>this.refresh=false,200)
       },
    }
  },
  props: {
    tag:{
      default:undefined
    },
    keyword:{
      default:undefined
    }
  },
  data:()=>({
    sheet:{},
    type:[],
    selected:'',
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
    blogContentFilter(str){
      return blogContentFilter(str)
    },
    hasImg(blog){
        // console.log('has');
        if(blog.imgs==undefined)return false;
        if(blog.imgs.length==0)return false;
        return true;
    },
    load_blogs(){
      this.params={isEmpty:true}
      this.load=true;
      if(this.tag){this.params.tag=this.tag;this.params.isEmpty=false;}
      if(this.keyword){this.params.keyword=this.keyword;this.params.isEmpty=false;}
      this.loadBlogs(
        this.params
      ).then(()=>{
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
    .then(sheet=>{
      this.sheet=sheet;
      for (let t in sheet.types) {
        this.type.push(sheet.types[t])
      }
      this.selected=this.type[1]
    })
    this.load_blogs()
  },
  updated:function(){
    this.highlight();
  },
  // beforeRouteLeave (to, from, next) {
  //   console.log('leave');
  // }
}

</script>

<style lang="scss" scoped>
.Blogs{
  text-align: left;
  max-width: 60rem;
}

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
