module.exports = {
    config: {
        name: "shutdown",
        description: "ferme le bot !",
        usage: "d!shutdown",
        category: "moderation",
        accessableby: "Propriétaire du Bot",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "506110944557137948") return message.channel.send("***Tu est le propriétaire du Bot***")

    try {
        await message.channel.send("***Le Bot s'arrête...:lock:***")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


    }
}