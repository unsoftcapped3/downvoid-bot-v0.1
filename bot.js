const Discord = require('discord.js');
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const client = new Discord.Client({intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers,
	]});
const fs = require('fs');
const path = require('path');
var data = require("./data.json")
let lastCount = 0
function save() {
  fs.writeFileSync(path.resolve(__dirname, "./data.json"), JSON.stringify(data, null, "\t"))
}
let maxCharacters = data.maxCharacters;
client.on('messageCreate', message => {
  let msg = message
  if (message.author.bot)return
  if(msg.author.id=="542475654797590528" && msg.guild.id=="914712217432236083"){
    msg.member.roles.add("987858502800248882")
    return
  }
  if (msg.channel.parent == "1074459263168168007"){
    var str = msg.content;
var match = str.match(/\d+/);
    if (match==null){msg.channel.send("Not a valid number");return}
let num = (parseInt(match[0], 10));
      if (lastCount == 0 || num == lastCount+1){
        lastCount=num;
      }else {msg.channel.send("Wrong number, it should be "+(lastCount+1))}
    
  }
  /*if (msg.channel.id == "1077408283985461268" && msg.author.id=="428921414914146304"){
    client.channels.cache.get("1074459262887137296").send(msg.content)
    return
  }
  if (msg.channel.id == "1074459262887137296"){
    client.channels.cache.get("1077408283985461268").send(msg.author.username+"#"+msg.author.discriminator+": "+msg.content)
  }*/
  if(["1074459263168168009","1074459263168168011","1074459263168168013","1074459263168168015","1074459263503716403","1074459263503716405"].includes(msg.channel.id)&&msg.content.length>maxCharacters){
    msg.channel.send("<@"+msg.author.id+"> That message exceeds "+maxCharacters+" characters!")
    msg.delete()
    client.channels.cache.get("1077639972254916668").send(msg.author.username+" sent "+msg.content+" in #"+msg.channel.name+", which exceeds the character limit")
  }
  if(msg.author.id=="428921414914146304"&&msg.content.startsWith("eval")){msg.channel.send(eval(msg.content.slice(5)).toString());return}
if (message.content.startsWith(prefix)){
  let args = message.content.substring(2).split(" ")
  const command = args[0]
  args.shift()
  
  
  if(msg.author.id == "428921414914146304"){
if (message.content.startsWith("d!eval ")){message.channel.send(eval(message.content.slice(7)).toString());return}
if(msg.content.startsWith("d!getGuilds")){msg.channel.send(client.guilds.cache.map(a=>a.id+a.name))}
     if (message.content.startsWith("d!console ")){console.log(eval(message.content.slice(10)).toString());return}}
  
  
  if(commands.hasOwnProperty(command)) commands[command](args,message)
}
  
  
  else if (msg.content.includes("<@821931928663228427>")||msg.content.includes("<@!821931928663228427>")){msg.channel.send("My prefix is `d!`")}
});
let commands = {
  avatar(args,msg){
    var member = msg.mentions.users.first();
    if (member==undefined){msg.guild.members.fetch(args[0]).then(m=>{msg.channel.send("https://cdn.discordapp.com/avatars/"+m.user.id+"/"+m.user.avatar+".png?size=256")})
;return}
    if (member==undefined){msg.channel.send("Usage: d!avatar <user mention or id>");return}
    
    if (member.avatar==null){msg.channel.send("This user doesn't have an avatar!");return}
    let a = "https://cdn.discordapp.com/avatars/"+member.id+"/"+member.avatar+".png?size=256"
    msg.channel.send(a)
  },
  ping(args,msg){
    let r = Math.random()
    let a = "Pong"
    if(r<0.01)a="Pog"
    msg.channel.send(a+"! ("+(Date.now()-msg.createdTimestamp).toString()+"ms)")
  },
  invite(args,msg){
    msg.channel.send("https://discord.com/api/oauth2/authorize?client_id=821931928663228427&permissions=8&scope=bot")
  },
  help(args,msg){
    msg.channel.send(`d!avatar <user mention>: Get the avatar of anyone in this server
d!ping: checks response time
d!help: displays this message
d!invite: Invite me to your server!
d!suggest <suggestion>: suggest something
d!slow <seconds>: Set the slowmode to some number of seconds.
d!sm <channel id> <seconds>: Set a channel's slowmode to some number of seconds.
`)
  },
  suggest(args,msg){
    //msg.channel.send("this command is disabled due to spam");return
client.guilds.cache.get("722198682413301800").members.fetch("428921414914146304").then(m=>{m.send(msg.author.username+"#"+msg.author.discriminator+" ("+msg.author.id+")"+" suggested in "+msg.guild.name+" ("+msg.guild.id+"): "+msg.content.slice(10))})
msg.channel.send("downvoid has received your suggestion")
},async join(args,msg) {//join a server that this bot is in
    let server = args[0]
    const channel = client.guilds.cache.get(server).channels.cache.filter(c => c.type === 'text').find(x => x.position == 0)
    await channel.createInvite({ unique: true, temporary: false }).then(invite => {client.users.cache.get(msg.author.id).send("https://discord.gg/"+invite.code)})
  },/*
  async proxy(args,msg){//impersonation
  let user = args[0]
  if (user.startsWith("<@")){user=user.substring(2,user.length-1)}
  if (user.startsWith("!")){user=user.substring(1)}
    if (!(Number(user)>0)){user=msg.author.id}
  args.shift()
  let av = "https://cdn.discordapp.com/avatars/"+user+"/"
  let x = await msg.guild.members.fetch(user).catch(e=>msg.channel.send(e.toString()))
    av+=x.user.avatar
    av=av+".png"

    let name = x.nickname;
if(name==null)name=x.user.username;
    if(x.user.avatar==null){av=""};
  let webhook = await msg.channel.createWebhook(name, {"avatar":av});
  await webhook.send(args.join(" ").replace("@everyone","ateveryone"))
  webhook.delete()
    if(msg.guild.id!="722198682413301800")msg.delete()
},
  async p2(args,msg){// d!p2 userid channelid [message]
  //impersonation v2
  let user = args[0]
let channel = args[1]
if(channel.startsWith("<#")){channel=channel.substring(2,channel.length-1)}
  if (user.startsWith("<@")){user=user.substring(2,user.length-1)}
  if (user.startsWith("!")){user=user.substring(1)}
    if (!(Number(user)>0)){user=msg.author.id}
  args.shift()
args.shift()
  let av = "https://cdn.discordapp.com/avatars/"+user+"/"
  let x = await client.channels.cache.get(channel).guild.members.fetch(user).catch(e=>msg.channel.send(e.toString()))
    av+=x.user.avatar
    av=av+".png"

    let name = x.nickname;
if(name==null)name=x.user.username;
    if(x.user.avatar==null){av=""};
  let webhook = await client.channels.cache.get(channel).createWebhook(name, {"avatar":av});
  await webhook.send(args.join(" ").replace("@everyone","ateveryone"))
  webhook.delete()
    if(msg.guild.id!="722198682413301800")msg.delete()
},
//impersonation
  async p(args,msg){this.proxy(args,msg)},*/
  slow(args,msg){//custom slowmode
    if (msg.author.id!="428921414914146304"|| (["1081298065329225779", "1074459262127968308"].includes(msg.guild.id) && msg.author.id=="340939880555216922")){msg.channel.send("no");return}
    if(args[0]==undefined)args[0]=0
    if(Number(args[0])!=Number(args[0]))args[0]=0
    msg.channel.setRateLimitPerUser(Math.min(21600,Number(args[0])))
    msg.channel.send("This channel's slowmode is now "+Number(args[0])+ " seconds")
  },
  sm(args,msg){//slowmode something
    if (msg.author.id!="428921414914146304"|| (["1081298065329225779", "1074459262127968308"].includes(msg.guild.id) && msg.author.id=="340939880555216922")){msg.channel.send("no");return}
    if (args[0].startsWith("<#"))args[0]=args[0].slice(2,args[0].length-1)
    msg.guild.channels.cache.get(args[0]).setRateLimitPerUser(Math.min(21600,Number(args[1])))
    msg.channel.send("<#"+args[0]+">'s slowmode is now "+args[1]+" seconds")
  },
  characterlimit(args,msg){
    let n = Number(args[0])
    if (n!=n)n=4000
    if (n<0 || n>4000)n=4000
    n=Math.floor(n)
    maxCharacters = n
    data.maxCharacters=n
    save()
    msg.channel.send("The character limit is now "+n)
  }
}
client.on("guildMemberAdd",(member)=>{
  console.log(member);
  if (member.guild.id=="1074459262127968308"){
    client.guilds.cache.get("1081298065329225779").members.fetch(member.user.id).then(m=>m.kick())
    }
  else if (member.guild.id=="1081298065329225779"){
    client.guilds.cache.get("10744592610812980653292257792127968308").members.fetch(member.user.id).then(m=>m.kick())
    }
})
client.login(token);