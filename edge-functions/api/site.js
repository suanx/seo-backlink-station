// GET /api/site?url=https://example.com
// 抓取目标站点的基础信息，用于生成提交文案

import { json, fail, normalize, fetchWithTimeout, parseMeta, hostnameOf } from '../_lib/util.js'

export async function onRequestGet(context) {
  const { request } = context
  const url = normalize(new URL(request.url).searchParams.get('url'))
  if (!url) return fail('缺少合法的 url 参数')

  const r = await fetchWithTimeout(url, { timeout: 9000 })
  if (!r.ok) return json({ ok: false, url, error: r.error, ms: r.ms })

  const res = r.res
  const ct = res.headers.get('content-type') || ''
  if (!/text|html|xml/i.test(ct)) {
    return json({ ok: true, url, status: res.status, contentType: ct, meta: {}, ms: r.ms })
  }

  const html = await res.text()
  const meta = parseMeta(html)

  // 统计页面上的外链（导出链接）情况，判断是否已过度换链
  const anchors = [...html.matchAll(/<a\s[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi)]
  const host = hostnameOf(url)
  const external = new Set()
  let nofollowCount = 0
  for (const m of anchors) {
    const tag = m[0]
    let href = m[1]
    try {
      const h = new URL(href, url).hostname.replace(/^www\./, '')
      if (h && h !== host) {
        external.add(h)
        if (/rel=["'][^"']*nofollow/i.test(tag)) nofollowCount++
      }
    } catch {}
  }

  return json({
    ok: true,
    url,
    finalUrl: res.url,
    status: res.status,
    ms: r.ms,
    meta,
    stats: {
      externalDomains: external.size,
      externalLinks: anchors.length,
      nofollowLinks: nofollowCount,
      noindex: /noindex/i.test(meta.robots || ''),
      bytes: html.length,
    },
    hint:
      external.size > 60
        ? '该站导出链接域名偏多（>60），换链前建议先评估权重稀释风险'
        : external.size === 0
        ? '未在页面解析到外链，可能是 JS 渲染站点'
        : '导出链接数量正常，可正常评估换链',
  })
}
