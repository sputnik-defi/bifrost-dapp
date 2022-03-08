export class Tezos {
  constructor(tzs, address, wavaxAddress, wusdcAddress) {
    this.tzs = tzs;
    this.address = address;
    this.wavaxAddress = wavaxAddress;
    this.wusdcAddress = wusdcAddress;
  }

  async tokenBalance(tokenContract) {
    const contract = await this.tzs.wallet.at(tokenContract);
    const account = await contract.methods.getAccount(this.address).send();

    return account.balance;
  }

  async burnWAVAX(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wavaxAddress);
    await contract.methods.burn(amount, destination);
  }

  async burnWUSDC(amount, destination) {
    const contract = await this.tzs.wallet.at(this.wusdcAddress);
    await contract.methods.burn(amount, destination);
  }
}
