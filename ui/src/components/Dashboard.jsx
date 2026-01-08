import Overview from './views/Overview'
import EnergyMarket from './views/EnergyMarket'
import PanelRegistry from './views/PanelRegistry'
import EnergyWallet from './views/EnergyWallet'
import Settlement from './views/Settlement'
import StakingVault from './views/StakingVault'
import Governance from './views/Governance'
import Settings from './views/Settings'

export default function Dashboard({ activeView }) {
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Overview />
      case 'market':
        return <EnergyMarket />
      case 'panels':
        return <PanelRegistry />
      case 'wallet':
        return <EnergyWallet />
      case 'settlement':
        return <Settlement />
      case 'staking':
        return <StakingVault />
      case 'governance':
        return <Governance />
      case 'settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <div className="p-6">
      {renderView()}
    </div>
  )
}
