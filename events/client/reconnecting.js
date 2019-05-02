const dateformat = require("dateformat");

module.exports = () => { 
    console.log(`C'est reconnecter le ${dateformat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}.`)
}