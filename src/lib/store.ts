export type Status = 'todo' | 'done' | 'indexed' | 'dead'

export type Record_ = {
  status: Status
  at: number
  note?: string
}

const KEY = 'backlink-station:v1'

export const STATUS_LABEL: Record<Status, string> = {
  todo: '未处理',
  done: '已提交',
  indexed: '已生效',
  dead: '已失效',
}

export const STATUS_COLOR: Record<Status, string> = {
  todo: '#8b93a7',
  done: '#2f81f7',
  indexed: '#1a7f37',
  dead: '#cf222e',
}

type Store = {
  site: string
  info: { title: string; description: string }
  records: Record<string, Record_>
}

const empty = (): Store => ({ site: '', info: { title: '', description: '' }, records: {} })

export function load(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const p = JSON.parse(raw)
    return { site: p.site || '', info: p.info || { title: '', description: '' }, records: p.records || {} }
  } catch {
    return empty()
  }
}

export function save(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {}
}

export function recordKey(site: string, dirId: string) {
  return `${site || '_'}::${dirId}`
}

export function toCSV(rows: string[][]) {
  return rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function download(filename: string, content: string, type = 'text/csv;charset=utf-8') {
  const blob = new Blob(['﻿' + content], { type })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
