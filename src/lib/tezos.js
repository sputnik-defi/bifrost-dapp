export class Tezos {
  constructor(tzs, address, wavaxAddress, wusdcAddress) {
    this.tzs = tzs;
    this.address = address;
    this.wavaxAddress = wavaxAddress;
    this.wusdcAddress = wusdcAddress;
  }

  async tokenBalance(tokenContract) {
    const contract = await this.tzs.wallet.at(tokenContract);
    const balance = await contract.views.getBalance(this.address).read();

    return balance;
  }

  async burnWAVAX(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wavaxAddress);
    await contract.methods.burn(amount, destination).send();
  }

  async burnWUSDC(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wusdcAddress);
    await contract.methods.burn(amount, destination).send();
  }

  async estimateBurnWAVAX(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wavaxAddress);
    const op = await contract.methods
      .burn(amount, destination)
      .toTransferParams({});

    const est = this.tzs.estimate.transfer(op);

    return est.totalCost;
  }

  async estimateBurnWUSDC(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wusdcAddress);
    const op = await contract.methods
      .burn(amount, destination)
      .toTransferParams({});

    const est = this.tzs.estimate.transfer(op);

    return est.totalCost;
  }
}
