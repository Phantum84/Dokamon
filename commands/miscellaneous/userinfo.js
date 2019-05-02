const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "userinfo",
        description: "Affiche les informations d'un utilisateur !",
        usage: "d!userinfo (@mention)",
        catégory: "miscellaneous",
        accessableby: "Membres",
        aliases: ["ui"]
    },
    run: async (bot, message, args) => {
    let uEmbed = new RichEmbed()
        .setColor("#54BAF4")
        .setTitle("***__Info d'Utilisateur__***")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
        .addField("**__Pseudo:__**", `${message.author.username}`, true)
        .addField("**#:__**", `${message.author.discriminator}`, true)
        .addField("**__ID:__**", `${message.author.id}`, true)
        .addField("**__Status:__**", `${message.author.presence.status}`, true)
        .addField("**__Crée le:__**", `${message.author.createdAt}`, true)
        .setFooter(`©Dokamon`, bot.user.displayAvatarURL);

    message.channel.send(uEmbed);
    }
}