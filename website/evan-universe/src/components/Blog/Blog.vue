<template lang="html">
  <div class="Blog">
    <div v-if="loading" class="loader"></div>
    <b-container v-else class="blog pb-5" fluid>
      <b-card
        :title="blog.username"
        bg-variant="secondary"
        text-variant="white">
        <b-row>
          <b-col sm="2" class="d-none d-sm-block">
            <b-card-img :src="blog.pic"alt="Image" />
            <b-link :to="'/user/home/'+blog.username" class="text-light mx-auto">{{sheet.profile}}</b-link>
          </b-col>
          <b-col>
            <b-card :sub-title="blog.subtitle"
                    text-variant="dark"
                    footer-class="p-0">
                    <div slot="header">
                      <b-row>
                        <b-col class="d-block d-sm-none">
                          <b-card-img :src="blog.pic"alt="Image" />
                          <b-link :to="'/user/home/'+blog.username" class="text-black">{{sheet.profile}}</b-link>
                        </b-col>
                        <b-col>
                          <span class="text-capitalize">{{blog.title}}</span>
                          <p class="s m-0 d-block">{{sheet.postT}}{{blog.post | date}}</p>
                        </b-col>
                      </b-row>
                      <div class="float-right">
                        <span v-for="tag in blog.tags">
                          <chip :href='`/blogs/tags/${tag}`' active noIcon :value='tag' />
                        </span>
                      </div>
                    </div>
                    <div class="border mb-5"></div>
                    <vue-markdown :source="blog.content" class="markdown-preview"/>
                    <div class="blog-footer" slot="footer">
                      <div class="float-right pt-2">
                        <p>{{sheet.last}}{{blog.last_update | fromNow}}</p>
                      </div>
                    </div>
            </b-card>
          </b-col>
        </b-row>
        <div class="pt-3" v-for="comment in blog.comments">
          <b-row>
            <b-col class="pl-sm-1 d-none d-sm-block" sm="2">
              <b-card text-variant="dark"
                header-class="p-0 m-0"
                :img-src="comment.pic"
                img-bottom
                no-body
                overlay>
                <div slot="header">
                  <b-link :to="'/user/home/'+comment.username"
                      style="white-space: nowrap;"
                      class="border border-primary rounded-pill ml-0 px-2">
                      {{comment.username}}
                  </b-link>
                </div>
              </b-card>
            </b-col>
            <b-col class="pl-sm-0" sm="10">
              <b-container class="bg-light text-dark rounded">
                <b-link :to="'/user/home/'+comment.username"
                    class="d-block d-sm-none border border-primary rounded-pill ml-0 px-2">
                    {{comment.username}}
                </b-link>
                <b-row>
                  <b-col cols="3" class="p-0 d-block d-sm-none bg-gray">
                      <b-img-lazy :src="comment.pic" rounded="circle" fluid alt="Image" />
                  </b-col>
                  <b-col>
                    <vue-markdown class="pt-3 markdown-preview" :source="comment.content" />
                    <span class="s float-right">{{comment.date | fromNow}}</span>
                  </b-col>
                </b-row>
              </b-container>
              <div class="px-0 pt-2" v-for="reply in comment.replys">
                <b-row>
                  <b-col sm="9" offset-sm="3" offset="4" cols="8">
                    <b-container class="bg-gray text-dark rounded pl-1">
                      <div>
                        <span>
                          <b-link :to="'/user/home/'+reply.username"
                              class="border border-primary rounded-pill px-2">
                              {{reply.username}}
                          </b-link>
                          <span class="d-block d-sm-none w-100 s">{{reply.date | fromNow}}</span>
                          <span class="d-none d-sm-block float-right m-0 p-0 s">{{reply.date | fromNow}}</span>
                        </span>
                        <vue-markdown :source="reply.content" class="markdown-preview" />
                      </div>
                    </b-container>
                  </b-col>
                </b-row>
              </div>
              <div class="pt-1">
                <b-row>
                  <b-col sm="9" offset-sm="3" cols="8" offset="4">
                    <b-btn
                        class="float-right border-white rounded-pill"
                        size='sm' v-if="!repShow[comment.date]"
                        @click="repShow[comment.date]=!repShow[comment.date]">{{sheet.replybtn}}
                    </b-btn>
                    <b-collapse id="collapse" v-model="repShow[comment.date]">
                    <Etextarea
                        :placeholder="sheet.reply+comment.username"
                        class="border border-info in"
                        v-model="repInput[comment.date]"
                        @focusout.native="repOut(comment.date)" />
                    <b-btn class="btn-success float-right"
                          size="sm"
                          v-bind:class="{'d-none':!repInput[comment.date]}"
                          @click="sendReply(comment.date)">
                          {{sheet.send}}
                    </b-btn>
                    </b-collapse>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="pt-5">
          <Etextarea rows="5" :placeholder="sheet.leaveComment" v-model='comment'></Etextarea>
          <b-btn class="btn-success float-right mt-1" @click="sendComment()">{{sheet.send}}</b-btn>
        </div>

      </b-card>
    </b-container>
  </div>

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
    comment:'',
    repInput:{},
    repShow:{},
    loading:true
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
      'loadBlog',
      'AddComment',
      'AddReply'
    ]),
    sendComment(){
      if(this.comment==''){
        this.addNote(this.sheet.commentErr)
      }
      else{
        this.AddComment({'Bid':this.Bid,'content':this.comment})
        .then(() => this.comment='').catch(err=>console.log(err))
      }
    },
    sendReply(index){
      if(this.repInput[index]==''){
        this.addNote(this.sheet.replyErr)
      }
      else{
        this.AddReply({'Bid':this.Bid,'content':this.repInput[index],'IdDate':index})
        .then(() => {
          this.repInput[index]=''
          this.repShow[index]=false;
        })
        .catch(err=>console.log(err))
      }
    },
    repOut(index){
      if(this.repInput[index].length<1)
        this.repShow[index]=false
    }
  },
  beforeMount:function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
    this.loadBlog(this.Bid).then(()=>this.loading=false)
  },
  updated:function(){
    this.highlight();
  }
}
</script>

<style lang="scss" scoped>
.blog{
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
.loader {
  position: absolute;
  left: 52%;
  top: 50%;
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
