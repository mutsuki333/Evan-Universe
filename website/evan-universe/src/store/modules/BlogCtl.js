import axios from 'axios'
// import Cookies from 'js-cookie'


const state = {
  milestone:'',
  blogs:{},
  blog:{}
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
      axios('/blog/id/'+Bid)
      .then((res) => {
        console.log(res);
        commit('setBlog',res.data)
        resolve('ok')
      })
      .catch((err) => {reject(err)})
    });
  },
  postBlog:({commit},post)=>{
    return new Promise(function(resolve, reject) {
      axios.post('blog/post',post)
      .then((res) => {resolve(res.data)})
      .catch((err) => {reject(err)})
    });
  }
}

// mutations
const mutations = {
  setBlog(state,blog){
    state.blog=blog
  },
  appendBlogs(state,blogs){
    state.blogs.concat(blogs)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
