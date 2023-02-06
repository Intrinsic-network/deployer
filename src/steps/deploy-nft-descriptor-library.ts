import NFTDescriptor from '@intrinsic-network/periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'
import createDeployLibraryStep from './meta/createDeployLibraryStep'

export const DEPLOY_NFT_DESCRIPTOR_LIBRARY = createDeployLibraryStep({
  key: 'nftDescriptorLibraryAddress',
  artifact: NFTDescriptor,
})
