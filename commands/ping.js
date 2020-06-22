const Discord = require('discord.js')
module.exports = {
    name: 'ping',
    description: 'Pong!',
    cooldown: 1,
    get usage() {
        return `\`\`${prefix}${this.name}\`\``
    },
    async exec(msg,args) {
        const mEmbed = new Discord.MessageEmbed()
        .setTitle(`Anyone up for a game of *Pong*? \`\`...ms\`\``)
        .setColor('RANDOM')
        .setTimestamp()
        .setAuthor(`${msg.author.tag} wants to play Pong!`,msg.author.avatarURL())
        await msg.channel.send(mEmbed).then(message => {
            const ping = message.createdTimestamp - msg.createdTimestamp
            message.edit(new Discord.MessageEmbed().setTitle(`Anyone up for a game of *Pong*? \`\`${ping}ms\`\``).setColor('RANDOM')
            .setTimestamp().setAuthor(`${msg.author.tag} wants to play Pong!`,msg.author.avatarURL()))
            }
        )
    }
}