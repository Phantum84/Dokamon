module.exports = {
    config: {
        name: "reload",
        description: "recharge une commande du bot !",
        usage: "d!reload",
        category: "moderation",
        accessableby: "Propriétaire du Bot",
        aliases: ["rl"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "506110944557137948") return message.channel.send("***Tu est le propriétaire du Bot !***")

    if(!args[0]) return message.channel.send("****Veuillez fournir une commande pour recharger !**")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`**Impossible de recharger : \`${args[0].toUpperCase()}\`**`)
    }

    message.channel.send(`***La commande \`${args[0].toUpperCase()}\` a été rechargé :recycle: !***`)

    }
}