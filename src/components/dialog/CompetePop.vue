<template>
  <div id="signin" v-show="isSigninTools">
      <div class="wrap_signin wrap_signin_h258">
          <div class="signin_top signin_top_258">
              <i  class="x fright pointer x_258" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signin-down">
                <div class="signin-left fl">
                  <div :class="'ImgOut bd-c'+isSigninTools.quality"><span><img :src="isSigninTools.product_small_pic"/></span> <p><i>{{items.datasum}}/{{isSigninTools.product_count}}</i></p></div>


                </div>
                <div class="signin-right fl">
                   <h1 class="cl-yellow">{{isSigninTools.product_name}}</h1>
                  <div class="signin-same">
                    <span class="signin-text-le fl">道具价值：</span>
                    <i class="signin-text-rg fl" ref="toolssum" :data-value="isSigninTools.product_cprice">{{parseInt(isSigninTools.product_cprice).toLocaleString('en-US')}}</i>
                    <div class="clear"></div>

                  </div>
                  <!--<div class="signin-same">
                    <span class="signin-text-le fl">拥有数量：</span>
                    <i class="signin-text-rg fl" ref="mysum">{{Math.abs(isSigninTools.product_count)}}</i>
                  <div class="clear"></div>
                </div> -->
                  <div class="signin-same">
                    <span class="fl">投入数量：</span>
                    <div class="signin-jiajian fl">
                      <i class="signin-reduce fl" @click="reduceNum">-</i>
                      <input type="number" v-model="items.datasum" class="fr" ref="inputValue" :data-max="isSigninTools.product_count"/>
                      <i class="signin-plus fr"  @click="plusNum">+</i>
                      <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                  </div>
                  <!-- <div class="signin-same signin-sametishi"><em>·</em>单次预测道具不能超过10个</div> -->


                </div>

              </div>
              <div class="signin_touru">
                <span class="pointer signin_sure " @click="handleensure('ensure')">确定</span>
              </div>

          </div>
      </div>
  </div>
</template>
<script>
import Http from '@/common/http';
import { mapMutations, mapState } from 'vuex';
import router from "@/router";
export default {
  data () {
      return {
          items:{
              datasum:1
          }
      }
  },
  methods: {
      handleclose(){

          this.$store.commit('isSigninTools',false);
          this.items.datasum=1;
      },
      handleensure(value){
          let _this =this;
          let boxIndex =this.$store.state.match.choiceBoxNodeIndex
          let _box=document.getElementsByClassName('guessmain-pubg-guess-same')[boxIndex];

        _this.items.datasum>_this.$store.state.match.isSigninTools.product_count?_this.items.datasum=_this.$store.state.match.isSigninTools.product_count:_this.items.datasum;
//        console.log(_this)
        // setTimeout(function(){
          if(_this.$store.state.match.isSigninTools.type){
            let datas={
              'quality':_this.$store.state.match.isSigninTools.quality,
              'product_small_pic':_this.$store.state.match.isSigninTools.product_small_pic,
              'product_count':-_this.items.datasum,
              'product_id':_this.$store.state.match.isSigninTools.product_id,
              'product_name':_this.$store.state.match.isSigninTools.product_name,
              // 'value':_this.$refs.toolssum.getAttribute('data-value'),
              'product_cprice':_this.$store.state.match.isSigninTools.product_cprice,
              'typeAdd':2
            };
//            console.log('添加的信息',datas)
            _this.$store.commit('push_tools',datas);
            _this.$store.commit('myBag_tools',datas);
            _this.items.datasum=1;
            // _this.getTeamListTop(_box,_this.$store.state.match.detailIndexAndStrings.index,_this.$store.state.match.detailIndexAndStrings.strings);
          }
          _this.$store.commit('isSigninTools',false)
      },
      //选择队伍其他战队向上的距离
    // getTeamListTop(box,index,strings){
    //   console.log('我的高度',this.computeheight)
    //   for(var i=0;i<box.length;i++){
    //     if(box[i].attributes['style']){
    //       box[i].removeAttribute('style')
    //     }
    //   }
    //     for(var i=0;i<box.length;i++){
    //       if(i==index){
    //         box[i].classList.add('active');
    //           if(strings.indexOf('.')<0){
    //             for(var h=index+3;h<index+6&&h<box.length;h++){
    //               box[h].style.marginTop=this.computeheight+'px'
    //             }
    //           }else if(strings.indexOf('333')>0){
    //             for(var h=index+2;h<index+5&&h<box.length;h++){
    //               box[h].style.marginTop=this.computeheight+'px'
    //             }
    //           }else if(strings.indexOf('666')>0){
    //             for(var h=index+1;h<index+4&&h<box.length;h++){
    //               box[h].style.marginTop=this.computeheight+'px'
    //             }
    //           }
    //       }

    //   }

    // },

    getTeamListTop(box,index,strings){
    let eboxs =document.getElementsByClassName('guessmain-pubg-guess-list');
    let boxIndex=this.$store.state.match.choiceBoxNodeIndex;
    for(var i=0;i<eboxs.length;i++){
      if(i!=boxIndex){
        console.log('我在吗')
        let boxChild= eboxs[i].getElementsByClassName('guessmain-pubg-guess-same');
        for(var h=0;h<boxChild.length;h++){
          if(boxChild[h].attributes['style']){
            boxChild[h].removeAttribute('style')
          }
          if(boxChild[h].classList.contains('active')){
            boxChild[h].classList.remove('active');
          }
        }
      }
    }
    for(var i=0;i<box.length;i++){
      if(box[i].attributes['style']){
        box[i].removeAttribute('style')
      }
    }
    for(var i=0;i<box.length;i++){
      if(i==index){
        box[i].classList.add('active');
          if(strings.indexOf('.')<0){
            for(var h=index+4;h<index+8&&h<box.length;h++){
              box[h].style.marginTop=this.computeheight+'px'
            }
          }else if(strings.indexOf('.25')>0){
            for(var h=index+3;h<index+7&&h<box.length;h++){
              box[h].style.marginTop=this.computeheight+'px'
            }
          }else if(strings.indexOf('.5')>0){
            for(var h=index+2;h<index+6&&h<box.length;h++){
              box[h].style.marginTop=this.computeheight+'px'
            }
          }else if(strings.indexOf('.75')>0){
            for(var h=index+1;h<index+5&&h<box.length;h++){
              box[h].style.marginTop=this.computeheight+'px'
            }
          }
      }
    }
  },
    reduceNum:function(){
          if(parseInt(this.$refs.inputValue.value)>1){
            this.items.datasum=this.items.datasum-1;
          }
    },
    plusNum:function(){
      if(parseInt(this.$refs.inputValue.value)<parseInt(this.$refs.inputValue.getAttribute('data-max'))){
        this.items.datasum=this.items.datasum+1;
      }
    },
  },
  watch:{
      items:{
        handler:function(val,oldval){
          if(val.datasum>0){
            if(val.datasum<=parseInt(this.$refs.inputValue.getAttribute('data-max'))){
              return val.datasum=parseInt(val.datasum);
            }else{
                console.log(this.$refs.inputValue.getAttribute('data-max'))
              val.datasum=parseInt(this.$refs.inputValue.getAttribute('data-max'));
            }
          }else{
            val.datasum='1';
          }
        },
        deep:true
      }

  },
  mounted () {
//      console.log(this.$store.state.match.isSigninTools.value)
  },
  computed: {
    isSigninTools:function(){
      return this.$store.state.match.isSigninTools;
   },
   getchoiceteamIndex:function(){
      return this.$store.state.match.choiceTeamIndex;
    },
    getThisUserMarginTop:function(){
      let choiceIndex =this.getchoiceteamIndex
      let teamLength =this.getTeamLen;
      if(this.getchoiceteamIndex){
        console.log('取整',parseInt(choiceIndex/3),parseInt(teamLength/3))
        if(parseInt(choiceIndex/3)==parseInt(teamLength/3)){
          // return this.$store.state.match.pubgmarginTop
           if(this.$store.state.match.choiceTeamType=='cai'){
              return 251
            }else{
            return 207+this.getMyTollsHeight+this.getPullTollsHeight
            }
        }else{
          return 0;
        }
      }else{
        return 0;
      }


    },
    getMyTollsHeight:function(){
      return this.$store.state.match.myToolsHeight;
    },
    getPullTollsHeight:function(){
      // setTimeout(()=>{})
      return this.$store.state.match.pullToolsHeight;
    },
    computeheight:function(){
      let matgintopH =0;
      console.log(this.$store.state.match.choiceTeamType,'类型')
      if(this.$store.state.match.choiceTeamType=='cai'){
        matgintopH=291
      }else{
        console.log('this.getMyTollsHeight',this.getMyTollsHeight,)
       matgintopH=257+this.getMyTollsHeight+this.getPullTollsHeight;
      }
      return matgintopH
    },

  }
}
</script>
<style lang="scss" scoped src="@/assets/css/guessDetail.css"></style>
<style lang="scss" scoped>
#signin{
    .wrap_signin{
        .signinreward{
            width:230px;
            height: 116px;
            margin:0 auto;
            margin-top:30px;
            padding-top: 30px;
            .successinfo{
                padding-top:10px;
               line-height: 30px;
            }
        }
        .enter{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            margin-left:74px;
            background-image: url('../../assets/images/mygrand/enter.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hoverenter.png');
            }
        }
        .cancel{
            display: block;
            width:96px;
            height:34px;
            margin:0 auto;
            margin-top:15px;
            margin-right:72px;
            border-radius: 3px;
            border: 1px solid #e1c076;
            line-height: 33px;
            font-size: 16px;
            &:hover{
                background-color: #706857;
            }
        }
    }
}
</style>

