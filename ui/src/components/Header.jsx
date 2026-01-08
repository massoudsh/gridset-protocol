import { Menu, Zap } from 'lucide-react'
import { useWeb3 } from '../context/Web3Context'

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3()

  const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="bg-slate-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-energy-green" />
            <h1 className="text-2xl font-bold text-white">GRIDSET Protocol</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-energy-green/20 border border-energy-green rounded-lg">
                <div className="w-2 h-2 bg-energy-green rounded-full animate-pulse"></div>
                <span className="text-energy-green font-medium">{formatAddress(account)}</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="btn-secondary"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              className="btn-primary"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
