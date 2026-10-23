import type { DirItem } from '../data/directories'

export type SiteInfo = { title: string; description: string; url: string }

/** 针对不同类型的站点生成可直接粘贴的提交文案 */
export function buildPitch(item: DirItem, info: SiteInfo): string {
  const name = info.title || guessName(info.url)
  const url = info.url
  const desc = info.description || '（请在此补充一句话介绍）'

  if (item.cat === '友链交换') {
    return [
      'name: ' + name,
      'link: ' + url,
      'avatar: https://' + bare(url) + '/favicon.ico',
      'descr: ' + desc,
      'rss: https://' + bare(url) + '/feed',
    ].join('\n')
  }

  if (item.cat === '代码托管') {
    return [
      `# ${name}`,
      '',
      desc,
      '',
      `Website: ${url}`,
      '',
      '> 提交前建议：完善 README、加上项目官网链接与截图，审核通过率更高。',
    ].join('\n')
  }

  if (item.region === 'cn') {
    return [
      `站点名称：${name}`,
      `站点地址：${url}`,
      `一句话介绍：${desc}`,
      '',
      `申请说明：您好，我是「${name}」的站长，站点为原创内容、长期稳定运维，申请与贵站交换/收录链接，可即刻互加，长期合作。`,
    ].join('\n')
  }

  return [
    `Name: ${name}`,
    `URL: ${url}`,
    `Description: ${desc}`,
    '',
    `Hi, I'm the maker of ${name}. ${desc} Would love to be listed on ${item.name}. Thanks!`,
  ].join('\n')
}

export function guessName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return '我的站点'
  }
}

export function bare(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}
