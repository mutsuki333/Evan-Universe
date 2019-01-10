import axios from 'axios'

const LANG = Object.freeze({
    CH: "ch",
    JP: "jp",
    EN: "en"
});

const state = {
  connected:false,
  notifications:[],
  alert:[],
  lang:LANG.CH
}


// getters
const getters = {
  notifications:(state)=>{return state.notifications},
  lang:(state)=>{return state.lang}
}

// actions
const actions = {
  loadsheet:({state},componentName)=>{
    return new Promise((resolve, reject) => {
      import(`@/sheet/${state.lang}/${componentName}Sheet`)
      .then(sheet=>{
        resolve(sheet.default)
      })
      .catch(() => {
        import(`@/sheet/en/${componentName}Sheet`)
        .then(sheet=>{
          resolve(sheet.default)
        })
      })
    })
  },
  connect:({state,commit})=>{
    axios
      .get('/announce/')
      .then(res=>{
        commit('connect',res)
      })
      .catch((err) => console.log(err))
  },
  sayhi:()=>alert('hi')
}

// mutations
const mutations = {
  connect(state,res){
    state.connected=true;
    console.log(res.data);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
