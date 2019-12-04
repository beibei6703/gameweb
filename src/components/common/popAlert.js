import Vue from "vue"
import popup from "./Popup"
import store from "@/Store"

let alerting = false
let alertHub = []

const createAlert = ()=>{
  const alertCompVm = new Vue({
    name:'popAlert',
    data(){
      return {
        open:false
      }
    },
    computed:{
      content:function(){
        return this.$store.state.user.alertMessage;
      }
    },
    methods:{
      show:function(){
        this.open = true
      },
      close:function(){
        this.open = false
      }
    },
    components:{
      popup
    },
    store,
    template:"<popup title='提示' :open='open' ref='alert' @close='close' :height='180' @show='show'><div class='dialog-content' slot='content'>{{content}}</div></popup>",
    mounted(){
      this.$store.dispatch('alertAdd',this)
    }
  }).$mount()
  document.body.appendChild(alertCompVm.$el)
}

const install = function(Vue,opts){
  Vue.prototype.alert = function(message){
    this.$store.commit('isSigninPupopDis',{'masseges':message})
  }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
  install
}

export default API
