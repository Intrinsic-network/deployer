import V3Migrator from '@intrinsic-finance/periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_MIGRATOR = createDeployContractStep({
  key: 'v3MigratorAddress',
  artifact: V3Migrator,
  computeArguments(state, config) {
    if (state.intrinsicCoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NonfungiblePositionManager')
    }
    return [state.intrinsicCoreFactoryAddress, config.wrbtcAddress, state.nonfungibleTokenPositionManagerAddress]
  },
})
