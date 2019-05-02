const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "serverinfo",
        description: "Affiche les informations du serveur !",
        usage: "d!serverinfo",
        category: "miscellaneous",
        accessableby: "Membres",
        aliases: ["si"]
    },
    run: async (bot, message, args) => {
    let sEmbed = new RichEmbed()
        .setColor("#54BAF4")
        .setTitle("***__Infos du Serveurs__***")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**__Nom du Serveur:__**", `${message.guild.name}`, true)
        .addField("**__Propriétaire du Serveur:__**", `${message.guild.owner}`, true)
        .addField("**__Nombre de Membre:__**", `${message.guild.memberCount}`, true)
        .addField("**__Role Count:__**", `${message.guild.roles.size}`, true)
        .setFooter(`©Dokamon`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
}