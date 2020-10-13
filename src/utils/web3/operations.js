import ETHWallet from "./ethWallet";
import MYContract from "./erc20Token"
import geyser from "./geyser"
import Decimal from "decimal.js"

import * as addrInfo from "./constant"

import {onChainCall, offChainCall} from "./common";

let myToken = null
let uniToken = null
let geyserContract = null
let tokenDecimals = new Decimal(10).pow(MYContract.decimals)

function loadTOKEN() {
  if(myToken === null) {
    let web3Instance = ETHWallet.getWeb3Instance()
    myToken = new web3Instance.eth.Contract(MYContract.abi, MYContract.getAddress())
    uniToken = new web3Instance.eth.Contract(MYContract.abi, MYContract.getUni())
  }
}

function loadGeyser() {
  if(geyserContract === null) {
    let web3Instance = ETHWallet.getWeb3Instance()
    geyserContract = new web3Instance.eth.Contract(geyser.abi, geyser.address)
  }
}

async function commonApprove(amount) {
  return await onChainCall(
    uniToken,
    ETHWallet.getAccount(),
    "approve",
    [geyser.address, amount],
  )
}

async function enableStaking() {
  if(!ETHWallet.isConnected()) {
    return
  }

  if(!myToken) {
    loadTOKEN()
  }

  Decimal.set({ toExpPos: 256 })
  let maxApprove = new Decimal("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
  return commonApprove(geyser.address, maxApprove.toString())
}

async function commonERC20Balance(contract, address, outDecimal) {
  let result = await offChainCall(contract, address, "balanceOf", [address])
  if(result !== null) {
    result = new Decimal(result).div(tokenDecimals)
  } else {
    result = new Decimal(0)
  }

  return outDecimal ? result:result.toDP(6, Decimal.ROUND_DOWN).toString()
}

async function allBalanceInfo() {
  loadTOKEN()
  let address = ETHWallet.getAccount()

  let gnp = await commonERC20Balance(myToken, address, false)
  let uni = await commonERC20Balance(uniToken, address, false)
  let eth = await ethBalance(false)

  return {
    gnp,
    uni,
    eth,
  }
}

async function getNextRound() {
  loadGeyser();
  let address = ETHWallet.getAccount()
  return await offChainCall(geyserContract, address, "nextRound", [])
}

async function getGeyserRoundInfo(rIdx = null) {
  loadGeyser();

  if(rIdx === null) {
    rIdx = await getNextRound()
    rIdx = rIdx - 1
  }

  let address = ETHWallet.getAccount()
 return await offChainCall(geyserContract, address, "rounds", [rIdx])
}

async function claim(rIdx = null) {
  if(!ETHWallet.isConnected()) {
    return null
  }


  if(rIdx === null) {
    rIdx = await getNextRound()
    rIdx = rIdx - 1
  }

  return await onChainCall(
    geyserContract,
    ETHWallet.getAccount(),
    "claimRewards",
    [rIdx],
  )
}

async function ethBalance(outDecimal) {
  let address = ETHWallet.getAccount()
  let result = await ETHWallet.getWeb3Instance().eth.getBalance(address)
    .catch(e=>{return null})
  if(result !== null) {
    result = new Decimal(result).div(1e18)
  } else {
    result = result = new Decimal(0)
  }

  return outDecimal ? result:result.toDP(6, Decimal.ROUND_DOWN).toString()
}

async function load(tokenAddress) {
  MYContract.setTokenAddress(tokenAddress)
  return ETHWallet.loadWallet()
}

async function isStakingEnabled() {
  if(!myToken) {
    loadTOKEN()
  }

  let owner = ETHWallet.getAccount()
  let result = await offChainCall(uniToken, owner, "allowance", [owner, geyser.address])

  if(result !== null) {
    let amount = new Decimal(result).div(tokenDecimals)
    return amount.gt(0)
  } else {
    return false
  }
}

async function staking(amount) {
  if(!ETHWallet.isConnected()) {
    return null
  }

  let stakeAmount = new Decimal(amount).mul(1e18)
  Decimal.set({ toExpPos: 256 })
  stakeAmount = stakeAmount.floor().toString()
  return await onChainCall(
    geyserContract,
    ETHWallet.getAccount(),
    "stakeIn",
    [stakeAmount],
  )
}

async function stakingInfo(rIdx = null) {
  loadGeyser()

  if(rIdx === null) {
    rIdx = await getNextRound()
    rIdx = rIdx - 1
  }

  let user = ETHWallet.getAccount()
  return await offChainCall(geyserContract, user, "getStakingData", [user, rIdx])
}

export default {
  load,

  ethBalance,
  commonERC20Balance,
  allBalanceInfo,

  isStakingEnabled,
  enableStaking,
  staking,
  claim,

  getGeyserRoundInfo,
  getNextRound,
  stakingInfo,
}
