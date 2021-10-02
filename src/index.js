const { ethers } = require('ethers')

class Entity {

  /**
   * 
   * @param {string} privateKeyString 
   */
  constructor(privateKeyString) {
    this._hasPrivateKey = false
    this._privateKeyString = null

    if (privateKeyString) {
      this._hasPrivateKey = true
      this._privateKeyString = privateKeyString
    }
  }

  /**
   * @returns { boolean }
   */
  hasPrivateKey() {
    return this._hasPrivateKey
  }

  /**
   * 
   * @param {string} privateKeyString 
   * 
   * @returns { void }
   */
  loadPrivateKeyString(privateKeyString) {
    this._hasPrivateKey = true
    this._privateKeyString = privateKeyString
  }

  /**
   * 
   * @param {string} messageString 
   * 
   * @returns { Promise<string> }
   */
  async signMessageString(messageString) {
    if (!this._hasPrivateKey) {
      throw new Error('Entity: Cannot sign message string without private key')
    }
    throw new Error('signMessageString() is not implemented for base Entity. Use a derived class.')
  }

  /**
   * 
   * @param {string} messageString
   * @param {string} signatureString
   * 
   * @returns { Promise<[boolean, any]> }
   */
  async verifySignatureString(messageString, signatureString) {
    throw new Error('verifySignatureString() is not implemented for base Entity. Use a derived class.')
  }
}

class EthereumEntity extends Entity {

  /**
   * 
   * @param {string} privateKeyOrMnemonic 
   * @param {string} keyFormat
   */
  constructor(privateKeyOrMnemonic, keyFormat) {
    super(privateKeyOrMnemonic)
    if (keyFormat === 'private-key') {
      // Do nothing, we already have a 
      // private key ready
      this.loadPrivateKeyString(privateKeyOrMnemonic)
    } else if (keyFormat === 'mnemonic') {
      // Overwrite the existing private key loaded 
      // by the super class
      this.loadMnemonic(privateKeyOrMnemonic)
    } else {
      // We just don't have a private key
    }
  }

  /**
   * 
   * @param {string} privateKeyString 
   * 
   * @returns { void }
   */
  loadPrivateKeyString(privateKeyString) {
    this._wallet = new ethers.Wallet(privateKeyString)
  }

  /**
   * 
   * @param {string} mnemonicString 
   * 
   * @returns { void }
   */
  loadMnemonic(mnemonicString) {
    this.loadPrivateKeyString(ethers.Wallet.fromMnemonic(mnemonicString).privateKey)
  }

  /**
   * @returns { string }
   */
  getAddress() {
    if (!this._hasPrivateKey) {
      return ''
    }
    // @ts-ignore: Object is possibly 'null'.
    return this._wallet.address
  }

  /**
   * 
   * @param {string} messageString 
   * 
   * @returns { Promise<string> }
   */
  async signMessageString(messageString) {
    if (!this._hasPrivateKey) {
      throw new Error('EthereumEntity: Cannot sign message string without private key')
    }
    // @ts-ignore: Object is possibly 'null'.
    return this._wallet.signMessage(messageString)
  }

  /**
   * 
   * @param {string} messageString 
   * @param {string} signatureString 
   * 
   * @returns { Promise<[boolean, any]> }
   */
  async verifySignatureString(messageString, signatureString) {
    const recoveredAddress = ethers.utils.verifyMessage(messageString, signatureString)
    const isValidSignature = recoveredAddress !== '0x0000000000000000000000000000000000000000'
    return [isValidSignature, recoveredAddress]
  }
}

module.exports = {
  Entity,
  EthereumEntity
}