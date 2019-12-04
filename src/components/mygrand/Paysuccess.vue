<template>
   <div class="paysuccess">
        <div class="top">
           <p class="title">充值</p>
       </div>
       <div class="content" v-if="params">
           <img src="../../assets/images/mygrand/successcom.png" alt="" class="yes">           
           <p class="success">恭喜您成功充值￥{{params.total_amount}}</p>
           <p class="time">充值时间 {{params.timestamp}}</p>
       </div>
   </div>
</template>
<script>
export default {
  data () {
      return {          
      }      
  },
  computed:{
    params:function(){
      return this.$route.query
    }
  },
  created:function(){
    var self = this
    self.$store.dispatch('userinfo')
    self.$store.dispatch('userinfoshowdispatch')
    self.$store.dispatch("userInfo")
    self.$store.dispatch('self')
    setTimeout(function(){
      self.$router.push('/paymoney')
    },1000*10*15);
  }
}
</script>
<style lang="scss" scoped>
    .paysuccess{
        // height:530px;
        min-height: 560px;
        .top{
			height:64px;
            border-bottom: 1px solid #535353;
			.title{
				font-size: 20px;
				color: #e3dbc8;
				font-weight: 900;
				line-height: 64px;
				width: 100px;
				text-align: left;
				margin-left: 20px;
			}
		}
        .content{
            width: 440px;
            height: 400px;
            margin:150px auto;
            .success{
                color: #e1c076;
                font-size: 20px;
                line-height: 30px;
                margin-top: 20px;
            }
            .time{
                color: #dcdcdc;
                font-size: 14px;
                line-height: 21px;
                margin-top: 6px;
            }
            .yes{
                display: block;
                margin-top: 100px;
                width:68px;
                height: 68px;
                margin:0 auto;
            }
        }
    }
</style>


