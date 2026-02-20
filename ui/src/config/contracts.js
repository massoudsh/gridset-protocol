/**
 * Contract addresses from env. ABIs are loaded from ../abis/ (copy from forge build output).
 * Run from repo root: forge build && node -e "
 *   const fs=require('fs');
 *   const j=require('./out/EnergyToken.sol/EnergyToken.json');
 *   fs.mkdirSync('ui/src/abis',{recursive:true});
 *   fs.writeFileSync('ui/src/abis/EnergyToken.json', JSON.stringify(j.abi));
 * "
 */

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}

export const contractAddresses = {
  energyToken: env.VITE_ENERGY_TOKEN_ADDRESS || '',
  energyMarket: env.VITE_ENERGY_MARKET_ADDRESS || '',
  panelNFT: env.VITE_PANEL_NFT_ADDRESS || '',
  panelRegistry: env.VITE_PANEL_REGISTRY_ADDRESS || '',
  stakingVault: env.VITE_STAKING_VAULT_ADDRESS || '',
  energyOracle: env.VITE_ENERGY_ORACLE_ADDRESS || '',
  settlementEngine: env.VITE_SETTLEMENT_ENGINE_ADDRESS || '',
  governanceDAO: env.VITE_GOVERNANCE_DAO_ADDRESS || '',
}

export function hasAnyAddress() {
  return Object.values(contractAddresses).some((a) => a && a.length >= 20)
}

// Minimal ABIs for read/write (expand or load from ui/src/abis/*.json when available)
export const abis = {
  energyToken: [], // set below or load from abis/EnergyToken.json
}

// Inline minimal EnergyToken ABI for balanceOf, transfer, getEnergyBalance (so UI works without copying build output)
if (typeof window !== 'undefined' || typeof globalThis !== 'undefined') {
  abis.energyToken = [
    { inputs: [{ name: 'account', type: 'address' }], name: 'balanceOf', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'account', type: 'address' }], name: 'getEnergyBalance', outputs: [{ components: [{ name: 'total', type: 'uint256' }, { name: 'locked', type: 'uint256' }, { name: 'available', type: 'uint256' }], type: 'tuple' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'totalSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], name: 'transfer', outputs: [{ type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], name: 'approve', outputs: [{ type: 'bool' }], stateMutability: 'nonpayable', type: 'function' },
  ]
}
