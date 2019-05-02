const { RichEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "help",
        aliases: ["h"],
        usage: "d!usage",
        category: "miscellaneous",
        description: "",
        accessableby: "Membres"
    },
    run: async (bot, message, args) => {
    let arr = [];
    let types = ["Moderation", "Miscellaneous"];
    let embed = new RichEmbed()

    if (!args[0]) {
        for(let i = 0; i < types.length; i++) {
            arr.push(bot.commands.filter(c => c.config.category == types[i].toLowerCase()).map(c => `\`${c.config.name}\``).join(" "));
            try {
                embed.addField(types[i], arr[i]);
            } catch (e) {
                embed.addBlankField();
            }
        }

        embed.setColor(cyan)
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`***Voici les commandes disponibles pour Dokamon !***\n__Le prefix du bot est:__ **${prefix}**`)
        .setFooter("©Dokamon", bot.user.displayAvatarURL)
        message.channel.send(embed)
    } else {
        let command = bot.commands.get(args[0].toLowerCase()) ?  bot.commands.get(args[0].toLowerCase()).config : bot.commands.get(bot.aliases.get(args[0].toLowerCase())).config;
            
        embed.setColor("#54BAF4")
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(`__Le prefix du bot est:__ ${prefix}\n\n**Command:** ${command.name}\n**Déscription:** ${command.description || "Pas de Description"}\n**Usage:** ${command.usage || "Pas d'Usage"}\n**Accessible pour:** ${command.accessableby || "Membres"}\n**Aliases:** ${command.aliases ? command.aliases.join(", ") : "Aucun"}`)
        message.channel.send(embed);
        }
    }
}