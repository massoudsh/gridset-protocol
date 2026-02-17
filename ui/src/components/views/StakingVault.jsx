import { useState } from 'react'
import { Lock, Unlock, Shield, TrendingUp, AlertTriangle } from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'

export default function StakingVault() {
  const { isConnected } = useWeb3()
  const [stakeAmount, setStakeAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const mockStakeInfo = {
    total: 5000,
    available: 3500,
    locked: 1500,
    lockUntil: '2024-12-31',
    penalties: 0,
  }

  const handleDeposit = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // TODO: Implement contract interaction
    alert(`Depositing ${stakeAmount} GRID tokens`)
  }

  const handleWithdraw = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // TODO: Implement contract interaction
    alert(`Withdrawing ${withdrawAmount} GRID tokens`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Staking Vault</h2>
        <p className="text-gray-400">Manage your staked tokens for economic security</p>
      </div>

      {!isConnected && (
        <div className="card bg-energy-blue/10 border-energy-blue/50">
          <p className="text-energy-blue">
            Connect your wallet to view and manage your staking position
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-energy-green" />
            <h3 className="text-gray-400 text-sm">Total Staked</h3>
          </div>
          <p className="text-2xl font-bold text-white">{mockStakeInfo.total.toLocaleString()}</p>
          <p className="text-gray-400 text-xs mt-1">GRID Tokens</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <Unlock className="w-5 h-5 text-energy-blue" />
            <h3 className="text-gray-400 text-sm">Available</h3>
          </div>
          <p className="text-2xl font-bold text-white">{mockStakeInfo.available.toLocaleString()}</p>
          <p className="text-gray-400 text-xs mt-1">GRID Tokens</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-energy-yellow" />
            <h3 className="text-gray-400 text-sm">Locked</h3>
          </div>
          <p className="text-2xl font-bold text-white">{mockStakeInfo.locked.toLocaleString()}</p>
          <p className="text-gray-400 text-xs mt-1">Until {mockStakeInfo.lockUntil}</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-energy-orange" />
            <h3 className="text-gray-400 text-sm">Penalties</h3>
          </div>
          <p className="text-2xl font-bold text-white">{mockStakeInfo.penalties}</p>
          <p className="text-gray-400 text-xs mt-1">Total Applied</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Deposit Stake</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (GRID)</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.0"
                className="input-field w-full"
              />
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Current Stake</span>
                <span className="text-white font-semibold">{mockStakeInfo.total.toLocaleString()} GRID</span>
              </div>
              {stakeAmount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">New Total</span>
                  <span className="text-energy-green font-semibold">
                    {(mockStakeInfo.total + parseFloat(stakeAmount || 0)).toLocaleString()} GRID
                  </span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleDeposit}
              className="w-full btn-primary"
            >
              Deposit Stake
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Withdraw Stake</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (GRID)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.0"
                className="input-field w-full"
              />
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Available to Withdraw</span>
                <span className="text-white font-semibold">{mockStakeInfo.available.toLocaleString()} GRID</span>
              </div>
              {withdrawAmount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Remaining</span>
                  <span className="text-energy-green font-semibold">
                    {Math.max(0, mockStakeInfo.available - parseFloat(withdrawAmount || 0)).toLocaleString()} GRID
                  </span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleWithdraw}
              className="w-full btn-secondary"
            >
              Withdraw Stake
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-4">Staking Information</h3>
        <div className="space-y-4">
          <div className="p-4 bg-energy-green/10 border border-energy-green/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-energy-green mt-0.5" />
              <div>
                <h4 className="text-white font-semibold mb-1">Why Stake?</h4>
                <p className="text-sm text-gray-300">
                  Staking provides economic security for the protocol. Your stake backs your energy obligations
                  and ensures compliance with settlement requirements. Higher stakes allow for larger energy positions.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-energy-yellow/10 border border-energy-yellow/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-energy-yellow mt-0.5" />
              <div>
                <h4 className="text-white font-semibold mb-1">Penalties & Slashing</h4>
                <p className="text-sm text-gray-300">
                  Non-performance or misbehavior may result in penalties or slashing of your stake.
                  Ensure you meet your energy obligations to avoid penalties.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div>
              <div className="text-gray-400 text-sm mb-1">Minimum Stake</div>
              <div className="text-white font-semibold">1,000 GRID</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Lock Period</div>
              <div className="text-white font-semibold">30 days</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Staked (Protocol)</div>
              <div className="text-white font-semibold">2.4M GRID</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
