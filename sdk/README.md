# GRIDSET SDK

Minimal JS client for GRIDSET protocol contracts (ethers v6).

## Install

From repo root (or npm link):

```bash
cd sdk && npm install ethers
```

Or in your app: `npm install ethers` and copy or link this package.

## Usage

```js
import { getContracts } from 'gridset-sdk'
import { BrowserProvider } from 'ethers'

const provider = new BrowserProvider(window.ethereum)
const signer = await provider.getSigner()
const addresses = {
  energyToken: '0x...',
  energyMarket: '0x...',
  stakingVault: '0x...',
}
const contracts = getContracts(signer, addresses)

const supply = await contracts.energyToken.totalSupply()
const auction = await contracts.energyMarket.getAuction(1000)
```

## API

- **getContracts(providerOrSigner, addresses)** – returns `{ energyToken, energyMarket, stakingVault }` (Contract instances or null).
- **energyTokenAbi / energyMarketAbi / stakingVaultAbi** – minimal ABIs for custom use.

Event subscriptions: use `contracts.energyMarket.on('AuctionCleared', (slot, price, qty) => ...)` (ethers v6).
