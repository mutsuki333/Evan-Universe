import axios from 'axios'
import Cookies from 'js-cookie'


// initial state
// shape: [{ id, quantity }]

const state = {
  AuthenticatedType:'unauthorized',
  user: {}
}


// getters
const getters = {
  user:(state)=>{return state.user},
  AuthenticatedType:(state)=>{
    return state.AuthenticatedType;
  }
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
          resolve('success');
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
