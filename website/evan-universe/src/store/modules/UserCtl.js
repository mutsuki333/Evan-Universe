// import Conf from './Conf'
import axios from 'axios'

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
        .post("/site/login",obj)
        .then(response=>{
          if(typeof response.data==='string')
            resolve(response.data)
          commit('login',response.data);
          return 'success'
        })
        .catch(err => console.log(err))
    })
  },
  logout:({commit})=>{
    axios('/site/logout')
    commit('logout')
  },
  register:({commit},obj)=>{
    return new Promise((resolve) => {
      axios
        .post('/site/register',obj)
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
      axios('/site/auth_type')
      .then(res=>{
        if(res.data.auth_type!='unauthorized'){
          console.log('reload');
          axios('/site/reload')
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
