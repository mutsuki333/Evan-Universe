<template lang="html">
  <!-- <div class="Etextarea"> -->
    <b-textarea
      class="Etextarea"
      id="text-area"
      :rows='rows'
      v-model='localValue'
      @keydown.native="escapeTab"
      @drop.native.prevent="drop"
      @paste.native="paste"
      @input="$emit('input', localValue)"
      @change="highlight()"
      :no-resize='true'></b-textarea>
  <!-- </div> -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name:'Etextarea',
  props: {
    value:{
      default:''
    },
    rows:{
      default:0
    }
  },
  data(){
		return {
			localValue:this.value
		}
	},
  watch:{
		value(){
			this.localValue = this.value
		}
	},
  methods:{
    ...mapActions('System',[
      'loadsheet',
      'uploadIMG',
      'highlight'
    ]),
    drop(e){
      let files = e.dataTransfer.files
      let name=e.dataTransfer.files[0].name;
      if (files.length > 0) {
        let formData = new FormData()
        for (var file of files) {
          if (file.type.match('image.*')) {
            formData.append('file', file)
          }
        }
        if (formData.has('file')) {
          this.uploadIMG(formData)
          .then(res=>{
            let val = e.target.value,
                start = e.target.selectionStart,
                end = e.target.selectionEnd;
            e.target.value = val.substring(0, start) +
            `![${name}](${res})\n`
            + val.substring(end);

            e.target.selectionStart = e.target.selectionEnd = start;
          })
        }
      }
    },
    paste(e){
      let items = e.clipboardData.items
      let formData = new FormData()
      let name = e.clipboardData.getData("text")
      for (let item of items) {
        if (item.type.match('image.*')) {
          formData.append('file', item.getAsFile())
        }
      }
      if (formData.has('file')) {
        e.preventDefault();
        this.uploadIMG(formData)
        .then(res=>{
          let val = e.target.value,
              start = e.target.selectionStart,
              end = e.target.selectionEnd;
          e.target.value = val.substring(0, start) +
          `![${name}](${res})\n`
          + val.substring(end);

          e.target.selectionStart = e.target.selectionEnd = start;
        })
      }
    },
    escapeTab(e) {
      // console.log(e);
      // if (e.keyCode ==='Enter') {
      //   if(e.target.rows>=this.rows)e.target.rows+=1;
      // }
      if (e.keyCode === 9) { // tab was pressed

        // get caret position/selection
        var val = e.target.value,
            start = e.target.selectionStart,
            end = e.target.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        e.target.value = val.substring(0, start) + '\t' + val.substring(end);

        // put caret at right position again
        e.target.selectionStart = e.target.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
        return false;
      }
    },
    // auto_grow(element) {
    //   console.log(element);
    //   element.style.height = "5px";
    //   element.style.height = (element.scrollHeight)+"px";
    // }
  },
  created: function(){
    this.localValue=this.value
  }
}
</script>

<style lang="scss" scoped>
.text-area{
  font-size: inherit;
}
</style>
