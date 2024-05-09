![StrelitziaJS](https://socialify.git.ci/ikechan8370/StrelitziaJS/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&language=1&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)

## 鳄梨酱的自用js

### shamrock.js
（可能）仅适配了Lain和shamrock的js，目前包括打卡和发音乐等功能

* #打卡\
机器人群打卡，每天一次

* #发音乐\
指令格式 ：#发音乐标题;作者;链接\
默认作者为用户昵称/群名片，链接为神秘链接。可附带图片，图片获取与meme.js原则相同\
如 `#发音乐鳄梨酱什么都搞不明白;鹤望兰;https://www.bilibili.com`

![image](https://github.com/ikechan8370/StrelitziaJS/assets/21212372/a6c97b49-f25f-44fc-82b4-2722f91ec54b)

* #发位置\
指令格式 ：#发位置经度;纬度\
如 `#发位置39.915168/116.403875`

![image](https://github.com/ikechan8370/StrelitziaJS/assets/21212372/494551a0-e879-44f1-983d-0a4cb9fcf31f)

* #发链接\
指令格式 ：#发链接url;标题;内容\
如 `#发链接https://github.com/ikechan8370/StrelitziaJS;StrelitziaJS;今年最强开源项目StrelitziaJS成功获得10000 Star`

![image](https://github.com/ikechan8370/StrelitziaJS/assets/21212372/9ff6ce46-3a9a-4385-9d74-40c8a446f40d)

* #发篮球\
新版篮球，指令格式 ：发篮球+数字\
如 `#发篮球1` \
数字意义：5 没中, 4 擦边没中, 3 卡框, 2 擦边中, 1 正中\
默认则随机

* #发石头\
指令格式：发(石头|剪子|剪刀|布|锤|锤子) \
如 `#发石头`
由于官方限制，实际出什么控制不了，完全随机。所以随便发吧

* #发骰子\
指令格式：发骰子 \
由于官方限制，实际出几点控制不了，完全随机。

* #电量\
查询当前电量，模拟器、虚拟机可能无法查询

* #戳\
群聊戳一戳，后面可接次数 \
如 `#戳3次 @xxx`

* #发龙\
发龙年的大龙表情 \
如 `#发龙` 或简写为 `#龙` 后面可以接次数，如`#发龙3`.非主人最多发3个，主人最多发10个，避免意外刷屏。有更多需要可以自己改代码

### react.js
发什么表情他都会回应你，包括emoji和qq自带表情。如果是回复某个消息，则会回应那条消息。

### gacha.js
查询指定uid的近期星铁五星抽卡结果

* #recent(+uid)
查询 自己/at用户/指定uid 近期抽卡结果
