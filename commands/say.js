const Discord = require('discord.js')
module.exports = {
    name: 'say',
    description: 'Sends a message.',
    cooldown: 1,
    get usage() {
        return `\`\`${prefix}${this.name} (message)\`\``
    },
    async exec(msg,args) {
        if (msg.author.id === '600217658159398922') {
        msg.delete()
        if (args.length) {
            msg.channel.send(args.join(" "))
        } else {
            const mEmbed = new Discord.MessageEmbed()
            .setTitle('You need to type something!')
            .setColor('RANDOM')
            .setTimestamp()
            await msg.channel.send(mEmbed).then(message => setTimeout(() => message.delete(),5000))
        }
    } else {
        msg.reply('**you don\'t have the permission to execute this command!')
    }
    }
}