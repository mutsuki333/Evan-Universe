<template lang="html">
  <div class="CodeEditor" id="editor1"></div>
</template>

<script>
import brace from 'brace'
import langTools from 'brace/ext/language_tools'

let defaultConfig = {
    value: '',
    width: 500,
    height: 300,
    lang: 'markdown',
    theme: 'monokai',
    readOnly: false,
    fullScreen: false,
    autoCompletion:false,
    tabSize: 2
}
export default {
  name:'CodeEditor',
  props: {
    config: {
      type: Object,
      default() {
          return {};
      }
    },
    input:''
  },
  data () {
    return {
        myConfig: Object.assign({}, defaultConfig, this.config),
        $ace: null,

    }
  },
  watch: {
    config(newVal, oldVal) {
        if (newVal !== oldVal) {
            this.myConfig = Object.assign({}, defaultConfig, newVal);
            this.initAce(this.myConfig)
        }
    }
  },
  methods: {
    initAce (conf) {
      this.$ace = brace.edit(this.$el)
      let session = this.$ace.getSession()
      this.$emit('init', this.$ace)

      import(`brace/mode/${conf.lang}`)
      import(`brace/theme/${conf.theme}`)

      // 代码提示与自动补全
      this.$ace.setOptions({
          enableBasicAutocompletion: conf.autoCompletion,
          enableLiveAutocompletion: conf.autoCompletion
      });
      session.setMode(`ace/mode/${conf.lang}`) // 配置语言
      this.$ace.setTheme(`ace/theme/${conf.theme}`) // 配置主题
      this.$ace.setValue(conf.value, 1) // 设置默认内容
      this.$ace.setReadOnly(conf.readOnly) // 设置是否为只读模式
      session.setTabSize(conf.tabSize) //Tab大小
      session.setUseSoftTabs(true);

      this.$ace.setShowPrintMargin(false) // 不显示打印边距
      session.setUseWrapMode(true) // 自动换行

      this.$ace.setValue(this.input)

      // 绑定输入事件回调
      this.$ace.on('change', ($editor, $fn) => {
          var content = this.$ace.getValue()
          this.$emit('input', content, $editor, $fn)
      })
    }
  },
  mounted () {
    if (this.myConfig) {
      this.initAce(this.myConfig)
    } else {
      this.initAce(defaultConfig)
    }
  }
}
</script>

<style lang="scss" scoped>
.CodeEditor{
  // border: 2px solid red;
  width: 100%;
  height: 500px;
}
</style>
