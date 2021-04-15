const _ = require("lodash")
const env = require("../env")
const TeleBot = require("telebot")

/**
 * @type {TeleBot}
 */
let telBot

module.exports = function (trading_pairs) {
    if (!env.USE_TELEGRAM) return {}

    telBot = new TeleBot(env.TELEGRAM_API_KEY)
    // Get channel id.
    telBot.on("/info", async (msg) => {
        return send(
            "Open Trades: " +
            _.values(trading_pairs).length +
            "\n" +
            "Channel ID : " +
            msg.chat.id
        )
    })
    telBot.on("start", () => {
        send("Trader Bot started!")
    })
    telBot.start()

    return {
        notifyEnterLongSignal,
        notifyEnterLongSignalTraded,
        notifyEnterShortSignal,
        notifyEnterShortSignalTraded,
        notifyExitLongSignal,
        notifyExitLongSignalTraded,
        notifyExitShortSignal,
        notifyExitShortSignalTraded,
        send,
    }
}

function createSignalMessage(base, signal) {
    return (
        base +
        "\n" +
        "strategy: " +
        signal.stratname +
        "\n" +
        "price: " +
        signal.price +
        "\n" +
        "score: " +
        (signal.score || "N/A")
    )
}

function send(message) {
    if (!env.USE_TELEGRAM || !telBot) return

    return telBot.sendMessage(env.TELEGRAM_RECEIVER_ID, message, {
        parseMode: "html",
    })
}

function notifyEnterLongSignal(signal) {
    return send(
        createSignalMessage(`<b>Enter ${signal.pair} long trade.</b>`, signal)
    )
}
function notifyEnterLongSignalTraded(signal) {
    return send(
        createSignalMessage(`<b>SUCCESS!</b> Entered ${signal.pair} long trade.`, signal)
    )
}
function notifyEnterShortSignal(signal) {
    return send(
        createSignalMessage(`<b>Enter ${signal.pair} short trade.</b>`, signal)
    )
}
function notifyEnterShortSignalTraded(signal) {
    return send(
        createSignalMessage(`<b>SUCCESS!</b> Entered ${signal.pair} short trade.`, signal)
    )
}
function notifyExitLongSignal(signal) {
    return send(
        createSignalMessage(`<b>Exit ${signal.pair} long trade.</b>`, signal)
    )
}
function notifyExitLongSignalTraded(signal) {
    return send(
        createSignalMessage(`<b>SUCCESS!</b> Exited ${signal.pair} long trade.`, signal)
    )
}
function notifyExitShortSignal(signal) {
    return send(
        createSignalMessage(`<b>Exit ${signal.pair} short trade.</b>`, signal)
    )
}
function notifyExitShortSignalTraded(signal) {
    return send(
        createSignalMessage(`<b>SUCCESS!</b> Exited ${signal.pair} short trade.`, signal)
    )
}
