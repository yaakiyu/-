const Discord = require("discord.js");
const Client = require('./main.js').Clirnt;

const parameter = require("./dic-parameter.js");
const log = require("./functions.js").log;

const notice = message => {
  const prefix = parameter.prefix;
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

const dicBot = new (class {
  constructor() {
    //**ローカル関数軍************************************************************************************
    this.functions = new (class {
      getMokuji() {
        let mokuji = "";
        for (let content of parameter.dictionary) {
          mokuji += content.word + "\n";
        }
        parameter.dictionary.push({
          word: "s-目次",
          mean: `現在載っている言葉：\n ${mokuji}`
        });
      }
    })();
  }
  //**準備**********************************************************************************************
  Preparation() {
    this.functions.getMokuji();
  }

  //**本体**********************************************************************************************
  Run(message) {
    const database = require("./main.js").database;
    const system_database = database.system.DictionaryBot;
    const prefixString = system_database.normalPrefix;
    const prefix = new RegExp(prefixString,"i")
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
      const elseMessage = parameter.elseMessage;
      const dictionary = parameter.dictionary;
      //channel.send(JSON.stringify(Bot.database, null, 4));
      //editLast(Bot.functions.getDataID("variable"), `{"test":null}`);
      let search = content.replace(prefix, "");
      if (search == "about") {
        channel.send(parameter.about());
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
        const embedColor = parameter.embedColor;
        const embedFooter = parameter.embedFooter;
        let reg = new RegExp(`^${item.word}`, "i");
        if (search.match(reg)) {
          if (item.mean == "" || item.writing) {
            channel.send(
              parameter.sendMessage(
                search,
                embedColor,
                parameter.inProductionMessage,
                embedFooter
              )
            );
            return;
          }
          channel.send(
            parameter.sendMessage(
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
        channel.send(parameter.elseMessage(search));
        /* Client.users.cache
        .get(Bot.functions.getAdminID())
        .send(
          `存在しない言葉「${search}」が検索されました。 by ${author.username}`
        );*/
        log(
          1,
          `**Searched**  Status:[Couldn't hit]  Word:[${search}]  Server:[${guild}]  Channel:[${channel.toString()}]  User:[${
            author.username
          } (${nickname})]`
        );
        log(2, `"${search}"`);
      }
    }
  }
})();
module.exports = dicBot;
