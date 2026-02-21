import { useState, useMemo } from 'react'
import {
  BatteryCharging,
  ExternalLink,
  ShoppingCart,
  Star,
  Link2,
} from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'
import { useCart } from '../../context/CartContext'
import ProductDetailModal from '../ProductDetailModal'
import { PRODUCTS, CATEGORIES, BRANDS, getProduct, formatPrice, parseCapacity, SORT_OPTIONS } from '../../config/products'

export default function Utilities() {
  const { isConnected, account } = useWeb3()
  const { addItem, getLinkedOrders } = useCart()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [detailProductId, setDetailProductId] = useState(null)
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [capacityMin, setCapacityMin] = useState('')
  const [capacityMax, setCapacityMax] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [sortBy, setSortBy] = useState('price-asc')

  const linkedOrders = isConnected && account ? getLinkedOrders(account) : []

  const filtered = useMemo(() => {
    let list = categoryFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === categoryFilter)
    if (brandFilter !== 'all') list = list.filter((p) => p.brand === brandFilter)
    const pMin = priceMin === '' ? -Infinity : parseFloat(priceMin)
    const pMax = priceMax === '' ? Infinity : parseFloat(priceMax)
    if (!Number.isNaN(pMin)) list = list.filter((p) => p.price >= pMin)
    if (!Number.isNaN(pMax)) list = list.filter((p) => p.price <= pMax)
    const cMin = capacityMin === '' ? -Infinity : parseFloat(capacityMin)
    const cMax = capacityMax === '' ? Infinity : parseFloat(capacityMax)
    if (!Number.isNaN(cMin)) list = list.filter((p) => parseCapacity(p.capacity) >= cMin)
    if (!Number.isNaN(cMax)) list = list.filter((p) => parseCapacity(p.capacity) <= cMax)
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'newest') list.sort((a, b) => PRODUCTS.indexOf(b) - PRODUCTS.indexOf(a))
    return list
  }, [categoryFilter, brandFilter, priceMin, priceMax, capacityMin, capacityMax, sortBy])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Green Energy Utilities</h2>
        <p className="text-gray-400">
          Real products for storage and off-grid power — power banks, batteries, power stations, and accessories
        </p>
      </div>

      {!isConnected && (
        <div className="card bg-energy-blue/10 border-energy-blue/50">
          <p className="text-energy-blue text-sm">
            Connect your wallet to link purchases to your GRIDSET profile and earn energy credits on compatible items
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              categoryFilter === cat.id
                ? 'bg-energy-green text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg border border-gray-700">
        <span className="text-gray-400 text-sm font-medium">Filters & sort</span>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="input-field w-36 text-sm py-1.5"
        >
          <option value="all">All brands</option>
          {BRANDS.map((b) => (
            <option key={b.id} value={b.id}>{b.label}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Min price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className="input-field w-24 text-sm py-1.5"
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Max price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="input-field w-24 text-sm py-1.5"
        />
        <input
          type="number"
          min="0"
          placeholder="Min capacity"
          value={capacityMin}
          onChange={(e) => setCapacityMin(e.target.value)}
          className="input-field w-28 text-sm py-1.5"
        />
        <input
          type="number"
          min="0"
          placeholder="Max capacity"
          value={capacityMax}
          onChange={(e) => setCapacityMax(e.target.value)}
          className="input-field w-28 text-sm py-1.5"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field w-44 text-sm py-1.5"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            role="button"
            tabIndex={0}
            onClick={() => setDetailProductId(product.id)}
            onKeyDown={(e) => e.key === 'Enter' && setDetailProductId(product.id)}
            className="card overflow-hidden hover:border-energy-green transition-all duration-200 group cursor-pointer"
          >
            <div className="relative aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of stock</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded text-sm text-energy-yellow">
                <Star className="w-4 h-4 fill-current" />
                {product.rating}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-energy-green/90 text-xs font-medium uppercase tracking-wide">
                {product.brand}
              </p>
              <h3 className="text-lg font-semibold text-white line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.capacity}</p>
              <ul className="text-xs text-gray-500 space-y-0.5">
                {product.specs.slice(0, 2).map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <span className="text-xl font-bold text-white">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="text-xs text-gray-500">{product.reviews} reviews</span>
              </div>
              <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => addItem(product.id)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => setDetailProductId(product.id)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-300"
                  title="View details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isConnected && account && linkedOrders.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-energy-green" />
            My linked purchases
          </h3>
          <p className="text-gray-400 text-sm mb-4">Purchases linked to your wallet for future energy-credit eligibility.</p>
          <ul className="space-y-3">
            {linkedOrders.slice().reverse().map((order) => (
              <li key={order.orderId} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Order #{String(order.orderId).slice(-6)}</span>
                  <span>{new Date(order.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="text-white font-medium">
                  {order.productIds.map((id) => getProduct(id)?.name).filter(Boolean).join(', ')}
                </div>
                <div className="text-energy-green text-sm">{formatPrice(order.total)}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card flex items-start gap-4">
        <div className="p-3 rounded-lg bg-energy-green/20">
          <BatteryCharging className="w-8 h-8 text-energy-green" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Why green energy utilities?</h3>
          <p className="text-gray-400 text-sm">
            Store and use energy from your panels or the grid with batteries and power banks. Large power stations
            and cells help you go off-grid, reduce peak demand, and pair with GRIDSET settlement for a full
            green energy loop. Cart persists across the app; checkout supports “Link to GRIDSET” to associate purchases with your wallet for future energy-credit eligibility. Linked orders appear under “My linked purchases” when connected.
          </p>
        </div>
      </div>

      {detailProductId && (
        <ProductDetailModal
          productId={detailProductId}
          onClose={() => setDetailProductId(null)}
          onAddToCart={addItem}
        />
      )}
    </div>
  )
}
