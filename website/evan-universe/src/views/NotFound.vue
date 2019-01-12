<template lang="html">
  <div class="notfound">
    <h1>Page not found, <br>will redirect to home page in</h1>
    <h1 id="big">{{time}}</h1>
    <br>
    <button @click="$router.push('/home');stop()">back to home</button>
  </div>
</template>

<script>

export default {
  name: 'notfound',
  data(){
    return {
      time:5,
      timer:null
    }
  },
  methods:{
    stop(){
      clearInterval(this.timer);
    },
    goto(){
      console.log("a");
    }
  },
  mounted:function(){
    this.$nextTick(()=>{this.timer=setInterval(()=>{
      this.time-=1;
      if(this.time<=0){
        clearInterval(this.timer);
        this.$router.push('/home')
      }
    },1000)})
  }
}
</script>

<style lang="scss" scoped>
#big {
  font-size: 60px
}
</style>
