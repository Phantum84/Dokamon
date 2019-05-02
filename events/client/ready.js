module.exports = async bot => {
    console.log(`${bot.user.username} est online`)
   // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

   let statuses = [
       `${bot.guilds.size} serveurs!`,
       "d!help",
       ` ${bot.users.size} membres!`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000)

}