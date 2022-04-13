export class ReadOnlySigner {
  constructor(pkh, pk) {
    this.pkh = pkh;
    this.pk = pk;
  }

  async publicKey() {
    return this.pk;
  }
  async publicKeyHash() {
    return this.pkh;
  }
  async sign() {
    throw new Error("Cannot sign");
  }
  async secretKey() {
    throw new Error("Secret key cannot be exposed");
  }
}
