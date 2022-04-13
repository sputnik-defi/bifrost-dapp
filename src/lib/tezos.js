export class Tezos {
  constructor(tzs, address, wavaxAddress, wusdcAddress) {
    this.tzs = tzs;
    this.address = address;
    this.wavaxAddress = wavaxAddress;
    this.wusdcAddress = wusdcAddress;
  }

  async tokenBalance(tokenContract) {
    const contract = await this.tzs.wallet.at(tokenContract);
    const storage = await contract.storage();
    const account = await storage.ledger.get(this.address);
    if (!account) {
      return 0.0;
    }

    return account.balance;
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
    const contract = await this.tzs.contract.at(this.wavaxAddress);
    const op = await contract.methods
      .burn(amount, destination)
      .toTransferParams({});

    const est = await this.tzs.estimate.transfer(op);
    if (!est) {
      return 0.0;
    }

    return est.totalCost;
  }

  async estimateBurnWUSDC(amount, destination) {
    const contract = await this.tzs.contract.at(this.wusdcAddress);
    const op = await contract.methods
      .burn(amount, destination)
      .toTransferParams({});

    const est = await this.tzs.estimate.transfer(op);
    if (!est) {
      return 0.0;
    }

    return est.totalCost;
  }
}
