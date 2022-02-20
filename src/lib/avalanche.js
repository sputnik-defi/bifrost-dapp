export class Avalanche {
  constructor(web3, address) {
    this.web3 = web3;
    this.address = address;
  }

  async balance() {
    return this.web3.eth.getBalance(this.address);
  }

  async tokenBalance(tokenContract) {
    return await tokenContract.methods.balanceOf(this.address).call();
  }
}
