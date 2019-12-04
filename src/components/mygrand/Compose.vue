<template>
  <div id="compose">
    <div class="myBag">
      <div class="myBag-gameList">
        <ul>
          <li v-for="(item,index) in Compose" @click="tab(index)" :class="{active:index==composenum}" :data-id="item.id" class="fl" :key="item.id">{{item.compose}}</li>
          <li class="myBag-myNum fr" >
            <span class="myBag-myNum-name inline-block ">拥有碎片</span>
            <div class="inline-block" v-if="mybag">
              <img src="../../assets/images/myBag/suipian-icon.png" class="myBag-myNum-icon">
              <span class="myBag-myNum-num" v-if="mybag!=''&&mybag[0].product_id==0">{{thousandBitSeparator(mybag[0].product_count)}}</span>
              <!--<span class="myBag-myNum-num" v-for="(item,index) in mybag" v-if="item.product_id==0">{{item.product_count}}</span>-->
              <span class="myBag-myNum-num" v-if="mybag==''|| mybag[0].product_id!=0">0</span>
            </div>
            <i class="clear"></i>
          </li>
          <i class="clear"></i>
        </ul>
        <i class="clear"></i>
      </div>
    </div>

    <div class="myBag-gameLol" v-show="showLol">
      <div class="myBag-gameLol-list">
        <ul v-if="compose_lol">
          <li class="myBag-gameLol-list-li" v-for="(item,index) in compose_lol" :data-index="index" :data-quality="item.quality" :data-id="item.id" :key="item.id">
            <div class="compose-ordinary fl" ref="composequality" v-if="item.quality==1"><img :src="item.product_small_pic"></div>
            <div class="compose-superior fl" ref="composequality" v-if="item.quality==2"><img :src="item.product_small_pic"></div>
            <div class="compose-tate fl" ref="composequality" v-if="item.quality==3"><img :src="item.product_small_pic"></div>
            <div class="compose-story fl" ref="composequality" v-if="item.quality==4"><img :src="item.product_small_pic"></div>
            <div class="compose-immortal fl" ref="composequality" v-if="item.quality==5"><img :src="item.product_small_pic"></div>
            <div class="compose-eternity fl" ref="composequality" v-if="item.quality==6"><img :src="item.product_small_pic"></div>
            <div class="gameLol-list-text fl">
              <span class="gameLol-list-text-name block">{{item.product_name}}</span>
              <img src="../../assets/images/myBag/suipian-icon.png" class="gameLol-list-text-icon">
              <span class="gameLol-list-text-num inline-block" ref="composelol" :data-sum="item.cprice">{{thousandBitSeparator(item.cprice)}}</span>
            </div>
            <div class="gameLol-list-num  fl" style="margin: 25px">
              <i @click="Composeminus($event)"><img src="../../assets/images/myBag/close.png"></i>
              <input ref="inputCompose" type="text" class="gameLol-list-numText" :value="1" readonly >
              <i @click="Composeplus($event)" ><img src="../../assets/images/myBag/add.png"></i>
            </div>
            <div class="gameLol-list-price fl" >
              <span class="gameLol-list-price-name">消耗碎片</span>
              <img src="../../assets/images/myBag/suipian-icon.png" class="gameLol-list-price-icon">
              <span class="gameLol-list-price-num inline-block" ref="composelolall" :style="{'color':parseInt(item.cprice)>parseInt(mybag[0].product_count)?'#b11c1c':'#dcdcdc'}" v-if="mybag && mybag.length>0">{{thousandBitSeparator((item.cprice))}}</span>
              <span class="gameLol-list-price-num inline-block" ref="composelolall" :style="{'color':parseInt(item.cprice)>0?'#b11c1c':'#dcdcdc'}" v-else>{{thousandBitSeparator((item.cprice))}}</span>
              <span class="gameLol-list-price-num inline-block" v-if="mybag && mybag.length>0">&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;{{thousandBitSeparator(mybag[0].product_count)}}</span>
              <span class="gameLol-list-price-num inline-block" v-else>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;0</span>
            </div>
            <div class="gameLol-list-btn fr">
              <div class="gameLol-list-btn-compose" @click="PopBtn($event)" ref="mybagId" :data-id="item.id">合成</div>
            </div>
            <i class="clear"></i>
          </li>
        </ul>
        <div class="noInfo" v-else>暂无数据~</div>
      </div>
    </div>
    <div class="myBag-gameDota" v-show="showDota">
      <div class="myBag-gameLol-list">
        <ul v-if="compose_dota">
          <li class="myBag-gameLol-list-li" v-for="(item,index) in compose_dota" :data-index="index" :data-quality="item.quality" :data-id="item.id" :key="item.id">
            <div class="compose-ordinary fl" ref="composequality" v-if="item.quality==1"><img :src="item.product_small_pic"></div>
            <div class="compose-superior fl" ref="composequality" v-if="item.quality==2"><img :src="item.product_small_pic"></div>
            <div class="compose-tate fl" ref="composequality" v-if="item.quality==3"><img :src="item.product_small_pic"></div>
            <div class="compose-story fl" ref="composequality" v-if="item.quality==4"><img :src="item.product_small_pic"></div>
            <div class="compose-immortal fl" ref="composequality" v-if="item.quality==5"><img :src="item.product_small_pic"></div>
            <div class="compose-eternity fl" ref="composequality" v-if="item.quality==6"><img :src="item.product_small_pic"></div>
            <div class="gameLol-list-text fl">
              <span class="gameLol-list-text-name block">{{item.product_name}}</span>
              <img src="../../assets/images/myBag/suipian-icon.png" class="gameLol-list-text-icon">
              <span class="gameLol-list-text-num inline-block" ref="composepri" :data-sum="item.cprice">{{thousandBitSeparator(item.cprice)}}</span>
            </div>
            <div class="gameLol-list-num  fl" style="margin: 25px">
              <i @click="dotaminus($event)"><img src="../../assets/images/myBag/close.png"></i>
              <input ref="dotaCompose" type="text"   class="gameLol-list-numText" :value="1" readonly >
              <i @click="dotaplus($event)" ><img src="../../assets/images/myBag/add.png"></i>
            </div>
            <div class="gameLol-list-price fl" >
              <span class="gameLol-list-price-name">消耗碎片</span>
              <img src="../../assets/images/myBag/suipian-icon.png" class="gameLol-list-price-icon">
              <span class="gameLol-list-price-num inline-block" ref="composeall" :style="{'color':parseInt(item.cprice)>parseInt(mybag[0].product_count)?'#b11c1c':'#dcdcdc'}" v-if="mybag && mybag.length>0">{{thousandBitSeparator(item.cprice)}}</span>
              <span class="gameLol-list-price-num inline-block" ref="composeall" :style="{'color':parseInt(item.cprice)>0?'#b11c1c':'#dcdcdc'}" v-else>{{thousandBitSeparator(item.cprice)}}</span>
              <span class="gameLol-list-price-num inline-block" v-if="mybag && mybag.length>0">&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;{{thousandBitSeparator(mybag[0].product_count)}}</span>
              <span class="gameLol-list-price-num inline-block" v-else>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;0</span>
            </div>
            <div class="gameLol-list-btn fr">
              <div class="gameLol-list-btn-compose" @click="DotaBtn($event)" ref="mybagId" :data-id="item.id">合成</div>
            </div>
            <i class="clear"></i>
          </li>
        </ul>
        <div class="noInfo" v-else>暂无数据~</div>
      </div>
    </div>

  </div>

</template>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  let getCompose=[
    {'compose':'英雄联盟',show:true},
    {'compose':'DOTA2',show:false}
  ]
  export default {
    data () {
      return {
        Compose:getCompose,
        composenum:0,
        showLol:true,
        showDota:false,
        result:1
      }
    },
    methods:{
      thousandBitSeparator(num){
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      },

      tab(index){
        this.composenum = index;
        if(index==0){
          this.showLol=true;
          this.showDota=false;
          let BoxLi=this.$refs.composelolall?this.$refs.composelolall:null;
          for(var i=0;i<BoxLi.length;i++){
            BoxLi[i].innerHTML=this.thousandBitSeparator((this.compose_lol[i].cprice*1));
          }
        }else{
          this.showLol=false;
          this.showDota=true;
          let BoxLi=this.$refs.composeall?this.$refs.composeall:'';
          for(var i=0;i<BoxLi.length;i++){
            BoxLi[i].innerHTML=this.thousandBitSeparator((this.compose_dota[i].cprice*1));
          }
        }
      },
      Composeplus:function (event) {
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _thisInput =this.$refs.inputCompose[_index];
        let _input = _thisInput.value;
        _input++;
        _thisInput.value=_input;
        this.result=_input;
        let _all = this.thousandBitSeparator(parseInt(this.$refs.composelol[_index].getAttribute('data-sum')*_thisInput.value));
        this.$refs.composelolall[_index].innerHTML=_all;
      },
      Composeminus:function (event) {
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _thisInput =this.$refs.inputCompose[_index]
        let _input = _thisInput.value;
        _input--;
        _thisInput.value=_input;
        let _all = this.thousandBitSeparator(parseInt(this.$refs.composelol[_index].getAttribute('data-sum')*_thisInput.value));
        this.$refs.composelolall[_index].innerHTML=_all
        if(_thisInput.value <=1){
          _thisInput.value = 1;
          this.$refs.composelolall[_index].innerHTML=this.$refs.composelol[_index].innerHTML
        }else{

        }
      },
      dotaplus:function (event) {
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _thisInput =this.$refs.dotaCompose[_index];
        let _input = _thisInput.value;
        _input++;
        _thisInput.value=_input;
        let _all = this.thousandBitSeparator(parseInt(this.$refs.composepri[_index].getAttribute('data-sum')*_thisInput.value));
        this.$refs.composeall[_index].innerHTML=_all;
      },
      dotaminus:function (event) {
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _thisInput =this.$refs.dotaCompose[_index]
        let _input = _thisInput.value;
        _input--;
        _thisInput.value=_input;
        let _all = this.thousandBitSeparator(parseInt(this.$refs.composepri[_index].getAttribute('data-sum')*_thisInput.value));
        this.$refs.composeall[_index].innerHTML=_all;
        if(_thisInput.value <=1){
          _thisInput.value = 1;
          this.$refs.composeall[_index].innerHTML = this.$refs.composepri[_index].innerHTML
        }

      },
      PopBtn:function (event) {
        let _this =this
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _input = _this.$refs.inputCompose[_index].value;
        let BoxLi=this.$refs.composelolall;
        let composePop ={
          product_id:el.getAttribute('data-id'),
          product_num:_input
        }
//        this.$store.dispatch('compose_btn',composePop)
        Http.post('/shop/synthesize?XDEBUG_SESSION_START=10601',composePop).then(function (data) {
          if(data.data.code==0){
            let dataOption ={
              'masseges':data.data.message,
              'type':'1',
            };
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
            _this.$store.dispatch('mybag');
            BoxLi[_index].innerHTML=this.thousandBitSeparator((_this.compose_lol[_index].cprice*1))
          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })
      },
      DotaBtn:function (event) {
        let _this =this
        let el = event.currentTarget;
        let _box=el.parentNode.parentNode;
        let _index =_box.getAttribute('data-index');
        let _input = _this.$refs.dotaCompose[_index].value;
        let BoxLi=this.$refs.composeall;
        let composePop ={
          product_id:el.getAttribute('data-id'),
          product_num:_input
        }
        Http.post('/shop/synthesize?XDEBUG_SESSION_START=10601',composePop).then(function (data) {
          if(data.data.code==0){
            let dataOption ={
              'masseges':data.data.message,
              'type':'1',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
            _this.$store.dispatch('mybag');
            BoxLi[_index].innerHTML=this.thousandBitSeparator((_this.compose_dota[_index].cprice*1))
          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })
      },
    },
    mounted () {

      if(!this.$store.state.shop.compose_lol){
      }
      this.$store.dispatch('compose_lol')
      if(!this.$store.state.shop.compose_dota){
      }
      this.$store.dispatch('compose_dota')
      if(!this.$store.state.shop.mybag){
      }
      this.$store.dispatch('mybag')
    },
    computed:{
      compose_btn:function () {
        return this.$store.state.shop.compose_btn?this.$store.state.shop.compose_btn:null
      },
      mybag:function () {
        return this.$store.state.shop.mybag?this.$store.state.shop.mybag:null
      },
      compose_dota:function () {
        return this.$store.state.shop.compose_dota?this.$store.state.shop.compose_dota:null
      },
      compose_lol:function () {
        return this.$store.state.shop.compose_lol?this.$store.state.shop.compose_lol:null
      }
    }
  }
</script>
<style scoped lang="scss">
  .noInfo{
    margin:100px auto;
  }
  .compose-ordinary{
    width: 80px;
    height: 80px;
    border: 1px solid #fff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .compose-superior{
    width: 80px;
    height: 80px;
    border: 1px solid #ade55c;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .compose-tate{
    width: 80px;
    height: 80px;
    border: 1px solid #4b69ff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .compose-story{
    width: 80px;
    height: 80px;
    border: 1px solid #8847ff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .compose-immortal{
    width: 80px;
    height: 80px;
    border: 1px solid #ffa22a;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .compose-eternity{
    width: 80px;
    height: 80px;
    border: 1px solid #b11c1c;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .myBag {
    .myBag-title {
      width: 100%;
      background: url('../../assets/images/myBag/mybag-titler.png') repeat;
      background-position: 104px -23px;
      ul{
        position: relative;
        .myBag-title-name {
          margin: 23px 20px 21px 65px;
          font-size: 20px;
          font-weight: bold;
          color: #cdbe91;
          cursor: pointer;
          transition: all .5s;
        }
        .myBag-title-name:hover{
          color: #e3dbc8;
        }
        .line{
          position: absolute;
          left:147px
        }
        .line1{
          position: absolute;
          left:276px
        }
      }

    }
    .myBag-gameList{
      padding: 16px 47px 0 58px;
      li{
        margin-right: 47px;
        display: inline-block;
        color: #cdbe91;
        font-size: 13px;
        width: 68px;
        text-align: center;
        cursor: pointer;
      }
      .active{
        background: url('../../assets/images/myBag/compose-list.png') no-repeat;
        height: 22px;
        background-position: -15px 20px;
        color: #e3dbc8!important;
      }
      .myBag-myNum{
        width: 200px;
        color: #dcdcdc;
        height: 20px;
        line-height: 20px;
        cursor: auto;
        position: relative;
        left:35px;
        text-align: right;
        .myBag-myNum-name{
          font-weight: bold;
        }
        .myBag-myNum-icon{
          vertical-align: -10px;
        }
        .myBag-myNum-num{
          font-weight: bold;
        }
      }
    }
  }
    .myBag-gameLol-list{
      ul{
        padding: 0 60px;
        .myBag-gameLol-list-li{
          cursor: auto;
          margin: 40px 0 34px;
          .gameLol-list-pic{
            width: 80px;
            height: 80px;
            border: 1px solid #000;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .gameLol-list-text{
            width: 135px;
            padding: 11px;
            line-height: 30px;
            font-size: 13px;
            color: #dcdcdc;
            .gameLol-list-text-icon{
              vertical-align: -11px;
            }
            .gameLol-list-text-name{
              width: 115px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          .gameLol-list-num{
            i{
              cursor: pointer;
              img{
                vertical-align: -7px;
              }
            }
            .gameLol-list-numText{
              width: 139px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              color: #dcdcdc;
              background: #15161a;
              border: 1px solid #515151;
              margin: 0 3px;
            }
          }
          .gameLol-list-price{
            color: #dcdcdc;
            margin: 21px 18px;
            .gameLol-list-price-name{
              font-size: 14px;
            }
            .gameLol-list-price-icon{
              vertical-align: -3px;
              margin-left: 15px;
              position: relative;
              top:7px;
            }
            .gameLol-list-price-num{
              width: 99px;
              text-align: left;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 14px;
              vertical-align: -2px;
            }
          }
          .gameLol-list-btn{
            margin: 29px 0 0 0;
            .gameLol-list-btn-compose{
              width: 70px;
              height: 24px;
              line-height: 24px;
              font-size: 13px;
              color: #dcdcdc;
              text-align: center;
              background: url('../../assets/img/mall/buy.png')  no-repeat;
              background-size: cover;
              transition: all .5s;
              cursor: pointer;
            }
            .gameLol-list-btn-compose:hover{
              background: url('../../assets/img/mall/buy_h.png')  no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }

</style>



