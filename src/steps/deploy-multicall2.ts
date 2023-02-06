import IntrinsicInterfaceMulticall from '@intrinsic-network/periphery/artifacts/contracts/lens/IntrinsicInterfaceMulticall.sol/IntrinsicInterfaceMulticall.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_MULTICALL2 = createDeployContractStep({
  key: 'multicall2Address',
  artifact: IntrinsicInterfaceMulticall,
})
