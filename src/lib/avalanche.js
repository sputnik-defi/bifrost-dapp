export class Avalanche {
  constructor(web3, address) {
    this.web3 = web3;
    this.address = address;
  }

  async balance() {
    return await this.web3.eth.getBalance(this.address);
  }

  async tokenBalance(abi, address) {
    let contract = new this.web3.eth.Contract(abi, address);
    return await contract.methods.balanceOf(this.address).call();
  }
}
