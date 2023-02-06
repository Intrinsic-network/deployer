import IntrinsicFactory from '@intrinsic-network/core/artifacts/contracts/IntrinsicFactory.sol/IntrinsicFactory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

const ONE_BP_FEE = 100
const ONE_BP_TICK_SPACING = 1

export const ADD_1BP_FEE_TIER: MigrationStep = async (state, { signer, gasPrice }) => {
  if (state.intrinsicCoreFactoryAddress === undefined) {
    throw new Error('Missing IntrinsicFactory')
  }

  const v3CoreFactory = new Contract(state.intrinsicCoreFactoryAddress, IntrinsicFactory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner !== (await signer.getAddress())) {
    throw new Error('IntrinsicFactory.owner is not signer')
  }
  const tx = await v3CoreFactory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING, { gasPrice })

  return [
    {
      message: `IntrinsicFactory added a new fee tier ${ONE_BP_FEE / 100} bps with tick spacing ${ONE_BP_TICK_SPACING}`,
      hash: tx.hash,
    },
  ]
}
