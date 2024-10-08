import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import IntrinsicFactory from '@intrinsic-finance/core/artifacts/contracts/IntrinsicFactory.sol/IntrinsicFactory.json'
import { expect } from 'chai'
import { DEPLOY_V3_CORE_FACTORY } from '../src/steps/deploy-v3-core-factory'
import { asciiStringToBytes32 } from '../src/util/asciiStringToBytes32'

const DUMMY_ADDRESS = '0x9999999999999999999999999999999999999999'

const ganache = require('ganache-cli')

describe('deploy-v3-core-factory', () => {
  let provider: Web3Provider
  let signer: JsonRpcSigner

  before('create provider', () => {
    provider = new Web3Provider(ganache.provider())
    signer = provider.getSigner()
  })

  function singleElem<T>(v: T[]): T {
    return v[0]
  }

  describe('DEPLOY_V3_CORE_FACTORY', () => {
    it('deploys the v3 core factory contract', async () => {
      const result = singleElem(
        await DEPLOY_V3_CORE_FACTORY(
          {},
          {
            signer,
            gasPrice: BigNumber.from(1),
            ownerAddress: DUMMY_ADDRESS,
            v2CoreFactoryAddress: DUMMY_ADDRESS,
            wrbtcAddress: DUMMY_ADDRESS,
            nativeCurrencyLabelBytes: asciiStringToBytes32('RBTC'),
          }
        )
      )
      expect(result.message).to.eq('Contract IntrinsicFactory deployed')
    })

    it('does not deploy if already deployed', async () => {
      const result = singleElem(
        await DEPLOY_V3_CORE_FACTORY(
          { intrinsicCoreFactoryAddress: DUMMY_ADDRESS },
          {
            signer,
            gasPrice: BigNumber.from(1),
            ownerAddress: DUMMY_ADDRESS,
            v2CoreFactoryAddress: DUMMY_ADDRESS,
            wrbtcAddress: DUMMY_ADDRESS,
            nativeCurrencyLabelBytes: asciiStringToBytes32('ETH'),
          }
        )
      )
      expect(result.message).to.eq('Contract IntrinsicFactory was already deployed')
      expect(result.address).to.eq(DUMMY_ADDRESS)
    })

    describe('test contract functions', () => {
      let v3CoreFactory: Contract
      beforeEach(async () => {
        const result = singleElem(
          await DEPLOY_V3_CORE_FACTORY(
            {},
            {
              signer,
              gasPrice: BigNumber.from(1),
              ownerAddress: DUMMY_ADDRESS,
              v2CoreFactoryAddress: DUMMY_ADDRESS,
              wrbtcAddress: DUMMY_ADDRESS,
              nativeCurrencyLabelBytes: asciiStringToBytes32('ETH'),
            }
          )
        )
        v3CoreFactory = new Contract(result.address!, IntrinsicFactory.abi, provider)
      })

      it('points to signer address', async () => {
        expect(await v3CoreFactory.owner()).to.eq(await signer.getAddress())
      })
    })
  })
})
