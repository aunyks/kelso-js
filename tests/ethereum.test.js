const assert = require('assert')
const { beforeEach } = require('mocha')
const { EthereumEntity } = require('../src')
const ethers = require('ethers')

const MNEMONIC_A = 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
const PRIVATE_KEY_A = ethers.Wallet.fromMnemonic(MNEMONIC_A).privateKey

const MNEMONIC_B = 'indoor dish desk flag debris potato excuse depart ticket judge file exit'
const PRIVATE_KEY_B = ethers.Wallet.fromMnemonic(MNEMONIC_B).privateKey

describe('EthereumEntity', () => {
  it('constructs the object with mnemonic', () => {
    assert.doesNotThrow(() => {
      const ethEntity = new EthereumEntity(MNEMONIC_A, 'mnemonic')
    }, Error)
  })

  it('throws when constructing the object with private key but specifying mnemonic format', () => {
    assert.throws(() => {
      const ethEntity = new EthereumEntity(PRIVATE_KEY_A, 'mnemonic')
    }, Error)
  })

  it('constructs the object with private key', () => {
    assert.doesNotThrow(() => {
      const ethEntity = new EthereumEntity(PRIVATE_KEY_A, 'private-key')
    }, Error)
  })

  it('throws when constructing the object with mnemonic but specifying private key format', () => {
    assert.throws(() => {
      const ethEntity = new EthereumEntity(MNEMONIC_A, 'private-key')
    }, Error)
  })

  let ethEntity = null
  beforeEach(() => {
    ethEntity = new EthereumEntity(MNEMONIC_A, 'mnemonic')
  })

  it('gets the correct address', () => {
    assert.strictEqual('0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1', ethEntity.getAddress())
  })

  it('signs a message', async () => {
    const signature = await ethEntity.signMessageString('hi there')
    assert.strictEqual(signature, '0xa691fc6045aa136a083836161fba7b5dae4482270bb78b9ab25d0a8ca97d8221472c56ba1f92d8d6e922c3394437d871fcda78a27b316c657ddbfa4f3ef1200f1b')
  })

  it('verifies a message and recovers the correct address', async () => {
    const signature = '0xa691fc6045aa136a083836161fba7b5dae4482270bb78b9ab25d0a8ca97d8221472c56ba1f92d8d6e922c3394437d871fcda78a27b316c657ddbfa4f3ef1200f1b'
    const [isValid, recoveredAddress] = await ethEntity.verifySignatureString('hi there', signature)
    assert.strictEqual(isValid, true)
    assert.strictEqual(recoveredAddress, ethEntity.getAddress())
  })

  it('detects invalid signature', async () => {
    const signature = '0xa691fc6045aa136a083836161fba7b5dae4482270bb78b9ab25d0a8ca97d8221472c56ba1f92d8d6e922c3394437d871fcda78a27b316c657ddbfa4f3ef1200f1b'
    const [isValid, recoveredAddress] = await ethEntity.verifySignatureString('ajljlkjlkj', signature)
    // The signature maps to an address
    assert.strictEqual(isValid, true)
    // But, it doesn't match the *correct* address
    assert.notEqual(recoveredAddress, ethEntity.getAddress())
  })
})