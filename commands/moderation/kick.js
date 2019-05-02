const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "kick",
        description: "Kick un utilisateur de la guilde !",
        usage: "d!kick",
        category: "moderation",
        accessableby: ["Fondateur", "Admins"],
        aliases: ["k"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***❌ Vous n'avez pas la permission d'exécuter cette commande !***")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
    if(!kickMember) return message.channel.send("***Veuillez fournir un utilisateur à kicker !***")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "***Aucune raison donnée !***"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("***Je n'ai pas la permission de faire ça !***")

    kickMember.send(`***__Vous avez était expulsé de ${message.guild.name} pour:__*** **${reason}**`).then(() => 
    kickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** ***a était kicker avec succés :white_check_mark:***`).then(m => m.delete(5000))

    let embed = new RichEmbed()
    .setColor("#489DE2")
    .setAuthor(`${message.guild.name} 👟│kick`, message.guild.iconURL)
    .addField("__Commande:__", "kick")
    .addField("__Receveur:__", kickMember.user.username)
    .addField("__Envoyeur:__", message.author.username)
    .addField("__Raison:__", reason)
    .addField("__Date:__", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "👟│kick")
        sChannel.send(embed)

    }
}