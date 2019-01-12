import axios from 'axios'
import Cookies from 'js-cookie'

const LANG = Object.freeze({
    CH: "CH",
    JP: "JP",
    EN: "EN"
});
function isLang(lang){
  for (let i in LANG) {
    if(lang==i)return true;
  }
  return false;
}


const state = {
  connected:false,
  notifications:[],
  alert:[],
  lang:Cookies.get('LANG')||LANG.EN
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
        import(`@/sheet/EN/${componentName}Sheet`)
        .then(sheet=>{
          resolve(sheet.default)
        })
      })
    })
  },
  setLang:({state,commit},lang)=>{
    return new Promise(function(resolve, reject) {
      if(isLang(lang)){
        commit('setLang',lang);
        resolve(`set lang to ${lang}`)
      }
      else reject(`unknown LANG ${lang}`)
    });
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
  setLang(state,lang){
    Cookies.set('LANG', lang);
  },
  connect(state,res){
    state.connected=true;
    console.log(res.data);
    console.log(`cookie: ${Cookies.get('LANG')}, state: ${state.lang}`);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
