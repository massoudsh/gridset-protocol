import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { contractAddresses, abis, hasAnyAddress } from '../config/contracts'
import { SUPPORTED_CHAIN_IDS, CHAIN_PARAMS, getChain } from '../config/chains'

const Web3Context = createContext()

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState(null)

  const contracts = useMemo(() => {
    const out = {
      energyToken: null,
      energyMarket: null,
      stakingVault: null,
      panelRegistry: null,
      settlementEngine: null,
      governanceDAO: null,
      energyOracle: null,
    }
    if (!provider) return out
    const tokenAddr = contractAddresses.energyToken
    if (tokenAddr && tokenAddr.startsWith('0x') && tokenAddr.length >= 40 && abis.energyToken?.length) {
      out.energyToken = new ethers.Contract(tokenAddr, abis.energyToken, signer || provider)
    }
    const marketAddr = contractAddresses.energyMarket
    if (marketAddr && marketAddr.startsWith('0x') && marketAddr.length >= 40 && abis.energyMarket?.length) {
      out.energyMarket = new ethers.Contract(marketAddr, abis.energyMarket, provider)
    }
    const vaultAddr = contractAddresses.stakingVault
    if (vaultAddr && vaultAddr.startsWith('0x') && vaultAddr.length >= 40 && abis.stakingVault?.length) {
      out.stakingVault = new ethers.Contract(vaultAddr, abis.stakingVault, provider)
    }
    const registryAddr = contractAddresses.panelRegistry
    if (registryAddr && registryAddr.startsWith('0x') && registryAddr.length >= 40 && abis.panelRegistry?.length) {
      out.panelRegistry = new ethers.Contract(registryAddr, abis.panelRegistry, provider)
    }
    const engineAddr = contractAddresses.settlementEngine
    if (engineAddr && engineAddr.startsWith('0x') && engineAddr.length >= 40 && abis.settlementEngine?.length) {
      out.settlementEngine = new ethers.Contract(engineAddr, abis.settlementEngine, provider)
    }
    const daoAddr = contractAddresses.governanceDAO
    if (daoAddr && daoAddr.startsWith('0x') && daoAddr.length >= 40 && abis.governanceDAO?.length) {
      out.governanceDAO = new ethers.Contract(daoAddr, abis.governanceDAO, provider)
    }
    const oracleAddr = contractAddresses.energyOracle
    if (oracleAddr && oracleAddr.startsWith('0x') && oracleAddr.length >= 40 && abis.energyOracle?.length) {
      out.energyOracle = new ethers.Contract(oracleAddr, abis.energyOracle, provider)
    }
    return out
  }, [provider, signer])

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const network = await provider.getNetwork()

        setAccount(accounts[0])
        setProvider(provider)
        setSigner(signer)
        setIsConnected(true)
        setChainId(Number(network.chainId))
      } catch (error) {
        console.error('Error connecting wallet:', error)
        alert('Error connecting wallet: ' + error.message)
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet')
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
    setIsConnected(false)
    setChainId(null)
  }

  const switchChain = async (targetChainId) => {
    if (typeof window === 'undefined' || !window.ethereum) return
    const hexChainId = '0x' + Number(targetChainId).toString(16)
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hexChainId }] })
    } catch (e) {
      if (e.code === 4902 && CHAIN_PARAMS[targetChainId]) {
        await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [CHAIN_PARAMS[targetChainId]] })
      } else {
        alert('Could not switch network: ' + (e.message || e))
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        isConnected,
        chainId,
        connectWallet,
        disconnectWallet,
        switchChain,
        supportedChainIds: SUPPORTED_CHAIN_IDS,
        isSupportedChain: (id) => id != null && SUPPORTED_CHAIN_IDS.includes(Number(id)),
        getChain,
        contracts,
        contractAddresses,
        hasContractAddresses: hasAnyAddress(),
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider')
  }
  return context
}
