import IntrinsicFactory from '@intrinsic-network/core/artifacts/contracts/IntrinsicFactory.sol/IntrinsicFactory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.intrinsicCoreFactoryAddress === undefined) {
    throw new Error('Missing IntrinsicFactory')
  }

  const v3CoreFactory = new Contract(state.intrinsicCoreFactoryAddress, IntrinsicFactory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `IntrinsicFactory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('IntrinsicFactory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `IntrinsicFactory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
