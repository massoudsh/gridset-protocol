import { Zap, TrendingUp, Sun, DollarSign, Clock, Activity } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useWeb3 } from '../../context/Web3Context'

const mockEnergyData = [
  { time: '00:00', production: 120, consumption: 80, price: 0.05 },
  { time: '04:00', production: 100, consumption: 70, price: 0.04 },
  { time: '08:00', production: 350, consumption: 150, price: 0.06 },
  { time: '12:00', production: 500, consumption: 200, price: 0.08 },
  { time: '16:00', production: 450, consumption: 180, price: 0.07 },
  { time: '20:00', production: 200, consumption: 120, price: 0.05 },
]

const mockPriceData = [
  { time: '00:00', price: 0.05 },
  { time: '04:00', price: 0.04 },
  { time: '08:00', price: 0.06 },
  { time: '12:00', price: 0.08 },
  { time: '16:00', price: 0.07 },
  { time: '20:00', price: 0.05 },
]

export default function Overview() {
  const { isConnected, account } = useWeb3()

  const metrics = [
    {
      title: 'Total Energy Production',
      value: '1,245 kWh',
      change: '+12.5%',
      icon: Zap,
      color: 'text-energy-green',
      bgColor: 'bg-energy-green/20',
    },
    {
      title: 'Market Price',
      value: '$0.067/kWh',
      change: '+3.2%',
      icon: TrendingUp,
      color: 'text-energy-blue',
      bgColor: 'bg-energy-blue/20',
    },
    {
      title: 'Active Panels',
      value: '342',
      change: '+5',
      icon: Sun,
      color: 'text-energy-yellow',
      bgColor: 'bg-energy-yellow/20',
    },
    {
      title: 'Total Staked',
      value: '2.4M GRID',
      change: '+8.1%',
      icon: DollarSign,
      color: 'text-energy-orange',
      bgColor: 'bg-energy-orange/20',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Energy Dashboard</h2>
        <p className="text-gray-400">Real-time overview of the GRIDSET Protocol</p>
      </div>

      {!isConnected && (
        <div className="card bg-energy-blue/10 border-energy-blue/50">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-energy-blue" />
            <p className="text-energy-blue">
              Connect your wallet to view personalized data and interact with the protocol
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <span className="text-energy-green text-sm font-semibold">{metric.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Energy Production & Consumption</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockEnergyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
                name="Production (kWh)"
              />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stroke="#f97316" 
                fill="#f97316" 
                fillOpacity={0.3}
                name="Consumption (kWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Energy Price Trend</h3>
            <TrendingUp className="w-5 h-5 text-energy-green" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`$${value}/kWh`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Current Time Slot</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Slot ID</span>
              <span className="text-white font-semibold">#12,458</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-energy-green font-semibold">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ends In</span>
              <span className="text-white font-semibold">23:45</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-energy-green rounded-full"></div>
              <span className="text-gray-300 text-sm">Settlement completed for slot #12,457</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-energy-blue rounded-full"></div>
              <span className="text-gray-300 text-sm">New panel registered: #342</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-energy-yellow rounded-full"></div>
              <span className="text-gray-300 text-sm">Auction cleared at $0.067/kWh</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full btn-primary text-left">Place Market Order</button>
            <button className="w-full btn-secondary text-left">Register Panel</button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-left">
              View Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
