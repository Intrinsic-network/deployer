import NonfungiblePositionManager from '@intrinsic-network/periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_NONFUNGIBLE_POSITION_MANAGER = createDeployContractStep({
  key: 'nonfungibleTokenPositionManagerAddress',
  artifact: NonfungiblePositionManager,
  computeArguments(state, config) {
    if (state.intrinsicCoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.descriptorProxyAddress === undefined) {
      throw new Error('Missing NonfungibleTokenDescriptorProxyAddress')
    }

    return [state.intrinsicCoreFactoryAddress, config.wrbtcAddress, state.descriptorProxyAddress]
  },
})
