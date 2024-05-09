import plugin from '../../lib/plugins/plugin.js'
import NoteUser from '../genshin/model/mys/NoteUser.js'
import fetch from 'node-fetch'

export class aa extends plugin {
  constructor () {
    super({
      name: 'aa',
      dsc: 'aa',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?recent',
          /** 执行方法 */
          fnc: 'activity'
        }
      ]
    })
  }

  async activity (e) {
    this.e.isSr = true
    let user = this.e.user
    let ats = e.message.filter(m => m.type === 'at')
    let uid = e.msg.replace(/^#?recent/, '')
    if (!uid) {
      if (ats.length > 0) {
        if (!e.atBot) {
          let { at = '' } = e
          user = await NoteUser.create(at)
        } else if (ats.length > 1) {
          for (let i = ats.length - 1; i >= 0; i--) {
            if (ats[i].qq != e.bot.uin &&
              ats[i].qq != e.bot.tiny_id) {
              let at = ats[i].qq
              user = await NoteUser.create(at)
              break
            }
          }
        }
      }
      uid = user?.getUid('sr') || ''
    }
    let result = await check(uid)
    let msg = result.length === 0 ? '用户近期无活动' : '用户近期活动:\n'
    result.forEach(r => {
      if (r.type === 6) {
        msg += `${formatTimestamp(r.timestamp)}: 抽到了五星角色【${r.avatar}】\n`
      } else if (r.type === 7) {
        msg += `${formatTimestamp(r.timestamp)}: 抽到了五星光锥【${r.lightcone}】\n`
      }
    })
    this.reply(msg, true)
  }
}

async function check (uid) {
  let url = 'https://avocado.wiki/v1/activity/' + uid
  logger.info(url)
  let res = await fetch(url)
  let data = await res.json()
  let gachas = data.activities.filter(a => a.type === 6 || a.type === 7)
  return gachas
}

function formatTimestamp (timestamp) {
  const date = new Date(timestamp * 1000) // 将秒转换为毫秒
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，需要加1
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}年${month}月${day}日 ${hours}:${minutes}`
}
