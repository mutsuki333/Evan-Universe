<template lang="html">
  <div class="Register pt-2">
    <b-card
      :title="sheet.title"
      :sub-title="sheet.subtitle"
      class="mb-0 pt-2 mx-auto"
      id="card"
      border-variant="primary">
    <b-form>
      <b-collapse id="coll" class="text-danger" v-model="formV.showCollapse">{{formV.alt}}</b-collapse>
      <b-form-group id="name"
                    :label="sheet.nameLabel"
                    label-for="name"
                    :description="sheet.nameDescription">
        <b-form-input id="name"
                      :state="formV.name"
                      type="text"
                      v-model="form.name"
                      required
                      :placeholder="sheet.namePlaceholder">
        </b-form-input>
      </b-form-group>
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
      <b-form-group id="real_name"
                    :label="sheet.real_nameLabel"
                    label-for="real_name"
                    :description="sheet.real_nameDescrption">
        <b-form-input id="real_name"
                      type="text"
                      :state="formV.real"
                      v-model="form.real_name"
                      required
                      :placeholder="sheet.real_namePlaceholder">
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
      <b-form-group id="pwd_check"
                    :label="sheet.pwd_checkLabel"
                    label-for="pwd_check">
        <b-form-input id="pwd_check"
                      type="password"
                      :state="formV.pwd2"
                      v-model="form.pwd_check"
                      required
                      :placeholder="sheet.pwd_checkPlaceholder">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="agree">{{sheet.agree}}</b-form-checkbox>
          <b-form-checkbox value="kill">{{sheet.kill}}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="button" variant="primary" @click="onSubmit">{{sheet.submit}}</b-button>
      <router-link class="float-right " to="/auth/login">{{sheet.have}}</router-link>
    </b-form>
  </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { pwd_re, email_re } from '@/rules'


export default {
  name:'Register',
  data:()=>({
    sheet:{},
    form: {
        email: '',
        name: '',
        real_name:'',
        password:'',
        pwd_check:'',
        checked: []
    },
    formV: {  //form validate
      name:null,email:null,real:null,pwd:null,pwd2:null,showCollapse:false,alt:''
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
      'register'
    ]),
    ...mapActions('System',[
      'loadsheet'
    ]),
    onSubmit(){
      let valid=true;
      this.formV.showCollapse=false;
      if(this.form.name==''){this.formV.name=false;valid=false;}else this.formV.name=true;
      if(this.form.real_name==''){this.formV.real=false;valid=false;}else this.formV.real=true;
      if(!email_re.test(this.form.email)){this.formV.email=false;valid=false}else this.formV.email=true;
      if(this.form.password==''||!pwd_re.test(this.form.password)){this.formV.pwd=false;valid=false}else this.formV.pwd=true;
      if(this.form.password!=this.form.pwd_check||!pwd_re.test(this.form.pwd_check)){this.formV.pwd2=false;valid=false}else this.formV.pwd2=true;
      if(valid)this.register(this.form).then(res=>{
        if(res=='email used'){
          this.formV.alt=this.sheet.emailUsed;
          this.formV.showCollapse=true;
          this.formV.email=false;
        }
        else if(res=='name used'){
          this.formV.alt=this.sheet.nameUsed;
          this.formV.showCollapse=true;
          this.formV.name=false;
        }
        else this.$router.push('/auth/login')
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
  }
}
</script>

<style lang="scss" scoped>
.Register{
  text-align: left;
}
#card{
  max-width: 25rem;
}
// a{
//   font-weight: bold;
// }
</style>
