<template>

  <div>
    <RechargePop></RechargePop>
    <div id="footer">
      <div class="container" >
        <p class="top" style="margin-top:8px;">拒绝不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当  适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
        <div class="infos">
          <router-link tag="a" :to="{name:'question',query:{num:0}}">账号问题</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:1}}">道具说明</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:2}}">预测问题</router-link>
          <span>|</span>
           <router-link tag="a" :to="{name:'question',query:{num:6}}">推广员</router-link>
             <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:5}}">举报不良信息</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:5}}">用户投诉</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:5}}">意见反馈</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:3}}">家长监护</router-link>
          <span>|</span>
          <router-link tag="a" :to="{name:'question',query:{num:4}}">公司简介</router-link>
         
         

        </div>
        <div class="bottom" >
          <p class="copyright" style="margin-top:16px;">浙ICP备17048550号-6 &nbsp;&nbsp;<i>|</i> &nbsp;&nbsp;浙网文【2018】1295-076号</p>
          <div class="needfix">
               <p class="copyright" >杭州丰收网络科技有限公司  ©版权所有</p>
               <p class="safe">
                  <a href="https://webscan.360.cn/index/checkwebsite/url/www.api.com" target="_blank"><img border="0" src="https://webscan.360.cn/status/pai/hash/366f8b9be2f5f89b5f8c26c02f6ffa5a"/></a>
                  <a target="_blank" href="https://v.pinpaibao.com.cn/cert/site/?site=www.api.com&at=business" ><img src="https://static.anquan.org/static/outer/image/aqkx_124x47.png"/></a>
               </p>
          </div>
          <p class="copyright" style="margin-top:-18px;">友情链接:&nbsp;&nbsp;
            <a href="http://www.ouresports.com/" class="dianjingdashi" target="_blank">电竞大师</a> &nbsp;&nbsp;
            <a href="http://www.lolfun.cn/" class="dianjingdashi" target="_blank">暴龙电竞</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RechargePop from "../dialog/RechargePop";
export default {
  name: "my-footer",
  components: {
    RechargePop
  },
};
</script>

<style scoped lang='scss'>
#footer {
  clear:both;
  padding-bottom: 60px;
  text-align: center;
  width: 100%;
  height: 230px;
  overflow: hidden;
  background: url(../../assets/images/footerbg.png) no-repeat bottom center;
  background-size: auto 230px;
  font-size: 12px;
  color: #3c5d74;
  .container{
    height: 260px;
    width: 1200px;
    margin:0 auto;
  }
  .top {
    font-size: 14px;
    color: #575757;
    width: 100%;
    text-align: center;
    margin-bottom: 28px;
    padding-top:26px;
    position: relative;

  }
  .infos {
    color: #3c5d74;
    a{
      color: #3c5d74;
    }

  }
  .bottom {
    width: 100%;
    text-align: left;
    margin-left:358px;
    p{
        line-height: 24px;
    }
    .copyright{
       color:#989898;
       font-size: 12px;
       line-height: 24px;
       margin-top: 12px;
    }
    .dianjingdashi{
      color:#989898;
    }
    b{
        font-weight: 400;
        color:#1a242b;
        opacity: .5;
    }
    .safe{
     height:48px;
     margin-left:321px;
     margin-top:-60px;
    }
    .needfix{
      text-align: left;
      height: 50px;
    }
  }
}
</style>
