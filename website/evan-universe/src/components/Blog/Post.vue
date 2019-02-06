<template lang="html">
  <b-container fluid class="pt-3 px-0 w-100 pb-5">
    <b-modal v-model="modalShow">
      {{sheet.leave}}
      <div slot="modal-footer" class="w-100">
        <div class="float-right">
          <b-btn class="m-2" @click='modalShow=!modalShow'>{{sheet.leaveN}}</b-btn>
          <b-btn variant="primary" @click='next'>{{sheet.leaveY}}</b-btn>
        </div>
      </div>
    </b-modal>
    <b-card
      align="left"
      class="post-area mx-auto "
      bg-variant="light">
      <b-form-group horizontal
        :label-cols="2"
        :label="sheet.title"
        label-class="text-sm-center"
        label-for="title">
        <b-form-input
          class="col-sm-11"
          v-model="blog.title"
          :state='titleV'
          :placeholder='sheet.titleP'
          id="title">
        </b-form-input>
      </b-form-group>
      <b-form-group horizontal
        :label-cols="2"
        :label="sheet.subtitle"
        label-class="text-sm-center"
        label-for="subtitle">
        <b-form-input
          class="col-sm-11"
          v-model="blog.subtitle"
          :placeholder='sheet.subtitleP'
          id="subtitle">
        </b-form-input>
      </b-form-group>

      <b-input-group :prepend="sheet.tags"
        v-bind:class="{ 'shake-effect': tagErr }"
        class="border rounded"
        style="background-color:white">
        <label for="tagInput" ></label>
          <span v-for="tag in blog.tags">
            <chip @click="removeTag(tag)">{{tag}}</chip>
          </span>
        <input
          type="text"
          class="form-control pl-1 no-focus border-left-0"
          id="tagInput"
          :placeholder='tagP'
          @keydown="addTag">
      </b-input-group>

      <div class="text-sm-left mx-2">
        <label for="content">{{sheet.content}}</label>
        <router-link class="float-right" to="/mdtutorial">{{sheet.mdtutorial}}</router-link>
        <b-tabs>
          <b-tab title="edit" active>
            <Etextarea id="content" v-model="blog.content" rows=15 />
          </b-tab>
          <b-tab title="preview" @click="showPre()">
            <vue-markdown
              class="markdown-preview"
              :source='mdpre'
              @rendered='highlight()'
            />
          </b-tab>
        </b-tabs>
      </div>
      <div class="pt-4">
        <b-btn class="mx-2 btn-danger" to='/home'>{{sheet.cancel}}</b-btn>
        <b-btn class="mx-2 float-right btn-success" @click="post()">{{sheet.post}}</b-btn>
        <b-btn class="mx-2 float-right" @click="cookie()">{{sheet.cookie}}</b-btn>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import VueMarkdown from 'vue-markdown'

import Etextarea from '@/components/Etextarea.vue'
import Chip from '@/components/SmallComponents/Chip.vue'
import { filterText } from '@/rules'

export default {
  name:'Post',
  components:{
    Etextarea,
    VueMarkdown,
    Chip
  },
  data:()=>({
    sheet:{},
    blog:{
      title:'',subtitle:'',tags:[],content:''
    },
    tagErr:false,titleV:null,
    tagP:'',
    modalShow:false,next:'',shouldConfirm:true,
    mdpre:''
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType'
    ]),
    ...mapGetters('System',[
      'routeBack'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
    ]),
    ...mapActions('System',[
      'loadsheet',
      'setRouteBack',
      'highlight',
      'addNote',
      'scrollToTop'
    ]),
    ...mapActions('BlogCtl',[
      'postBlog',
    ]),
    addTag(e){
      if (e.keyCode===13 || e.keyCode===9) {
        let tags=e.target.value.split(/[\'\"\.\,\s]+/);
        let hasErr=false;
        for(let i in tags){
          let err=false;
          if (tags[i]=='')continue;
          for (let j in this.blog.tags) {
            if (this.blog.tags[j]==tags[i]) {
              err=hasErr=true;
              break;
            }
          }
          if(!err)this.blog.tags.push(tags[i])
        }
        if(hasErr){
          this.tagErr=true;
          setTimeout(()=>this.tagErr=false,500)
          this.tagP=this.sheet.tagP_err
        }
        else this.tagP=this.sheet.tagP;

        e.target.value=''
        e.preventDefault();
      }
      if (e.keyCode===8 && e.target.value=='' && this.blog.tags.length>=1){
        this.blog.tags.splice(this.blog.tags.length-1,1)
      }
    },
    removeTag(tag){
      for (let i in this.blog.tags) {
        if (this.blog.tags[i]==tag) {
          this.blog.tags.splice(i,1)
        }
      }
    },
    Valid(){
      if(this.blog.title===''){this.titleV=false;return false}
      if(this.blog.content.length<=50){
        this.addNote(this.sheet.nocontent);
        return false;
      }
      return true
    },
    post(){
      if(this.Valid()){
        this.postBlog(this.blog)
        .then((res) => {
          Cookies.remove('posttmp')
          this.addNote(this.sheet.postmsg)
          this.shouldConfirm=false;
          this.$router.push(`/blog/${res}`)
        })
        .catch((err) => {console.log(err);})
      }
      else this.scrollToTop()
    },
    cookie(){
      Cookies.set('posttmp',this.blog);
      this.addNote(this.sheet.cookiemsg);
      this.shouldConfirm=false;
      this.$router.go(-1);
    },
    showPre(){
      this.mdpre=filterText(this.blog.content)[0]
    },
    test(){
      console.log(JSON.stringify(this.blog));
    }
  },
  beforeMount: function(){
    this.loadsheet(this.$options.name)
    .then(sheet => {
      this.sheet=sheet;
      this.blog.content=this.sheet.contentDefault;
      this.tagP=this.sheet.tagP;
      if(Cookies.getJSON('posttmp'))this.blog=Cookies.getJSON('posttmp');
    })
    this.reload()
    .then((res) => {
      if(res === 'unauthorized'){
        this.setRouteBack(this.$route.path)
        this.$router.push('/auth/login')
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if(this.AuthenticatedType==='unauthorized')next()
    if(this.shouldConfirm){
      this.modalShow=true;
      this.next=next;
    }
    else next()
    // let that = this
    // new Promise(function(resolve, reject) {
    //   that.modalShow=true;
    // }).then(()=>next())
    // if (answer) {
    //   next()
    // } else {
    //   next(false)
    // }
  }
}
</script>

<style lang="scss" scoped>
.post-area{
  max-width: 55rem;
}
.no-focus:focus{
  outline: none;
  box-shadow: none;
  border-color: inherit;
  -webkit-box-shadow: none;
}

</style>
