// Response for Uptime Robot
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  })
  .listen(3000);

// Discord bot implements
const Discord = require("discord.js");
const Client = new Discord.Client();

//##bot#######################################################################################################################
const Bot = new Object();

//::グローバルパラメータ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Bot.parameter = {
  adminName: "yaakiyu",
  userIDs: {
    yaakiyu: "693025129806037003",
    uni: "687599949093011495"
  }
};
Bot.functions = new Object();
Bot.functions.getAdminID = () => {
  return Bot.parameter.userIDs[Bot.parameter.adminName];
};
//::起動:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Client.on("ready", message => {
  console.log("準備完了");
  log(0, "**Bot is ready!**");
  Bot.Run();
});
//::実行:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Bot.Run = () => {
  Client.user.setActivity("ヘルプはdb:help");
  jishoBot.Preparation();
  Client.on("message", message => {
    jishoBot.Run(message);
  });
};
//::各種機能:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const jishoBot = new Object();
jishoBot.parameter = new Object();
jishoBot.parameter = {
  prefix: /^db:|^[&＆]/i
};
//**ローカルパラメータ**********************************************************************************
jishoBot.parameter.dictionary = [
  {
    word: "ヘルプ|help",
    mean:
      "このボットでは、主にdiscordで使われる用語などを検索できます。\nまた、それ以外の言葉も一部対応しています。\nこのボットの先頭には、「`db:`」が必要です。\n目次を見たい場合は、db:s目次を参照してください。\nまた、`db:about`でこのボットについて見ることができます。\n作成者：yaakiyu"
  },
  {
    word: "辞書",
    mean: "辞書は、このBotのように大量の語句が収録されているものである。"
  },
  {
    word: "Bot|ボット",
    mean:
      "ボット（Bot）は、人間に代わって作業を行うコンピュータープログラムの総称。語源は人に代わって作業を行う機械「ロボット(ROBOT)」から。"
  },
  {
    word: "グローバルチャット",
    mean:
      "グローバルチャットは、Botを使うことによって別のサーバーの人とのやり取りをするためのもの。現在このBotではサポートされていない。"
  },
  {
    word: "NSFW",
    mean:
      "NSFWは、Not safe for work（ノット・セーフ・フォー・ワーク）の頭字語で、職場や学校などのフォーマルな環境下での閲覧に注意を促すために、裸、ポルノグラフィ、卑語、暴力などの要素を含む動画やウェブサイトのURLやハイパーリンクを示す際に使われるインターネットスラング。\nNSFWは、性的コンテンツへのアクセスを禁止している職場や学校内で、個人的にインターネットを使う人物に特に関係がある。(Wikipediaより)"
  },
  {
    word: "脳漿炸裂ガール",
    mean: "「脳漿炸裂ガール」は、れるりりが作ったボーカロイド曲である。"
  },
  {
    word: "TakuTukirou",
    mean:
      "takutukirouは、T-takuの開発した多機能Botである。グローバルチャットが使えるほか、ゲームなどの娯楽要素も存在する。公式サーバーあり。\n（以下は本人からの要望により招待リンクを掲載させていただく。）\nhttps://discordapp.com/api/oauth2/authorize?client_id=476012428170362880&permissions=2147347828&scope=bot"
  },
  {
    word: "思惟奈ちゃん",
    mean: ""
  },
  {
    word: "佐藤　真美|佐藤真美",
    mean: "「佐藤　真美」はjun50により開発された多機能Botである。主にボイスチャットでの機能が使えるが、「一文字ずつに☆を入れる」などの面白い機能も使える。公式サーバーあり。"
  },
  {
    word: "wikipedia",
    mean: "「ウィキペディア」は、フリーなインターネット辞書である。"
  }
];

jishoBot.parameter.embedColor = 0x42f5f5;
jishoBot.parameter.embedFooter = "ご利用いただきありがとうございます。";

jishoBot.parameter.about = () => {
  let embed = new Discord.MessageEmbed();
  return embed
    .setColor(0xffd700)
    .setTitle("このボットについて")
    .setDescription("このBotは2020/04/22に作成されました。")
    .addField(
      "作成者",
      "このボットはすべて <@693025129806037003> が一人で作成しています。"
    )
    .addField("Bot version", "1.0(Build 10007)")
    .addField("最終更新（大規模アップデート時のみ）", "2020/04/24 17:20:32")
    .setTimestamp(new Date())
    .setFooter(jishoBot.parameter.embedFooter);
};

jishoBot.parameter.sendMessage = (word, color, descrip, foot) => {
  let embed = new Discord.MessageEmbed();
  return embed
    .setColor(color)
    .setTitle(`"${word}"`)
    .setDescription(descrip)
    .setFooter(foot);
};

jishoBot.parameter.elseMessage = word => {
  let embed = new Discord.MessageEmbed();
  return embed
    .setColor(0xa103fc)
    .setTitle("すみません...")
    .setDescription(`${word}が見つかりませんでした。 `)
    .setFooter("目次：db:s目次\nヘルプ：db:help");
};

//**ローカル関数軍************************************************************************************
jishoBot.functions = new Object();
jishoBot.functions.getMokuji = () => {
  let mokuji = "";
  for (let content of jishoBot.parameter.dictionary) {
    mokuji += content.word + "\n";
  }
  jishoBot.parameter.dictionary.push({
    word: "s目次",
    mean: `現在載っている言葉：\n ${mokuji}`
  });
};

//**準備**********************************************************************************************
jishoBot.Preparation = () => {
  jishoBot.functions.getMokuji();
};

//**本体**********************************************************************************************
jishoBot.Run = message => {
  const prefix = jishoBot.parameter.prefix;
  let content = message.content;
  let channel = message.channel;
  if (!message.author.bot && content.match(prefix)) {
    const elseMessage = jishoBot.parameter.elseMessage;
    const dictionary = jishoBot.parameter.dictionary;
    let search = content.replace(prefix, "");
    if (search == "about") {
      channel.send(jishoBot.parameter.about());
      return;
    }
    for (let item of dictionary) {
      const embedColor = jishoBot.parameter.embedColor;
      const embedFooter = jishoBot.parameter.embedFooter;
      let reg = new RegExp(`^${item.word}`, "i");
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
        .get(Bot.functions.getAdminID())
        .send(`存在しない言葉「${search}」が検索されました`); //報告
    }
  }
};
function log(channelNamber) {
  const all_logChannelID = "703130633857400895";//起動通知がされるチャンネルID
  const logChannelIDs = ["703133557769502741"];

  let content = "";
  let index = 0;
  for (let arg of arguments) {
    if (index >= 1) {
      content += "  " + arg;
    }
    index++;
  }
  if (channelNamber != 0) {
    send(
      all_logChannelID,
      content +
        " " +
        Client.channels.cache.get(logChannelIDs[channelNamber - 1]).toString()
    );
    return send(logChannelIDs[channelNamber - 1], content);
  } else {
    send(all_logChannelID, content);
  }
}

function send(channelid, content) {
  return new Promise(function(resolve, reject) {
    Client.channels.cache
      .filter(channel => channel.id == channelid)
      .forEach(channel => {
        channel.send(content).then(message => {
          resolve(message);
        });
      });
  });
}
//############################################################################################################################

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

Client.login(process.env.DISCORD_BOT_TOKEN);
