import plugin from '../../lib/plugins/plugin.js'

export class shamrock extends plugin {
  constructor () {
    super({
      name: 'shamrock专属接口',
      dsc: 'shamrock杂七杂八接口',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#(群)?打卡',
          /** 执行方法 */
          fnc: 'sign'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发音乐',
          /** 执行方法 */
          fnc: 'music'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发(位置|地点)',
          /** 执行方法 */
          fnc: 'location'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发(链接|url|URL)',
          /** 执行方法 */
          fnc: 'url'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发篮球',
          /** 执行方法 */
          fnc: 'basketball'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发(石头|剪子|剪刀|布|锤|锤子)',
          /** 执行方法 */
          fnc: 'newRps'
        },
        {
          /** 命令正则匹配 */
          reg: '^#?发骰子',
          /** 执行方法 */
          fnc: 'newDice'
        },
        {
          reg: '^#?(查|查看)?电量',
          /** 执行方法 */
          fnc: 'battery'
        }
      ]
    })
  }

  async sign (e) {
    if (e.group) {
      await e.group.sign()
      return await e.reply('打卡成功')
    }
  }

  async music (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发音乐/, '')
    if (args.trim() === '帮助') {
      await e.reply('仅安装Lain插件并使用shamrock适配器时可用。at或者发送/引用图片，并发送参数标题;作者;跳转链接，默认值分别为测试音乐，用户群名片/昵称和某神秘网址')
      return true
    }
    let images = await getImg(e)
    if (images?.length > 0) {
      let image = images[0]
      let userId = e.isGroup ? (e.at ? e.at : e.sender.user_id) : e.sender.user_id
      let defaultAuthor
      if (e.isGroup) {
        let user = await e.group.pickMember(userId)
        defaultAuthor = user.user_displayname || user.card || user.nickname
      } else {
        let user = await e.bot.pickFriend(e.sender.user_id)
        defaultAuthor = user.nickname
      }
      defaultAuthor = defaultAuthor || '测试作者'
      let [title, singer = defaultAuthor, url = 'https://www.bilibili.com/video/BV1uT4y1P7CX'] = args.split(';', 3)
      if (!title) {
        title = '测试音乐'
      }
      await sendMsg(e, {
        type: 'music',
        data: {
          type: 'custom',
          url,
          audio: 'https://music.163.com/song/media/outer/url?id=18520488.mp3', // 瞎填的
          title,
          singer,
          image
        }
      })
    }
  }

  async location (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发(位置|地点)/, '')
    if (args.trim() === '帮助') {
      await e.reply('仅安装Lain插件并使用shamrock适配器时可用。#发地点经度;纬度，如#发地点39.915168;116.403875')
      return true
    }
    let [lat, lon = '116.403875'] = args.split(';', 2)
    if (!lat) {
      lat = '39.915168'
    }
    await sendMsg(e, {
      type: 'location',
      data: {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      }
    })
  }

  async url (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发(链接|url|URL)/, '')
    if (args.trim() === '帮助') {
      await e.reply('仅安装Lain插件并使用shamrock适配器时可用。#发链接url;标题;内容')
      return true
    }
    let images = await getImg(e)
    let image = images[0]
    let [url, title = 'StrelitziaJS', content = '一些自用的yunzai js插件'] = args.split(';', 3)
    if (!url) {
      url = 'https://github.com/ikechan8370/StrelitziaJS'
    }
    await sendMsg(e, {
      type: 'share',
      data: {
        url,
        title,
        content,
        image
      }
    })
  }

  async basketball (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发篮球/, '')
    if (args.trim() === '帮助') {
      await e.reply('仅安装Lain插件并使用shamrock适配器时可用。#发篮球+数字，如#发篮球1\n数字意义：5 没中, 4 擦边没中, 3 卡框, 2 擦边中, 1 正中\n默认则随机')
      return true
    }
    let id
    if (args) {
      id = parseInt(args)
    } else {
      id = Math.floor(Math.random() * 5) + 1
    }
    await sendMsg(e, {
      type: 'basketball',
      data: {
        id
      }
    })
  }

  async newRps (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发/, '')
    let id = 0
    switch (args) {
      case '石头':
      case '锤':
      case '锤子': {
        id = 3
        break
      }
      case '剪子':
      case '剪刀':
      case '剪': {
        id = 2
        break
      }
      case '布': {
        id = 3
        break
      }
      default: {
        logger.warn('unknown command')
      }
    }
    // 好吧 完全随机 id并没什么用
    await sendMsg(e, {
      type: 'new_rps',
      data: {
        id
      }
    })
  }

  async newDice (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    let args = e.msg.replace(/^#?发骰子/, '')
    if (args.trim() === '帮助') {
      await e.reply('仅安装Lain插件并使用shamrock适配器时可用。#发骰子 随机发送一个骰子')
      return true
    }
    let id
    if (args) {
      id = parseInt(args)
    } else {
      id = Math.floor(Math.random() * 6) + 1
    }
    await sendMsg(e, {
      type: 'new_dice',
      data: {
        id
      }
    })
  }

  async battery (e) {
    if (e.adapter !== 'shamrock') {
      return
    }
    const api = (await import('../Lain-plugin/adapter/shamrock/api.js')).default
    let res = await api.SendApi(e.self_id, 'get_device_battery')
    const { battery, scale, status } = res
    await e.reply(`当前电量: ${battery}%`)
  }
}

async function sendMsg (e, data) {
  const api = (await import('../Lain-plugin/adapter/shamrock/api.js')).default
  if (e.isGroup) {
    await api.SendApi(e.self_id, 'send_group_msg', {
      group_id: e.group_id,
      message: data
    })
  } else {
    await api.SendApi(e.self_id, 'send_private_msg', {
      user_id: e.sender.user_id,
      message: data
    })
  }
}

async function getImg (e) {
  // 取消息中的图片、at的头像、回复的图片，放入e.img
  if (e.at && !e.source) {
    e.img = [`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.at}`]
  }
  if (e.source) {
    let reply
    let seq = e.isGroup ? e.source.seq : e.source.time
    if (e.adapter === 'shamrock') {
      seq = e.source.message_id
    }
    if (e.isGroup) {
      reply = (await e.group.getChatHistory(seq, 1)).pop()?.message
    } else {
      reply = (await e.friend.getChatHistory(seq, 1)).pop()?.message
    }
    if (reply) {
      let i = []
      for (let val of reply) {
        if (val.type === 'image') {
          i.push(val.url)
        }
      }
      e.img = i
    }
  }
  if (!e.img || e.img.length === 0) {
    e.img = [`https://q1.qlogo.cn/g?b=qq&s=0&nk=${e.sender.user_id}`]
  }
  return e.img
}
