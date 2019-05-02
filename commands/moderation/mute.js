const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        description: "Mute un membre du serveur !",
        usage: "d!mute <@user> <raison>",
        category: "moderation",
        accessableby: ["Fondateur", "Admins", "Modérateur"],
        aliases: ["m"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("***❌ Vous n'avez pas la permission d'exécuter cette commande !***");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("***Je n'ai pas la permission d'ajouter des rôles !***")

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("***Veuillez fournir un utilisateur pour être muté!***");

let reason = args.slice(1).join(" ");
if(!reason) reason = "***Aucune raison donnée***"

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muté 🔇")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muté 🔇",
            color: "#ffffff",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`***__Vous avez était muté de ${message.guild.name} pour:__*** **${reason}**`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} ***a était muté avec succés :white_check_mark:***`)
})

//send an embed to the modlogs channel
let embed = new RichEmbed()
    .setColor("#489DE2")
    .setAuthor(`${message.guild.name} 🔇│mute`, message.guild.iconURL)
    .addField("__Commande:__", "mute")
    .addField("__Receveur:__", mutee.user.username)
    .addField("__Envoyeur:__", message.author.username)
    .addField("__Raison:__", reason)
    .addField("__Date:__", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "🔇│mute")
sChannel.send(embed)
    }
}
