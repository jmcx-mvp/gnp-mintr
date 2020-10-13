<template>
  <div class="wallet-div">

    <div class="row">
      <div class="col text-left wallet-detail-tit">{{ $t("dashboard.wallet.details") }}</div>
    </div>

    <div class="row balance-list-div">
      <div class="col">
        <div class="row">
          <div class="col text-center token-price">{{ $t("dashboard.wallet.balanceList") }}</div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            <img class="balance-logo" :src="'/static/logo/icon.png'" alt=""/>
            {{ $t("token.name") }}
          </div>
          <div class="col text-right">{{tokenBalance}}</div>
        </div>
        <div class="row balance-item-2">
          <div class="col">
            <img class="balance-logo" :src="'/static/token/ETH.svg'" alt=""/>
            {{ $t("token.eth") }}
          </div>
          <div class="col text-right">{{ethBalance}}</div>
        </div>
        <div class="row balance-item-1">
          <div class="col">
            <img class="balance-logo" :src="'/static/logo/icon.png'" alt=""/>
            {{ $t("token.uniName") }}
          </div>
          <div class="col text-right">{{ uniBalance }}</div>
        </div>
      </div>
    </div>

<!--    <div class="row total-token-div">-->
<!--      <div class="col">-->
<!--        <div class="row">-->
<!--          <div class="col text-left token-price">{{ $t("dashboard.wallet.apyTit") }}:</div>-->
<!--          <div class="col text-right token-price">{{ 0 }}%</div>-->
<!--        </div>-->
<!--        <hr class="total-hr">-->
<!--        <div class="row">-->
<!--          <div class="col text-left lock-tran-txt">-->
<!--            {{ $t("dashboard.wallet.apyTxt") }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="row total-token-div">
      <div class="col">
        <div class="row">
          <div class="col text-left token-price">{{ $t("dashboard.wallet.rmTit") }}:</div>
          <div class="col text-right token-price">{{ 1.0 }}x</div>
        </div>
        <hr class="total-hr">
        <div class="row">
          <div class="col text-left lock-tran-txt">
            {{ $t("dashboard.wallet.rmTxt") }}
          </div>
        </div>
      </div>
    </div>

    <div class="row total-token-div">
      <div class="col">
        <div class="row">
          <div class="col text-left token-price">{{ $t("dashboard.wallet.arTit") }}:</div>
          <div class="col text-right token-price">{{ currentRewards }} {{ $t("token.name") }}</div>
        </div>
        <hr class="total-hr">
        <div class="row">
          <div class="col text-left lock-tran-txt">
            {{ $t("dashboard.wallet.arTxt") }}
          </div>
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
  import Decimal from "decimal.js"

  // Import component
  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';

  let opt = chainOpt.opt
  let querying = false

  export default {
    name: "WalletDetails",

    components: {
      Loading
    },

    mounted() {
      setInterval(async _=>{
        if(querying) {
          return
        }

        querying = true
        let balanceInfo = await opt.allBalanceInfo()

        this.ethBalance = balanceInfo.eth
        this.tokenBalance = balanceInfo.gnp
        this.uniBalance = balanceInfo.uni
        this.loading = false

        let stakingInfo = await opt.stakingInfo()
        let roundInfo = await opt.getGeyserRoundInfo()

        this.currentRewards = new Decimal(stakingInfo[0])
                                    .div(roundInfo.totalStaking)
                                    .mul(roundInfo.rewardAmount)
                                    .div(1e18)
                                    .toDP(6, Decimal.ROUND_FLOOR)

        querying = false
      }, 1000)
    },

    data() {
      return {
        tokenBalance: "0",
        ethBalance: "0",
        uniBalance: "0",
        lockedTOKEN: "0",
        currentRewards: "0",
        loading: true,
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wallet-div,
.ratio-div,
.fee-div,
.total-token-div,
.balance-list-div {
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 5px;
  padding: 32px 24px;
}
.ratio-div,
.fee-div,
.total-token-div,
.balance-list-div {
  margin-top: 24px !important;
  padding: 24px 24px;
}
.wallet-detail-tit {
  color: #4ac7c9;
  letter-spacing: 1px;
  font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 40px;
}
.btn-refresh {
  background-color: transparent;
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  padding: 2px 20px 0;
  border-radius: 20px;
  transition: all 0.1s ease-in 0s;
  text-decoration: none;
  color: #4ac7c9;
  float: right;
}
.txt-ratio-tit {
  font-size: 24px;
  color: #4ac7c9;
  line-height: 16px;
  letter-spacing: 1px;
  font-family: apercu-medium, PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 500;
  margin: 0 0 8px;
}
.txt-ratio-txt {
  font-size: 18px;
}
.token-logo {
  height: 24px;
}
.token-price,
.lock-tran-txt {
  margin-left: 8px !important;
  font-size: 16px;
  font-family: apercu-medium, sans-serif;
  font-weight: bold;
  -webkit-box-align: center;
  align-items: center;
  color: #4ac7c9;
}
.total-hr {
  border-bottom: 1px solid #4ac7c9;
}
.lock-tran-txt {
  font-size: 14px;
}
.lock-tran-color-1 {
  margin-top: 8px !important;
  height: 20px;
  //background: rgba(104,101,163,1);
}
.lock-tran-color-2 {
  margin-top: 8px !important;
  height: 20px;
  //background: rgba(58, 59, 116, 1);
}

.balance-item-1,
.balance-item-2 {
  margin-top: 8px !important;
  font-family: "apercu-regular", PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  color: #4ac7c9;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.balance-item-1 {
  //background-color: #1c1a27;
}
.balance-logo {
  height: 14px;
  margin-right: 4px;
}

.go-to-uniswap-btn {
  //background-color: rgb(28, 26, 40);
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 16px 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #4ac7c9;
  border-image: initial;
  border-radius: 2px;
  margin-top: 24px !important;
}
.go-to-uniswap-txt {
  color: #4ac7c9;
}

</style>
