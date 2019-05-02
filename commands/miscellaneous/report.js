module.exports = { 
    config: {
        name: "report",
        description: "signale un utilisateur de la guilde",
        usage: "d!report <@user> <raison>",
        accessableby: "Membres",
    },
    run: async (bot, message, args) => {

        message.delete()
        // utilisateur mentionné ou saisi
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!target) return message.channel.send("***Veuillez fournir un utilisateur valide***").then(m => m.delete(15000))

        // définition du raisonnement
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`***Veuillez donner une raison pour laquelle vous souhaitez faire un rapport*** **${target.user.tag}**`).then(m => m.delete(15000))

        // canal de rapports d'accaparement
        let sChannel = message.guild.channels.find(x => x.name === "🆘│report")

        // envoyer sur le canal des rapports et ajouter une coche ou une croix

        message.channel.send("***Je vous remercie ! Votre report a été transmis à l'équipe du staff.***").then(m => m.delete(15000))
        sChannel.send(`**${message.author.tag}** a était report **${target.user.tag}** pour **${reason}**.`).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })

  }
}