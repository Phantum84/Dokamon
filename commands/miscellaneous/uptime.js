module.exports = {
    config: {
        name: "uptime",
        description: "Affiche le temps de fonctionnement actuel du Bot !",
        usage: "d!uptime",
        category: "miscellaneous",
        accessableby: "Membres",
        aliases: ["ut"]
    },
    run: async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} jours, ${hrs.padStart(2, '0')} heures, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} secondes, `
    }

    message.channel.send(`***J'ai était en ligne pendant ${duration(bot.uptime)}***`)

    }
}