const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "dog",
        déscription: "Envoie la photo d'un chien !",
        usage: "d!dog",
        category: "miscellaneous",
        accessableby: "Membres",
        aliases: ["wouf"]
    },
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":recycle:`Chargement...`")

    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("***Oups, réessayer.***")

        let dEmbed = new RichEmbed()
        .setColor("#54BAF4")
        .setAuthor(`${bot.user.username} Chiens!`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(dEmbed)
            msg.delete();
        })
    }
}