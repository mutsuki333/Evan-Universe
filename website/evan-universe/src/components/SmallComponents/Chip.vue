<template lang="html">
  <span class="pl-1 default" v-bind:class="{'white':white,'lightBlue':lightBlue}">
    <b-btn class="chips p-0" size='sm' type="link" :disabled="!active" :href="href">
      <span class="m-2">
        <slot>{{value}}</slot>
        <span v-if="!noIcon">
          <i class="material-icons icon pointer"
            v-on:click="$emit('click', text)">
            close
          </i>
        </span>
      </span>
    </b-btn>
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
    },
    lightBlue:{
      type: Boolean,
      default: false
    },
    href:{
      type:String,
      default: null
    },
    active:{
      type:Boolean,
      default:false
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
  opacity: 1;
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

.lightBlue{
  .chips{
    background-color: LightSkyBlue;
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
