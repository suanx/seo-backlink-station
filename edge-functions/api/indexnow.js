// POST /api/indexnow  { host, key?, urls: [...] 或 url, keyLocation? }
// 把你的 URL 推给 IndexNow（Bing / Yandex / Seznam / Naver）

import { json, fail, normalize, hostnameOf } from '../_lib/util.js'

const ENDPOINTS = [
  { name: 'IndexNow', url: 'https://api.indexnow.org/indexnow' },
  { name: 'Bing', url: 'https://www.bing.com/indexnow' },
  { name: 'Yandex', url: 'https://yandex.com/indexnow' },
  { name: 'Seznam', url: 'https://search.seznam.cz/indexnow' },
  { name: 'Naver', url: 'https://searchadvisor.naver.com/indexnow' },
]

export async function onRequestPost(context) {
  let body
  try {
    body = await context.request.json()
  } catch {
    return fail('请求体不是合法 JSON')
  }

  const list = Array.isArray(body && body.urls) ? body.urls : body && body.url ? [body.url] : []
  const urls = [...new Set(list.map(normalize).filter(Boolean))].slice(0, 100)
  if (!urls.length) return fail('urls 为空或全部非法')

  const host = (body.host && hostnameOf(body.host)) || hostnameOf(urls[0])
  if (!host) return fail('无法解析 host')

  const key = String(body.key || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 128) || genKey()
  const payload = {
    host,
    key,
    keyLocation: body.keyLocation || `https://${host}/${key}.txt`,
    urlList: urls,
  }

  const out = []
  await Promise.all(
    ENDPOINTS.map(async (ep) => {
      const t0 = Date.now()
      try {
        const res = await fetch(ep.url, {
          method: 'POST',
          headers: { 'content-type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        })
        out.push({ name: ep.name, status: res.status, ok: res.status >= 200 && res.status < 300, ms: Date.now() - t0 })
      } catch (e) {
        out.push({ name: ep.name, status: 0, ok: false, error: String(e), ms: Date.now() - t0 })
      }
    })
  )

  return json({
    ok: out.some((x) => x.ok),
    host,
    key,
    keyLocation: payload.keyLocation,
    submitted: urls.length,
    results: out,
    tip: `请把 ${key}.txt（内容为 ${key}）放到站点根目录 ${host}/ 下，否则部分引擎会校验失败`,
  })
}

function genKey() {
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
}
