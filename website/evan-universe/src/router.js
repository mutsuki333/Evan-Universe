import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import Etextarea from './components/Etextarea.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias:['/home','/Evan-Universe']
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/Plat',
      name: 'Plat',
      component: ()=>import('./views/Plat.vue')
    },
    {
      path: '/auth/',
      component: () => import('./views/Auth.vue'),
      children:[
        { path:'login',component: ()=> import('./components/Auth/Login.vue') },
        { path:'register',component:()=>import('./components/Auth/Register.vue')}
      ]
    },
    {
      path: '/user/',
      component: () => import('./views/UserPage.vue'),
      children:[
        { path: 'home/', component: ()=>import('./components/User/UserProfile')},
        { path: 'home/:username', props: true, component: ()=>import('./components/User/UserHome')}
      ]
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('./views/Showcase.vue')
    },
    {
      path:'/mdtutorial',
      name:'MDTutorial',
      component: ()=> import('./views/MDTutorial.vue')
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('./components/Blog/Blogs.vue')
    },
    {
      path: '/blog/:Bid',
      name: 'blog',
      props: true,
      component: () => import('./components/Blog/Blog.vue')
    },
    {
      path: '/ann',
      name: 'ann',
      component: () => import('./components/Auth/SetAnnounce.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('./components/Blog/Post.vue')
    },
    {
      path: '/test',
      name: 'test',
      // component: Etextarea
      // component: () => import('./components/CodeEditor.vue')
      component: () => import('./views/Test.vue')
    },
    {
      path: '/*',
      name: 'notfound',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue')
    }
  ]
})
