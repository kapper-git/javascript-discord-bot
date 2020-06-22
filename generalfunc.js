badwords = ["nigger","nigga","cum","slut","sex","vagina"]
badwordplaceholder = "BAD_WORD_IN_NAME"

const generalfunc = {
    checkName(paramUser,paramMember) {
        badwords.forEach(badword => {
                if (paramUser.username.toLowerCase().includes(badword)) {
                paramMember.setNickname(`${badwordplaceholder}#${paramUser.discriminator}`).catch((error) => console.log('error occured!'))
            } else if (paramMember && paramMember.nickname) {
                if (paramMember.nickname.toLowerCase().includes(badword)) {
                    paramMember.setNickname(`${badwordplaceholder}#${paramUser.discriminator}`)
                }
            }
        })
    },
    async checkNameFromMessage(msg) {
        this.checkName(msg.author,msg.member)
    },
    async checkNameFromMemberUpdate(member) {
        this.checkName(member.user,member)
    },
    async checkNameFromUserUpdate(user) {
        let userGuild = client.guilds.cache.get('680024210692636672')
        let userMember = userGuild.members.cache.get(user.id)
        this.checkName(user,userMember)
    }
}
module.exports = generalfunc
