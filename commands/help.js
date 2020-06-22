const { prefix } = require('../config.json')
const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Gives you a list of available commands.',
    cooldown: 5,
    get usage() {
        return `\`\`${prefix}${this.name} (command)\`\``
    },
    async exec(msg,args) {
        const { commands } = msg.client

        if (!args.length) {
            let mEmbed = new Discord.MessageEmbed()
            .setTitle('**Here\'s a list of all available commands:**')
            .setAuthor(`${msg.author.tag} needs help!`,msg.author.avatarURL())
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`Command prefix is ${prefix} | If you need help with a certain command, type ${prefix}help (command)`)
            commands.map(command => 
            mEmbed.addField(`**\`\`${command.name}\`\`**`,`${command.description}`)
            )
            await msg.channel.send(mEmbed)
        } else if (args[0]) {
            let sEmbed = new Discord.MessageEmbed()
            commands.map(command => { if (args[0] === command.name) {
                sEmbed.setTitle(`Command name: \`\`${command.name}\`\``)
                .setDescription(`**Usage: ${command.usage}**\n **Description:** ${command.description}`)
                .setAuthor(`${msg.author.tag} needs help!`,msg.author.avatarURL())
                .setTimestamp()
                .setColor('RANDOM')
                }
            })
            await msg.channel.send(sEmbed)
        }
    }
}