const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "removerole",
        description: "Supprime un rôle à un membre du serveur !",
        usage: "d!removerole",
        category: "moderation",
        accessableby: ["Fondateur", "Admins", "Modérateur"],
        aliases: ["rr"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("***❌ Vous n'avez pas la permission d'exécuter cette commande !***")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("***Veuillez fournir un utilisateur pour supprimer un rôle.***")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("***Veuillez fournir un rôle à supprimer de cet utilisateur.***") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("***Veuillez fournir une raison***")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("***Je n'ai pas la permission d'exécuter cette commande.***")

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`**${rMember.displayName}** ***, n'a plus le rôle !***`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`***Le rôle,*** **${role.name}** ***,a été supprimée de*** **${rMember.displayName}** ***avec succés :white_check_mark:.***`)
    }

    let embed = new RichEmbed()
    .setColor("#489DE2")
    .setAuthor(`${message.guild.name} ❕│commande-pour-bots`, message.guild.iconURL)
    .addField("__Commande:__", "Addrole")
    .addField("__Receveur:__", rMember.user.username)
    .addField("__Envoyeur:__", message.author.username)
    .addField("__Raison:__", reason)
    .addField("__Date:__", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "❕│commande-pour-bots")
        sChannel.send(embed)
    }   
}