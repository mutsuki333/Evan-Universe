import axios from 'axios'
import Cookies from 'js-cookie'


// initial state
// shape: [{ id, quantity }]

const state = {
  AuthenticatedType:'unauthorized',
  user: {},
  otherUser:{}
}


// getters
const getters = {
  user:(state)=>{return state.user},
  AuthenticatedType:(state)=>{
    return state.AuthenticatedType;
  },
  otherUser:(state)=>{return state.otherUser},
  own:(state)=>{return state.user.id==state.otherUser.id}
}

// actions
const actions = {
  login:({commit},obj)=>{
    return new Promise((resolve) => {
      axios
        .post("/auth/login",obj)
        .then(response=>{
          if(typeof response.data==='string'){
            resolve(response.data)
            return
          }
          commit('login',response.data);
          resolve(response.data.name);
        })
        .catch(err => console.log(err))
    })
  },
  logout:({commit})=>{
    axios('/auth/logout')
    commit('logout')
  },
  register:({commit},obj)=>{
    return new Promise((resolve) => {
      axios
        .post('/auth/register',obj)
        .then(res=>{
          resolve(res.data)
        })
    })
  },
  reload:({state,commit})=>{
    return new Promise((resolve) => {
      if(state.user.auth_type!=undefined){
        resolve(state.user.auth_type)
        return
      }
      axios('/auth/auth_type')
      .then(res=>{
        if(res.data.auth_type!='unauthorized'){
          console.log('reload');
          axios('/auth/reload')
          .then(user=>{
            commit('set_user',user.data);
          })
        }
        else {
          commit('logout');
        }
        resolve(state.AuthenticatedType)
      })
      .catch(err=>console.log(err))
    })
  },
  getUser:({state,commit},username)=>{
    return new Promise(function(resolve, reject) {
      if(state.otherUser.username===username){
        resolve('ok')
      }
      else{
        axios(`/auth/user/${username}`)
        .then(res=>{
          if(res.data.name==undefined)reject(`unknown username ${username}`)
          else{
            commit('set_otherUser',res.data)
            resolve('ok')
          }
        })
      }
    });
  },
  sayhi:()=>alert('hi')
}

// mutations
const mutations = {
  login(state,user){
    state.AuthenticatedType=user.auth_type;
    state.user=user;
  },
  logout(state){
    state.AuthenticatedType='unauthorized';
    state.user={};
  },
  set_user(state,user){
    state.AuthenticatedType=user.auth_type;
    state.user=user;
  },
  set_otherUser(state,user){
    state.otherUser=user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
