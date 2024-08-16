import TickLens from '@intrinsic-finance/periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_TICK_LENS = createDeployContractStep({
  key: 'tickLensAddress',
  artifact: TickLens,
})
