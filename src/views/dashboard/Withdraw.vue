<template>
  <div class="row text-center claim-div">
    <div class="col">
      <div class="row">
        <div class="col">
          <img class="claim-logo" :src="'/static/like-to-do/withdraw.png'" :alt="$t('token.name')"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="claim-tit">{{ $t("action.withdraw") }}</p>
          <p class="claim-txt">{{ $t("dashboard.withdraw.amount") }}<b>{{ stakingAmount }} ${{$t("token.uniName") }}</b></p>
          <p class="claim-txt">{{ $t("dashboard.withdraw.claim") }}<b>{{ gnpRewards }} {{$t("token.name") }}</b></p>
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="col">-->
<!--          <p class="claim-input-tix">{{ $t("dashboard.withdraw.confirm") }}</p>-->
<!--          <input type="text" placeholder="0.00" class="claim-input">-->
<!--        </div>-->
<!--      </div>-->
      <div class="row">
        <div class="col text-left notes-txt">
          {{ $t("dashboard.withdraw.require") }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="eth-fees-txt">&nbsp;</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="submit" class="btn btn-info btn-claim-now" :value="$t('action.withdraw')"
                 @click="claim"
          >
        </div>
      </div>
    </div>

    <loading :active.sync="loading"
             :can-cancel="false"
             :is-full-page="true"></loading>
  </div>
</template>

<script>
import chainOpt from "../../utils/web3/chainOperation";

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Decimal from "decimal.js";

let opt = chainOpt.opt
export default {
  name: "Withdraw",
  props: ["hideWithdraw", "roundInfo", "stakingInfo"],

  components: {
    Loading
  },

  data(){
    return {
      willClaim: "0",
      loading: false,
    }
  },

  computed: {
    stakingAmount() {
      return new Decimal(this.stakingInfo[0]).div(1e18).toDP(6, Decimal.ROUND_FLOOR).toString()
    },


    gnpRewards() {
      return new Decimal(this.stakingInfo[0])
          .div(this.roundInfo.totalStaking)
          .mul(this.roundInfo.rewardAmount)
          .div(1e18)
          .toDP(6, Decimal.ROUND_FLOOR)
    }
  },

  methods: {
    async claim() {
      this.loading = false
      this.loading = true
      await opt.claim()
      this.loading = false

      if(typeof this.hideWithdraw === "function") {
        this.hideWithdraw()
      }
    }
  },
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.claim-div {
  //background-color: rgb(28, 26, 40);
  box-shadow: rgba(100, 210, 240, 0.3) 0 5px 10px 5px;
  flex: 1 1 0;
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 5px;
  transition: transform 0.2s ease-in 0s;
  margin: 8px !important;
  padding: 24px;

  .claim-logo {
    width: 120px;
    height: 120px;
  }

  .claim-tit {
    font-size: 32px;
    color: #4ac7c9;
    letter-spacing: 2px;
    font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    margin: 12px 0 24px;
  }
  .claim-txt,
  .claim-input-tix {
    font-size: 16px;
    color: #4ac7c9;
    font-family: apercu-regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
  .claim-input-tix {
    margin-top: 12px;
  }
  .claim-input {
    width: 100%;
    height: 54px;
    //background-color: rgb(28, 26, 40);
    font-size: 24px;
    color: #4ac7c9;
    padding: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: #4ac7c9;
    border-image: initial;
    border-radius: 20px;
    outline: none;
    margin-bottom: 12px;
  }

  .notes-txt,
  .eth-fees-txt {
    font-size: 10px;
    color: rgb(148, 146, 196);
    line-height: 18px;
    letter-spacing: 0.5px;
    font-family: apercu-regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  .btn-claim-now {
    width: 100%;
    height: 72px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #4ac7c9;
    border-radius: 5px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    transition: all 0.1s ease-in 0s;
  }
}
</style>
