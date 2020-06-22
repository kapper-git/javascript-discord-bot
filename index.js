/*
NOTE TO SELF : THAT USERNAME/NICKNAME CHECKING AND FILTERING IS ONLY POSSIBLE IN LAPIS' SERVER (shnow requested me to do this) SO USERNAME CHECKING IN ANY OTHER SERVERS ARE NOT POSSBILE AT ALL!!!!!!!!!
*/
const FilteredNameId = "591281750441721856" // && "680024210692636672" // arsenal top server
const Discord = require('discord.js')
const client = new Discord.Client({autoReconnect:true})
global.client = client
const fs = require('fs')
const { prefix , token , blacklist } = require('./config.json')
const generalfunc = require('./generalfunc.js')
global.prefix = prefix ; global.token = token
client.commands = new Discord.Collection()
//put all the files that ends with .js in an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const terminal = require('./terminal.js')

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready',() => {
    console.log(`Bot logged in as ${client.user.username}`)
    client.user.setActivity(`with discord.js | ${prefix}help`)
})

client.on('guildMemberAdd',async member => {
    if (member.guild.id === FilteredNameId) {
        generalfunc.checkNameFromMemberUpdate(member)
    }
    //send message in general
    /*const joinChannel = member.guild.channels.cache.find(ch => ch.id === '693721617037000704'); if (!joinChannel) return;

    //create a new embed
    const mEmbed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag} has joined the server!`,member.user.avatarURL())
    .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
    .setDescription(`If you need help with me, please type \`\`${prefix}help\`\` for a list of commands.\n**Note: please don't invite Heroboss..**`)
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail(member.guild.iconURL())

    //send the embed asynchronously
    await joinChannel.send(mEmbed).then(async () => joinChannel.send(`<@${member.user.id}>, have fun!`))*/
})

client.on('guildMemberUpdate', async (oldmember,newmember) => {
    if (newmember.guild.id === FilteredNameId) {
        generalfunc.checkNameFromMemberUpdate(newmember)
    }
})

client.on('userUpdate', async (olduser,newuser) => {
    generalfunc.checkNameFromUserUpdate(newuser)
})

client.on('message', async (msg) => {
    //variable declaration
    const content = msg.content
    const author = msg.author
    const channel = msg.channel
    const args = content.slice(prefix.length).split(/ +/)

    // send in #logs
    const sendChannel = client.channels.cache.find(ch => ch.id === '711579211634311179'); if (!sendChannel) return
    
    if (!author.bot) {
        // [SERVER] USER#9999 IN #CHANNEL SAID: MESSAGE
        sendChannel.send(`**[${msg.guild.name}]** **${msg.author.tag}** in **${msg.channel.name}** said:\n${msg}`)
    }
    //only check username in lapis' server
    if (msg.guild.id === FilteredNameId) {
        generalfunc.checkNameFromMessage(msg)
    }
    // funny emoji reaction!!! chungus kbir
    switch (author.id) {
        case '600217658159398922': //kapper
            await msg.react('709420319089360918');
            break
        case '373426576248799234': //amaze
            await msg.react('709440428197281903')
            break
        case '366604542692818944': //shnow
            await msg.react('💖');
            break
        case '331866579807502336': //lapis
            await msg.react('💞');
            break
        case '682230380442681391': //korone
            await msg.react('709439095281025135');
            break
        /*case '589463898210697227': //sayoko
            await msg.react('🌙');
            break*/
    }

    if (msg.guild.id === '680073871050932255' && msg.channel.id === '711561220423024670') {
        try {
            terminal.exec(msg)
        } catch (error) {
            msg.channel.send(error)
        }
    }

    if (!content.startsWith(prefix) || author.bot) return;
    
    //commands are not usable in #generic-general
    blacklist.every(serverid => { if (channel.id === serverid && !msg.member.roles.cache.has('707649632653541457')) {
            msg.delete()
            const mEmbed = new Discord.MessageEmbed()
            .setTitle('Commands are not allowed in this server! 😔')
            .setTimestamp()
            .setColor('RANDOM')
            channel.send(mEmbed).then(message => setTimeout(() => message.delete(),5000))
    } else {
    
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName)

    if (!client.commands.has(commandName)) {
        msg.reply(`**invalid command! Please type \`\`${prefix}help\`\` for a list of commands.**`).then(message => setTimeout(() => message.delete(),5000));
        msg.delete();
    };

    try {
        if (client.commands.has(commandName)) {
            channel.startTyping()
            command.exec(msg,args)
            channel.stopTyping()
        }
    } catch (error) {
        console.error(error);
        channel.stopTyping()
    }
    }

})})

client.login(token);
