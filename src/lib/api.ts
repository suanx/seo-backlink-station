/**
 * 调用 EdgeOne Pages 的 Edge Functions。
 * 本地 `npm run dev` 时函数不存在，会自动降级为「本地不可用」提示。
 */

const BASE = import.meta.env.VITE_API_BASE ?? ''

export type ApiResult<T> = { ok: boolean; data?: T; error?: string }

async function req<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(BASE + path, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers || {}) } })
    const text = await res.text()
    // 本地 dev 下 Vite 会返回 index.html
    if (text.trimStart().startsWith('<')) {
      return { ok: false, error: '函数未生效（本地 dev 或尚未部署 Edge Functions）' }
    }
    const data = JSON.parse(text)
    return { ok: res.ok && data?.ok !== false, data, error: data?.error }
  } catch (e: any) {
    return { ok: false, error: String(e?.message || e) }
  }
}

export const api = {
  health: () => req<{ ok: boolean }>('/api/health'),
  site: (url: string) => req<any>(`/api/site?url=${encodeURIComponent(url)}`),
  probe: (urls: string[]) =>
    req<{ results: { url: string; alive: boolean; status: number; ms: number }[] }>('/api/probe', {
      method: 'POST',
      body: JSON.stringify({ urls }),
    }),
  backlink: (site: string, target: string) =>
    req<any>(`/api/backlink?site=${encodeURIComponent(site)}&target=${encodeURIComponent(target)}`),
  indexnow: (payload: { host?: string; urls: string[]; key?: string; keyLocation?: string }) =>
    req<any>('/api/indexnow', { method: 'POST', body: JSON.stringify(payload) }),
}
