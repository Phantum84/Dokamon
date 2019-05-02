const { RichEmbed } = require("discord.js")
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "meme",
        description: "Envoie un mème depuis un site web !",
        usage: "d!meme",
        category: "miscellaneous",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
    let msg = await message.channel.send(":recycle:`Chargement...`")

    fetch(`https://api-to.get-a.life/meme`)
    .then(res => res.json()).then(body => {
        if(!body) return message.reply("***Oups, réessayer.***")

        let mEmbed = new RichEmbed()
        .setColor("#54BAF4")
        .setAuthor(`${bot.user.username} Memes!`, message.guild.iconURL)
        .setImage(body.url)
        .setTimestamp()
        .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(mEmbed)
            msg.delete();
        })
    }
}