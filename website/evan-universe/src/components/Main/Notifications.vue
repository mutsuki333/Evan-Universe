<template lang="html">
<div class="Notifications pr-0">
  <!-- notifications/overall alerts/important messages -->
  <b-modal v-model='Note' ok-only>
    <!-- {{noteMsg}} -->
    <vue-markdown :source='noteMsg' />
  </b-modal>

  <!-- ads/events -->
  <!-- <b-modal></b-modal> -->
  <back-to-top>
    <b-btn class="btn-to-top">
      <i class="material-icons">
        arrow_upward
      </i>
    </b-btn>
  </back-to-top>
</div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'Notifications',
  components:{
    BackToTop,
    VueMarkdown
  },
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType'
    ]),
    ...mapGetters('System',[
      'routeBack',
      'showNote',
      'noteMsg'
    ]),
    Note:{
      set(bool){
        this.setNote(bool)
      },
      get(){
        return this.showNote;
      }
    }
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
    ]),
    ...mapActions('System',[
      'loadsheet',
      'setNote'
    ])
  }

}
</script>

<style lang="scss" scoped>
.Notifications{
}
.btn-to-top {
  text-align: center;
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
  z-index: 1060;
}

</style>
