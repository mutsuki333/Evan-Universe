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
  checkState:({commit})=>{
    axios
      .get('/site/auth_type')
      .then(res=>{
        commit('checkState',res)
      })
      .catch((err) => console.log(err))
  },
  login:({commit},obj)=>{
    axios
      .post("/site/login",obj)
      .then(response=>{
        console.log(response);
        commit('login',response.data)
      })
      .catch(err => console.log(err))
  },
  logout:({commit})=>{
    axios('/site/logout')
    commit('logout')
  },
  register:({},obj)=>{
    return axios
      .post('/site/register',obj)
      .then(res=>{
        return res.data
      })
  },
  sayhi:()=>alert('hi')
}

// mutations
const mutations = {
  checkState(state,res){
    console.log(res.data.auth_type);
    state.AuthenticatedType = res.data.auth_type;
  },
  login(state,user){
    // console.log(user);
    state.AuthenticatedType=user.auth_type;
    state.user=user;
  },
  logout(state){
    state.AuthenticatedType=false;
    state.user={};
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
