import { useState } from 'react'
import { api } from '../lib/api'
import type { DirItem } from '../data/directories'

type Props = {
  site: string
  visible: DirItem[]
}

export default function Tools({ site, visible }: Props) {
  const [tab, setTab] = useState<'backlink' | 'probe' | 'indexnow'>('backlink')

  return (
    <div className="card">
      <div className="card-h">
        <h2>② 服务端增强（Edge Functions）</h2>
      </div>
      <div className="tabs">
        <button className={tab === 'backlink' ? 'tab on' : 'tab'} onClick={() => setTab('backlink')}>
          反链检测
        </button>
        <button className={tab === 'probe' ? 'tab on' : 'tab'} onClick={() => setTab('probe')}>
          目录站存活检测
        </button>
        <button className={tab === 'indexnow' ? 'tab on' : 'tab'} onClick={() => setTab('indexnow')}>
          IndexNow 推送
        </button>
      </div>
      {tab === 'backlink' && <Backlink site={site} />}
      {tab === 'probe' && <Probe visible={visible} />}
      {tab === 'indexnow' && <IndexNow site={site} />}
    </div>
  )
}

function Backlink({ site }: { site: string }) {
  const [page, setPage] = useState('')
  const [busy, setBusy] = useState(false)
  const [out, setOut] = useState<any>(null)

  async function run() {
    if (!page.trim()) return alert('请填写对方的友链页地址')
    setBusy(true)
    setOut(null)
    const r = await api.backlink(page.trim(), site)
    setOut(r.ok ? r.data : { error: r.error })
    setBusy(false)
  }

  return (
    <div className="tool">
      <div className="row wrap">
        <div className="field grow">
          <label>对方友链页面</label>
          <input className="input" placeholder="https://对方域名/links" value={page} onChange={(e) => setPage(e.target.value)} />
        </div>
        <div className="field grow">
          <label>你的域名</label>
          <input className="input" value={site} readOnly />
        </div>
      </div>
      <button className="btn primary" onClick={run} disabled={busy || !page.trim() || !site}>
        {busy ? '检测中…' : '检测对方是否挂了我的链接'}
      </button>
      <p className="muted small">
        抓取对方页面 HTML，查找指向你域名的 &lt;a&gt; 标签，并判断 rel 是否含 nofollow / sponsored / ugc。JS 渲染的站点可能检测不到，需人工确认。
      </p>
      {out && (
        <div className="out">
          {out.error ? (
            <div className="err">{out.error}</div>
          ) : (
            <>
              <div className="verdict">{out.verdict}</div>
              <div className="kv">
                <span>HTTP {out.status}</span>
                <span>耗时 {out.ms}ms</span>
                <span>命中 {out.count} 处</span>
                <span>dofollow：{out.dofollow ? '有' : '无'}</span>
              </div>
              {out.hits?.length > 0 && (
                <table className="mini">
                  <thead>
                    <tr>
                      <th>链接</th>
                      <th>锚文本</th>
                      <th>rel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {out.hits.map((h: any, i: number) => (
                      <tr key={i}>
                        <td className="ellipsis">{h.href}</td>
                        <td>{h.anchor || '（空）'}</td>
                        <td>{h.follow ? <b className="ok">{h.rel}</b> : <b className="no">{h.rel}</b>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function Probe({ visible }: { visible: DirItem[] }) {
  const [busy, setBusy] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const [dead, setDead] = useState<string[]>([])

  async function run() {
    const urls = visible.map((d) => d.submit || d.url)
    if (!urls.length) return alert('当前筛选结果为空')
    setBusy(true)
    setLog([`共 ${urls.length} 个站点，分批处理（每批 12 个）…`])
    const found: string[] = []
    for (let i = 0; i < urls.length; i += 12) {
      const batch = urls.slice(i, i + 12)
      const r = await api.probe(batch)
      if (!r.ok) {
        setLog((l) => [...l, `第 ${i / 12 + 1} 批失败：${r.error}`])
        continue
      }
      const bad = (r.data?.results || []).filter((x) => !x.alive)
      found.push(...bad.map((b) => b.url))
      setLog((l) => [...l, `第 ${i / 12 + 1} 批：${batch.length} 个，失效 ${bad.length} 个`])
      setDead([...found])
    }
    setBusy(false)
    setLog((l) => [...l, '检测完成'])
  }

  return (
    <div className="tool">
      <button className="btn primary" onClick={run} disabled={busy || !visible.length}>
        {busy ? '检测中…' : `检测当前筛选出的 ${visible.length} 个目录站`}
      </button>
      <p className="muted small">服务端并发抓取，标记 404/403/500/超时的站点，避免把时间浪费在死站上。</p>
      {log.length > 0 && (
        <div className="out">
          {log.map((l, i) => (
            <div key={i} className="small">
              {l}
            </div>
          ))}
          {dead.length > 0 && (
            <div className="err" style={{ marginTop: 8 }}>
              失效站点：{dead.join('、')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function IndexNow({ site }: { site: string }) {
  const [urls, setUrls] = useState(site)
  const [key, setKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [out, setOut] = useState<any>(null)

  async function run() {
    const list = urls
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!list.length) return alert('请填写至少一个 URL')
    setBusy(true)
    setOut(null)
    const r = await api.indexnow({ urls: list, key: key || undefined })
    setOut(r.ok ? r.data : { error: r.error })
    setBusy(false)
  }

  return (
    <div className="tool">
      <div className="row wrap">
        <div className="field grow2">
          <label>要推送的 URL（一行一个，最多 100 条）</label>
          <textarea className="input area" rows={4} value={urls} onChange={(e) => setUrls(e.target.value)} />
        </div>
        <div className="field grow">
          <label>IndexNow Key（留空自动生成）</label>
          <input className="input" value={key} onChange={(e) => setKey(e.target.value)} placeholder="8-128 位字母数字" />
        </div>
      </div>
      <button className="btn primary" onClick={run} disabled={busy}>
        {busy ? '推送中…' : '推送到 IndexNow / Bing / Yandex 等'}
      </button>
      <p className="muted small">
        换链、发新内容后推送可加速收录。首次使用需把生成的 key 文件放到站点根目录，否则部分引擎校验不通过。
      </p>
      {out && (
        <div className="out">
          {out.error ? (
            <div className="err">{out.error}</div>
          ) : (
            <>
              <div className="verdict">已提交 {out.submitted} 条 URL，host：{out.host}</div>
              <div className="kv">
                {out.results?.map((r: any) => (
                  <span key={r.name} className={r.ok ? 'ok' : 'no'}>
                    {r.name} {r.status}
                  </span>
                ))}
              </div>
              <div className="small muted" style={{ marginTop: 6 }}>
                Key：{out.key} — {out.tip}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
