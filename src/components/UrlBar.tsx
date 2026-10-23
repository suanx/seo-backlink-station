import { useState } from 'react'
import { api } from '../lib/api'
import type { SiteInfo } from '../lib/pitch'

type Props = {
  site: string
  setSite: (v: string) => void
  info: SiteInfo
  setInfo: (v: SiteInfo) => void
  apiUp: boolean | null
}

export default function UrlBar({ site, setSite, info, setInfo, apiUp }: Props) {
  const [busy, setBusy] = useState(false)

  async function inspect() {
    if (!site.trim()) return
    setBusy(true)
    const url = /^https?:\/\//i.test(site.trim()) ? site.trim() : 'https://' + site.trim()
    const r = await api.site(url)
    if (r.ok && r.data) {
      setInfo({
        url,
        title: r.data.meta?.title || '',
        description: (r.data.meta?.description || '').slice(0, 160),
      })
      setSite(url)
      const hint = r.data.hint || ''
      const ext = r.data.stats?.externalDomains ?? 0
      if (hint) alert(`体检完成\n\n标题：${r.data.meta?.title || '（未抓取到）'}\n导出外链域名数：${ext}\n${hint}`)
    } else {
      alert('体检失败：' + (r.error || '未知错误'))
    }
    setBusy(false)
  }

  return (
    <div className="card">
      <div className="card-h">
        <h2>① 填写你的站点</h2>
        <span className={'dot ' + (apiUp === null ? 'dot-gray' : apiUp ? 'dot-green' : 'dot-red')} />
        <span className="muted small">
          {apiUp === null ? '检测函数中…' : apiUp ? 'Edge Functions 已就绪' : '函数未生效（离线模式可用）'}
        </span>
      </div>

      <div className="row">
        <input
          className="input grow"
          placeholder="https://你的域名.com"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && inspect()}
        />
        <button className="btn primary" onClick={inspect} disabled={busy || !site.trim()}>
          {busy ? '体检中…' : '站点体检'}
        </button>
      </div>
      <p className="muted small">
        「站点体检」会抓取标题与描述，自动填充下面的提交文案，并统计导出链接域名数，帮你判断换链风险。
      </p>

      <div className="row wrap">
        <div className="field grow">
          <label>站点名称</label>
          <input
            className="input"
            value={info.title}
            onChange={(e) => setInfo({ ...info, title: e.target.value })}
            placeholder="提交时使用的名称"
          />
        </div>
        <div className="field grow2">
          <label>一句话介绍</label>
          <input
            className="input"
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            placeholder="一句话说清你的站点是做什么的"
          />
        </div>
      </div>
    </div>
  )
}
