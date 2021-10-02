# Kelso.js  

Cryptographic signatures made easy, with some polymorphism. More coming soon.  

## Installation
```
npm install --save kelso-js
```

## Usage
```javascript
const { EthereumEntity } = require('kelso-js')

// Alice can sign *and* verify
const alice = new EthereumEntity('<some-mnemonic-string>', 'mnemonic')
// Bob can only verify (unless he loads a private key later)
const bob = new EthereumEntity()

// Have alice sign a message
const signatureString = await alice.signMessageString('hi')
// Have bob verify it
const [isValidSignature, recoveredAddress] = await bob.verifySignatureString('hi', signatureString)

// Bob makes sure that alice actually signed it
if(isValidSignature && recoveredAddress === alice.getAddress()) {
  console.log('Alice signed a message for Bob!')
} 
```

**Be mindful of the license.**

### LICENSE

Kelso.js
Copyright (C) 2021 Gerald Nash

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.