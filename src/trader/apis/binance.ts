import ccxt from "ccxt"

import env from "../env"
import logger from "../../logger"

const logBinanceUndefined = "Binance client is undefined!"

let binanceClient: ccxt.binance

if (process.env.NODE_ENV !== "test") {
    binanceClient = new ccxt.binance({
        apiKey: env().BINANCE_API_KEY,
        enableRateLimit: true,
        secret: env().BINANCE_SECRET_KEY,
    })

    if (process.env.NODE_ENV === "staging") {
        binanceClient.setSandboxMode(true)
    }
}

export function getMarketsBva(markets: ccxt.Dictionary<ccxt.Market>): ccxt.Dictionary<ccxt.Market> {
    Object.keys(markets).forEach((key) => {
        const keyNew = markets[key].id
        markets[keyNew] = markets[key]
        delete markets[key]
    })
    return markets
}

export function loadMarkets(isReload?: boolean): Promise<ccxt.Dictionary<ccxt.Market>> {
    return new Promise((resolve, reject) => {
        binanceClient
            .loadMarkets(isReload)
            .then((markets) => {
                logger.info(`Loaded ${Object.keys(markets).length} markets.`)
                resolve(getMarketsBva(markets))
            })
            .catch((reason) => {
                logger.error(`Failed to get markets: ${reason}`)
                reject(reason)
            })
    })
}

export async function createMarketOrder(
    symbol: string,
    side: "buy" | "sell",
    amount: number,
    price?: number,
    params?: ccxt.Params
): Promise<ccxt.Order> {
    if (!binanceClient) return Promise.reject(logBinanceUndefined)
    return binanceClient.createMarketOrder(symbol, side, amount, price, params)
}

export async function marginBorrow(
    asset: string,
    amount: number,
    timestamp: number
): Promise<ccxt.Order> {
    if (!binanceClient) return Promise.reject(logBinanceUndefined)
    return binanceClient.api.sapiPostMarginLoan({
        asset,
        isIsolated: false, // "false" for cross margin borrow without specification of a symbol.
        amount,
        timestamp,
    })
}

export async function marginRepay(
    asset: string,
    amount: number,
    timestamp: number
): Promise<ccxt.Order> {
    if (!binanceClient) return Promise.reject(logBinanceUndefined)
    return binanceClient.api.sapiPostMarginRepay({
        asset,
        isIsolated: false, // "false" for cross margin repay without specification of a symbol.
        amount,
        timestamp,
    })
}
