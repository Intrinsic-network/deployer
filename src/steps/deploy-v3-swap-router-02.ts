import SwapRouter02 from '@intrinsic-finance/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_SWAP_ROUTER_02 = createDeployContractStep({
  key: 'swapRouter02',
  artifact: SwapRouter02,
  computeArguments(state, config) {
    if (state.intrinsicCoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NFT manager')
    }

    return [
      config.v2CoreFactoryAddress,
      state.intrinsicCoreFactoryAddress,
      state.nonfungibleTokenPositionManagerAddress,
      config.wrbtcAddress,
    ]
  },
})
