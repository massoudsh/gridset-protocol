import { useState } from 'react'
import {
  BatteryCharging,
  ChevronRight,
  ExternalLink,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'

// Realistic product data with Unsplash images (free to use, no attribution required per Unsplash license)
const PRODUCTS = [
  {
    id: 'pb-1',
    category: 'power-banks',
    name: 'Portable Power Bank 20,000 mAh',
    brand: 'GridFlow',
    capacity: '20,000 mAh',
    specs: ['USB-C PD 22.5W', 'Dual USB-A', 'LED display', 'Solar input optional'],
    price: 49.99,
    currency: 'USD',
    rating: 4.6,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'pb-2',
    category: 'power-banks',
    name: 'Compact 10,000 mAh Power Bank',
    brand: 'EcoCharge',
    capacity: '10,000 mAh',
    specs: ['USB-C in/out', '18W fast charge', 'Pocket size', 'Airline safe'],
    price: 29.99,
    currency: 'USD',
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'ps-1',
    category: 'large-power-stations',
    name: 'Portable Power Station 1000Wh',
    brand: 'SunCore',
    capacity: '1000 Wh',
    specs: ['AC 1000W output', 'Solar input 200W max', '8 outlets', 'Quiet operation'],
    price: 799.00,
    currency: 'USD',
    rating: 4.7,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'ps-2',
    category: 'large-power-stations',
    name: 'Power Station 2000Wh Pro',
    brand: 'GridFlow',
    capacity: '2000 Wh',
    specs: ['AC 2000W surge', 'Solar 500W input', 'LiFePO4 3000+ cycles', 'Expandable'],
    price: 1499.00,
    currency: 'USD',
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1559302504-64aae0ca2a3d?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'bat-1',
    category: 'batteries',
    name: 'Home Battery 10 kWh',
    brand: 'EcoStore',
    capacity: '10 kWh',
    specs: ['LiFePO4', '10-year warranty', 'Wall mount', 'Grid hybrid'],
    price: 4500.00,
    currency: 'USD',
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'bat-2',
    category: 'batteries',
    name: '12V 100Ah LiFePO4 Battery',
    brand: 'PowerCell',
    capacity: '1.2 kWh',
    specs: ['2000+ cycles', 'BMS included', 'RV / marine', 'No maintenance'],
    price: 399.00,
    currency: 'USD',
    rating: 4.5,
    reviews: 534,
    image: 'https://images.unsplash.com/photo-1625628715193-9bc99dd40d0c?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'sol-1',
    category: 'solar-generators',
    name: 'Solar Generator Kit 500W',
    brand: 'SunCore',
    capacity: '512 Wh',
    specs: ['100W foldable panel', 'AC/DC/USB', 'Carry case', 'Off-grid ready'],
    price: 449.00,
    currency: 'USD',
    rating: 4.4,
    reviews: 667,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'sol-2',
    category: 'solar-generators',
    name: 'All-in-One Solar + Storage 2kWh',
    brand: 'GridFlow',
    capacity: '2048 Wh',
    specs: ['Built-in 200W solar', 'Quiet inverter', 'Wheeled', 'Emergency backup'],
    price: 1899.00,
    currency: 'USD',
    rating: 4.7,
    reviews: 223,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'cell-1',
    category: 'cells',
    name: '21700 Li-ion Cell 5000mAh',
    brand: 'PowerCell',
    capacity: '18 Wh/cell',
    specs: ['High discharge', 'Bulk packs', 'DIY / OEM', 'Tested grade A'],
    price: 5.99,
    currency: 'USD',
    rating: 4.3,
    reviews: 1204,
    image: 'https://images.unsplash.com/photo-1625628715193-9bc99dd40d0c?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'acc-1',
    category: 'accessories',
    name: '100W Portable Solar Panel',
    brand: 'SunCore',
    capacity: '100W',
    specs: ['Foldable', 'USB + DC', 'Kickstand', 'Water resistant'],
    price: 199.00,
    currency: 'USD',
    rating: 4.5,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: 'acc-2',
    category: 'accessories',
    name: 'MC4 Cable Set & Connectors',
    brand: 'EcoCharge',
    capacity: '—',
    specs: ['10m pair', 'UV resistant', 'Tool-free', '10-year'],
    price: 34.99,
    currency: 'USD',
    rating: 4.6,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    inStock: true,
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'power-banks', label: 'Power Banks' },
  { id: 'large-power-stations', label: 'Power Stations' },
  { id: 'batteries', label: 'Batteries' },
  { id: 'solar-generators', label: 'Solar Generators' },
  { id: 'cells', label: 'Cells' },
  { id: 'accessories', label: 'Accessories' },
]

function formatPrice(price, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)
}

export default function Utilities() {
  const { isConnected } = useWeb3()
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filtered =
    categoryFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryFilter)

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

      <div className="flex flex-wrap gap-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="card overflow-hidden hover:border-energy-green transition-all duration-200 group"
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
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to cart
                </button>
                <button
                  type="button"
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

      <div className="card flex items-start gap-4">
        <div className="p-3 rounded-lg bg-energy-green/20">
          <BatteryCharging className="w-8 h-8 text-energy-green" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Why green energy utilities?</h3>
          <p className="text-gray-400 text-sm">
            Store and use energy from your panels or the grid with batteries and power banks. Large power stations
            and cells help you go off-grid, reduce peak demand, and pair with GRIDSET settlement for a full
            green energy loop. Products shown use realistic specs; checkout and GRID credit linking coming in a future release.
          </p>
        </div>
      </div>
    </div>
  )
}
