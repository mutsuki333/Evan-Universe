<template lang="html">
  <b-container class="MDTutorial pt-5 px-0">
    <b-btn v-b-toggle.toc class="m-1 mb-3">Table of contents</b-btn>
    <b-collapse id="toc" class="mt-2">
    </b-collapse>
    <b-row>
        <b-col class="d-none d-md-block">
          <Etextarea rows="235" v-model="sheet.mdtext"></Etextarea>
        </b-col>
        <b-col>
          <b-container fluid>
            <vue-markdown
              class="markdown-preview"
              :source='sheet.mdtext'
              :toc='true'
              toc-id="toc"
              @rendered='highlight()'
              :prerender="Mention()"
            />
          </b-container>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapActions } from 'vuex'
import { filterText } from '@/rules'

import Etextarea from '@/components/Etextarea.vue'

// import Prism from 'prismjs';

export default {
  name:'MDTutorial',
  components:{
    VueMarkdown,
    Etextarea
  },
  data:()=>({
    sheet:{}
  }),
  methods:{
    ...mapActions('System',[
      'loadsheet',
      'highlight',
      'setRouteBack',
      'filterMention'
    ]),
    Mention(){
      return (str)=>{
        return filterText(str)[0]
      }
    },
    test(evt){
      console.log(evt);
      // this.highlight()
      // console.log(this.sheet.mdtext);
    }
  },
  beforeMount: function(){
    this.loadsheet(this.$options.name)
    .then(sheet => this.sheet=sheet)
  },
  updated:function(){
    this.highlight();
  }
}
</script>

<style lang="scss" scoped>
textarea{
  overflow: auto;
  border: 2px solid;
}
#toc{
  text-align: left;
}
</style>
