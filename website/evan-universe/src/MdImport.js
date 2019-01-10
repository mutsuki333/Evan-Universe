import Vue from 'vue'
import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material'

import {
  MdToolbar,
  MdIcon,
  MdList,
  MdTabs,
  MdButton,
  MdDrawer,
  MdCard,

} from 'vue-material/dist/components'

export default function(){
  Vue.use(VueMaterial);
  Vue.use(MdToolbar);
  Vue.use(MdIcon);
  Vue.use(MdList);
  Vue.use(MdTabs);
  Vue.use(MdButton);
  Vue.use(MdDrawer);
  Vue.use(MdCard);
  // Vue.use();
}
