const Discord = require('discord.js');
const dotenv = require("dotenv");
const fs = require('fs');
const util = require('util');
dotenv.config({ path: __dirname + "/.env" });
const client = new Discord.Client();
var guildId = 663646979636723727;
var rrId = 682996063606800404;
var messageId = 0;
var cleanId = 0;
async function counter(guild) {
    if (guild.channels.cache.find(x => x.name.startsWith('유저 수'))) {
        await guild.channels.cache.find(x => x.name.startsWith('유저 수')).delete();
    }
    if (guild.channels.cache.find(x => x.name.startsWith('모든 유저 수'))) {
        await guild.channels.cache.find(x => x.name.startsWith('모든 유저 수')).delete();
    }
    if (guild.channels.cache.find(x => x.name.startsWith('봇 수'))) {
        await guild.channels.cache.find(x => x.name.startsWith('봇 수')).delete();
    }
    if (guild.channels.cache.find(x => x.name === '봇개소 유저 현황')) {
        await guild.channels.cache.find(x => x.name === '봇개소 유저 현황').delete();
    }
    await guild.channels.create('봇개소 유저 현황', {
        type: 'category'
    }).then(c => {
        guild.channels.create('모든 유저 수:' + guild.memberCount, {
            type: "voice",
            parent: c.id
        });
        var user = 0;
        guild.members.cache.forEach(x => {
            if (!x.user.bot) {
                user++
            }
        });
        guild.channels.create('유저 수:' + user, {
            type: "voice",
            parent: c.id
        });
        var bot = 0;
        guild.members.cache.forEach(x => {
            if (x.user.bot) {
                bot++
            }
        });
        guild.channels.create('봇 수:' + bot, {
            type: "voice",
            parent: c.id
        });
    });
}
async function type(text) {
    if (text.toLowerCase().startsWith("promise")) {
        if (typeof text === "Promise { <pending> }") {
            return "promise 실행 중";
        } else if (typeof text === "Promise { <fulfilled> }") {
            return "promise 실행 성공";
        } else if (typeof text === "Promise { <rejected> }") {
            return "promise 실행 실패";
        } else {
            return "promise";
        }
    } else if (typeof text.toLowerCase() === "string") {
        return "문자열";
    } else if (typeof text.toLowerCase() === "number") {
        return "숫자";
    } else if (typeof text.toLowerCase() === "object") {
        return "객체";
    } else if (typeof text.toLowerCase() === "array") {
        return "배열";
    } else if (
        typeof text.toLowerCase() === "undefined" ||
        typeof text.toLowerCase() === null
    ) {
        return "NULL(값이 없음)";
    } else {
        return text;
    }
}
client.on('ready', async () => {
    await console.log(`${client.user.tag}로 로그인됨`);
    if (!client.guilds.cache.get(guildId)) return;
    await client.user.setPresence({
        status: "online",
        activities: {
            name: '관리',
            type: "PLAYING"
        },
        shardID: 0
    });
    const embed = new Discord.MessageEmbed()
        .setTitle('봇개소 역할 받기')
        .setThumbnail(client.guilds.cache.get(guildId).iconURL({
            dynamic: true
        }))
        .setDescription('1️⃣: Python\n2️⃣: Javascript\n3️⃣: Java\n4️⃣: CSharp\n5️⃣: CPP, C\n6️⃣: Swift\n7️⃣:PHP\n8️⃣:Go\n9️⃣:Discord Bot Maker')
        .setColor(0x00ffff)
        .setFooter('봇 개발자들의 소통방', client.guilds.cache.get(guildId).iconURL({
            dynamic: true
        }))
        .setTimestamp()
    await client.channels.cache.get(rrId).bulkDelete(1);
    await client.channels.cache.get(rrId).send(embed).then(async m => {
        messageId = m.id;
        await m.react('1️⃣');
        await m.react('2️⃣');
        await m.react('3️⃣');
        await m.react('4️⃣');
        await m.react('5️⃣');
        await m.react('6️⃣');
    });
    await setInterval(async () => {
        /*
        random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
            await client.user.setPresence({
                status: "online",
                activities: {
                    name: '관리',
                    type: "PLAYING"
                }
            });
        }
        else {
            await client.user.setPresence({
                status: "online",
                activities: {
                    name: `${client.guilds.cache.get('675317307198668840').memberCount}명의 멤버`,
                    type: "WATCHING"
                }
            });
        }
        */
    }, 10000);
});
client.on('messageReactionAdd', async (react, user) => {
    if (!client.guilds.cache.get(guildId)) return;
    if (user.bot) return;
    if (react.message.channel.id != rrId) return;
        if (react.message.id == messageId) {
            if (react.emoji.name === '1️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('Python')));
            } else if (react.emoji.name === '2️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('Javascript')));
            } else if (react.emoji.name === '3️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('Java')));
            } else if (react.emoji.name === '4️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('CSharp')));
            } else if (react.emoji.name === '5️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('C, CPP')));
            } else if (react.emoji.name === '6️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('Swift')));
            } else if (react.emoji.name === '7️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('PHP')));
            } else if (react.emoji.name === '8️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.startsWith('Go')));
            } else if (react.emoji.name === '9️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.add(react.message.guild.roles.cache.find(r => r.name.toLowerCase().startsWith('discord bot maker')));
            }
        }
});
client.on('messageReactionRemove', async (react, user) => {
    if (!client.guilds.cache.get(guildId)) return;
    if (user.bot) return;
    if (react.message.channel.id != rrId) return;
        if (react.message.id == messageId) {
            if (react.emoji.name === '1️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('Python')));
            } else if (react.emoji.name === '2️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('Javascript')));
            } else if (react.emoji.name === '3️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('Java')));
            } else if (react.emoji.name === '4️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('CSharp')));
            } else if (react.emoji.name === '5️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('C, CPP')));
            } else if (react.emoji.name === '6️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('Swift')));
            } else if (react.emoji.name === '7️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('PHP')));
            } else if (react.emoji.name === '8️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.startsWith('Go')));
            } else if (react.emoji.name === '9️⃣') {
                await react.message.guild.members.cache.get(user.id).roles.remove(react.message.guild.roles.cache.find(r => r.name.toLowerCase().startsWith('discord bot maker')));
            }
        }
});
client.on('message', async message => {
    if (message.channel.type != 'text') return;
    if (message.author.bot) return;
    if (!message.content.startsWith('b!')) return;
    message.channel.startTyping(1);
    if (!message.member.hasPermission('ADMINISTRATOR')) return await message.channel.send('이 봇의 모든 명령어는 서버 관리자 권한이 있어야 사용할 수 있습니다.');
    const args = message.content.substr(2);
    if (args.startsWith('ban')) {
        const arg2 = args.split('$');
        if (arg2.length != 3) return message.cahnnel.send('차단 메세지는 b!ban$<차단할 멤버 멘션>$<차단 이유> 형식이어야 합니다.');
        const mention = message.mentions.users.first();
        if (!mention) return message.channel.send('차단할 유저를 멘션해주세요');
        const member = message.guild.member(mention);
        if (!member) return message.channel.send('유효하지 않은 멤버입니다.');
        await member.ban({
            reason: arg2[2]
        }).then(x => {
            message.channel.send(x.user.tag + '을/를 차단했습니다.');
        });
    }
    else if (args.startsWith('kick')) {
        const arg2 = args.split('$');
        if (arg2.length != 3) return message.cahnnel.send('추방 메세지는 b!ban$<추방할 멤버 멘션>$<추방 이유> 형식이어야 합니다.');
        const mention = message.mentions.users.first();
        if (!mention) return message.channel.send('추방할 유저를 멘션해주세요');
        const member = message.guild.member(mention);
        if (!member) return message.channel.send('유효하지 않은 멤버입니다.');
        await member.kick(arg2[2]).then(x => {
            message.channel.send(x.user.tag + '을/를 추방했습니다.');
        });
    }
    else if (args === 'counter') {
        counter(message.guild);
    }
    else if (args.startsWith('eval ')) {
        const arg = message.content.split(" ").slice(1);
        if (message.author.id != '647736678815105037') return;
        const imbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} Evaling...`)
            .addField("입력", "```js\n" + args.substr(5) + "\n```")
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp();
        let x = await message.channel.send(imbed);
        try {
            const code = arg.join(" ");
            let evaled = eval(code);
            console.log(evaled);
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            if (evaled.length >= 1020) evaled = `${evaled.substr(0, 1010)}...`;
            await console.log(evaled);
            const embed = new Discord.MessageEmbed()
                .setTitle("eval 결과")
                .setDescription(
                    "~~이건 제가 ditto7890#8948님 도움 없이 혼자서 만든 코드입니다.~~"
                )
                .addField(
                    "입력 코드",
                    "```js\n" + message.content.substr(7) + "\n```"
                )
                .addField("결과", "```js\n" + evaled + "\n```")
                .addField("결과 자료형", "```js\n" + type(evaled) + "\n```")
                .setColor(0x00ff00)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            await x.edit(embed);
        } catch (err) {
            if (message.channel.type != "text") return;
            const embed = new Discord.MessageEmbed()
                .setTitle("에러 | Error")
                .addField("에러 내용", err)
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/665169857972797440/670904480388218900/unknown.png"
                );
            const embed2 = new Discord.MessageEmbed()
                .setTitle("eval 오류")
                .setDescription(
                    "~~이건 제가 ditto7890#8948님 도움 없이 혼자서 만든 코드입니다.~~"
                )
                .addField(
                    "입력 코드",
                    "```js\n" + message.content.substr(7) + "\n```"
                )
                .addField("오류 내용", "```js\n" + err + "\n```")
                .setColor(0xff0000)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            x.edit(embed2);
        }
    }
    else if (args.startsWith('mute')) {
        const muteuser = message.mentions.users.first();
        if (!muteuser) return await message.channel.send('뮤트할 유저를 멘션해주세요.');
        const mutemember = message.guild.members.cache.get(muteuser.id);
        if (!mutemember) return await message.channel.send('유효하지 않은 멤버입니다.');
        const splited = args.split('$');
        if (splited.length != 3) return await message.cahnnel.send('뮤트 메세지는 b!mute$<유저 멘션>$<뮤트 이유>의 형식이어야 합니다.');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | Muting`)
            .setColor(0xffff00)
            .addField('뮤트할 유저 | User to mute', muteuser.tag)
            .addField('진행 상황 | Status', '유저의 모든 역할을 지우는 중 | Deleting all roles from the user')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let progress = await message.channel.send(embed);
        mutemember.roles.cache.forEach(x => {
            const imbed = new Discord.MessageEmbed()
                .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | Muting`)
                .setColor(0xffff00)
                .addField('뮤트할 유저 | User to mute', muteuser.tag)
                .addField('진행 상황 | Status', `유저의 역할 ${x.name}을/를 지우는 중 | Deleting role ${x.name} from the user`)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            progress.edit(imbed);
            mutemember.roles.remove(x.id);
        });
        if (!message.guild.roles.cache.find(r => r.name.startsWith('뮤트'))) {
            message.guild.roles.create({
                data: {
                    name: '뮤트 | Muted',
                    color: 0xff0000
                }
            }).then(r2 => {
                r2.setPermissions(0);
                message.guild.channels.cache.forEach(x2 => {
                    x2.createOverwrite(r2, {
                        VIEW_CHANNEL: false
                    });
                });
                message.guild.channels.create('뮤트용-채팅').then(function (x3) {
                    x3.createOverwrite(message.guild.roles.everyone, {
                        VIEW_CHANNEL: false
                    });
                    x3.createOverwrite(r2, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        READ_MESSAGE_HISTORY: true
                    });
                });
            });
        }
        const ymbed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 뮤트 진행 중 | muting`)
            .setColor(0xffff00)
            .addField('뮤트할 유저 | User to mute', muteuser.tag)
            .addField('진행 상황 | Status', `유저에게 역할 뮤트 | Muted를 추가하는 중 | Adding role 뮤트 | Muted to the user`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await progress.edit(ymbed);

        await mutemember.roles.add(message.guild.roles.cache.find(x => x.name.startsWith('뮤트')).id);
        const eembed = new Discord.MessageEmbed()
            .setTitle('뮤트 완료! | Muting completed!')
            .addField('뮤트된 유저 | Muted user', muteuser.tag)
            .addField('뮤트 이유 | Reason for muting', splited[2])
            .setColor(0x00ff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await progress.edit(eembed);
    }
    else if (args.startsWith('delete')) {
        var splyt = args.split('$');
        if (splyt.length != 2 || splyt[1] % 1 != 0) return await message.channel.send('삭제 명령어는 b!delete$<삭제할 메세지 개수> 형식이어야 합니다.');
        await message.channel.bulkDelete(splyt[1]).then(async x => {
            await message.channel.send(`${splyt[1]}개의 메세지를 삭제하였습니다.`);
        })
    }
    else if (args.startsWith('warn')) {
        const arg3 = args.split('$');
        if (arg3.length != 3) return await message.channel.send('경고 메세지는 형식이 b!warn$<경고할 유저 멘션>$<경고 사유> 여아 합니다.');
        const mention = message.mentions.users.first();
        if (!mention) return await message.channel.send('경고할 유저를 멘션해주세요');
        const member = message.guild.member(mention);
        if (!member) return await message.channel.send('유효하지 않은 멤버입니다.');
        if (!message.guild.channels.cache.find(x => x.name.indexOf('경고') != -1)) {
            await message.guild.channels.create('경고');
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('경고 | Warn')
            .setColor(0xff0000)
            .addField('경고된 유저 | The user who was warned', `${message.mentions.users.first()}`)
            .addField('경고 사유 | Reason for warning', arg3[2])
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: "true"
            }))
            .setTimestamp()
        await message.guild.channels.cache.find(x => x.name.indexOf('경고') != -1).send(embed);
        await message.channel.send('경고 메세지가 발송되었습니다.');
    }
    else if (args === 'ping') {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 핑 측정 중 | Pinging`)
            .setColor(0xffff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send(embed);
        const embed2 = new Discord.MessageEmbed()
            .setTitle('퐁! | PONG!')
            .setColor(0x00ff00)
            .setThumbnail('https://i.imgur.com/1Gk4tOj.png')
            .addField('API 지연 시간 | API Latency', client.ws.ping)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await m.edit(embed2);
    }
    else if (args === 'clean') {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 삭제 중 | Deleting`)
            .setColor(0xffff00)
            .setDescription(`${message.channel.name} 채널에 있는 모든 메세지를 삭제 중입니다. 이 작업은 시간이 오래 걸릴 수 있습니다. | Deleting all messages from ${message.channel.name}. This may take some time.`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await message.author.send(embed).then(x => {
            cleanId = x.id;
        });
        for (var i = 0; i < 100; i++) {
            await message.channel.bulkDelete(100);
            await message.channel.bulkDelete(100, true)
        }
        const imbed = new Discord.MessageEmbed()
            .setTitle(`삭제 완료 | Deleted`)
            .setColor(0x00ff00)
            .setDescription(`${message.channel.name} 채널에 있는 모든 메세지를 삭제했습니다. | Deleted all messages from ${message.channel.name}.`)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await message.author.dmChannel.messages.cache.get(cleanId).edit(imbed);
    }
    else if (args.startsWith('dm')) {
        var sflit = args.split('$');
        if (sflit.length != 2) return message.channel.send('전체디엠 메세지의 형식은 b!dm$<메세지 내용>이어야 합니다.');
        const emved = new Discord.MessageEmbed()
            .setTitle('봇개소 디엠 공지 | 봇개소 dm notice')
            .setColor(0x00ffff)
            .setFooter(message.author.id, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
            .setDescription(sflit[1]);
        message.guild.members.cache.forEach(function (m) {
            if (!m.user.bot) {
                m.user.send(emved);
            }
        });
    }
    else if (args.startsWith('ummute')) {
        const muteuser = message.mentions.users.first();
        if (!muteuser) return await message.channel.send('언뮤트할 유저를 멘션해주세요.');
        const mutemember = message.guild.members.cache.get(muteuser.id);
        if (!mutemember) return await message.channel.send('유효하지 않은 멤버입니다.');
        const splited = args.split('$');
        if (splited.length != 3) return await message.cahnnel.send('언뮤트 메세지는 b!mute$<유저 멘션>$<언뮤트 이유>의 형식이어야 합니다.');
        if (!mutemember.roles.cache.get(message.guild.roles.cache.find(x => x.name.startsWith('뮤트')).id)) return await message.channel.send('해당 유저는 뮤트되어있지 않습니다.');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 언뮤트 진행 중 | Unmuting`)
            .setColor(0xffff00)
            .addField('언뮤트할 유저 | User to unmute', muteuser.tag)
            .addField('진행 상황 | Status', '유저의 모든 역할을 지우는 중 | Deleting all roles from the user')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let progress = await message.channel.send(embed);
        mutemember.roles.cache.forEach(x => {
            const imbed = new Discord.MessageEmbed()
                .setTitle(`${client.emojis.cache.find(x => x.name == 'loadingCirclebar')} 언뮤트 진행 중 | Unuting`)
                .setColor(0xffff00)
                .addField('언뮤트할 유저 | User to unmute', muteuser.tag)
                .addField('진행 상황 | Status', `유저의 역할 ${x.name}을/를 지우는 중 | Deleting role ${x.name} from the user`)
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            progress.edit(imbed);
            mutemember.roles.remove(x.id);
        });
        message.member.roles.remove(message.guild.roles.cache.find(x2 => x2.name.startsWith('뮤트')))
        const eembed = new Discord.MessageEmbed()
            .setTitle('언뮤트 완료! | Unmuting completed!')
            .addField('언뮤트된 유저 | Unmuted user', muteuser.tag)
            .addField('언뮤트 이유 | Reason for unmuting', splited[2])
            .setColor(0x00ff00)
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        await progress.edit(eembed);
    }
    message.channel.stopTyping(true);
});
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(x => x.name.indexOf('인사') != -1).send(`${member} 님이 ${member.guild.name}에 오셨습니다.\n${member} just joined ${member.guild.name}.`);
    counter(member.guild);
});
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.find(x => x.name.indexOf('인사') != -1).send(`${member.user.tag} 님이 ${member.guild.name}을/를 나갔습니다.\n${member.user.tag} just left ${member.guild.name}.`);
    counter(member.guild);
});
client.login(process.env.TOKEN);