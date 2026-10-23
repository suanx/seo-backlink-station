/**
 * 内置外链目录库
 * region: cn = 国内 / intl = 海外
 * link:   dofollow | nofollow | unknown
 * login:  是否需要注册账号才能提交
 * cost:   free | freemium | paid
 */

export type DirItem = {
  id: string
  name: string
  url: string
  submit: string
  region: 'cn' | 'intl'
  cat: string
  link: 'dofollow' | 'nofollow' | 'unknown'
  login: boolean
  cost: 'free' | 'freemium' | 'paid'
  tip: string
}

export const CATEGORIES = [
  '友链交换',
  '目录收录',
  '站长社区',
  '内容平台',
  '问答社区',
  '导航站点',
  '搜索引擎后台',
  '产品发布',
  '通用目录',
  '本地商家',
  '博客平台',
  '文档媒体',
  '社交书签',
  '代码托管',
] as const

const d = (
  id: string,
  name: string,
  url: string,
  submit: string,
  region: 'cn' | 'intl',
  cat: string,
  link: 'dofollow' | 'nofollow' | 'unknown',
  login: boolean,
  cost: 'free' | 'freemium' | 'paid',
  tip: string
): DirItem => ({ id, name, url, submit, region, cat, link, login, cost, tip })

export const DIRECTORIES: DirItem[] = [
  // ─────────────── 国内 · 友链交换 ───────────────
  d('souwhy', '搜外友链', 'https://www.seowhy.com/', 'https://didi.seowhy.com/', 'cn', '友链交换', 'dofollow', true, 'free', '免费交换为主，自动匹配同行业站点，自带掉链监控'),
  d('aizhan-lian', '爱站「爱链」工具', 'https://www.aizhan.com/', 'https://gongju.aizhan.com/lian/', 'cn', '友链交换', 'dofollow', true, 'free', '免积分，可按权重/收录筛选，配合爱站监控上下链'),
  d('huanlj', '换链神器', 'https://www.huanlj.com/', 'http://www.huanlj.com/', 'cn', '友链交换', 'dofollow', true, 'freemium', '一键申请、双向审核、友链监控，也带买卖功能'),
  d('c2898', '2898 站长资源平台', 'https://www.2898.com/', 'https://www.2898.com/', 'cn', '友链交换', 'dofollow', true, 'free', '可按行业/权重/收录量/域名年龄多维筛选，免费换链'),
  d('ailianwang', '爱链网', 'https://www.520link.com/', 'https://www.520link.com/', 'cn', '友链交换', 'dofollow', true, 'free', '免费资源多、适合新站起步，但质量参差要自行筛选'),
  d('c4414', '4414 站长论坛', 'https://www.4414.cn/', 'https://www.4414.cn/', 'cn', '友链交换', 'dofollow', true, 'free', '站长社区，友链交易/网站交易/现金任务'),
  d('c55links', '55Links', 'https://www.55links.com/', 'https://www.55links.com/', 'cn', '友链交换', 'dofollow', true, 'freemium', '老牌稳定，支持按权重、收录、导出链接数筛选'),
  d('pinyiba', '拼一把论坛', 'https://www.pinyiba.com/', 'https://www.pinyiba.com/', 'cn', '友链交换', 'dofollow', true, 'free', '纯交换无交易，可按建站年限/收录量筛同阶段站点'),
  d('jrbhg', '聚仁榜精选导航', 'https://jrbhg.cn/', 'https://jrbhg.cn/', 'cn', '目录收录', 'dofollow', false, 'free', '免费收录有价值的网站，提交即可进入导航'),

  // ─────────────── 国内 · 站长社区 / 内容平台 ───────────────
  d('a5', 'A5 站长网', 'https://www.a5.net/', 'https://www.a5.net/', 'cn', '站长社区', 'dofollow', true, 'free', '投稿原创技术内容，文尾可留域名'),
  d('chinaz', '站长之家', 'https://www.chinaz.com/', 'https://www.chinaz.com/', 'cn', '站长社区', 'dofollow', true, 'free', '站长门户，可做网站收录与友链检测'),
  d('cnblogs', '博客园', 'https://www.cnblogs.com/', 'https://www.cnblogs.com/', 'cn', '内容平台', 'dofollow', true, 'free', '开通博客发原创，签名/文章内可带外链'),
  d('csdn', 'CSDN', 'https://www.csdn.net/', 'https://www.csdn.net/', 'cn', '内容平台', 'nofollow', true, 'free', '技术社区，外链多为 nofollow，主要拿曝光'),
  d('juejin', '稀土掘金', 'https://juejin.cn/', 'https://juejin.cn/', 'cn', '内容平台', 'nofollow', true, 'free', '技术内容社区，适合建品牌与引流'),
  d('jianshu', '简书', 'https://www.jianshu.com/', 'https://www.jianshu.com/', 'cn', '内容平台', 'nofollow', true, 'free', '写作平台，外链需审核，权重一般'),
  d('zhihu', '知乎', 'https://www.zhihu.com/', 'https://www.zhihu.com/', 'cn', '问答社区', 'nofollow', true, 'free', '高权重问答平台，回答中引用自己的内容'),
  d('sohu-mp', '搜狐号', 'https://mp.sohu.com/', 'https://mp.sohu.com/', 'cn', '内容平台', 'dofollow', true, 'free', '自媒体平台，内容合规前提下文末可放域名'),
  d('baijiahao', '百家号', 'https://baijiahao.baidu.com/', 'https://baijiahao.baidu.com/', 'cn', '内容平台', 'dofollow', true, 'free', '百度系自媒体，收录快'),
  d('oschina', '开源中国', 'https://www.oschina.net/', 'https://www.oschina.net/', 'cn', '代码托管', 'dofollow', true, 'free', '开源社区，可建项目主页与博客'),
  d('segmentfault', 'SegmentFault 思否', 'https://segmentfault.com/', 'https://segmentfault.com/', 'cn', '问答社区', 'nofollow', true, 'free', '技术问答社区'),
  d('v2ex', 'V2EX', 'https://www.v2ex.com/', 'https://www.v2ex.com/', 'cn', '站长社区', 'dofollow', true, 'free', '创作者社区，个人资料可填站点'),
  d('gitee', 'Gitee', 'https://gitee.com/', 'https://gitee.com/', 'cn', '代码托管', 'dofollow', true, 'free', '国内代码托管，Profile + 项目主页可挂外链'),
  d('bilibili', '哔哩哔哩', 'https://www.bilibili.com/', 'https://www.bilibili.com/', 'cn', '内容平台', 'nofollow', true, 'free', '专栏/视频简介挂链接，主要做曝光'),
  d('douban', '豆瓣', 'https://www.douban.com/', 'https://www.douban.com/', 'cn', '内容平台', 'dofollow', true, 'free', '小组/日记，权重高但审核较严'),

  // ─────────────── 国内 · 搜索引擎站长后台 ───────────────
  d('baidu-zy', '百度搜索资源平台', 'https://ziyuan.baidu.com/', 'https://ziyuan.baidu.com/linksubmit/index', 'cn', '搜索引擎后台', 'unknown', true, 'free', '新站必做：普通收录/API 推送/sitemap 提交'),
  d('bing-wm', 'Bing 站长工具', 'https://www.bing.com/webmasters/', 'https://www.bing.com/webmasters/', 'cn', '搜索引擎后台', 'unknown', true, 'free', '提交 URL 与 sitemap，同时可用 IndexNow 推送'),
  d('so-360', '360 搜索站长平台', 'https://zhanzhang.so.com/', 'https://zhanzhang.so.com/', 'cn', '搜索引擎后台', 'unknown', true, 'free', '360 收录入口与链接提交'),
  d('sogou-zz', '搜狗站长平台', 'https://zhanzhang.sogou.com/', 'https://zhanzhang.sogou.com/', 'cn', '搜索引擎后台', 'unknown', true, 'free', '搜狗收录与 sitemap 提交'),
  d('shenma', '神马搜索站长平台', 'https://zhanzhang.sm.cn/', 'https://zhanzhang.sm.cn/', 'cn', '搜索引擎后台', 'unknown', true, 'free', '移动端收录入口'),
  d('toutiao-zz', '头条搜索站长平台', 'https://zhanzhang.toutiao.com/', 'https://zhanzhang.toutiao.com/', 'cn', '搜索引擎后台', 'unknown', true, 'free', '头条搜索收录与资源提交'),

  // ─────────────── 海外 · 产品发布 ───────────────
  d('producthunt', 'Product Hunt', 'https://www.producthunt.com/', 'https://www.producthunt.com/posts/new', 'intl', '产品发布', 'dofollow', true, 'free', '海外产品发布首选，DR 极高，需提前准备素材'),
  d('alternativeto', 'AlternativeTo', 'https://alternativeto.net/', 'https://alternativeto.net/add/', 'intl', '产品发布', 'dofollow', true, 'free', '软件平替对比站，SaaS/工具类必投'),
  d('alternative-me', 'Alternative.me', 'https://alternative.me/', 'https://alternative.me/', 'intl', '产品发布', 'dofollow', false, 'free', 'DR72、月流量约 1M，提交后 24-72 小时出审核'),
  d('landbook', 'Land-book', 'https://land-book.com/', 'https://land-book.com/submit', 'intl', '产品发布', 'dofollow', false, 'free', 'DR72 落地页/设计灵感站，设计类站点通过率极高'),
  d('saashub', 'SaaSHub', 'https://www.saashub.com/', 'https://www.saashub.com/add-software', 'intl', '产品发布', 'dofollow', true, 'free', 'SaaS 目录，可对比同类产品'),
  d('slant', 'Slant', 'https://www.slant.co/', 'https://www.slant.co/', 'intl', '产品发布', 'dofollow', true, 'free', '推荐类问答目录，编辑自发收录为主'),
  d('betalist', 'BetaList', 'https://betalist.com/', 'https://betalist.com/submit', 'intl', '产品发布', 'dofollow', true, 'freemium', '早期产品/创业项目发布'),
  d('f6s', 'F6S', 'https://www.f6s.com/', 'https://www.f6s.com/startups/new', 'intl', '产品发布', 'dofollow', true, 'free', '创业公司目录与加速器社区'),
  d('wellfound', 'Wellfound (AngelList)', 'https://wellfound.com/', 'https://wellfound.com/', 'intl', '产品发布', 'dofollow', true, 'free', '创业公司档案，含官网外链'),
  d('crunchbase', 'Crunchbase', 'https://www.crunchbase.com/', 'https://www.crunchbase.com/submit', 'intl', '目录收录', 'dofollow', true, 'freemium', '高权重企业目录，初创公司宜早建档案'),
  d('indiehackers', 'Indie Hackers', 'https://www.indiehackers.com/', 'https://www.indiehackers.com/', 'intl', '产品发布', 'dofollow', true, 'free', '独立开发者社区，Profile 可挂产品'),
  d('uneed', 'Uneed', 'https://www.uneed.com/', 'https://www.uneed.com/submit', 'intl', '产品发布', 'dofollow', true, 'freemium', '新兴产品发布平台，免费/付费位并存'),
  d('micro-launch', 'MicroLaunch', 'https://microlaunch.net/', 'https://microlaunch.net/', 'intl', '产品发布', 'dofollow', true, 'freemium', '小产品发布平台，审核快'),

  // ─────────────── 海外 · 高权重通用目录 ───────────────
  d('spoke', 'Spoke', 'https://www.spoke.com/', 'https://www.spoke.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 91 的老牌目录，免费提交'),
  d('hotfrog', 'Hotfrog', 'https://www.hotfrog.com/', 'https://www.hotfrog.com/add-your-business', 'intl', '通用目录', 'unknown', true, 'free', 'DA 84，国际商家目录，可注册国家站'),
  d('cybo', 'Cybo', 'https://www.cybo.com/', 'https://www.cybo.com/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 66，覆盖多国本地商户'),
  d('exactseek', 'ExactSeek', 'https://www.exactseek.com/', 'https://www.exactseek.com/add.html', 'intl', '通用目录', 'unknown', false, 'free', 'DA 64，老牌免费目录'),
  d('somuch', 'SoMuch', 'https://www.somuch.com/', 'https://www.somuch.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 62 免费商业目录'),
  d('sitepromodir', 'Site Promotion Directory', 'https://www.sitepromotiondirectory.com/', 'https://www.sitepromotiondirectory.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 61，免费提交'),
  d('addbusiness', 'AddBusiness.net', 'https://www.addbusiness.net/', 'https://www.addbusiness.net/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 60 免费目录'),
  d('bizdir', 'Business Directory', 'https://www.businessdirectory.biz/', 'https://www.businessdirectory.biz/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 60 免费 B2B 目录'),
  d('ezilon', 'Ezilon', 'https://www.ezilon.com/', 'https://www.ezilon.com/addurl.php', 'intl', '通用目录', 'unknown', false, 'free', 'DA 59 免费目录提交'),
  d('directoryvault', 'DirectoryVault', 'https://www.directoryvault.com/', 'https://www.directoryvault.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 58 免费目录'),
  d('tuugo', 'Tuugo', 'https://www.tuugo.us/', 'https://www.tuugo.us/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 57 国际商家目录'),
  d('yalwa', 'Yalwa', 'https://www.yalwa.com/', 'https://www.yalwa.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 55 免费分类目录'),
  d('allbusinessnow', 'AllBusinessNow', 'https://www.allbusinessnow.com/', 'https://www.allbusinessnow.com/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 55 免费目录'),
  d('hlogy', 'Hlogy', 'https://www.hlogy.com/', 'https://www.hlogy.com/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 54 免费目录'),
  d('misterwhat', 'MisterWhat', 'https://www.misterwhat.com/', 'https://www.misterwhat.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 53 国际商业目录'),
  d('fyple', 'Fyple', 'https://www.fyple.com/', 'https://www.fyple.com/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 52，本地商家目录'),
  d('enrollbusiness', 'EnrollBusiness', 'https://www.enrollbusiness.com/', 'https://www.enrollbusiness.com/', 'intl', '通用目录', 'unknown', false, 'free', 'DA 50 免费商家目录'),
  d('brownbook', 'Brownbook', 'https://www.brownbook.net/', 'https://www.brownbook.net/', 'intl', '通用目录', 'unknown', true, 'free', 'DA 59，全球商家目录，可加分类'),
  d('blogarama', 'Blogarama', 'https://www.blogarama.com/', 'https://www.blogarama.com/submit-blog', 'intl', '通用目录', 'unknown', true, 'freemium', 'DA 68 博客目录，免费/付费两种'),
  d('dmozlive', 'DMOZ Live', 'https://dmozlive.com/', 'https://dmozlive.com/', 'intl', '通用目录', 'unknown', false, 'free', 'DMOZ 关停后的社区延续版本'),
  d('blogflux', 'BlogFlux', 'https://www.blogflux.com/', 'https://www.blogflux.com/', 'intl', '通用目录', 'unknown', true, 'free', '博客目录与统计挂件'),
  d('allthewebsites', 'AllTheWebsites.org', 'https://www.allthewebsites.org/', 'https://www.allthewebsites.org/', 'intl', '通用目录', 'unknown', false, 'free', '免费目录提交'),
  d('webwiki', 'Webwiki', 'https://www.webwiki.com/', 'https://www.webwiki.com/', 'intl', '通用目录', 'unknown', false, 'free', '站点评价型目录'),
  d('elib', 'Elib.org', 'https://www.elib.org/', 'https://www.elib.org/', 'intl', '通用目录', 'unknown', false, 'free', '免费网页目录'),
  d('businessseek', 'BusinessSeek.biz', 'https://www.businessseek.biz/', 'https://www.businessseek.biz/', 'intl', '通用目录', 'unknown', false, 'free', '免费商业目录'),
  d('a1webdir', 'A1 Web Directory', 'https://www.a1webdirectory.org/', 'https://www.a1webdirectory.org/submit.html', 'intl', '通用目录', 'unknown', false, 'free', '老牌免费目录，人工审核'),
  d('entireweb', 'EntireWeb', 'https://www.entireweb.com/', 'https://www.entireweb.com/free_submission/', 'intl', '通用目录', 'unknown', true, 'freemium', '免费提交，付费可加速审核'),
  d('b2byellowpages', 'B2B Yellow Pages', 'https://www.b2byellowpages.com/', 'https://www.b2byellowpages.com/', 'intl', '通用目录', 'unknown', true, 'free', 'B2B 黄页目录'),
  d('activesearchres', 'ActiveSearchResults', 'https://www.activesearchresults.com/', 'https://www.activesearchresults.com/', 'intl', '通用目录', 'unknown', false, 'free', '免费目录提交'),
  d('uswebdirectory', 'US Web Directory', 'https://www.uswebdirectory.com/', 'https://www.uswebdirectory.com/', 'intl', '通用目录', 'unknown', false, 'free', '美国站点目录'),
  d('websquash', 'Websquash', 'https://www.websquash.com/', 'https://www.websquash.com/', 'intl', '通用目录', 'unknown', false, 'free', '免费目录'),
  d('jasmine', 'Jasmine Directory', 'https://www.jasminedirectory.com/', 'https://www.jasminedirectory.com/', 'intl', '通用目录', 'unknown', true, 'paid', 'DA 71，人工审核质量高，但为付费目录'),

  // ─────────────── 海外 · 本地商家 ───────────────
  d('gmb', 'Google Business Profile', 'https://business.google.com/', 'https://business.google.com/', 'intl', '本地商家', 'unknown', true, 'free', '本地 SEO 必做，填写官网即获高权重外链'),
  d('bingplaces', 'Bing Places', 'https://www.bingplaces.com/', 'https://www.bingplaces.com/', 'intl', '本地商家', 'unknown', true, 'free', 'Bing 本地商户，可同步 Google 档案'),
  d('applemaps', 'Apple Business Connect', 'https://businessconnect.apple.com/', 'https://businessconnect.apple.com/', 'intl', '本地商家', 'unknown', true, 'free', '苹果地图商户档案'),
  d('yelp', 'Yelp', 'https://www.yelp.com/', 'https://biz.yelp.com/', 'intl', '本地商家', 'nofollow', true, 'free', '本地商家必备，外链 nofollow 但引流强'),
  d('yellowpages', 'Yellow Pages', 'https://www.yellowpages.com/', 'https://www.yellowpages.com/', 'intl', '本地商家', 'unknown', true, 'free', '经典黄页，本地 SEO 有价值'),
  d('foursquare', 'Foursquare', 'https://foursquare.com/', 'https://foursquare.com/', 'intl', '本地商家', 'unknown', true, 'free', '本地商户与地点目录'),
  d('localstack', 'LocalStack', 'https://www.localstack.com/', 'https://www.localstack.com/', 'intl', '本地商家', 'unknown', false, 'free', '社区型本地目录'),

  // ─────────────── 海外 · 内容 / 博客平台 ───────────────
  d('medium', 'Medium', 'https://medium.com/', 'https://medium.com/', 'intl', '博客平台', 'nofollow', true, 'free', '高权重写作平台，主要做曝光与品牌'),
  d('devto', 'Dev.to', 'https://dev.to/', 'https://dev.to/', 'intl', '博客平台', 'nofollow', true, 'free', '开发者社区，技术内容引流效果好'),
  d('hashnode', 'Hashnode', 'https://hashnode.com/', 'https://hashnode.com/', 'intl', '博客平台', 'dofollow', true, 'free', '开发者博客平台，支持自定义域名'),
  d('tumblr', 'Tumblr', 'https://www.tumblr.com/', 'https://www.tumblr.com/', 'intl', '博客平台', 'dofollow', true, 'free', '轻博客，适合视觉/创意内容'),
  d('blogger', 'Blogger', 'https://www.blogger.com/', 'https://www.blogger.com/', 'intl', '博客平台', 'dofollow', true, 'free', 'Google 旗下，收录快'),
  d('wordpress-com', 'WordPress.com', 'https://wordpress.com/', 'https://wordpress.com/', 'intl', '博客平台', 'dofollow', true, 'freemium', '免费二级域名博客'),
  d('substack', 'Substack', 'https://substack.com/', 'https://substack.com/', 'intl', '博客平台', 'dofollow', true, 'free', 'Newsletter 平台，可挂官网'),
  d('linkedin', 'LinkedIn', 'https://www.linkedin.com/', 'https://www.linkedin.com/company/setup/new/', 'intl', '博客平台', 'unknown', true, 'free', '企业页/文章，B2B 必建'),
  d('aboutme', 'About.me', 'https://about.me/', 'https://about.me/', 'intl', '博客平台', 'dofollow', true, 'free', '个人主页，可挂多个链接'),

  // ─────────────── 海外 · 问答 / 社区 ───────────────
  d('reddit', 'Reddit', 'https://www.reddit.com/', 'https://www.reddit.com/', 'intl', '问答社区', 'nofollow', true, 'free', '按 subreddit 精准投放，先贡献再放链接'),
  d('quora', 'Quora', 'https://www.quora.com/', 'https://www.quora.com/', 'intl', '问答社区', 'nofollow', true, 'free', '回答专业问题时引用自己的内容'),
  d('hn', 'Hacker News', 'https://news.ycombinator.com/', 'https://news.ycombinator.com/submit', 'intl', '问答社区', 'dofollow', true, 'free', '技术产品发布，门槛高但流量爆炸'),
  d('stackoverflow', 'Stack Overflow', 'https://stackoverflow.com/', 'https://stackoverflow.com/', 'intl', '问答社区', 'nofollow', true, 'free', 'Profile 可挂站点，技术权威高'),
  d('producthunt-discuss', 'PeerSpot', 'https://www.peerspot.com/', 'https://www.peerspot.com/', 'intl', '问答社区', 'dofollow', true, 'free', '软件评测社区，B2B SaaS 可投'),

  // ─────────────── 海外 · 文档 / 媒体分享 ───────────────
  d('scribd', 'Scribd', 'https://www.scribd.com/', 'https://www.scribd.com/', 'intl', '文档媒体', 'nofollow', true, 'free', '上传文档/白皮书，文内附网址'),
  d('issuu', 'Issuu', 'https://issuu.com/', 'https://issuu.com/', 'intl', '文档媒体', 'nofollow', true, 'free', '出版物/画册分享'),
  d('slideshare', 'SlideShare', 'https://www.slideshare.net/', 'https://www.slideshare.net/', 'intl', '文档媒体', 'nofollow', true, 'free', '上传 PPT，B2B 内容营销常用'),
  d('academia', 'Academia.edu', 'https://www.academia.edu/', 'https://www.academia.edu/', 'intl', '文档媒体', 'dofollow', true, 'free', '学术/研究类文档分享'),
  d('archive', 'Archive.org', 'https://archive.org/', 'https://archive.org/', 'intl', '文档媒体', 'unknown', true, 'free', '高权重域名，上传资料留存引用'),
  d('pinterest', 'Pinterest', 'https://www.pinterest.com/', 'https://business.pinterest.com/', 'intl', '文档媒体', 'dofollow', true, 'free', '视觉内容必做，商业号可挂官网'),
  d('youtube', 'YouTube', 'https://www.youtube.com/', 'https://www.youtube.com/', 'intl', '文档媒体', 'unknown', true, 'free', '频道简介/视频描述挂链接'),
  d('vimeo', 'Vimeo', 'https://vimeo.com/', 'https://vimeo.com/', 'intl', '文档媒体', 'unknown', true, 'freemium', '视频平台，简介可挂官网'),
  d('gdrive', 'Google 云端硬盘', 'https://drive.google.com/', 'https://drive.google.com/', 'intl', '文档媒体', 'unknown', true, 'free', '创建公开文档插入链接，权重高于普通论坛'),

  // ─────────────── 海外 · 社交书签 ───────────────
  d('scoopit', 'Scoop.it', 'https://www.scoop.it/', 'https://www.scoop.it/', 'intl', '社交书签', 'dofollow', true, 'freemium', '内容策展平台'),
  d('diigo', 'Diigo', 'https://www.diigo.com/', 'https://www.diigo.com/', 'intl', '社交书签', 'dofollow', true, 'free', '书签与批注社区'),
  d('folkd', 'Folkd', 'https://www.folkd.com/', 'https://www.folkd.com/', 'intl', '社交书签', 'dofollow', true, 'free', '免费书签提交'),
  d('bizsugar', 'BizSugar', 'https://www.bizsugar.com/', 'https://www.bizsugar.com/', 'intl', '社交书签', 'dofollow', true, 'free', '小企业内容分享社区'),
  d('pearltrees', 'Pearltrees', 'https://www.pearltrees.com/', 'https://www.pearltrees.com/', 'intl', '社交书签', 'dofollow', true, 'free', '可视化书签收藏'),
  d('instapaper', 'Instapaper', 'https://www.instapaper.com/', 'https://www.instapaper.com/', 'intl', '社交书签', 'dofollow', true, 'free', '稍后读平台'),
  d('digg', 'Digg', 'https://digg.com/', 'https://digg.com/', 'intl', '社交书签', 'nofollow', true, 'free', '老牌内容聚合'),

  // ─────────────── 海外 · 代码托管 / 开发者 ───────────────
  d('github', 'GitHub', 'https://github.com/', 'https://github.com/', 'intl', '代码托管', 'dofollow', true, 'free', 'Profile + README + awesome-list PR，最稳的高权重外链'),
  d('gitlab', 'GitLab', 'https://gitlab.com/', 'https://gitlab.com/', 'intl', '代码托管', 'dofollow', true, 'free', '开源项目托管'),
  d('sourceforge', 'SourceForge', 'https://sourceforge.net/', 'https://sourceforge.net/', 'intl', '代码托管', 'dofollow', true, 'free', '老牌开源项目托管'),
  d('codeberg', 'Codeberg', 'https://codeberg.org/', 'https://codeberg.org/', 'intl', '代码托管', 'dofollow', true, 'free', '欧洲开源托管平台'),
  d('npmjs', 'npm', 'https://www.npmjs.com/', 'https://www.npmjs.com/', 'intl', '代码托管', 'dofollow', true, 'free', '发一个包即获得高权重主页外链'),
  d('pypi', 'PyPI', 'https://pypi.org/', 'https://pypi.org/', 'intl', '代码托管', 'dofollow', true, 'free', 'Python 包主页外链'),
  d('dockerhub', 'Docker Hub', 'https://hub.docker.com/', 'https://hub.docker.com/', 'intl', '代码托管', 'dofollow', true, 'free', '镜像仓库主页可挂文档链接'),
]

export const TOTAL = DIRECTORIES.length
