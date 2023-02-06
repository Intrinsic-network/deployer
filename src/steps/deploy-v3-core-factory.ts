import IntrinsicFactory from '@intrinsic-network/core/artifacts/contracts/IntrinsicFactory.sol/IntrinsicFactory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'intrinsicCoreFactoryAddress',
  artifact: IntrinsicFactory,
})
