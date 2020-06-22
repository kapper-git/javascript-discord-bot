const Discord = require('discord.js')

module.exports = {
    async exec(msg) {
        const author = msg.author
        const content = msg.content
        const channel = msg.channel
        const guild = msg.guild

        const terminal_command_slices = content.split(/ +/)
        const terminal_command = terminal_command_slices.shift()

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        const mEmbed = new Discord.MessageEmbed()
        .setTitle(`Welcome to ${client.user.username}'s Terminal!`)
        .setDescription(`Type \`\`info\`\` for a list of terminal commands.\nDate: ${dateTime}`)
        .setColor('#00ffea')
        
        switch (terminal_command) {
            case 'info':
                channel.send(mEmbed)
                break
            case 'echo':
                if (terminal_args.length) {
                    channel.send(terminal_args.join(" "))
                } else {
                    channel.send('**ERROR: MISSING ARGUMENTS**')
                }
                break
            case 'clear':
                const fetched = await channel.messages.fetch({limit: 100})
                channel.bulkDelete(fetched).then(() => {
                    channel.send(mEmbed)
                })        
            break
            case 'say':
                const channelID = terminal_command_slices[0]
                if (channelID) {
                    const sendChannel = client.channels.cache.find(ch => ch.id === channelID); if (!sendChannel) return
                    var removedElement = terminal_command_slices.shift()
                    sendChannel.send(terminal_command_slices.join(" "))
                }
            }
    }
}