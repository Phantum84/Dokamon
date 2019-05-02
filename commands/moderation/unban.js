const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "unban",
        description: "Déban un membre du serveur !",
        usage: "d!unban",
        category: "moderation",
        accessableby: ["Fondateur", "Admins"],
        aliases: ["ub"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***❌ Vous n'avez pas la permission d'exécuter cette commande !***")

		
	if(isNaN(args[0])) return message.channel.send("***Vous devez fournir un ID.***")
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("****Veuillez fournir un nom d'utilisateur pour débannir quelqu'un !**")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "***Aucune raison donnée !***"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***Je n'ai pas la permission d'exécuter cette commande.***")|
    message.delete()
    try {
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} ***a était débanni avec succés :white_check_mark:*** `)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new RichEmbed()
    .setColor("#489DE2")
    .setAuthor(`${message.guild.name} 🚪│ban`, message.guild.iconURL)
    .addField("__Commande:__", "unban")
    .addField("__Banni:__", `${bannedMember.username} (${bannedMember.id})`)
    .addField("__Envoyeur:__", message.author.username)
    .addField("__Raison__:", reason)
    .addField("__Date:__", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "🚪│ban")
        sChannel.send(embed)

    }
}