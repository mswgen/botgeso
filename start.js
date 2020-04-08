const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + "/.env" })
const manager = new Discord.ShardingManager('./bot.js', {
    token: process.env.TOKEN
});
manager.spawn();
manager.on('launch', async shard => {
    await console.log(`샤드 #${shard.id} 시작됨`)
});
manager.on('shardCreate', async shard => {
    await console.log(`샤드 #${shard.id} 생성됨`)
});