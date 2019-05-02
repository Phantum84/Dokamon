const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")

module.exports = { 
    config: {
        name: "eval",
        description: "Évalue le code",
        accessbleby: "Propriétaire du Bot",
        type: "owner",
        usage: `${prefix}eval <input>`
    },
    run: async (bot, message, args) => {
    if(message.author.id == ownerid) {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Erreur lors de l'évaluation : \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Exécuté en ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Erreur lors de l'évaluation : \`${e.message}\``);
        }

      } else {
        return message.reply("***Vous n'êtes pas le propriétaire du bot !***").then(msg => msg.delete(5000))
      }
    }
}