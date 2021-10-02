declare module 'index' {
  export class Entity {
    /**
     *
     * @param {string} privateKeyString
     */
    constructor(privateKeyString: string)
    _hasPrivateKey: boolean
    _privateKeyString: string | null
    /**
     *
     * @param {string} privateKeyString
     *
     * @returns { void }
     */
    loadPrivateKeyString(privateKeyString: string): void
    /**
     *
     * @param {string} messageString
     *
     * @returns { Promise<string> }
     */
    signMessageString(messageString: string): Promise<string>
    /**
     *
     * @param {string} messageString
     * @param {string} signatureString
     *
     * @returns { Promise<[boolean, any]> }
     */
    verifySignatureString(
      messageString: string,
      signatureString: string
    ): Promise<[boolean, any]>
  }
  export class EthereumEntity extends Entity {
    /**
     *
     * @param {string} privateKeyOrMnemonic
     * @param {string} keyFormat
     */
    constructor(privateKeyOrMnemonic: string, keyFormat: string)
    _wallet: ethers.Wallet | undefined
    /**
     *
     * @param {string} mnemonicString
     *
     * @returns { void }
     */
    loadMnemonic(mnemonicString: string): void
    /**
     * @returns { string }
     */
    getAddress(): string
  }
  import { ethers } from 'ethers'
}
