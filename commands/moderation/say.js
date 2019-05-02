module.exports = {
    config: {
        name: "say",
        description: "envoie un message qui a été entré sur un channel",
        usage: "d!say (...)",
        category: "moderation",
        accessableby: ["Fondateur", "Admins", "Modérateur"],
        aliases: ["acc"]
  },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("***❌ Vous ne pouvez pas utiliser cette commande !***")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

    }
}