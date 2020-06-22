const Discord = require('discord.js')
module.exports = {
    name: 'userinfo',
    description: 'Sends a message.',
    cooldown: 1,
    get usage() {
        return `\`\`${prefix}${this.name} (user)\`\``
    },
    async exec(msg,args) {
        let theUser = msg.mentions.users.first()
        let theMember = msg.mentions.members.first()
        if (theUser) {
            let botAffix;if(theUser.bot){botAffix=' ``BOT``'}else{botAffix=''}
            const memberRoles = []
            theMember.roles.cache.forEach(role => memberRoles.push(`<@&${role.id}>`)) ; memberRoles.pop()
            const mEmbed = new Discord.MessageEmbed()
            .setAuthor(theUser.tag,theUser.avatarURL())
            .setDescription(`<@${theUser.id}>`)
            .addFields(
                {name:'Account created:',value: `\`\`\`${theUser.createdAt}\`\`\``, inline:true},
                {name:'Account joined:',value: `\`\`\`${theMember.joinedAt}\`\`\``, inline:true},
                {name:`Roles (${memberRoles.length}):`,value:memberRoles.join(" ")},
            )
            .setThumbnail(theUser.avatarURL())
            .setFooter(`User ID: ${theUser.id}`)
            .setColor('RANDOM')
            .setTimestamp()
            await msg.channel.send(mEmbed)
        } else {
            msg.reply('please mention the person who you want the info of!')
        }
    }
}