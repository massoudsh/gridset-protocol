# GRIDSET Protocol

GRIDSET is a market-based energy and compute settlement system that enables financial settlement of energy obligations through blockchain infrastructure. The protocol operates on discrete time slots, uses batch auctions for price discovery, relies on oracle-reported production data, and implements stake-backed penalty mechanisms to ensure system integrity and participant compliance.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GRIDSET Protocol                         │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  PanelNFT     │    │ EnergyToken   │    │ StakingVault  │
│  (Assets)     │    │ (Settlement)  │    │ (Security)    │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│PanelRegistry  │    │ EnergyOracle  │    │ EnergyMarket  │
│(Tracking)     │    │ (Data)        │    │ (Pricing)     │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐
│SettlementEngine│    │ GovernanceDAO │
│(Execution)     │    │ (Control)     │
└────────────────┘    └───────────────┘
```

## Key Components

- **EnergyToken**: Fungible energy credits for settlement
- **PanelNFT**: Non-fungible tokens representing energy production assets
- **PanelRegistry**: Registry tracking panel ownership and production
- **StakingVault**: Economic security through staking mechanisms
- **EnergyOracle**: Authoritative production data reporting
- **EnergyMarket**: Batch auction price discovery
- **SettlementEngine**: Financial settlement execution
- **GovernanceDAO**: Decentralized protocol governance

## Important Notice

**This protocol settles financial obligations, not physical energy delivery.** GRIDSET operates as a financial settlement layer that tracks energy production and consumption as financial claims, executes payments based on net energy positions, and does not guarantee physical energy delivery. The protocol is designed to work on top of existing physical energy infrastructure.

## Project Structure

```
gridset-protocol/
├── src/
│   ├── interfaces/          # Contract interfaces
│   │   ├── IEnergyToken.sol
│   │   ├── IPanelNFT.sol
│   │   ├── IPanelRegistry.sol
│   │   ├── IStakingVault.sol
│   │   ├── IEnergyOracle.sol
│   │   ├── IEnergyMarket.sol
│   │   ├── ISettlementEngine.sol
│   │   └── IGovernanceDAO.sol
│   ├── EnergyToken.sol      # Placeholder implementations
│   ├── PanelNFT.sol
│   ├── PanelRegistry.sol
│   ├── StakingVault.sol
│   ├── EnergyOracle.sol
│   ├── EnergyMarket.sol
│   ├── SettlementEngine.sol
│   └── GovernanceDAO.sol
├── test/                    # Test files
├── docs/
│   └── architecture.md      # System architecture documentation
├── ui/                      # Web UI application
│   └── src/
│       ├── components/      # React components
│       └── context/         # Web3 context
└── foundry.toml             # Foundry configuration
```

## Development

### Prerequisites

- Foundry (forge, cast, anvil)
- Solidity ^0.8.20

### Build

```bash
forge build
```

### Test

```bash
forge test
```

### Run UI

The project includes a modern web UI for interacting with the protocol:

```bash
cd ui
npm install
npm run dev
```

The UI will open at `http://localhost:3000` and includes:
- Energy dashboard with real-time metrics
- Energy market with order book visualization
- Panel registry management
- Energy wallet and token transfers
- Settlement engine monitoring
- Staking vault management
- Governance DAO participation

See `ui/README.md` for more details.

### Current Status

This is a bootstrap implementation with:
- ✅ Interface definitions (events, structs, function signatures)
- ✅ Placeholder implementations (all functions revert with "NOT_IMPLEMENTED")
- ✅ Test suite (asserts NOT_IMPLEMENTED reverts)
- ✅ Architecture documentation
- ⏳ Full implementations (to be developed)

## License

MIT
