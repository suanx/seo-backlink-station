import { useMemo, useState } from 'react'
import { CATEGORIES, DIRECTORIES, type DirItem } from '../data/directories'
import { buildPitch, copyText, type SiteInfo } from '../lib/pitch'
import { STATUS_COLOR, STATUS_LABEL, recordKey, type Status, type Record_ } from '../lib/store'

type Props = {
  site: string
  info: SiteInfo
  records: Record<string, Record_>
  setRecord: (key: string, r: Record_) => void
  onExport: (rows: DirItem[]) => void
}

const STATUSES: Status[] = ['todo', 'done', 'indexed', 'dead']

export default function DirList({ site, info, records, setRecord, onExport }: Props) {
  const [region, setRegion] = useState<'all' | 'cn' | 'intl'>('all')
  const [cat, setCat] = useState<string>('all')
  const [onlyFree, setOnlyFree] = useState(true)
  const [onlyDofollow, setOnlyDofollow] = useState(false)
  const [hideDone, setHideDone] = useState(false)
  const [kw, setKw] = useState('')

  const list = useMemo(() => {
    const q = kw.trim().toLowerCase()
    const out: DirItem[] = []
    for (const d of DIRECTORIES) {
      if (region !== 'all' && d.region !== region) continue
      if (cat !== 'all' && d.cat !== cat) continue
      if (onlyFree && d.cost === 'paid') continue
      if (onlyDofollow && d.link !== 'dofollow') continue
      if (q && !(d.name + d.tip + d.cat + d.url).toLowerCase().includes(q)) continue
      const r = records[recordKey(site, d.id)]
      if (hideDone && r && r.status !== 'todo') continue
      out.push(d)
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, cat, onlyFree, onlyDofollow, hideDone, kw, records, site])

  const doneCount = list.filter((d) => records[recordKey(site, d.id)]?.status !== 'todo' && records[recordKey(site, d.id)]).length

  return (
    <div className="card">
      <div className="card-h">
        <h2>③ 目录库 · 共 {list.length} 个</h2>
        <span className="muted small">已处理 {doneCount}</span>
        <button className="btn ghost sm" onClick={() => onExport(list)}>
          导出 CSV
        </button>
      </div>

      <div className="filters">
        <div className="seg">
          {(['all', 'cn', 'intl'] as const).map((r) => (
            <button key={r} className={region === r ? 'on' : ''} onClick={() => setRegion(r)}>
              {r === 'all' ? '全部' : r === 'cn' ? '国内' : '海外'}
            </button>
          ))}
        </div>
        <select className="select" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">全部分类</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input className="input search" placeholder="搜索站点/关键词…" value={kw} onChange={(e) => setKw(e.target.value)} />
        <label className="chk">
          <input type="checkbox" checked={onlyFree} onChange={(e) => setOnlyFree(e.target.checked)} /> 仅免费
        </label>
        <label className="chk">
          <input type="checkbox" checked={onlyDofollow} onChange={(e) => setOnlyDofollow(e.target.checked)} /> 仅 dofollow
        </label>
        <label className="chk">
          <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> 隐藏已处理
        </label>
      </div>

      <div className="table-wrap">
        <table className="grid">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>站点</th>
              <th style={{ width: '10%' }}>分类</th>
              <th style={{ width: '26%' }}>提示</th>
              <th style={{ width: '12%' }}>状态</th>
              <th style={{ width: '30%' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => {
              const k = recordKey(site, d.id)
              const st: Status = records[k]?.status || 'todo'
              return (
                <tr key={d.id} className={st === 'todo' ? '' : 'row-done'}>
                  <td>
                    <a href={d.url} target="_blank" rel="noreferrer">
                      {d.name}
                    </a>
                    <div className="tags">
                      <span className={'tag t-' + d.region}>{d.region === 'cn' ? '国内' : '海外'}</span>
                      <span className={'tag t-' + d.link}>{d.link}</span>
                      {d.login && <span className="tag t-login">需注册</span>}
                      {d.cost !== 'free' && <span className={'tag t-' + d.cost}>{d.cost}</span>}
                    </div>
                  </td>
                  <td className="muted small">{d.cat}</td>
                  <td className="small">{d.tip}</td>
                  <td>
                    <select
                      className="select sm"
                      value={st}
                      style={{ color: STATUS_COLOR[st] }}
                      onChange={(e) => setRecord(k, { status: e.target.value as Status, at: Date.now() })}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="ops">
                      <a className="btn sm" href={d.submit || d.url} target="_blank" rel="noreferrer">
                        打开提交页
                      </a>
                      <button
                        className="btn sm ghost"
                        onClick={async () => {
                          const ok = await copyText(buildPitch(d, info))
                          alert(ok ? '已复制提交文案，粘贴到对方表单即可' : '复制失败，请手动选择')
                        }}
                      >
                        复制文案
                      </button>
                      <button
                        className="btn sm ghost"
                        onClick={() => {
                          const r = window.confirm('用「反链检测」检查该站是否已挂你的链接？（需先切到上方工具标签填写地址）')
                          if (r) window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        检测反链
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {!list.length && (
              <tr>
                <td colSpan={5} className="muted center">
                  没有符合条件的站点，试试放宽筛选
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
