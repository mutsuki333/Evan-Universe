<template lang="html">
  <div class="UserView">

    <!-- xs-navbar -->
    <b-btn @click="xs_nav=!xs_nav"
            v-show="!xs_nav"
            class="nav-xs-btn d-block d-sm-none"
            size="sm">
            <i class="material-icons">
            reorder
            </i>
    </b-btn>
    <div class="nav-xs border rounded">
      <b-nav vertical
          class="pt-5"
          v-show="xs_nav">
        <b-nav-item class="m-2 pl-3" @click="xs_nav=!xs_nav"><i class="material-icons">reorder</i></b-nav-item>
        <b-nav-item :to="`/user/${username}/home`" @click="xs_nav=!xs_nav">{{sheet.home}}</b-nav-item>
        <b-nav-item :to="`/user/${username}/blogs`" @click="xs_nav=!xs_nav">{{sheet.blogs}}</b-nav-item>
        <b-nav-item disabled :to="`/user/${username}/profile`" @click="xs_nav=!xs_nav">{{sheet.profile}}</b-nav-item>
        <b-nav-item disabled :to="`/user/${username}/games`" @click="xs_nav=!xs_nav">{{sheet.games}}</b-nav-item>
        <b-nav-item disabled :to="`/user/${username}/trophy`" @click="xs_nav=!xs_nav">{{sheet.trophy}}</b-nav-item>
        <b-nav-item disabled v-if="own" :to="`/user/${username}/settings`" @click="xs_nav=!xs_nav">{{sheet.settings}}</b-nav-item>
      </b-nav>
    </div>
    <!-- xs-navbar -->

    <b-row>
      <b-col sm="2" class="d-none d-sm-block" >
        <b-nav vertical class="nav pt-5 position-fixed">
          <b-nav-item :to="`/user/${username}/home`">{{sheet.home}}</b-nav-item>
          <b-nav-item :to="`/user/${username}/blogs`">{{sheet.blogs}}</b-nav-item>
          <b-nav-item disabled :to="`/user/${username}/profile`">{{sheet.profile}}</b-nav-item>
          <b-nav-item disabled :to="`/user/${username}/games`">{{sheet.games}}</b-nav-item>
          <b-nav-item disabled :to="`/user/${username}/trophy`">{{sheet.trophy}}</b-nav-item>
          <b-nav-item disabled v-if="own" :to="`/user/${username}/settings`">{{sheet.settings}}</b-nav-item>
        </b-nav>
      </b-col>

      <b-col sm="8">
        <div class="pt-sm-5 pt-3">
          <!-- <b-img :src="otherUser.pic" fluid alt="Responsive image" /> -->

          <router-view v-if="exist" :username="username" ></router-view>
          <h1 v-else>{{sheet.user}} {{username}} {{sheet.noexist}}</h1>
        </div>
      </b-col>


    </b-row>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'UserView',
  props:['username'],
  data:()=>({
    sheet:{},
    exist:true,
    xs_nav:false
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'user',
      'otherUser',
      'AuthenticatedType',
      'own'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
      'getUser'
    ]),
    ...mapActions('System',[
      'loadsheet',
      'setRouteBack',
      'addNote'
    ])
  },
  beforeMount: function(){
    this.loadsheet(this.$options.name)
    .then(sheet => this.sheet=sheet)
    this.reload()
    // .then((res) => {
    //   if(res==='unauthorized'){
    //     this.setRouteBack(this.$route.path);
    //     this.$router.push('/auth/login')
    //   }
    // })
    this.getUser(this.username)
    .then(() => this.exist=true)
    .catch((err) => {console.log(err);this.exist=false})
  }

}
</script>

<style lang="scss" scoped>
.nav{
  font-size: 1.25rem;
  text-align: left;
}
.nav-xs{
  font-size: .75rem;
  text-align: left;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgb(0,0,0); /* Black fallback color */
  background-color: rgba(0,0,0, 0.8); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s;
}
.nav-xs-btn{
  font-size: .75rem;
  text-align: left;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 10%;
}
</style>
