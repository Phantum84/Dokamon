module.exports = { 
    config: {
        name: "ping",
        description: "PONG ! Affiche la latence et l'api du bot",
        usage: "d!ping",
        category: "miscellaneous",
        accessableby: "Membres"
    },
    run: async (bot, message, args) => {

    message.channel.send("`Pinging...`").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["***C'est vraiment mon ping ?***", "***Est-ce que c'est bon ? Je ne peux pas regarder***", "***J'espère que ce n'est pas mauvais.***"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: __Latence du Bot:__ \`${ping}\`, __Latence de l'API:__ \`${Math.round(bot.ping)}\``)
    })
  }
}