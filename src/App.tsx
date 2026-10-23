import { useEffect, useMemo, useState } from 'react'
import UrlBar from './components/UrlBar'
import Tools from './components/Tools'
import DirList from './components/DirList'
import { api } from './lib/api'
import { load, save, recordKey, toCSV, download, STATUS_LABEL, type Record_, type Status } from './lib/store'
import { DIRECTORIES, type DirItem } from './data/directories'
import type { SiteInfo } from './lib/pitch'
import { guessName } from './lib/pitch'

export default function App() {
  const initial = useMemo(() => load(), [])
  const [site, setSite] = useState(initial.site)
  const [info, setInfo] = useState<SiteInfo>({ url: initial.site, title: initial.info.title, description: initial.info.description })
  const [records, setRecords] = useState<Record<string, Record_>>(initial.records || {})
  const [apiUp, setApiUp] = useState<boolean | null>(null)

  useEffect(() => {
    save({ site, info: { title: info.title, description: info.description }, records })
  }, [site, info, records])

  useEffect(() => {
    api.health().then((r) => setApiUp(r.ok === true && r.data?.ok === true))
  }, [])

  const eff: SiteInfo = { ...info, url: site, title: info.title || (site ? guessName(site) : '') }

  function setRecord(k: string, r: Record_) {
    setRecords((prev) => ({ ...prev, [k]: r }))
  }

  function exportCSV(rows: DirItem[]) {
    const head = ['站点', '分类', '地区', '链接类型', '是否需注册', '费用', '提交入口', '提交状态', '更新时间', '提示']
    const body = rows.map((d) => {
      const rec = records[recordKey(site, d.id)]
      const st: Status = rec?.status || 'todo'
      return [
        d.name,
        d.cat,
        d.region === 'cn' ? '国内' : '海外',
        d.link,
        d.login ? '是' : '否',
        d.cost,
        d.submit || d.url,
        STATUS_LABEL[st],
        rec?.at ? new Date(rec.at).toLocaleString('zh-CN') : '',
        d.tip,
      ]
    })
    download('backlink-plan.csv', toCSV([head, ...body]))
  }

  const stats = useMemo(() => {
    const total = DIRECTORIES.length
    let done = 0
    for (const d of DIRECTORIES) {
      const r = records[recordKey(site, d.id)]
      if (r && r.status !== 'todo') done++
    }
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [records, site])

  const visible = useMemo(() => DIRECTORIES, [])

  return (
    <div className="app">
      <header className="head">
        <div>
          <h1>
            🔗 SEO 外链工作台 <span className="ver">v1.0</span>
          </h1>
          <p className="muted small">
            免登录 · 内置 {stats.total} 个中外外链目录 · 反链检测 / 站点体检 / IndexNow 推送 · 数据全部存在你自己的浏览器里
          </p>
        </div>
        <div className="stat">
          <div className="bar">
            <i style={{ width: stats.pct + '%' }} />
          </div>
          <span className="small muted">
            进度 {stats.done} / {stats.total}（{stats.pct}%）
          </span>
        </div>
      </header>

      <UrlBar site={site} setSite={setSite} info={info} setInfo={setInfo} apiUp={apiUp} />
      <Tools site={site} visible={visible} />
      <DirList site={site} info={eff} records={records} setRecord={setRecord} onExport={exportCSV} />

      <footer className="foot muted small">
        <p>
          ⚠️ 使用提醒：Google 明确将「过量互换链接」列为链接垃圾。建议只与内容相关、读者真正有用的站点交换，
          锚文本用品牌词或自然短语，交换量控制在总外链的较小比例；新站一周换 2–3 个即可，
          换完定期复查，对方被降权立即撤链。
        </p>
        <p>
          本站不代你提交任何表单，也不存储任何数据到服务端 —— 所有勾选状态保存在浏览器 localStorage。
        </p>
      </footer>
    </div>
  )
}
