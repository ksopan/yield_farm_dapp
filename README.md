# Project Summary
This is a personal project aimed at educating and familiarizing myself with the Solidity language for smart contracts for the Ethereum blockchain, while interacting with the data with React.js.


I developed this project for a ```Complete DApp - Solidity & React - Blockchain Development``` course on Udemy.

The smart contract allows users to deposit to a Carbon Token (CTK) in a Bank, which in this case is a 'mock Bank', and user can also withdraw CTK into account from Bank. 


Built with with React.js/Solidity/Web3.js 
 

# What's Required

1. Install [MetaMask](https://metamask.io/) into your browser

2. [MetaMask](https://metamask.io/)  network switched from ```Main Ethereum Network``` to ```Ganache```

3. Install [Ganache](https://www.trufflesuite.com/ganache) and follow steps to [set it up](https://www.trufflesuite.com/docs/ganache/quickstart) for local testing with MetaMask.

4. Add mock ether to your account hosted on MetMask using local Ganache test network. 

# Getting Started

1.  CD into your preferred directory and git clone the project:

```bash
$ git clone https://github.com/ksopan/yield_farm_dapp
```
2.  CD into the project and compile solidity codes with truffle:

```bash
truffle migrate --reset
truffle compile
truffle test
```

2. CD into the project and install the dependencies:

```bash
$ npm install 
```

3.  Run project:

```bash
$ npm start
```

## Demo shows successful deposit and withdrawal of 20 CTK.
![](MOV1.gif)
