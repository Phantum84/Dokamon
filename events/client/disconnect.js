const dateformat = require("dateformat");

module.exports = () => {
    console.log(`Vous avez été déconnecté le ${dateformat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")}.`)
}