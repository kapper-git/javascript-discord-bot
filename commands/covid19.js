const Discord = require('discord.js')
const axios = require('axios')
module.exports = {
    name: 'covid19',
    description: 'corona beer',
    cooldown: 1,
    get usage() {
        return `\`\`${prefix}${this.name} (country)\`\``
    },
    async exec(msg,args) {
        if (args.length) {
            console.log(args[0])
            let getCases = async (ctry) => {
                let link = await axios.get(`https://api.covid19api.com/live/country/${ctry}`)
                let response = await link.data
                return response
            }
            let casesList = await getCases(args[0])
            if (casesList) {
                let numberOfCases = casesList.pop()
                const mEmbed = new Discord.MessageEmbed()
                .setAuthor(`${msg.author.tag} is washing their hands!`,msg.author.avatarURL())
                .setTitle(`Number of COVID-19 cases in :flag_${numberOfCases.CountryCode.toLowerCase()}: *${numberOfCases.Country}*:`)
                .addFields(
                    {name: 'Confirmed cases:', value: numberOfCases.Confirmed,inline:true},
                    {name: 'Recovered:', value: numberOfCases.Recovered,inline:true},
                    {name: 'Deaths:', value: numberOfCases.Deaths,inline:true},
                )
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(`Last updated at ${numberOfCases.Date.split("T")[0]}`)
                await msg.channel.send(mEmbed)
            } else {
                await msg.reply('**invalid country!**')
            }
        } else {
            await msg.reply('**please type a country\'s name!**')
        }
    }
}