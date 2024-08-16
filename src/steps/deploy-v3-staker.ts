import IntrinsicStaker from '@intrinsic-finance/staker/artifacts/contracts/IntrinsicStaker.sol/IntrinsicStaker.json'
import createDeployContractStep from './meta/createDeployContractStep'

const ONE_MINUTE_SECONDS = 60
const ONE_HOUR_SECONDS = ONE_MINUTE_SECONDS * 60
const ONE_DAY_SECONDS = ONE_HOUR_SECONDS * 24
const ONE_MONTH_SECONDS = ONE_DAY_SECONDS * 30
const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365

// 2592000
const MAX_INCENTIVE_START_LEAD_TIME = ONE_MONTH_SECONDS
// 1892160000
const MAX_INCENTIVE_DURATION = ONE_YEAR_SECONDS * 2

export const DEPLOY_V3_STAKER = createDeployContractStep({
  key: 'intrinsicStakerAddress',
  artifact: IntrinsicStaker,
  computeArguments(state) {
    if (state.intrinsicCoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NFT contract')
    }
    return [
      state.intrinsicCoreFactoryAddress,
      state.nonfungibleTokenPositionManagerAddress,
      MAX_INCENTIVE_START_LEAD_TIME,
      MAX_INCENTIVE_DURATION,
    ]
  },
})
