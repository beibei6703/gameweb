<template>
  <div id="mygrandtop">
      <div class="top_title">
            <ul v-if="mygrandtoplist">
                <li class="fleft theme_color" v-for="(data,index) in mygrandtoplist" :key="index" @click="handleclick">{{data}}</li>
            </ul>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          
      }
  },
  mounted () {
      this.$store.commit('mygrandtopmutation',['道具'])
  },
  computed: {
      mygrandtoplist(){
          console.log(this.$store.state.home.mygrandtopdata)
          return this.$store.state.home.mygrandtopdata?this.$store.state.home.mygrandtopdata:null
      }
  },
  methods: {
      handleclick(event){
          console.log(event.target)
          event.target.style.background='url("../../assets/images/mygrand/titlebg.png") center  no-repeat';
          event.target.style.backgroundSize = '130px 64px';
      }
  }
}
</script>
<style lang="scss" scoped>
    #mygrandtop{
        .top_title{
            height:64px;
            border-bottom: 1px solid #535353;
            margin-bottom: 25px;
            ul{
                height: 64px;
                width:100%;
                padding-left: 16px;
                li{
                    width: 130px;
                    font-size: 20px;
                    line-height: 64px;
                    font-weight: 900;
                    text-align: center;
                    &:hover{
                        color:#fff;
                    
                    }
                }
            }
        }
    }
</style>


