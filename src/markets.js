import { getTruffleArgsFromOptions, sendTransactionAndGetResult } from './utils'

/**
 * Creates a market.
 *
 * Note: this method is asynchronous and will return a Promise
 *
 * @param {(Contract|string)} opts.forwardedOracle - The forwarded oracle contract or its address
 * @param {(Contract|string)} opts.collateralToken - The collateral token contract or its address
 * @param {(number|string|BigNumber)} opts.spreadMultiplier - The spread multiplier
 * @param {(number|string|BigNumber)} opts.challengePeriod - The challenge period in seconds
 * @param {(number|string|BigNumber)} opts.challengeAmount - The amount of collateral tokens put at stake in the challenge
 * @param {(number|string|BigNumber)} opts.frontRunnerPeriod - The front runner period in seconds
 * @returns {Contract} The created ultimate oracle contract instance
 * @alias Gnosis#createUltimateOracle
 */
export async function createMarket (opts) {
    let args = getTruffleArgsFromOptions([
        'event',
        'marketMaker',
        'fee'
    ], opts)

    return await sendTransactionAndGetResult({
        factoryContract: opts.marketFactory,
        methodName: 'createMarket',
        methodArgs: args,
        eventName: 'MarketCreation',
        eventArgName: 'market',
        resultContract: this.contracts.Market
    })
}