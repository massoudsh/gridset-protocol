import { useState, useEffect } from 'react'
import { Zap, FileText, ShoppingCart, Clock } from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'

const BLOCK_RANGE = 50000
const MAX_EVENTS = 30

function useActivityFeed() {
  const { provider, contracts } = useWeb3()
  const [chainEvents, setChainEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!provider || !contracts?.energyMarket) {
      setChainEvents([])
      return
    }
    let cancelled = false
    setLoading(true)
    const market = contracts.energyMarket
    const run = async () => {
      try {
        const block = await provider.getBlockNumber()
        const fromBlock = Math.max(0, block - BLOCK_RANGE)
        const [clearedLogs, placedLogs] = await Promise.all([
          market.queryFilter(market.filters.AuctionCleared(), fromBlock, 'latest'),
          market.queryFilter(market.filters.OrderPlaced(), fromBlock, 'latest'),
        ])
        if (cancelled) return
        const blockNumbers = [...new Set([...clearedLogs.map((l) => l.blockNumber), ...placedLogs.map((l) => l.blockNumber)])]
        const blocks = await Promise.all(blockNumbers.map((bn) => provider.getBlock(bn)))
        const blockTimeByNumber = Object.fromEntries(blocks.map((b) => [b.number, b.timestamp]))
        const cleared = clearedLogs.slice(-MAX_EVENTS).map((log) => {
          const args = log.args
          return {
            id: `cleared-${log.blockNumber}-${log.index}`,
            type: 'auction_cleared',
            timeSlot: Number(args?.timeSlot ?? args?.[0]),
            clearingPrice: Number(args?.clearingPrice ?? args?.[1]),
            totalQuantity: Number(args?.totalQuantity ?? args?.[2]),
            timestamp: (blockTimeByNumber[log.blockNumber] ?? 0) * 1000,
          }
        })
        const placed = placedLogs.slice(-MAX_EVENTS).map((log) => {
          const args = log.args
          return {
            id: `placed-${log.blockNumber}-${log.index}`,
            type: 'order_placed',
            orderId: Number(args?.orderId ?? args?.[0]),
            isBid: args?.isBid ?? args?.[2],
            price: Number(args?.price ?? args?.[3]),
            quantity: Number(args?.quantity ?? args?.[4]),
            timestamp: (blockTimeByNumber[log.blockNumber] ?? 0) * 1000,
          }
        })
        const combined = [...cleared, ...placed].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, MAX_EVENTS)
        setChainEvents(combined)
      } catch (e) {
        if (!cancelled) setChainEvents([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [provider, contracts?.energyMarket])

  const mock = [
    { id: '1', type: 'auction_cleared', timeSlot: 1000, clearingPrice: 0.068, totalQuantity: 1200, timestamp: Date.now() - 3600000 },
    { id: '2', type: 'proposal_created', proposalId: 3, title: 'Update clearing window', timestamp: Date.now() - 7200000 },
    { id: '3', type: 'order_filled', orderId: 42, quantity: 100, price: 0.067, timestamp: Date.now() - 10800000 },
    { id: '4', type: 'auction_cleared', timeSlot: 999, clearingPrice: 0.065, totalQuantity: 800, timestamp: Date.now() - 14400000 },
    { id: '5', type: 'proposal_created', proposalId: 2, title: 'Treasury allocation', timestamp: Date.now() - 18000000 },
  ]
  const feed = chainEvents.length > 0 ? chainEvents : mock
  return { feed: feed.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)), loading }
}

function ActivityItem({ item }) {
  const timeAgo = (ts) => {
    const s = Math.floor((Date.now() - ts) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  if (item.type === 'auction_cleared') {
    return (
      <div className="flex gap-3 p-4 bg-slate-800 rounded-lg border border-gray-700 hover:border-energy-green/50 transition-colors">
        <div className="p-2 rounded-lg bg-energy-green/20">
          <Zap className="w-5 h-5 text-energy-green" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium">Auction cleared for slot #{item.timeSlot}</p>
          <p className="text-gray-400 text-sm mt-0.5">
            Clearing price {item.clearingPrice} · {item.totalQuantity} kWh matched
          </p>
          <p className="text-gray-500 text-xs mt-1">{timeAgo(item.timestamp)}</p>
        </div>
      </div>
    )
  }
  if (item.type === 'proposal_created') {
    return (
      <div className="flex gap-3 p-4 bg-slate-800 rounded-lg border border-gray-700 hover:border-energy-green/50 transition-colors">
        <div className="p-2 rounded-lg bg-energy-blue/20">
          <FileText className="w-5 h-5 text-energy-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium">Proposal #{item.proposalId} created</p>
          <p className="text-gray-400 text-sm mt-0.5">{item.title || 'Governance proposal'}</p>
          <p className="text-gray-500 text-xs mt-1">{timeAgo(item.timestamp)}</p>
        </div>
      </div>
    )
  }
  if (item.type === 'order_filled') {
    return (
      <div className="flex gap-3 p-4 bg-slate-800 rounded-lg border border-gray-700 hover:border-energy-green/50 transition-colors">
        <div className="p-2 rounded-lg bg-energy-yellow/20">
          <ShoppingCart className="w-5 h-5 text-energy-yellow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium">Order #{item.orderId} filled</p>
          <p className="text-gray-400 text-sm mt-0.5">{item.quantity} kWh @ {item.price}</p>
          <p className="text-gray-500 text-xs mt-1">{timeAgo(item.timestamp)}</p>
        </div>
      </div>
    )
  }
  if (item.type === 'order_placed') {
    return (
      <div className="flex gap-3 p-4 bg-slate-800 rounded-lg border border-gray-700 hover:border-energy-green/50 transition-colors">
        <div className="p-2 rounded-lg bg-energy-yellow/20">
          <ShoppingCart className="w-5 h-5 text-energy-yellow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium">Order #{item.orderId} placed</p>
          <p className="text-gray-400 text-sm mt-0.5">{item.isBid ? 'Bid' : 'Ask'} · {item.quantity} kWh @ {item.price}</p>
          <p className="text-gray-500 text-xs mt-1">{timeAgo(item.timestamp)}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-3 p-4 bg-slate-800 rounded-lg border border-gray-700">
      <Clock className="w-5 h-5 text-gray-500" />
      <p className="text-gray-400 text-sm">{timeAgo(item.timestamp)}</p>
    </div>
  )
}

export default function Activity() {
  const { feed, loading } = useActivityFeed()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Activity</h2>
        <p className="text-gray-400">Recent auctions, proposals, and order activity from chain</p>
      </div>

      <div className="space-y-3 max-w-2xl">
        {loading ? (
          <div className="card text-center py-12 text-gray-400">Loading chain events…</div>
        ) : feed.length === 0 ? (
          <div className="card text-center py-12 text-gray-500">
            No activity yet. Connect to a chain with deployed contracts to see live events.
          </div>
        ) : (
          feed.map((item, i) => <ActivityItem key={item.id ?? `act-${i}`} item={item} />)
        )}
      </div>
    </div>
  )
}
