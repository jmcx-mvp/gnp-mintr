let abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "round",
        "type": "uint256"
      }
    ],
    "name": "claimRewards",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "who",
        "type": "address"
      },
      {
        "name": "round",
        "type": "uint256"
      }
    ],
    "name": "getStakingData",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "rewardToken",
        "type": "address"
      }
    ],
    "name": "redeemRewardsBeforeStart",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "stakeToken",
        "type": "address"
      },
      {
        "name": "maxStakeIn",
        "type": "uint256"
      },
      {
        "name": "minStakeIn",
        "type": "uint256"
      },
      {
        "name": "rewardToken",
        "type": "address"
      },
      {
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "name": "lockBlock",
        "type": "uint256"
      },
      {
        "name": "unlockBlock",
        "type": "uint256"
      }
    ],
    "name": "startNewRound",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "stakeIn",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rounds",
    "outputs": [
      {
        "name": "stakeToken",
        "type": "address"
      },
      {
        "name": "maxStakeIn",
        "type": "uint256"
      },
      {
        "name": "minStakeIn",
        "type": "uint256"
      },
      {
        "name": "rewardToken",
        "type": "address"
      },
      {
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "name": "lockBlock",
        "type": "uint256"
      },
      {
        "name": "unlockBlock",
        "type": "uint256"
      },
      {
        "name": "totalStaking",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "sToken",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "rToken",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "rAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "round",
        "type": "uint256"
      }
    ],
    "name": "NewRound",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "who",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "rToken",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "rAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "round",
        "type": "uint256"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "who",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "sToken",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "sAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "round",
        "type": "uint256"
      }
    ],
    "name": "StakeIn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
]

let address = "0xccd1ab984ba58a5d7ae17662a89050ee1d3fcea3"

export default {
  abi,
  address,
}
