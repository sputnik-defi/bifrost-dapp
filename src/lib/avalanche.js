export class Avalanche {
  constructor(web3, address, lockerAbi, contract) {
    this.web3 = web3;
    this.address = address;
    this.lockerContract = null;

    if (contract !== "") {
      this.lockerContract = new this.web3.eth.Contract(lockerAbi, contract);
    }
  }

  async balance() {
    return await this.web3.eth.getBalance(this.address);
  }

  async tokenBalance(abi, address) {
    let contract = new this.web3.eth.Contract(abi, address);
    return await contract.methods.balanceOf(this.address).call();
  }

  async lockAVAX(amount, destination) {
    return await this.lockerContract.methods.lockAVAX(destination).send({
      from: this.web3.eth.accounts[0],
      value: this.web3.utils.toWei(amount), // 1 AVAX == 10^18
    });
  }

  async lockUSDC(amount, destination) {
    return await this.lockerContract.methods
      .lockUSDC(amount, destination)
      .send();
  }
}
