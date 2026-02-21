/**
 * Supported networks for GRIDSET. Contract addresses in .env are for one deployment (e.g. Sepolia);
 * for multiple chains, extend to address-by-chainId mapping.
 */
export const SUPPORTED_CHAINS = {
  1: { name: 'Ethereum', chainId: 1, isTestnet: false },
  11155111: { name: 'Sepolia', chainId: 11155111, isTestnet: true, faucet: 'https://sepoliafaucet.com/' },
  11155420: { name: 'OP Sepolia', chainId: 11155420, isTestnet: true, faucet: 'https://app.optimism.io/faucet' },
}

export const SUPPORTED_CHAIN_IDS = Object.keys(SUPPORTED_CHAINS).map(Number)

export function isSupportedChain(chainId) {
  return chainId != null && SUPPORTED_CHAIN_IDS.includes(Number(chainId))
}

export function getChain(chainId) {
  return SUPPORTED_CHAINS[Number(chainId)] || null
}

/** EIP-3085 params for adding a chain (e.g. if user wallet doesn't have it) */
export const CHAIN_PARAMS = {
  11155111: {
    chainId: '0xaa36a7', // 11155111
    chainName: 'Sepolia',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
  11155420: {
    chainId: '0xaa37dc', // 11155420
    chainName: 'OP Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://sepolia.optimism.io'],
    blockExplorerUrls: ['https://sepolia-optimism.etherscan.io'],
  },
}
