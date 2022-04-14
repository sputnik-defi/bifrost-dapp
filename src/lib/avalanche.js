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
    let amt = this.web3.utils.toWei(amount.toString());
    return await this.lockerContract.methods.lockAVAX(destination).send({
      from: this.address,
      value: amt,
    });
  }

  async lockUSDC(amount, destination) {
    let amt = this.web3.utils.toWei(amount.toString());
    return await this.lockerContract.methods
      .lockUSDC(amt, destination)
      .send({ from: this.address });
  }

  async estimateLockAVAX(amount, destination) {
    if (!this.lockerContract || amount <= 0) {
      return 0.0;
    }

    let amt = this.web3.utils.toWei(amount.toString());

    return await this.lockerContract.methods
      .lockAVAX(destination)
      .estimateGas({ from: this.address, value: amt });
  }

  async estimateLockUSDC(amount, destination) {
    if (!this.lockerContract) {
      return 0.0;
    }

    let amt = this.web3.utils.toWei(amount.toString());

    return await this.lockerContract.methods
      .lockUSDC(amt, destination)
      .estimateGas();
  }
}
