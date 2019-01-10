<template lang="html">
  <div class="Navbar p-0">
    <b-navbar class="eb-info pb-1" toggleable="md" type="dark" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">{{sheet.EvanUniverse}}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
          <b-nav-item @click="test">test</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>


    <div class="pt-5">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/Showcase">Showcase</router-link>|
      <router-link to="/auth/register">Auth</router-link>|
      <router-link to="/user/home">Userpage</router-link>|
      <router-link to="/test">Test</router-link>|
      <router-link to="/notfound">404</router-link>
    </div>

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
      'loadsheet'
    ]),
    test(){window.location.reload()}
  },
  created: function(){
    this.loadsheet('Navbar')
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
