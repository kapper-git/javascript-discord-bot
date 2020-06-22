const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'robloxprofile',
    description: 'gay game/platform user profile who plays that bruh',
    cooldown: 15,
    get usage() {
        return `\`\`${prefix}${this.name} (username)\`\``
    },
    async exec(msg,args) {
        let username = args[0] // first argument
        var rege = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789_ ]/
        if (username) { // if username provided
        if (username.match(rege)) { //if username has valid characters
        let getUserId = async () => {
            let link = await axios.get(`https://api.roblox.com/users/get-by-username?username=${username}`)
            let body = link.data
            return body
        }
        let getFriends = async (userid) => {
            let link = await axios.get(`https://friends.roblox.com/v1/users/${userid}/friends/count`)
            let body = link.data
            return body
        }
        let getStatus = async (userid) => {
            let link = await axios.get(`https://api.roblox.com/users/${userid}/onlinestatus/`)
            let body = link.data
            return body
        }
        let getFollowers = async (userid) => {
            let link = await axios.get(`https://friends.roblox.com/v1/users/${userid}/followers/count`)
            let body = link.data
            return body
        }
        let getFollowings = async (userid) => {
            let link = await axios.get(`https://friends.roblox.com/v1/users/${userid}/followings/count`)
            let body = link.data
            return body
        }
        let getActualUsername = async (userid) => {
            let link = await axios.get(`https://users.roblox.com/v1/users/${userid}`)
            let body = link.data
            return body
        }
        
        const rawUserId = await getUserId()
        let userId = rawUserId.Id
        
        // profile variables wont be declared if the userid doesnt exist
        if (userId) {
            const rawActualUsername = await getActualUsername(userId)
            let actualUsername = rawActualUsername.displayName
            let description = rawActualUsername.description || "No description."
            let rawJoinDate = rawActualUsername.created
            let joinDate = rawJoinDate.split("T") //"[dateTtime]" => "[date] [time]"

            const rawStatus = await getStatus(userId)
            let statusValue = rawStatus.LastLocation || 'Offline'

            const rawFriends = await getFriends(userId)
            let friendsCount = rawFriends.count

            const rawFollowers = await getFollowers(userId)
            let followersCount = rawFollowers.count

            const rawFollowings = await getFollowings(userId)
            let followingsCount = rawFollowings.count

            const rEmbed = new Discord.MessageEmbed()
            .setAuthor(`${msg.author.tag}'s requested Roblox profile:`,msg.author.avatarURL()) // kapper's requested roblox profile:
            .setTitle(actualUsername)
            .setURL(`https://www.roblox.com/users/${userId}/profile`)
            .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
            .addFields(
                {name: 'Status:',value: statusValue,inline: true},
                {name: 'Joined:',value: joinDate[0], inline: true},
                {name: 'User ID:',value: userId,inline: true},
                {name: 'Friends:',value: friendsCount, inline: true},
                {name: 'Followers:',value: followersCount, inline: true},
                {name: 'Following:',value: followingsCount, inline: true},
                {name: 'Description:',value: description, inline: true},
            )
            .setImage(`https://assetgame.roblox.com/Thumbs/Avatar.ashx?userId=${userId}&width=352&height=352`)
            .setTimestamp()
            .setColor('RANDOM')

            await msg.channel.send(rEmbed)
        } else {
            const mEmbed = new Discord.MessageEmbed()
            .setTitle(`Roblox profile by the username *${username}* doesn\'t exist!`)
            .setTimestamp()
            .setColor('RANDOM')

            await msg.channel.send(mEmbed).then(message => setTimeout(() => message.delete(),5000))
        }
        } else {
            const sEmbed = new Discord.MessageEmbed()
            .setTitle(`Invalid letter(s) or characters(s)!`)
            .setTimestamp()
            .setColor('RANDOM')

            await msg.channel.send(sEmbed).then(message => setTimeout(() => message.delete(),5000))
        }
    } else {
        const sEmbed = new Discord.MessageEmbed()
            await msg.reply('**please type an username!')
    }
    }
}