import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import WalletConnectProvider from "@walletconnect/web3-provider";
import * as abiData from "../../../contracts/contract-abis.json";

declare const window: any;
declare let Web3: any;

@Component({
  selector: 'app-donate-page',
  templateUrl: './donate-page.component.html',
  styleUrls: ['./donate-page.component.css']
})
export class DonatePageComponent implements OnInit {

  private readonly donationWalletAddress: string = "0x2A619a181C0386ad26f997a45b2C9C14eB096fa5";

  // html stuff
  togglePopup: boolean = false; // copied popup
  errorMsg: string = "";

  // form stuff
  toggleCoinList: boolean = false;
  coinSelection: string[] = ["FINA", "BNB", "USDT", "BUSD"];
  selectedCoin: string = "FINA";
  selectedAmount = new FormControl("", [
    Validators.pattern("\\d+\\.?\\d*"),
    Validators.required
  ]);

  // web3 stuff
  web3: any;
  accounts: any;
  web3ModalToggle: boolean = false;
  walletConnected: boolean = false;
  correctNetwork: boolean = false;
  wcConnected: boolean = false; // check if user used walletconnect to connect because change network function doesn't work with wallet connect
  currentBalance: number = 0.0;

  // abi's for tokens
  contractABIs: any = (abiData as any).default;

  constructor(
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // pre-create metamask provider if metamask is installed
    if (typeof window.ethereum !== "undefined") {
      this.web3 = new Web3(window.ethereum);

      // register web3 events
      window.ethereum.on("chainChanged", (networkId: any) => {
        this.checkChain();
      });
      window.ethereum.on("accountsChanged", (error: any) => {
        this.checkConnection();
      });
    }
    /* this check can't be done for walletcollect without the connecting popup appearing so for now only metamask gets pre-checked */
    this.checkConnection(); // check if metamask is already connected
  }

  async connectMetamask(): Promise<void> {
    try {
      // create metamask provider
      if (typeof window.ethereum !== "undefined") {
        this.web3 = new Web3(window.ethereum);
      } else {
        this.errorMsg = "MetaMask is not installed!";
      }

      // get connected account
      this.accounts = await this.web3.eth.requestAccounts();
      if (this.accounts.length !== 0) {
        this.closeWeb3Modal();
        this.walletConnected = true;
      }

      // get currently selected token balance
      await this.getCoinBalance();
    } catch (error) {
      if ((error as any).code === 4001) console.log("Connection refused.");
      this.closeWeb3Modal();
      document.getElementById("clickTarget")?.click(); // simulate a click outside when canceling the metamask connection. (because click on metamask cancel button can't be recognized by the website)
    }
  }

  async connectWalletconnect(): Promise<void> {
    // create wallet connect provider for bsc
    const wcProvider = new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
      }
    });
    try {
      // connect wallet
      await wcProvider.enable();
      this.web3 = new Web3(wcProvider);
      this.closeWeb3Modal();
      this.walletConnected = true;

      // get connected account
      this.accounts = await this.web3.eth.getAccounts();
      if (this.accounts.length !== 0) {
        this.wcConnected = true;
      } else {
        this.wcConnected = false;
      }
      this.checkChain();

      // get selected token balance
      this.getCoinBalance();
    } catch (error) {
      console.log(error);
    }

    // register walletconnect events
    try {
      wcProvider.on("disconnect", () => {
        this.walletConnected = false;
        this.web3 = undefined;
        this.errorMsg = "";
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendDonation(): Promise<void> {
    if (this.selectedAmount.errors?.pattern) {
      this.errorMsg = '"Amount" is invalid!';
      return;
    } else if (this.selectedAmount.errors?.required) {
      this.errorMsg = '"Amount" is required!';
      return;
    } else {
      this.errorMsg = "";
    }

    // TODO: do some other checks.
    if (this.selectedAmount.value == 0) {
      this.errorMsg = "Value needs to be > 0";
      return;
    }

    let contract;
    const coin = this.selectedCoin.toLowerCase();
    const amountInWei = this.web3.utils.toWei((this.selectedAmount.value).toString());

    if (coin === "bnb") {
      // for bnb you have to create the transaction yourself
      const rawTx = {
        from: this.accounts[0],
        to: this.donationWalletAddress,
        value: amountInWei,
        //gas: 30000
      }

      // send created transaction
      try {
        const bnbTxReceipt = await this.web3.eth.sendTransaction(rawTx);
        if (bnbTxReceipt) this.getCoinBalance();
      } catch (error) {
        console.log(error);
      }
    } else {
      // if you want to send a token you have to call the contract instead of creating the transaction yourself.
      // create contract instance for selected token
      try {
        contract = new this.web3.eth.Contract(this.contractABIs.contracts[coin].abi, this.contractABIs.contracts[coin].address);
      } catch (error) {
        console.log(error);
      }

      // send token
      try {
        const tokenTxReceipt = await contract.methods.transfer(this.donationWalletAddress, amountInWei).send({
          from: this.accounts[0],
        });
        if (tokenTxReceipt) this.getCoinBalance();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async checkChain(): Promise<void> {
    const networkId = await this.web3.eth.net.getId();
    if (networkId === 56) {
      this.correctNetwork = true;
      this.errorMsg = "";
    } else {
      this.errorMsg = "Wrong network!";
      this.correctNetwork = false;
    }
    this.changeRef.detectChanges();
  }

  async changeChain(): Promise<void> {
    // in case someone selected wrong network with walletconnect
    if (this.wcConnected && !this.correctNetwork) {
      alert("Please re-connect and select the Binance Smart Chain (BSC) Network.");
      return;
    }

    // this works only for metamask
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: this.web3.utils.toHex(56) }],
      });
    } catch (error) {
      console.log(error);
      // TODO: if user didn't add the BSC network yet request to add it (https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods)
    }
  }

  async checkConnection(): Promise<void> {
    if (this.web3) {
      // get connected accounts and if no accounts are connected the returned array will be empty
      const connected = await this.web3.eth.getAccounts();
      if (connected.length !== 0) {
        this.walletConnected = true;
        this.accounts = connected;

        this.checkChain(); // check if correct network selected in metamask
        this.getCoinBalance(); // get current token balance of selected coin
      } else {
        this.walletConnected = false;
        this.web3 = undefined;
        this.changeRef.detectChanges();
      }
    }
  }

  async getCoinBalance(): Promise<void> {
    let contract;
    const coin = this.selectedCoin.toLowerCase();

    // get selected currency
    if (coin === "bnb") {
      // bnb isn't a token so it is handled different
      try {
        const bnbBalance = await this.web3.eth.getBalance(this.accounts[0]);
        this.currentBalance = this.web3.utils.fromWei(bnbBalance);
      } catch (error) {
        console.log(error);
      }
    } else {
      // create contract instance for selected token
      try {
        contract = new this.web3.eth.Contract(this.contractABIs.contracts[coin].abi, this.contractABIs.contracts[coin].address);
      } catch (error) {
        console.log(error);
      }

      // get balance of selected token
      const tokenBalance = await contract.methods.balanceOf(this.accounts[0]).call();
      this.currentBalance = this.web3.utils.fromWei(tokenBalance);
    }
  }

  async selectMaxBalance(): Promise<void> {
    if (this.selectedCoin.toLowerCase() === "bnb") {
      // if selected coin is bnb subtract the gas fee from the balance and the result will be the max value
      try {
        const gasPrice = await this.web3.eth.getGasPrice();
        const txFee = this.web3.utils.fromWei((gasPrice * 30000).toString()) * 1.1;
        this.selectedAmount.setValue(this.currentBalance - txFee);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.selectedAmount.setValue(this.currentBalance);
    }
  }

  selectCoin(coin: string): void {
    this.selectedCoin = coin;
    // check balance and display it
    if (!this.web3) return; // in case a connected user disconnected
    this.getCoinBalance();
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.donationWalletAddress);
      this.togglePopup = true;
      setTimeout(this.hidePopup, 1800, this);
    } catch (error) {
      console.log(error);
    }
  }

  disconnectWallet(): void {
    this.walletConnected = false;
  }

  removeErrorMsg(): void {
    this.errorMsg = "";
  }

  showCoinList(): void {
    this.toggleCoinList = !this.toggleCoinList;
  }

  close(): void {
    this.toggleCoinList = false;
  }

  toggleWeb3Modal(): void {
    this.web3ModalToggle = !this.web3ModalToggle;
  }

  closeWeb3Modal(): void {
    this.web3ModalToggle = false;
  }

  hidePopup(self: any): void {
    self.togglePopup = false;
  }

}
