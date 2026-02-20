import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ethers } from 'ethers'
import { contractAddresses, abis, hasAnyAddress } from '../config/contracts'

const Web3Context = createContext()

export function Web3Provider({ children }) {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState(null)

  const contracts = useMemo(() => {
    const addr = contractAddresses.energyToken
    if (!addr || !addr.startsWith('0x') || addr.length < 40) return { energyToken: null }
    const abi = abis.energyToken
    if (!abi || abi.length === 0) return { energyToken: null }
    return {
      energyToken: provider
        ? (signer ? new ethers.Contract(addr, abi, signer) : new ethers.Contract(addr, abi, provider))
        : null,
    }
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
