// EdgeOne Pages Edge Functions 公共工具
// V8 运行时，仅使用标准 Web API，禁止引入 npm 包

export const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 BacklinkStationBot/1.0'

export const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8', 'cache-control': 'no-store', ...CORS },
  })
}

export function fail(message, status = 400) {
  return json({ ok: false, error: message }, status)
}

/** 规范化 URL，非法返回 null */
export function normalize(raw) {
  if (!raw || typeof raw !== 'string') return null
  let s = raw.trim()
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s.replace(/^\/+/, '')
  try {
    const u = new URL(s)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.toString()
  } catch {
    return null
  }
}

export function hostnameOf(raw) {
  try {
    return new URL(raw).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** 带超时的 fetch */
export async function fetchWithTimeout(url, { timeout = 8000, method = 'GET', headers = {}, body } = {}) {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), timeout)
  const t0 = Date.now()
  try {
    const res = await fetch(url, {
      method,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', ...headers },
      redirect: 'follow',
      signal: ac.signal,
      ...(body ? { body } : {}),
    })
    return { ok: true, res, ms: Date.now() - t0 }
  } catch (e) {
    return { ok: false, error: String(e && e.name === 'AbortError' ? 'timeout' : e), ms: Date.now() - t0 }
  } finally {
    clearTimeout(timer)
  }
}

/** 限制并发的 map */
export async function mapLimit(items, limit, worker) {
  const out = new Array(items.length)
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++
      out[i] = await worker(items[i], i)
    }
  })
  await Promise.all(runners)
  return out
}

/** 从 HTML 提取 meta 信息 */
export function parseMeta(html) {
  const head = html.slice(0, 300000)
  const pick = (re) => {
    const m = head.match(re)
    return m ? decodeEntities(m[1]).trim() : ''
  }
  const title =
    pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
    pick(/<title[^>]*>([\s\S]*?)<\/title>/i) ||
    ''
  const description =
    pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
    ''
  const keywords = pick(/<meta[^>]+name=["']keywords["'][^>]+content=["']([^"']+)["']/i)
  const image = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
  const robots =
    pick(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) ||
    pick(/<meta[^>]+name=["']googlebot["'][^>]+content=["']([^"']+)["']/i)
  const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
  return { title, description, keywords, image, robots, canonical }
}

export function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}
