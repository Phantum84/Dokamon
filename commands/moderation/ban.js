const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "ban",
        description: "ban un membre du serveur !",
        usage: "d!ban",
        category: "moderation",
        accessableby: ["Fondateur", "Admins"],
        aliases: ["b"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***❌ Vous n'avez pas la permission d'exécuter cette commande !***")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("***Veuillez fournir un utilisateur à bannir !***")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "***Aucune raison donnée !***"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***Je n'ai pas la permission d'exécuter cette commande.***")

   banMember.send(`***__Vous avez était banni de ${message.guild.name} pour:__*** **${reason}**`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** ***a était bannie avec succés :white_check_mark:***`).then(m => m.delete(5000))

    let embed = new RichEmbed()
    .setColor("#489DE2")
    .setAuthor(`${message.guild.name} 🚪│ban`, message.guild.iconURL)
    .addField("__Commande:__", "ban")
    .addField("__Receveur:__", banMember.user.username)
    .addField("__Envoyeur:__", message.author.username)
    .addField("__Raison:__", reason)
    .addField("__Date:__", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "🚪│ban")
        sChannel.send(embed)
    }
}