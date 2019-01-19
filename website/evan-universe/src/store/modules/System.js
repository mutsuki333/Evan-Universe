import axios from 'axios'
import Cookies from 'js-cookie'
import Prism from 'prismjs'

// import Prism from '@/assets/prism.js'

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
  noteMsg:'',
  showAd:true,
  showNote:false,
  lang:Cookies.get('LANG')||LANG.EN ,
  routeBack:''
}


// getters
const getters = {
  notifications:(state)=>{return state.notifications},
  lang:(state)=>{return state.lang},
  routeBack:(state)=>{return state.routeBack},
  showNote:(state)=>{return state.showNote},
  noteMsg:(state)=>{return state.noteMsg}
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
  setRouteBack:({commit},from)=>{
    if(typeof from === 'string' && from!="")
      commit('setRouteBack',from)
  },
  connect:({state,commit})=>{
    axios
      .get('/announce/')
      .then(res=>{
        commit('connect',res)
      })
      .catch((err) => console.log(err))
  },
  highlight:()=>Prism.highlightAll(false),
  uploadIMG:({state},img,base=null)=>{
    return new Promise(function(resolve) {
      let url='/resource/upload_img'
      if(base!=null)url+=`/${base}`
      axios.post(url,img)
      .then(res=>{
        resolve(`${axios.defaults.baseURL}${res.data}`)
      })
    });
  },
  addNote:({state,commit},notes)=>{ //notes:{}
    commit('setNote',true);
    commit('addNote',notes);
  },
  setAd:({state,commit},bool)=>{
    commit('setAd',bool)
  },
  setNote:({commit},bool)=>{
    commit('setNote',bool)
  },
  scrollToTop:()=>{
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}

// mutations
const mutations = {
  setLang(state,lang){
    Cookies.set('LANG', lang);
  },
  connect(state,res){
    state.connected=true;
    console.log(res.data);
    // console.log(`cookie: ${Cookies.get('LANG')}, state: ${state.lang}`);
  },
  setRouteBack(state,from){
    state.routeBack=from;
  },
  setAd(state,bool){
    state.showAd=bool;
  },
  setNote(state,bool){
    state.showNote=bool;
  },
  addNote(state,notes){
    state.noteMsg=notes;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
