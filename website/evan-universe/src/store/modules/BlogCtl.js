import axios from 'axios'
// import Cookies from 'js-cookie'


import { filterText, imgs } from '@/rules'


const state = {
  milestone:'',
  blogs:[],
  blog:{},
  milestone:''
}


// getters
const getters = {
  blogs:(state)=>{return state.blogs},
  blog:(state)=>{return state.blog}
}

// actions
const actions = {
  load:({commit,state})=>{

  },
  refresh:({commit,state})=>{

  },
  loadBlog:({commit},Bid)=>{
    return new Promise(function(resolve, reject) {
      axios('blog/id/'+Bid)
      .then((res) => {
        // console.log(res);
        commit('setBlog',res.data)
        resolve('ok')
      })
      .catch((err) => {reject(err)})
    });
  },
  loadBlogs:({state,commit},params)=>{
    return new Promise(function(resolve, reject) {
      let process = (blogs)=>{
        if(blogs==='end')resolve('end')
        for (let blog of blogs) {
          blog.imgs=imgs(blog.content)
        }
        if(state.milestone==''){
          commit('setBlogs',blogs)
        }
        else{
          commit('appendBlogs',blogs)
        }
        resolve('ok')
      }
      if(params.isEmpty && state.milestone!='')commit('setMilestone','')
      if(params.hasOwnProperty('Bid'))commit('setMilestone',params.milestone)
      axios('blog/view',{params: params})
      .then((res) => {
        process(res.data)
      })
      .catch((err) => {reject(err)})

    });
  },
  postBlog:({commit},post)=>{
    let filtered = filterText(post.content);
    post.content = filtered[0]
    return new Promise(function(resolve, reject) {
      axios.post('blog/post',post)
      .then((res) => {
        for (name of filtered.slice(1))axios(`/announce/mentioned/${res.data}/${name}`)
        resolve(res.data)
      })
      .catch((err) => {reject(err)})
    });
  },
  AddComment:({commit},payload)=>{
    return new Promise(function(resolve, reject) {
      let filterd = filterText(payload.content);
      for (name of filterd.slice(1))axios(`/announce/mentioned/${payload.Bid}/${name}`)
      axios.post('blog/add/comment',{'content':filterd[0]},{params: {Bid: payload.Bid}})
      .then((res) => {
        commit('setBlog',res.data)
        resolve('success')
      })
      .catch((err) => {reject(err)})
    });
  },
  AddReply:({commit},p)=>{
    return new Promise(function(resolve, reject) {
      let filterd = filterText(p.content);
      for (name of filterd.slice(1))axios(`/announce/mentioned/${p.Bid}/${name}`)
      axios.post('blog/add/reply',{'content':filterd[0]},{params: {Bid: p.Bid,'IdDate':p.IdDate}})
      .then((res) => {
        commit('setBlog',res.data)
        resolve('success')
      })
      .catch((err) => {reject(err)})
    });
  }
}

// mutations
const mutations = {
  setBlog(state,blog){
    state.blog=blog;
  },
  setBlogs(state,blogs){
    state.blogs=blogs
  },
  appendBlogs(state,blogs){
    state.blogs=state.blogs.concat(blogs)
  },
  setMilestone(state,milestone){
    state.milestone=milestone;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
