import { useState } from 'react'
import {
  Battery,
  BatteryCharging,
  Zap,
  Package,
  Cpu,
  Power,
  ChevronRight,
} from 'lucide-react'
import { useWeb3 } from '../../context/Web3Context'

const utilityCategories = [
  {
    id: 'power-banks',
    title: 'Power Banks',
    description: 'Portable chargers for phones, tablets, and small devices. Ideal for on-the-go green energy.',
    icon: BatteryCharging,
    color: 'text-energy-green',
    bgColor: 'bg-energy-green/20',
    items: ['5,000 mAh – 20,000 mAh', 'USB-A / USB-C / wireless', 'Solar-ready options'],
  },
  {
    id: 'batteries',
    title: 'Batteries',
    description: 'Rechargeable cells and battery packs for home and off-grid storage.',
    icon: Battery,
    color: 'text-energy-blue',
    bgColor: 'bg-energy-blue/20',
    items: ['Li-ion, LiFePO4, lead-acid', '12V–48V systems', 'Cycle life & warranty'],
  },
  {
    id: 'large-power-stations',
    title: 'Large Power Stations',
    description: 'High-capacity portable power for camping, RVs, and backup home use.',
    icon: Power,
    color: 'text-energy-yellow',
    bgColor: 'bg-energy-yellow/20',
    items: ['500 Wh – 3,000+ Wh', 'AC outlets, DC, USB', 'Solar input compatible'],
  },
  {
    id: 'cells',
    title: 'Cells & Modules',
    description: 'Individual cells and modules for DIY storage or system integration.',
    icon: Cpu,
    color: 'text-energy-orange',
    bgColor: 'bg-energy-orange/20',
    items: ['18650, 21700, prismatic', 'BMS and balancing', 'Grid & off-grid kits'],
  },
  {
    id: 'solar-generators',
    title: 'Solar Generators',
    description: 'All-in-one solar + storage units for clean backup and mobile power.',
    icon: Zap,
    color: 'text-energy-green',
    bgColor: 'bg-energy-green/20',
    items: ['Integrated panels or expandable', 'Quiet, emission-free', 'Emergency & outdoor use'],
  },
  {
    id: 'accessories',
    title: 'Accessories & Kits',
    description: 'Cables, solar panels, charge controllers, and bundled utility kits.',
    icon: Package,
    color: 'text-energy-blue',
    bgColor: 'bg-energy-blue/20',
    items: ['MC4 cables, adapters', 'Portable solar panels', 'Starter kits'],
  },
]

export default function Utilities() {
  const { isConnected } = useWeb3()
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Green Energy Utilities</h2>
        <p className="text-gray-400">
          Power banks, batteries, large power stations, cells, and accessories for clean energy storage and use
        </p>
      </div>

      {!isConnected && (
        <div className="card bg-energy-blue/10 border-energy-blue/50">
          <p className="text-energy-blue text-sm">
            Connect your wallet to link utilities to your GRIDSET profile and energy credits
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilityCategories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id
          return (
            <div
              key={category.id}
              className={`card cursor-pointer transition-all duration-200 hover:border-energy-green ${
                isSelected ? 'ring-2 ring-energy-green border-energy-green' : ''
              }`}
              onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedCategory(isSelected ? null : category.id)
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`}
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{category.description}</p>
              {isSelected && (
                <ul className="space-y-1.5 text-sm text-gray-300 border-t border-gray-700 pt-4 mt-4">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-energy-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-white mb-2">Why green energy utilities?</h3>
        <p className="text-gray-400 text-sm">
          Store and use energy from your panels or the grid with batteries and power banks. Large power stations
          and cells help you go off-grid, reduce peak demand, and pair with GRIDSET settlement for a full
          green energy loop.
        </p>
      </div>
    </div>
  )
}
