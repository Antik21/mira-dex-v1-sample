# TypeScript Utility for Token Swap on Mira Protocol

This utility is designed to simplify token swaps on the Mira Protocol using TypeScript. It allows you to exchange one token for another with ease while maintaining flexibility for other features such as balance checking.

---

## Key Features
1. **Token Swap**: The primary method enables you to swap one token for another using the Mira Protocol.
2. **Balance Retrieval**: A helper function lets you check the current balance of your wallet for a specific token or all tokens.
3. **Retry Mechanism**: Built-in retry logic ensures reliable execution of swaps, even in cases of network issues.
4. **Configurable via Environment Variables**: Securely configure your private key and other settings using a `.env` file.

---

## Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v18.x or later)
- NPM or Yarn

### Installation

1. Clone the repository and navigate to the project directory:
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root of the project and specify the following:
  ```
PROVIDER_URL=https://mainnet.fuel.network/v1/graphql
CONTRACT_ID=0x2e40f2b244b98ed6b8204b3de0156c6961f98525c8162f80162fcf53eebd90e7
WALLET_PK=<YOUR_PRIVATE_KEY>
```

## Usage

### Swap Tokens
The main method supports swapping one token for another. It calculates the optimal parameters for the transaction and performs the swap.

### Pre-requisite:
Ensure you have at least $10 worth of Ether on your wallet to cover the transaction fees.
