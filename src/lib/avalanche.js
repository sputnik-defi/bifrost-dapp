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
      value: this.web3.utils.toWei(amount),
    });
  }

  async lockUSDC(amount, destination) {
    return await this.lockerContract.methods
      .lockUSDC(amount, destination)
      .send();
  }

  async estimateLockAVAX(amount, destination) {
    if (!this.lockerContract || amount <= 0) {
      return 0.0;
    }

    return await this.lockerContract.methods
      .lockAVAX(destination)
      .estimateGas({ value: this.web3.utils.toWei(amount.toString()) });
  }

  async estimateLockUSDC(amount, destination) {
    if (!this.lockerContract) {
      return 0.0;
    }

    return await this.lockerContract.methods
      .lockUSDC(amount, destination)
      .estimateGas();
  }
}
