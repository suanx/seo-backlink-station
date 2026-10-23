// GET /api/backlink?site=https://partner.com/links&target=mysite.com
// 检测对方页面是否真的挂了你的链接，以及是否 dofollow

import { json, fail, normalize, fetchWithTimeout, hostnameOf } from '../_lib/util.js'

export async function onRequestGet(context) {
  const q = new URL(context.request.url).searchParams
  const site = normalize(q.get('site'))
  const targetRaw = (q.get('target') || '').trim()
  if (!site) return fail('缺少合法的 site 参数')
  if (!targetRaw) return fail('缺少 target（你的域名）')

  const targetHost = hostnameOf(/^https?:\/\//i.test(targetRaw) ? targetRaw : 'https://' + targetRaw)
  if (!targetHost) return fail('target 不是合法域名')

  const r = await fetchWithTimeout(site, { timeout: 9000 })
  if (!r.ok) return json({ ok: false, site, error: r.error, ms: r.ms })

  const html = await r.res.text()
  const body = html.slice(0, 600000)

  // 找出所有指向 target 的 <a> 标签
  const re = /<a\b[^>]*>[\s\S]{0,400}?<\/a>/gi
  const hits = []
  let m
  let hasNoJs = false

  while ((m = re.exec(body)) !== null) {
    const tag = m[0]
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i)
    if (!hrefMatch) continue
    let href = hrefMatch[1]
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) continue

    let abs
    try {
      abs = new URL(href, site)
    } catch {
      continue
    }
    const h = abs.hostname.replace(/^www\./, '')
    if (h !== targetHost && !h.endsWith('.' + targetHost)) continue

    const relMatch = tag.match(/rel=["']([^"']+)["']/i)
    const rel = relMatch ? relMatch[1].toLowerCase() : ''
    const anchorText = tag.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

    hits.push({
      href: abs.toString(),
      anchor: anchorText.slice(0, 120),
      follow: !/nofollow|sponsored|ugc/i.test(rel),
      rel: rel || '(none)',
    })
    hasNoJs = true
    if (hits.length >= 30) break
  }

  // 纯文本出现但没做成链接
  const textOnly = !hits.length && new RegExp(targetHost.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(body)

  // 判断页面是否疑似 JS 渲染（HTML 里几乎没有 a 标签）
  const totalAnchors = (body.match(/<a\s/gi) || []).length
  const jsRendered = totalAnchors < 3

  return json({
    ok: true,
    site,
    target: targetHost,
    status: r.res.status,
    ms: r.ms,
    found: hits.length > 0,
    dofollow: hits.some((x) => x.follow),
    count: hits.length,
    hits: hits.slice(0, 10),
    textOnly,
    jsRendered,
    verdict: hits.length
      ? hits.some((x) => x.follow)
        ? `✅ 已挂链，且存在 dofollow 链接（共 ${hits.length} 处）`
        : `⚠️ 已挂链，但全部带 nofollow/sponsored/ugc，权重不传递`
      : textOnly
      ? '⚠️ 页面上只出现了你的域名文本，没有做成可点击链接'
      : jsRendered
      ? '❓ 页面疑似 JS 渲染或未解析到链接，请用浏览器人工确认'
      : '❌ 未检测到你的链接，对方可能已撤链',
  })
}
