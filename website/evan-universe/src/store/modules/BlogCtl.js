import axios from 'axios'
// import Cookies from 'js-cookie'


import { mention_re, hashtag_re , hashtag_nospace_re } from '@/rules'


function mention(str){
  str = str.toString();
  let mention = str.match(mention_re)
  if(!mention)return [str];
  let names=[];
  while (mention) {
    let username = mention[1];
    let hasUser = false;
    let index = mention['index']
    str = str.splice(index+1,0,'[')
    str = str.splice(index+username.length+2,0,`](/user/home/${username.slice(1)})`)
    mention = str.match(mention_re)
    for (let i in names) {
      if(names[i]==username.slice(1))hasUser=true;
    }
    if(!hasUser)names.push(username.slice(1))
  }
  return [].concat([str],names)
};

function hashtag_noSpace(str){
  str = str.toString();
  let tags = str.match(hashtag_nospace_re)
  if(!tags)return str;
  let strStart = '', strEnd = str;
  while (tags) {
    console.log(tags);
    let tag = tags[1];
    let index = tags['index']
    strEnd = strEnd.splice(index,0,'[')
    strEnd = strEnd.splice(index+tag.length+1,0,`](/blogs/tags/${tag.slice(1)})`)
    strStart += strEnd.slice(0,index+3);
    strEnd = strEnd.slice(index+3);
    tags = strEnd.match(hashtag_nospace_re)
  }
  return strStart+strEnd
};

function hashtag(str){
  str = str.toString();
  let tags = str.match(hashtag_re)
  if(!tags)return str;
  while (tags) {
    let tag = tags[1];
    let index = tags['index']
    str = str.splice(index+1,0,'[')
    str = str.splice(index+tag.length+2,0,`](/blogs/tags/${tag.slice(1)})`)
    tags = str.match(hashtag_re)
  }
  return str
};

function filterText(str){
  str = hashtag(str)
  let parsed = mention(str);
  return parsed
};

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

      axios('blog/view',{params: params})
      .then((res) => {
        if(state.blogs.length<=1)
          commit('setBlogs',res.data)
        else
          commit('appendBlogs',res.data)
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
