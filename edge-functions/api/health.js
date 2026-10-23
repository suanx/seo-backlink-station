// GET /api/health — 验证 Edge Functions 是否已正确部署

import { json } from '../_lib/util.js'

export function onRequestGet() {
  return json({ ok: true, service: 'backlink-station', time: new Date().toISOString() })
}
