const Discord = require("discord.js");
const Client = require("./main.js").Clirnt;
const log = require("./functions.js").log;

module.exports.parameter = new (function() {
  //**ローカルパラメータ**********************************************************************************
  this.prefix = "^db:|^[&＆]";
  this.version = "0.7.1";
  this.pageURL = "https://dic-bot.github.io/"; //ホームページのURL
  this.dictionary = [
    {
      ward: "discord.js",
      maens: {
        jsとは: `jsとは、JavaScriptの略であり、プログラミング言語の一種である。この言語は、波括弧({,})で囲む特徴があり、プログラミングの初心者にとってわかりやすい設計となっている。`,
        discordにおけるjs: `discordでは、discord.jsと呼ばれるモジュールを使用することでbotを作成することができる。`,
        サイト関連: `[公式サイト](https://discord.js.org/)`
      }
    },
    {
      word: "Discord|discord|ディスコード|でぃすこーど",
      means: {
        Discordとは: `「[**Discord(ディスコード)**](https://discord.com/)」とは様々な機種で動作する、ゲーマー向けの匿名チャットツールである。`,
        いろいろな機能: `テキストチャット以外にも、ボイスチャット、画面の共有、ビデオ通話機能などがある。`,
        対応OS: `**:warning: __注意__ クリックすると、ダウンロードされます。**
[Web版](https://discord.com/app)、[Windows版](https://discord.com/api/download?platform=win)([テスト版](https://discord.com/api/download/ptb?platform=win))、[Mac版](https://discord.com/api/download?platform=osx)([テスト版](https://discord.com/api/download/ptb?platform=osx))、[Android版](https://play.google.com/store/apps/details?id=com.discord)、[iOS版](https://itunes.apple.com/us/app/discord-chat-for-games/id985746746)、Linux版([deb](https://discord.com/api/download?platform=linux&format=deb)、[tar.gz](https://discord.com/api/download?platform=linux&format=tar.gz)、[テスト版deb](https://discord.com/api/download/ptb?platform=linux&format=deb)、[テスト版tar.gz](https://discord.com/api/download/ptb?platform=linux&format=tar.gz))などがある。([一覧](https://discord.com/download))`,
        関連記事:`Discord.py\nDiscord.js`
      },
      img: "https://discord.com/assets/fc0b01fe10a0b8c602fb0106d8189d9b.png"
    },
    {
      word: "ロール",
      mean: ``,
      writing: true
    },
    {
      word: "windows|ウィンドウズ",
      mean: `windowsは、<:microsoft:708496583259455488>マイクロソフトが開発したOSである。現在の最新バージョンはNT10.0である。`,
      img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/MS_Windows_Logo_2012.svg"
    },
    {
      word: "google chrome|chrome|クローム|グーグルクローム",
      mean: `<:chrome:708500242349162557>google chrome(グーグル クロ－ム)は、<:google:708499754878894112>Google社が開発したwebブラウザである。現在webブラウザ市場でシェアNo.1を獲得している。`,
      img: "https://cdn.discordapp.com/emojis/708500242349162557.png"
    },
    {
      word: "OS|オペレーションシステム",
      mean: `OS(オペレーションシステム)は、パソコンを作る上で最も重要になる、いわゆるパソコンの土台の部分のことを言う。
これは、PCの脆弱性にも関係する。`
    },
    {
      word: "MAC OS|MACOS",
      mean: `MAC OS(マック オーエス)は、アメリカの会社「Apple」が開発したOSである。`
    },
    {
      word: "microsoft|マイクロソフト",
      mean: `「<:microsoft:708496583259455488>マイクロソフト(microsoft)」は、アメリカの株式会社である。創設者であるビル・ゲイツは、現在世界で総資産が最も多い人間である。`
    },
    {
      word: "google|グーグル",
      mean: `<:google:708499754878894112>Google(グーグル)は、インターネット関連のサービスと製品に特化した世界規模のアメリカのテクノロジー企業である。
また、その会社が開発した[検索サイト](https://google.com)である。
検索サイトは、現在Alphabet社が大本で管理する形態となっている。`
    },
    {
      word: "yahoo|ヤフー",
      mean: `<:yahoo:708497727687753769>`
    },
    {
      word: "MINECRAFT|マインクラフト",
      mean: `MINECRAFT(マインクラフト)は、<:mojang:708494372190158868>MOJANG社が開発した2019年現在世界で最も売れているサンドボックスゲームである。`
    },
    {
      word: "脆弱性|ぜいじゃくせい",
      mean: `「脆弱性（ぜいじゃくせい）」とは、`
    },
    {
      word: "nitro",
      mean: `「nitro(ニトロ)」は、discordで使える有料サービスである。別サーバーのカスタム絵文字が使用できるなど、特典がついている。`
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
[導入する](https://discordapp.com/api/oauth2/authorize?client_id=476012428170362880&permissions=2147347828&scope=bot)`
    },
    {
      word: "sina-chan|思惟奈ちゃん",
      mean: `**本人からの許可を得ていないので現在この項目を見ることは出来ません。**`
    },
    {
      word: "佐藤 真美|佐藤真美",
      mean: `「佐藤 真美」はjun50により開発された多機能Botである。主にスクリーンショットなど機能が使えるほか、「一文字ずつに☆を入れる」などの面白い機能も使える。公式サーバーあり。
[導入はこちらから](https://discordapp.com/api/oauth2/authorize?client_id=479506436142006282&permissions=2083912785&scope=bot)`
    },
    {
      word: "wikipedia",
      mean: `「<:wikipedia:708497880532647938>ウィキペディア（Wikipedia）」は、フリーなインターネット辞書である。`
    },
    {
      word: "s-team-yaakiyu",
      mean: `このBotの開発を発案しました。このBotのオーナーです。半分以上の記事を手掛けています。`
    },
    {
      word: "s-team-takkun|s-team-Takkun|s-team-たっくん",
      mean: `辞書Botでは公式ホームページの作成や、連絡機能の追加、お知らせ機能の追加をしました。

=====アイコン=====
<:Takkun:695485644172034098> <:Takkun2:708514062366933092> 

=====アカウント等=====
[Discordサーバー](https://discord.gg/VX7ceJw)|[ホームページ](https://takkun0530.github.io/)|[Scratch](https://scratch.mit.edu/users/takkun0530/)|[Japanese Scratch-Wiki](https://ja.scratch-wiki.info/wiki/user:Takkun0530)|[Twitter](https://www.twitter.com/Takkun053)|[GitHub](https://github.com/Takkun0530)|[Qiita](https://qiita.com/Takkun0530)`
    },
    {
      word: "s-team-uni|s-team-kakurenbo|s-team-うに",
      mean: `辞書Botのデータベースを作成しました。`
    },
    {
      word:"s-team-tan-10|s-team-たんてん",
      mean:"画像担当"
    },
    {
      word: "s-team|s-開発チーム|s-チーム",
      mean: `このBotの開発チームメンバー一覧\n\n<@693025129806037003> : \`db=s-team-yaakiyu\`で詳しい情報を表示\n<@667319675176091659> : \`db=s-team-takkun\`で詳しい情報を表示\n<@687599949093011495> : \`db=s-team-uni\`で詳しい情報を表示\n<@707552444376285225> : \`db=s-team-tan-10\`で詳しい情報を表示`
    }
  ];

  this.embedColor = 0x42f5f5;
  this.embedFooter = "ご利用いただきありがとうございます。";
  this.inProductionMessage = "<この項目は只今執筆中です...>";

  this.help = () => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(0x00ffff)
      .setTitle("Help")
      .setDescription("Helpの一覧です。")
      .addField(
        ":mag:検索する",
        "`db:検索する文字`または`db:s-目次`で項目一覧が見れます。"
      )
      .addField(
        ":regional_indicator_p:プレフィックス",
        "コマンドを実行する際はプレフィックスの`db:`を最初につけてください。"
      )
      .addField(
        ":loudspeaker:お知らせ",
        "辞書 Botがいるサーバーで`db-お知らせ`というチャンネルを作ると、開発チームからのお知らせを受け取れます。"
      )
      .addField(
        ":envelope:連絡する",
        "不適切な項目やバクを見つけたり、わからないことがあれば`db:s-contact 連絡内容`で連絡できます。"
      )
      .setTimestamp(new Date())
      .setFooter(this.embedFooter);
  };

  this.about = prefix => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(0xffd700)
      .setTitle("このBotについて")
      .setDescription("この辞書に載っている言葉の殆どはDiscord関係です。")
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${Client.user.id}/${Client.user.avatar}.png`
      )
      .setAuthor(Client.user.username, null, this.pageURL)
      .addField(
        ":busts_in_silhouette: 作成メンバー",
        "<@693025129806037003>\n<@687599949093011495>\n<@667319675176091659>",
        true
      )
      .addField(
        ":page_facing_up: 開発環境等",
        "Node.js\nDiscord.js\nGlitch",
        true
      )
      .addField(":wrench: 作成日", "2020/04/22", true)
      .addField(
        ":arrows_counterclockwise: 最終更新",
        "2020/05/25 08:42:54",
        true
      )
      .addField(":regional_indicator_v: Botバージョン", this.version, true)
      .addField(":regional_indicator_p: プレフィックス", `\`${prefix}\``, true)
      .addField(":regional_indicator_h: ヘルプ", "`help`", true)
      .addField(
        ":inbox_tray: 導入はこちら",
        "https://discordapp.com/api/oauth2/authorize?client_id=702390058896064512&permissions=8&scope=bot"
      )
      .setTimestamp(new Date())
      .setFooter(this.embedFooter);
  };

  this.sendMessage = (word, color, descrip, foot) => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(color)
      .setTitle(`${word}`)
      .setDescription(descrip)
      .setFooter(foot);
  };

  this.elseMessage = word => {
    let embed = new Discord.MessageEmbed();
    return embed
      .setColor(0xa103fc)
      .setTitle("すみません...")
      .setDescription(`${word}が見つかりませんでした。 `)
      .setFooter("目次：db:s-目次\nヘルプ：db:s-help");
  };
})();
module.exports.errors = new (function() {
  this.runtimeError = (message, e) => {
    message.react("\u{274C}");
    let embed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle("実行時エラー")
      .setDescription(e)
      .setTimestamp(new Date());
    message.channel.send(embed);
  };

  this.rermissionError = message => {
    message.react("\u{1F6D1}");
    let embed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle("権限エラー")
      .setDescription("このコマンドは開発者限定です。")
      .setTimestamp(new Date());
    message.channel.send(embed);
  };
  this.accessError = message => {
    message.react("\u{1F6D1}");
    let embed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle("アクセスエラー")
      .setDescription(" `.env`ファイルのアクセス権限がありません。")
      .setTimestamp(new Date());
    message.channel.send(embed);
  };
})();
