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

//::実行:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//##bot#######################################################################################################################
const Bot = new (class {
  //::グローバルパラメータ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  constructor() {
    this.parameter = {
      adminName: "yaakiyu",
      userIDs: {
        yaakiyu: "693025129806037003",
        uni: "687599949093011495"
      },
      saverConfigID: "703456600005804062"
    };
    this.database = {
      system: null,
      user: null,
      variable: null
    };
    this.functions = new (class {
      getAdminID() {
        return Bot.parameter.userIDs[Bot.parameter.adminName];
      }
      getDataID(type) {
        return new Promise((resolve, reject) => {
          fetchMessages(Bot.parameter.saverConfigID, { limit: 1 }).then(
            messages => {
              resolve(JSON.parse(messages.first().content).databaseIDs[type]);
            }
          );
        });
      }
    })();
  }
  readDatabase() {
    let setDataFunctions = [];
    for (let key of Object.keys(this.database)) {
      let setData = resolve => {
        this.functions.getDataID(key).then(({ channel, message }) => {
          fetchMessages(channel, message).then(messages => {
            if (messages.content != void 0) {
              this.database[key] = JSON.parse(messages.content);
            } else {
              this.database[key] = JSON.parse(messages.first().content);
            }
            resolve();
          });
        });
      };
      setDataFunctions.push(setData);
    }
    let setDataPromise = setDataFunctions.map(func => new Promise(func));
    return Promise.all(setDataPromise);
  }
  Preparation() {
    return this.readDatabase();
  }
  //::実行:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  Run() {
    Client.user.setActivity("ヘルプはdb:help");
    jishoBot.Preparation();
    Client.on("message", message => {
      if (!message.author.bot) {
        jishoBot.Run(message);
        notice(message);
      }
    });
    //send(`703421092869570665`, `{"JSON":0000}`);
  }
})();
//::起動:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Client.on("ready", message => {
  Bot.Preparation().then(() => {
    console.log("準備完了");
    log(0, "**Bot is ready!**");
    //getLastMessage("703133624567988244");
    console.log(Bot.database);
    Bot.Run();
  });
});
//::各種機能:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const jishoBot = new Object();
jishoBot.parameter = new Object();
//**ローカルパラメータ**********************************************************************************
jishoBot.parameter = {
  prefix: /^db:|^[&＆]/i
};
const notice = message => {
  const prefix = jishoBot.parameter.prefix;
  if (message.content.match(prefix, "s-news")) {
    const ch_name = "db-お知らせ";
    Client.channels.cache.forEach(channel => {
      let command = message.content.replace(prefix, "");
      if (command.startsWith("s-news")) {
        if (channel.name === ch_name) {
          channel.send(message.content);
          return;
        }
      }
    });
  }
};

jishoBot.parameter.dictionary = [
  {
    word: "s-ヘルプ|s-help|s-へるぷ",
    mean: `このボットでは、主にdiscordで使われる用語などを検索できます。
また、それ以外の言葉も一部対応しています。
このボットの先頭には、「\`db:\`」が必要です。
目次を見たい場合は、\`db:s-目次\`を参照してください。
また、\`db:about\`でこのボットについて見ることができます。
**作成者**：<@693025129806037003>`
  },
  {
    word: "discord|ディスコード",
    mean: `[**Discord(ディスコード)**](https://discordapp.com/)とは様々な機種で動作する、ゲーマー向けの匿名チャットツールである。
テキストチャット以外にも、ボイスチャット、画面の共有、ビデオ通話機能などがある。ただし、画面の共有は現在web版では使えない。
Web版、Windows版、Mac版、Android版、iOS版、Linux盤などがある。([ダウンロードはこちらから](https://discordapp.com/download))`
  },
  {
    word: "ロール",
    mean: ``,
    writing: true
  },
  {
    word: "nitro",
    mean: `「nitro(ニトロ)」は、ディスコードで使える有料サービスである。別サーバーのカスタム絵文字が使用できるなど、特典がついている。`
  },
  {
    word: "辞書",
    mean: `「辞書」は、このBotのように大量の語句が収録されているものである。`
  },
  {
    word: "Bot|ボット",
    mean: `「ボット（Bot）」は、人間に代わって作業を行うコンピュータープログラムの総称。語源は人に代わって作業を行う機械「ロボット(ROBOT)」から。`
  },
  {
    word: "help|ヘルプ",
    mean: `「ヘルプ」は、ソフトウェアを使いながらコンピュータの画面で参照することのできる説明書である。英語で「助ける」の意味。
（このBotのヘルプを見たい場合は、\`db:s-help\`を参照してください。）`
  },
  {
    word: "グローバルチャット",
    mean: `「グローバルチャット」は、Botを使うことによって別のサーバーの人とのやり取りをするためのもの。現在このBotではサポートされていない。`
  },
  {
    word: "NSFW",
    mean: `「NSFW」は、Not safe for work（ノット・セーフ・フォー・ワーク）の頭字語で、職場や学校などの環境下での閲覧に注意を促すために、裸、暴力などの要素を含む動画やウェブサイトのURLを示す際に使われるインターネットスラング。
NSFWは、性的コンテンツへのアクセスを禁止している職場や学校内で、個人的にインターネットを使う人物に特に関係がある。`
  },
  {
    word: "脳漿炸裂ガール",
    mean: `「脳漿炸裂ガール」は、れるりりが作ったボーカロイド曲である。`
  },
  {
    word: "TakuTukirou|月浪たく",
    mean: `「takutukirou」は、T-takuの開発した多機能Botである。グローバルチャットが使えるほか、ゲームなどの娯楽要素も存在する。公式サーバーあり。
（以下は本人からの要望により招待リンクを掲載させていただく。）
[導入はこちらから](https://discordapp.com/api/oauth2/authorize?client_id=476012428170362880&permissions=2147347828&scope=bot)`
  },
  {
    word: "sina-chan|思惟奈ちゃん",
    mean: `**本人からの許可を得ていないので現在この項目を見ることは出来ません。**`
  },
  {
    word: "佐藤 真美|佐藤真美",
    mean: `「佐藤 真美」はjun50により開発された多機能Botである。主にボイスチャットでの機能が使えるが、「一文字ずつに☆を入れる」などの面白い機能も使える。公式サーバーあり。
[導入はこちらから](https://discordapp.com/api/oauth2/authorize?client_id=479506436142006282&permissions=2083912785&scope=bot)`
  },
  {
    word: "wikipedia",
    mean: `「ウィキペディア（Wikipedia）」は、フリーなインターネット辞書である。`
  }
];

jishoBot.parameter.embedColor = 0x42f5f5;
jishoBot.parameter.embedFooter = "ご利用いただきありがとうございます。";
jishoBot.parameter.inProductionMessage = "<この項目は只今執筆中です...>";

jishoBot.parameter.about = () => {
  let embed = new Discord.MessageEmbed();
  return embed
    .setColor(0xffd700)
    .setTitle("このボットについて")
    .setDescription("このBotは2020/04/22に作成されました。")
    .addField(
      "作成者",
      "このボットは <@693025129806037003> などが協力して作成しています。"
    )
    .addField("Bot version", "0.7(Build 07010)")
    .addField("最終更新（大規模アップデート時のみ）", "2020/04/29 20:37:54")
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
    .setFooter("目次：db:s-目次\nヘルプ：db:s-help");
};

//**ローカル関数軍************************************************************************************
jishoBot.functions = new Object();
jishoBot.functions.getMokuji = () => {
  let mokuji = "";
  for (let content of jishoBot.parameter.dictionary) {
    mokuji += content.word + "\n";
  }
  jishoBot.parameter.dictionary.push({
    word: "s-目次",
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
  const content = message.content;
  const channel = message.channel;
  if (content.match(prefix)) {
    let guild;
    let nickname;
    if (message.channel.type == "dm") {
      guild = "DM";
      nickname = null;
    } else {
      guild = message.guild.name;
      nickname = message.member.nickname;
    }
    const author = message.author;
    const elseMessage = jishoBot.parameter.elseMessage;
    const dictionary = jishoBot.parameter.dictionary;
    //channel.send(JSON.stringify(Bot.database, null, 4));
    //editLast(Bot.functions.getDataID("variable"), `{"test":null}`);
    let search = content.replace(prefix, "");
    if (search == "about") {
      channel.send(jishoBot.parameter.about());
      log(
        1,
        `**Show about**   Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
          author.username
        } (${nickname})]`
      );
      return;
    }
    //channel.send({content:"test",embed:{title:"test"}})
    for (let item of dictionary) {
      const embedColor = jishoBot.parameter.embedColor;
      const embedFooter = jishoBot.parameter.embedFooter;
      let reg = new RegExp(`^${item.word}`, "i");
      if (search.match(reg)) {
        if (item.mean == "" || item.writing) {
          channel.send(
            jishoBot.parameter.sendMessage(
              search,
              embedColor,
              jishoBot.parameter.inProductionMessage,
              embedFooter
            )
          );
          return;
        }
        channel.send(
          jishoBot.parameter.sendMessage(
            search,
            embedColor,
            item.mean,
            embedFooter
          )
        );
        log(
          1,
          `**Searched**   Status:[hit]  Word:[${search}]  Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
            author.username
          } (${nickname})]`
        );
        return;
      }
    }
    if (!search == "") {
      channel.send(elseMessage(search));
      /* Client.users.cache
        .get(Bot.functions.getAdminID())
        .send(
          `存在しない言葉「${search}」が検索されました。 by ${author.username}`
        );*/
      log(
        1,
        `**Searched**  Status:[Couldn't hit]]  Word:[${search}]  Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
          author.username
        } (${nickname})]`
      );
      log(2, `"${search}"`);
    }
  }
};
function log(channelNamber) {
  const all_logChannelID = "703130633857400895"; //起動通知がされるチャンネルID
  const logChannelIDs = ["703133557769502741", "705013092618076201"];

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
function editLast(channelID, content) {
  return new Promise((resolve, reject) => {
    fetchMessages("703421092869570665", { limit: 1 }).then(messages => {
      messages.first().edit(content);
      resolve();
    });
  });
}
function fetchMessages(channelID, fetch) {
  return new Promise((resolve, reject) => {
    Client.channels.cache
      .filter(channel => channel.id == channelID)
      .forEach(channel => {
        channel.messages.fetch(fetch).then(messages => {
          resolve(messages);
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
