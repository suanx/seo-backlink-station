// POST /api/probe  { urls: ["https://a.com", ...] }
// 批量探测目录站是否可访问，最多 12 个/次

import { json, fail, normalize, fetchWithTimeout, mapLimit } from '../_lib/util.js'

const MAX = 12

export async function onRequestPost(context) {
  let body
  try {
    body = await context.request.json()
  } catch {
    return fail('请求体不是合法 JSON')
  }
  const raw = Array.isArray(body && body.urls) ? body.urls : []
  const list = raw.map(normalize).filter(Boolean).slice(0, MAX)
  if (!list.length) return fail('urls 为空或全部非法')

  const results = await mapLimit(list, 6, async (url) => {
    const r = await fetchWithTimeout(url, { timeout: 7000, method: 'GET' })
    if (!r.ok) return { url, alive: false, status: 0, ms: r.ms, error: r.error }
    return { url, alive: r.res.status < 400, status: r.res.status, ms: r.ms, finalUrl: r.res.url }
  })

  return json({
    ok: true,
    checked: results.length,
    alive: results.filter((x) => x.alive).length,
    results,
  })
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } })
}
