<template lang="html">
  <span class="pl-1 default" v-bind:class="{'white':white}">
    <label class="chips">
      <span class="m-2">
        <slot>{{value}}</slot>
        <span v-if="!noIcon">
          <i class="material-icons icon pointer"
            v-on:click="$emit('click', text)">
            close
          </i>
        </span>
      </span>
    </label>
  </span>
</template>

<script>
export default {
  name:'chip',
  props:{
    value:String,
    noIcon:{
      type: Boolean,
      default: false
    },
    white:{
      type: Boolean,
      default: false
    }
  },
  data:()=>({
    text:''
  }),
  created: function(){
    this.text=this.value || this.$slots.default[0].text
  }
}
</script>

<style lang="scss" scoped>
$size: 0.7em;
.chips{
  border-radius: 15px !important;
  font-size: $size;
  width: auto;
  font-weight: bold;
}
.icon{
  font-size: $size;
  padding-left: 0.25rem;
}

.default{
  .chips{
    background-color: gray;
    color: white;
  }
  .icon{
    color: white;
  }
}

.white{
  .chips{
    background-color: white;
    color: black;
  }
  .icon{
    color: black;
  }
}



.pointer{
  cursor: pointer;
}
</style>
