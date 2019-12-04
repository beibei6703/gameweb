<template>
  <div id="compete">
    <div class="box">
      <div class="tabs" v-if="flag">
        <p @click="tabs(1)">用户参与预测规则</p>
        <p @click="tabs(2)">如何进行一场预测</p>
        <p @click="tabs(3)">C币、道具赔付问题</p>
        <p @click="tabs(4)">为什么选择的队伍变了</p>
      </div>
      <!-- 用户参与预测规则 -->
      <div v-if="num==1&&!flag" class="rule">
        <div class="title">用户参与预测规则</div>
        <p>任何用户在丰收网进行预测比赛均默认同意以下所有条例：</p>
        <p>用户参与预测规则：</p>
        <p>(1) 每个道具价值以平台售价为准，相应道具赠送方式由丰收网平台决定，以C币虚拟货币购买。</p>
        <p>(2)道具碎片无法直接用于预测，需合成皮肤卡才可进行预测。</p>
        <p>(3)道具参与预测都将以道具赔付，小于最小道具价值，则赔付道具碎片。</p>
        <p>(4)C币预测最低限额为100，最高限额为2.000.000，道具预测最低限额为最小价值道具，最高限额为2.000.000C的道具价值，预测金额超过限制默认预测最大额度。</p>
        <p>(5)在比赛封盘前您可以参与预测或更换已预测的队伍。对于未按时开始的比赛，我们会视情况延迟预测关闭时间;对于赛事主办方未通知情况下提前开始的比赛，我们也会及时关闭预测。请及时调整自己的预测，以免造成不必要的损失。</p>
        <p>(6)由于网络等特殊原因可能会导致预测后无法在网站上显示预测记录，这将不计入有效预测，因此请预测后及时关注预测记录，如有未显示预测记录的请及时反馈。</p>
        <p>(7)1血：指比赛中哪方队伍获得第一滴血(根据预测内的系统提示判定，如未提示则取消)。</p>
        <p>(8)1塔：指比赛中哪方队伍首先拆除对方第一座防御塔(根据预测内的系统提示判定，如未提示则取消)。</p>
        <p>(9)首大龙：指比赛中哪方队伍首先击杀第一条大龙(根据预测内的系统提示判定，如未提示则取消)。</p>
        <p>(10)首小龙：指比赛中哪方队伍首先击杀第一条小龙(根据预测内的系统提示判定，如未提示则取消)。</p>
        <p>丰收网预测结算规则：</p>
        <p>(1)预测页面的重要信息错误(包括赛事名称、对阵双方、比赛回合等，不包括比赛开始时间)，无论比赛是否已经开始，均取消预测(退还参与的道具、C币)，丰收网不会中途改变预测页面的信息描述。 </p>
        <p>(2)如有队伍赛前弃权，或者赛前由于特殊原因被判负，虽然赛事方判该队伍为负，但是我们会取消相关的所有预测(这里的“赛前”包含系列赛首局比赛的BP阶段结束之前的所有阶段)。 </p>
        <p>(3)在比赛进行的时候，出现赛事方判负，丰收网会按不同情况进行结算处理，具体如下(此条同时适用于英雄联盟、DOTA2、CSGO、绝地大逃杀的比赛)： </p>
        <p>① BO1 的比赛中，如 A 在BP阶段之后的比赛中被判负，则预测算作 B 赢。 </p>
        <p>② BO2 或 BO3 的比赛中，如第1局比赛 A 被判负，则预测算作 A 负1局，接下来所有局比赛若正常进行则正常结算;若一并判负则按 A 0:1 B 的结果结算A队让分和第1局胜负预测，并取消其他未结算的相关预测; </p>
        <p>③ BO2 或 BO3 的比赛中，如 B 已经赢了一局， A 弃权或被判负接下来的比赛，则预测算作 B 赢;如 B 队已经赢了一局，这时 B 弃权或被判负，则取消其他未结算的相关预测; </p>
        <p>④ BO5 的比赛中，如 B 已经赢了两局， A 弃权或被判负接下来的比赛，则预测算作 B 赢;如 B 队已经赢了两局，这时 B 弃权或被判负，则取消其他未结算的相关预测; </p>
        <p>(4)对于比赛进行中出现突发状况，赛事方安排进行重赛，这种比赛预测我们会保留;如果该场比赛超过24小时仍未进行，我们将进行取消处理;如果我们联系官方确认这场比赛在24小时之后，我们可能会提前取消。 </p>
        <p>(5)对于实际已经开始的比赛，但依然可以参与的预测(距离预测设置的比赛开始时间大于5分钟)，若比赛已经诞生第一滴血，或者已经BP结束后该比赛进行了5分钟以上，则会取消预测。(出现该情况有可能比赛是线下局域网进行，无法观战且没有及时的直播流，也可能是主办方没有通知临时提前开赛，或者是我们工作人员失误导致)。 </p>
        <p>(6)对于替补问题，无论参赛队伍有多少个替补上场，只要代表的队伍没有变更，都不影响预测，预测结算正常进行。 </p>
        <p>(7)预测结算尊重比赛(预测)事实，而不是简单依据主办方对于赛事结果的判决，其他网站对预测的处理我们也只做参考。并且对于已经进行完的比赛，由于其他原因造成赛后对该比赛进行重新判罚，我们将不做参考，按照已经完成的比赛事实进行结算。 </p>
        <p>(8) GG 不是判定胜负的唯一标准，目前的比赛存在误打 GG 的现象，赛事主办方对于这种现象的判罚也是不一致的，例如： </p>
        <p>①第五届超新星的时候TongFu上高团灭对手，并且破掉最后一路高地，对手无法买活，TongFu只要等最多1分钟，对手基地就会被拆掉，但是TongFu手误打出了 GG ，预测系统判定TongFu负，但赛事主办方判TongFu胜，这种情况相关的预测计为TongFu获胜。 </p>
        <p>② SL10 预选的时候，VP 必赢的局面，拆对方基地兴起，意外打出了GG，赛后赛事主办方判VP负，这种情况相关预测也计为VP获胜。 </p>
        <p>对于这种比赛，丰收网遵循比赛事实进行结算，并非是预测结果以及主办方的判罚。 </p>
        <p>(9)对于某些提前确定结果的预测，我们将视情况提前结算。 </p>
        <p>(10)若遇到特殊情况，我们将保留预测的“进行中”状态，商讨之后再结算比赛。 </p>
        <p>(11)对于已经结算完的比赛，由于不可抗因素造成赛后对该比赛进行重新判罚，丰收网将不做参考，按照已经完成的比赛事实进行结算。 </p>
        <p>丰收网致力于打造一个美好趣味的娱乐氛围。为了保证丰富的内容和有趣的氛围，现制定如下预测聊天区规则，还请各玩家们严格遵守。</p>
        <p>(1)富强、民主、文明、和谐、自由、平等、公正、法制、爱国、敬业、诚信、友善;</p>
        <p>(2)不得使用不文明，不健康，带有政治，色情，暴力，广告等内容情节严重者永久禁言。</p>
        <p>(3)预测聊天区禁止以下几类言论，如有发现根据情节严重者禁言24小时起，屡教不改者永久禁言。</p>
        <p>禁止恶意人生攻击、各种毫无目的的谩骂，根据情节严重性禁言处罚，最高永久禁言。</p>
        <p>禁止发布不实/煽动性话题钓鱼的内容，根据情节严重性禁言处罚，最高永久禁言。</p>
        <p>禁止发布带有广告或链接等目的性的消息，根据情节严重性禁言处罚，最高永久禁言。</p>
        <p>(4)作为丰收网的用户，都享有监督管理，投诉举报，改进的权利，如果永久禁言的用户有疑问，可加官方客服进行陈述。</p>
        <p>若出现其他未提及的情况，经预测板块管理团队决议判断，如果认定违规，则同样给予相应的惩罚。</p>
        <p>请各位玩家珍惜丰收网这样一个轻松娱乐的平台，共同维护平台的健康成长!</p>
        <p>丰收网保留对规则的最终解释权以及随时修改规则的必要。</p>
      </div>
      <!-- 如何进行一场预测 -->
      <div v-if="num==2&&!flag" class="compete">
        <div class="title">如何进行一场预测</div>
        <p>进入预测板块，挑选一场比赛。注：比赛时间小于5分钟以及进行中或已结束的比赛是无法预测的</p>
        <img src="../../assets/images/Question-images/image001.jpg" alt="" width="800px">
        <p>比赛预测可以使用C币或者道具进行预测</p>
        <p>第一步：选中该比赛中您所要预测的题目如：猜输赢、一血、第一局10杀等等</p>
        <img src="../../assets/images/Question-images/image003.jpg" alt="">
        <p>第二步：选中该预测题目中您所要支持的队伍</p>
        <img src="../../assets/images/Question-images/image005.jpg" alt="">
        <p>第三步：投注您所要预测的C币金额、道具数量，完成预测</p>
        <img src="../../assets/images/Question-images/image007.jpg" alt="">
      </div>
      <!-- C币、道具赔付问题 -->
      <div v-if="num==3&&!flag" class="compensation">
        <div class="title">C币、道具赔付问题</div>
        <p>本网站预测采用对冲型比分计算，预测题目中显示的比分均为网站显示比分为准</p>
        <img src="../../assets/images/Question-images/compensation.jpg" alt="">
      </div>
      <!-- 为什么选择的队伍变了 -->
      <div v-if="num==4&&!flag" class="change">
        <div class="title">为什么选择的队伍变了</div>
        <p>每个用户的预测记录都可以在相应的预测题目下查看，建议所有用户在参与预测或换队后，仔细核查当前预测队伍。</p>
        <p>丰收网在此声明不会更改、也没有必要更改任何人的游戏记录，所有以“莫名被换队”这类为由进行申诉，将不予受理。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    tabs(num) {
      this.num = num;
      this.$store.dispatch("flag", false);
    }
  },
  computed: {
    flag: function() {
      return this.$store.state.news.flag;
    }
  }
};
</script>

<style scoped lang='scss'>
#compete {
  width: 925px;
  float: left;
  margin-bottom: 50px;
  .box {
    width: 925px;
    .tabs {
      width: 925px;
      height: 737px;
      padding-top: 32px;
      background-color: #242628;
      p {
        height: 50px;
        line-height: 50px;
        width: 100%;
        font-size: 16px;
        padding-left: 84px;
        text-align: left;
        position: relative;
        cursor: pointer;
        &:hover {
          color: #e1c076;
          &:before {
            background-color: #e1c076;
          }
        }
        &:before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #dcdcdc;
          top: 21px;
          position: absolute;
          left: 60px;
        }
      }
    }
    // 高度大于737px
    .compete,
    .rule {
      width: 100%;
      padding: 0 60px;
      text-align: left;
      background-color: #242628;
      padding-bottom: 50px;
      .title {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 18px;
        color: #dcdcdc;
        font-weight: bold;
        background: url("../../assets/images/Question-images/accountcut.png") 0
          bottom no-repeat;
      }
      p {
        margin: 50px 0px;
        font-size: 14px;
        line-height: 20px;
        span {
          color: red;
        }
        &:first-child {
          margin-top: 40px;
        }
      }
    }
    // 高度小于737px
    .compensation,
    .change {
      width: 100%;
      padding: 0 60px;
      text-align: left;
      height: 737px;
      background-color: #242628;
      padding-bottom: 50px;
      .title {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 18px;
        color: #dcdcdc;
        font-weight: bold;
        background: url("../../assets/images/Question-images/accountcut.png") 0
          bottom no-repeat;
      }
      p {
        margin: 50px 0px;
        font-size: 14px;
        line-height: 20px;
        &:first-child {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>