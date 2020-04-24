// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', message =>
{
client.user.setActivity("ヘルプはdb:help");  
console.log('準備完了');
});

const Embed = new discord.MessageEmbed();
const jishoBot = new Object();
jishoBot.parameter = new Object();
jishoBot.parameter.prefix = /^db:|^[&＆]/i; 

jishoBot.parameter.dictionary = [
  //辞書
  { word: "ヘルプ|help", mean: "このボットでは、主にdiscordで使われる用語などを検索できます。\nまた、それ以外の言葉も一部対応しています。\n目次を見たい場合は、db:s目次を参照してください。\n作成者：yaakiyu" },
  { word: "辞書", mean: "辞書は、このBotのように大量の語句が収録されているものである。" },
  { word: "Bot|ボット", mean: "ボット（Bot）は、人間に代わって作業を行うコンピュータープログラムの総称。語源は人に代わって作業を行う機械「ロボット(ROBOT)」から。" },
  { word: "グローバルチャット", mean: "グローバルチャットは、Botを使うことによって別のサーバーの人とのやり取りをするためのもの。現在このBotではサポートされていない。" },
  { word: "NSFW", mean: "NSFWは、Not safe for work（ノット・セーフ・フォー・ワーク）の頭字語で、職場や学校などのフォーマルな環境下での閲覧に注意を促すために、裸、ポルノグラフィ、卑語、暴力などの要素を含む動画やウェブサイトのURLやハイパーリンクを示す際に使われるインターネットスラング。\nNSFWは、性的コンテンツへのアクセスを禁止している職場や学校内で、個人的にインターネットを使う人物に特に関係がある。(Wikipediaより)" },
  { word: "脳漿炸裂ガール", mean: "「脳漿炸裂ガール」は、れるりりが作ったボーカロイド曲である。"},
  { word: "wikipedia", mean: "「ウィキペディア」は、フリーなインターネット辞書である。" }
];

jishoBot.parameter.embedColor = 0x42f5f5;
jishoBot.parameter.embedFooter = "ご利用いただきありがとうございます。";
jishoBot.parameter.sendMessage = (word, color, descrip, foot) => {
  return Embed.setColor(color)
    .setTitle(`"${word}"`)
    .setDescription(descrip)
    .setFooter(foot);
};
jishoBot.functions = new Object();
//目次を入手する
jishoBot.functions.getMokuji = () => {
  let mokuji = "";
  for (let content of jishoBot.parameter.dictionary) {
    mokuji += content.word + "\n";
  }
  jishoBot.parameter.dictionary.push({ word: "s目次", mean: `現在載っている言葉：\n ${mokuji}` });
};

jishoBot.parameter.elseMessage = word => {
  return Embed.setColor(0xa103fc)
    .setTitle("すみません...")
    .setDescription(`${word}が見つかりませんでした。 `)
    .setFooter("目次：db:s目次\nヘルプ：db:help");
};
jishoBot.Run = () => {
  jishoBot.functions.getMokuji();
  client.on("message", message => {
    const start = jishoBot.parameter.prefix;
    let content = message.content;//
    let channel = message.channel;//
    if (!message.author.bot && content.match(start)) {
      const elseMessage = jishoBot.parameter.elseMessage;
      const dictionary = jishoBot.parameter.dictionary;
      let search = content.replace(start, "");
      for (let item of dictionary) {
        const embedColor = jishoBot.parameter.embedColor;
        const embedFooter = jishoBot.parameter.embedFooter;
        let reg = new RegExp(`^${item.word}`,"i");
        if (search.match(reg)) {
          channel.send(
            jishoBot.parameter.sendMessage(
              search,
              embedColor,
              item.mean,
              embedFooter
            )
          );
          return;
        }
      }
      if (!search == "") {
        channel.send(elseMessage(search));
        channel.guild.members.cache
          .get("693025129806037003")
          .send(`存在しない言葉「${search}」が検索されました`); //報告
      }
    }
  });
};
jishoBot.Run();
if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );
