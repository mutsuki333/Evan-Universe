<template lang="html">
  <div class="Login pt-2">
    <b-card
      :title="sheet.title"
      :sub-title="sheet.subtitle"
      class="mb-0 pt-2 mx-auto"
      id="card"
      border-variant="primary">
    <b-form>
      <b-collapse id="coll" class="text-danger" v-model="formV.alert">{{formV.alt}}</b-collapse>
      <b-form-group id="email"
                    :label="sheet.emailLabel"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      :state="formV.email"
                      v-model="form.email"
                      required
                      :placeholder="sheet.emailPlaceholder">
        </b-form-input>
      </b-form-group>
      <b-form-group id="pwd"
                    :label="sheet.pwdLabel"
                    label-for="pwd">
        <b-form-input id="pwd"
                      type="password"
                      :state="formV.pwd"
                      v-model="form.password"
                      required
                      :placeholder="sheet.pwdPlaceholder">
        </b-form-input>
      </b-form-group>
      <b-form-group id="check">
        <b-form-checkbox v-model="form.checked">{{sheet.remember}}</b-form-checkbox>
      </b-form-group>
      <b-button type="button" variant="primary" @click="onSubmit">{{sheet.submit}}</b-button>
      <router-link class="float-right" to="/auth/register">{{sheet.register}}</router-link><br>
      <b-button v-show="formV.forget" class="float-right btn-sm" type="button" variant="secondary" href='#'>{{sheet.forget}}</b-button>
    </b-form>
  </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { pwd_re, email_re } from '@/rules'
import Cookies from 'js-cookie'

function RememberLogin(remember,email,pwd){
  if(remember==undefined && Cookies.get('rememberLogin')){
    return {
      email:Cookies.get('lemail'),
      password:Cookies.get('lpwd')
    }
  }
  else if(remember){
    Cookies.set('rememberLogin',true);
    Cookies.set('lemail',email);
    Cookies.set('lpwd',pwd, { secure: true });
  }
  else {
    Cookies.remove('rememberLogin')
    Cookies.remove('lemail')
    Cookies.remove('lpwd')
  }
}

export default {
  name:'Login',
  data:()=>({
    sheet:{},
    form: {
        email: '',
        password:'',
        checked: false
    },
    formV: {  //form validate
      email:null,pwd:null,alert:false,alt:'',forget:false
    }
  }),
  computed:{
    ...mapGetters('UserCtl',[
      'AuthenticatedType'
    ]),
    ...mapGetters('System',[
      'lang'
    ])
  },
  methods:{
    ...mapActions('UserCtl',[
      'reload',
      'login'
    ]),
    ...mapActions('System',[
      'loadsheet'
    ]),
    onSubmit(){
      let valid=true;
      this.formV.showCollapse=false;
      if(!email_re.test(this.form.email)){this.formV.email=false;valid=false}else this.formV.email=true;
      if(this.form.password==''||!pwd_re.test(this.form.password)){this.formV.pwd=false;valid=false}else this.formV.pwd=true;
      if(valid)this.login(this.form).then(res=>{
        if(res=='Invalid username or password'){
          this.formV.alt=this.sheet.noUser;
          this.formV.email=null;
          this.formV.pwd=null;
          this.formV.alert=true;
          this.formV.forget=true;
        }
        else {
          if(this.form.checked)RememberLogin(true,this.form.email,this.form.password)
          else RememberLogin(false)
          // this.$router.push('/user/home')
          this.$router.go(-1)
        }
      })
    }
  },
  created: function(){
    this.loadsheet(this.$options.name)
    .then(sheet => this.sheet=sheet)
    this.reload()
    .then((res) => {
      if(res!='unauthorized')
        this.$router.push('/user/home')
    })
    let data = RememberLogin()
    if(data != undefined){
      this.form.email=data.email;
      this.form.password=data.password;
      this.form.checked=true;
    }
  }
}
</script>

<style lang="scss" scoped>
.Login{
  text-align: left;
}
#card{
  max-width: 25rem;
}
</style>
