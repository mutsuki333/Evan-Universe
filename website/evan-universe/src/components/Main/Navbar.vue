<template lang="html">
  <div class="Navbar p-0 pb-5">
    <b-navbar class="eb-info pb-0" toggleable="lg" type="dark" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">{{sheet.title}}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/blogs/home">Blogs</b-nav-item>
          <b-nav-item to="/post">Post</b-nav-item>
          <b-nav-item to="/mdtutorial">Markdown Tutorial</b-nav-item>
          <b-nav-item to="/games">Games</b-nav-item>
          <b-nav-item to="/test" disabled>contact us</b-nav-item>
          <!-- <b-nav-item @click="test">test</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="button">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item @click="changeLang('EN')">EN</b-dropdown-item>
            <b-dropdown-item @click="changeLang('CH')">CH</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-if="AuthenticatedType!='unauthorized'">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item :to="`/user/${user.name}`">Profile</b-dropdown-item>
            <b-dropdown-item to="/post">Post</b-dropdown-item>
            <b-dropdown-item @click="signout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else @click="toLogin">Login</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>


    <!-- <div class="pt-5">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/Showcase">Showcase</router-link>|
      <router-link to="/auth/register">Auth</router-link>|
      <router-link to="/user/home">Userpage</router-link>|
      <router-link to="/test">Test</router-link>|
      <router-link to="/ann">ann</router-link>|
      <router-link to="/post">post</router-link>|
      <router-link to="/notfound">404</router-link>
    </div> -->

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'Navbar',
  data:()=>({
    sheet:{}
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'user',
      'AuthenticatedType'
    ]),
    ...mapGetters('System',[
      'notifications'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
      'logout'
    ]),
    ...mapActions('System',[
      'connect',
      'loadsheet',
      'setLang',
      'setRouteBack'
    ]),
    changeLang(lang){
      this.setLang(lang)
      .then(()=>{this.$router.go(0)})
    },
    toLogin(){
      this.setRouteBack(this.$route.path);
      this.$router.push('/auth/login')
    },
    signout(){
      this.logout()
      this.$router.go(0)
    },
    test(){
      window.location.reload();
    }
  },
  created: function(){
    this.loadsheet(this.$options.name)
    .then(sheet=>this.sheet=sheet)
    this.reload();
    this.connect();
  }
}
</script>

<style lang="scss" scoped>
.Navbar {
  padding: 30px;
}
</style>
