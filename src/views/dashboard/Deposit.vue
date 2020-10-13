<template>
  <div class="row text-center staking-div">
    <div class="col">
      <div class="row">
        <div class="col">
          <img class="staking-logo" :src="'/static/like-to-do/staking.png'" :alt="$t('token.name')"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="staking-tit">{{ $t("action.deposit") }}</p>
          <p class="staking-txt">{{ $t("dashboard.deposit.txt1") }}</p>
          <p class="staking-txt"><b>{{ eRewards }}{{ $t("dashboard.deposit.txt2") }}</b></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="staking-input-tit">{{ $t("dashboard.deposit.confirm") }}</p>
          <input type="text" v-model="gnpUniAmount" placeholder="0" class="staking-input">
        </div>
      </div>
      <div class="row">
        <div class="col text-left notes-txt">
          {{ $t("dashboard.deposit.require") }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input v-show="enabled" type="submit" class="btn btn-info btn-staking-now" :value="$t('action.deposit')"
                 @click="staking"
          >
          <input v-show="!enabled" type="submit" class="btn btn-info btn-staking-now" :value="$t('action.enable')"
                 @click="enable"
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
import $ from "jquery";
import Decimal from "decimal.js"

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

let opt = chainOpt.opt
export default {
  name: "deposit",
  components:{
    Loading
  },
  props: ["hideStaking", "roundInfo"],
  data() {
    return {
      gnpUniAmount: "0",
      enabled: false,
      willLock: "0",
      loading: false,
    }
  },

  watch: {
    enabled() {
      if(this.enabled) {
        $(this.$el).find(".staking-input").removeAttr("disabled")
      } else {
        $(this.$el).find(".staking-input").attr("disabled", "disabled")
      }
    },
  },

  computed: {
    eRewards() {
      try {
        let amount = parseFloat(this.gnpUniAmount)
        if(!amount || isNaN(amount)) {
          return 0
        }

        let stakeAmount = new Decimal(this.gnpUniAmount).mul(1e18)
        let totalAmount = Decimal(this.roundInfo.totalStaking).add(stakeAmount)
        return stakeAmount.div(totalAmount).mul(this.roundInfo.rewardAmount).div(1e18).toDP(6, Decimal.ROUND_FLOOR)
      } catch (e) {
        return 0
      }
    }
  },

  mounted() {
    $(this.$el).find(".staking-input").attr("disabled", "disabled")

    setTimeout(_=>{
      opt.isStakingEnabled()
              .then(r=>{
                if(r) {
                  this.enabled = true
                }
              })
              .catch(e=>{})
    }, 500)
  },

  methods: {
    async loopCheckEnabled() {
      this.enabled = await opt.isStakingEnabled()
          .then(r=>{
            if(r) {
              return true
            }
          }).catch(e=>{return false})

      if(this.enabled) {
        return
      }

      setTimeout(this.loopCheckEnabled, 15000)
    },

    async enable() {
      this.loading = true

      let enabled = await opt.isStakingEnabled()
      if(enabled) {
        this.enabled = true
        this.loading = false
        return
      }

      enabled = await opt.enableStaking()
                      .catch(e=>{return null})

      this.loading = false
      if(enabled === null) {
        return
      }
      await this.loopCheckEnabled()

    },

    async staking() {
      let enabled = await opt.isStakingEnabled()
      if(!enabled) {
        this.enabled = false
        return
      }

      this.loading = true
      let tx = await opt.staking(this.gnpUniAmount)

      if(tx !== null){
        console.log("transaction send success, tx hash is: ", tx)
      } else {
      }

      this.loading = false
      if(typeof this.hideStaking === "function") {
        this.hideStaking()
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.staking-div {
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

  .staking-logo {
    width: 120px;
    height: 120px;
  }

  .staking-tit {
    font-size: 32px;
    color: #4ac7c9;
    letter-spacing: 2px;
    font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    margin: 12px 0 24px;
  }
  .staking-txt,
  .staking-input-tit {
    font-size: 16px;
    color: #4ac7c9;
    font-family: apercu-regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
  .staking-input-tit {
    margin-top: 12px;
  }
  .staking-input {
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
    color: #4ac7c9;
    line-height: 18px;
    letter-spacing: 0.5px;
    font-family: apercu-regular, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
  .btn-staking-now {
    margin-top: 32px;
    width: 100%;
    height: 72px;
    text-transform: uppercase;
    cursor: pointer;
    //background-color: rgb(114, 124, 255);
    border-radius: 5px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    transition: all 0.1s ease-in 0s;
  }
}
</style>
