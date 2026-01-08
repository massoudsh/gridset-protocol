import { useState } from 'react'
import { TrendingUp, TrendingDown, ArrowUpDown, Clock } from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'

export default function EnergyMarket() {
  const { isConnected } = useWeb3()
  const [orderType, setOrderType] = useState('bid')
  const [timeSlot, setTimeSlot] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const mockBids = [
    { price: 0.068, quantity: 150, total: 10.2 },
    { price: 0.067, quantity: 200, total: 13.4 },
    { price: 0.066, quantity: 180, total: 11.88 },
    { price: 0.065, quantity: 250, total: 16.25 },
    { price: 0.064, quantity: 120, total: 7.68 },
  ]

  const mockAsks = [
    { price: 0.069, quantity: 100, total: 6.9 },
    { price: 0.070, quantity: 150, total: 10.5 },
    { price: 0.071, quantity: 200, total: 14.2 },
    { price: 0.072, quantity: 180, total: 12.96 },
    { price: 0.073, quantity: 220, total: 16.06 },
  ]

  const handlePlaceOrder = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // TODO: Implement contract interaction
    alert(`Placing ${orderType} order: ${quantity} kWh at $${price}/kWh for time slot ${timeSlot}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Energy Market</h2>
        <p className="text-gray-400">Place bids and asks for energy in upcoming time slots</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Order Book</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Time Slot #12,459</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  <h4 className="text-sm font-semibold text-gray-400 uppercase">Asks (Sell)</h4>
                </div>
                <div className="space-y-1">
                  {mockAsks.map((ask, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-red-500/10 hover:bg-red-500/20 rounded cursor-pointer transition-colors"
                      style={{ width: `${(ask.quantity / 300) * 100}%`, marginLeft: 'auto' }}
                    >
                      <span className="text-red-400 font-semibold text-sm">{ask.price.toFixed(3)}</span>
                      <span className="text-gray-300 text-sm">{ask.quantity}</span>
                      <span className="text-gray-400 text-xs">{ask.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-energy-green" />
                  <h4 className="text-sm font-semibold text-gray-400 uppercase">Bids (Buy)</h4>
                </div>
                <div className="space-y-1">
                  {mockBids.map((bid, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-energy-green/10 hover:bg-energy-green/20 rounded cursor-pointer transition-colors"
                      style={{ width: `${(bid.quantity / 300) * 100}%` }}
                    >
                      <span className="text-energy-green font-semibold text-sm">{bid.price.toFixed(3)}</span>
                      <span className="text-gray-300 text-sm">{bid.quantity}</span>
                      <span className="text-gray-400 text-xs">{bid.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Spread</span>
                <span className="text-white font-semibold">$0.001/kWh</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">Best Bid</span>
                <span className="text-energy-green font-semibold">$0.068/kWh</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">Best Ask</span>
                <span className="text-red-400 font-semibold">$0.069/kWh</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Active Auctions</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">Time Slot #12,{459 + i}</div>
                    <div className="text-sm text-gray-400">Ends in {24 - i * 8} hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-energy-green font-semibold">$0.067/kWh</div>
                    <div className="text-sm text-gray-400">Clearing Price</div>
                  </div>
                  <button className="btn-secondary">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Place Order</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Order Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType('bid')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    orderType === 'bid'
                      ? 'bg-energy-green text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Buy (Bid)
                </button>
                <button
                  onClick={() => setOrderType('ask')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    orderType === 'ask'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Sell (Ask)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Time Slot</label>
              <input
                type="text"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                placeholder="e.g., 12459"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Price ($/kWh)</label>
              <input
                type="number"
                step="0.001"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.067"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Quantity (kWh)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="100"
                className="input-field w-full"
              />
            </div>

            {price && quantity && (
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Value</span>
                  <span className="text-white font-semibold">
                    ${(parseFloat(price) * parseFloat(quantity) || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              className="w-full btn-primary"
            >
              Place {orderType === 'bid' ? 'Bid' : 'Ask'} Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
