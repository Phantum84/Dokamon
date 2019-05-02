const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "cat",
        description: "envoie une photo d'un chat !",
        usage: "d!cat",
        category: "miscellaneous",
        accessableby: "Membres",
        aliases: ["miaow"]
    },
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":recycle:`Chargement...`")

    fetch(`http://aws.random.cat/meow`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("***Oups, réessayer.***")

        let cEmbed = new RichEmbed()
        .setColor("#54BAF4")
        .setAuthor(`${bot.user.username} Chats!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(cEmbed)
            msg.delete();
        })
    }
}