import { getMarketsBva } from "./binance"

describe("binance", () => {
    it("gets markets bva", () => {
        const content = {
            limits: {
                amount: { min: 0.001, max: 100000 },
                price: { min: 0.000001, max: 100000 },
                cost: { min: 0.0001, max: 0 }, // "max" didn't come with this dataset originally and was added due to typescript constraints.
                // market: { min: 0, max: 1695.00721821 },
            },
            precision: { base: 8, quote: 8, amount: 3, price: 6 },
            tierBased: false,
            percentage: true,
            taker: 0.001,
            maker: 0.001,
            // feeSide: "get",
            id: "ETHBTC",
            // lowercaseId: "ethbtc",
            symbol: "ETH/BTC",
            base: "ETH",
            quote: "BTC",
            baseId: "ETH",
            quoteId: "BTC",
            info: {
                symbol: "ETHBTC",
                status: "TRADING",
                baseAsset: "ETH",
                baseAssetPrecision: "8",
                quoteAsset: "BTC",
                quotePrecision: "8",
                quoteAssetPrecision: "8",
                baseCommissionPrecision: "8",
                quoteCommissionPrecision: "8",
                orderTypes: [
                    "LIMIT",
                    "LIMIT_MAKER",
                    "MARKET",
                    "STOP_LOSS_LIMIT",
                    "TAKE_PROFIT_LIMIT",
                ],
                icebergAllowed: true,
                ocoAllowed: true,
                quoteOrderQtyMarketAllowed: true,
                isSpotTradingAllowed: true,
                isMarginTradingAllowed: true,
                filters: [
                    {
                        filterType: "PRICE_FILTER",
                        minPrice: "0.00000100",
                        maxPrice: "100000.00000000",
                        tickSize: "0.00000100",
                    },
                    {
                        filterType: "PERCENT_PRICE",
                        multiplierUp: "5",
                        multiplierDown: "0.2",
                        avgPriceMins: "5",
                    },
                    {
                        filterType: "LOT_SIZE",
                        minQty: "0.00100000",
                        maxQty: "100000.00000000",
                        stepSize: "0.00100000",
                    },
                    {
                        filterType: "MIN_NOTIONAL",
                        minNotional: "0.00010000",
                        applyToMarket: true,
                        avgPriceMins: "5",
                    },
                    { filterType: "ICEBERG_PARTS", limit: "10" },
                    {
                        filterType: "MARKET_LOT_SIZE",
                        minQty: "0.00000000",
                        maxQty: "1695.00721821",
                        stepSize: "0.00000000",
                    },
                    { filterType: "MAX_NUM_ORDERS", maxNumOrders: "200" },
                    { filterType: "MAX_NUM_ALGO_ORDERS", maxNumAlgoOrders: "5" },
                ],
                permissions: ["SPOT", "MARGIN"],
            },
            type: "spot",
            spot: true,
            margin: true,
            future: false,
            // delivery: false,
            active: true,
        }

        expect(getMarketsBva({
            "ETH/BTC": content
        }))
            .toEqual({ // Notice the missing slash in the following key.
                "ETHBTC": content
            })
    })
})
