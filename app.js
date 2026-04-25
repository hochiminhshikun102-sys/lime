const pages = [
  "home",
  "clinic",
  "services",
  "orders",
  "profile",
  "faceflow",
  "tcmflow",
  "tcm-nourish",
  "tcm-diet",
  "wardrobe",
  "boyfriend",
  "health-sleep",
  "health-calories",
  "health-water",
  "health-exercise",
  "health-weight",
  "health-cycle",
  "health-breathe",
  "health-medicine",
  "homecare",
  "yoga"
];

let healthBreatheTimer = null;
let healthBreatheSeq = [];
let healthBreatheIdx = 0;
let healthBreatheSec = 0;
const toastEl = document.getElementById("toast");
const mallLevel1El = document.getElementById("mall-level-1");
const mallLevel2El = document.getElementById("mall-level-2");
const mallResultsEl = document.getElementById("mall-results");
const serviceIconGridEl = document.getElementById("service-icon-grid");
const shopPanelEl = document.getElementById("shop-panel");
const xiaomeiAvatarEl = document.getElementById("xiaomei-avatar");
const voiceBtnEl = document.getElementById("voice-btn");
const voiceLabelEl = document.querySelector(".voice-label");
const chatListEl = document.querySelector(".chat-list");
const homeChatInputEl = document.getElementById("home-chat-input");
const homeChatSendEl = document.getElementById("home-chat-send");
const homeLedgerToggleEl = document.getElementById("home-ledger-toggle");
const homeLedgerPanelEl = document.getElementById("home-ledger-panel");
const homeLedgerCloseEl = document.getElementById("home-ledger-close");
const homeLedgerMaskEl = document.getElementById("home-ledger-mask");
const homeLedgerScoreEl = document.getElementById("home-ledger-score");
const homeLedgerSummaryEl = document.getElementById("home-ledger-summary");
const homeLedgerListEl = document.getElementById("home-ledger-list");
const aiConfigBtnEl = document.getElementById("ai-config-btn");
const aiEndpointEl = document.getElementById("ai-endpoint");
const aiModelEl = document.getElementById("ai-model");
const aiKeyEl = document.getElementById("ai-key");
const aiSaveBtnEl = document.getElementById("ai-save-btn");
const brandHomeBtnEl = document.getElementById("brand-home-btn");
const clinicTitleEl = document.getElementById("clinic-title");
const clinicListEl = document.getElementById("clinic-list");
const flowTitleEl = document.getElementById("flow-title");
const flowStepsEl = document.getElementById("flow-steps");
const faceflowTitleEl = document.getElementById("faceflow-step-title");
const faceflowContentEl = document.getElementById("faceflow-step-content");
const faceflowPrevEl = document.getElementById("faceflow-prev");
const faceflowNextEl = document.getElementById("faceflow-next");
const faceflowTimelineEl = document.getElementById("faceflow-timeline");
const faceflowDetectScreenEl = document.getElementById("faceflow-detect-screen");
const faceflowMainEl = document.getElementById("faceflow-main");
const faceflowOpenCameraEl = document.getElementById("faceflow-open-camera");
const faceflowCaptureDetectEl = document.getElementById("faceflow-capture-detect");
const faceflowSkipDetectEl = document.getElementById("faceflow-skip-detect");
const faceDetectVideoEl = document.getElementById("face-detect-video");
const faceDetectLiveLabelEl = document.getElementById("face-detect-live-label");
const faceDetectProcessingEl = document.getElementById("face-detect-processing");
const faceDetectProcessingLabelEl = document.getElementById("face-detect-processing-label");
const faceflowVisionReportCardEl = document.getElementById("faceflow-vision-report-card");
const faceflowVisionReportTextEl = document.getElementById("faceflow-vision-report-text");
const faceflowVisionReportCloseEl = document.getElementById("faceflow-vision-report-close");
const avatarFallback = "./assets/share-logo.png?v=6";
const AI_CONFIG_KEY = "limme_ai_config_v1";
const SKIN_VISION_REPORT_KEY = "limme_skin_vision_report_v1";
const CHAT_LIMIT = 4;
const HOME_LEDGER_CHAT_KEY = "mr_sweet_home_ledger_chat_v1";
const HOME_LEDGER_CAT_RULES = [
  { id: "ta", kws: ["男友", "对象", "老公", "前任", "暧昧", "分手", "恋爱", "喜欢他", "喜欢她"] },
  { id: "money", kws: ["搞钱", "工资", "收入", "副业", "存钱", "理财", "预算", "攒钱", "花销"] },
  { id: "bestie", kws: ["闺蜜", "约饭", "聚会", "下午茶", "逛街", "姐妹"] },
  { id: "treehole", kws: ["树洞", "难过", "崩溃", "委屈", "心累", "emo", "压力"] },
  { id: "mind", kws: ["心眼子", "边界", "拿捏", "沟通", "反击", "识人", "情商"] },
  { id: "wish", kws: ["心愿", "愿望", "清单", "想买", "想做", "目标"] },
  { id: "outfit", kws: ["穿搭", "ootd", "衣服", "搭配", "裙子", "外套", "鞋子", "妆容"] },
  { id: "cycle", kws: ["经期", "姨妈", "月经", "周期", "排卵", "痛经"] },
  { id: "pet", kws: ["宠物", "猫", "狗", "喂粮", "铲屎", "遛狗"] },
  { id: "parenting", kws: ["育儿", "宝宝", "娃", "母乳", "辅食", "早教", "幼儿园"] },
  { id: "misc", kws: [] }
];
const scriptedChat = [
  { role: "ai", text: "你好，我是甜先生 Mr. Sweet，你的女性健康管家。" },
  { role: "user", text: "最近睡眠变浅，经期前情绪波动也比较大" },
  { role: "ai", text: "我先给你做个轻量作息评估，再给一份3天可执行的小计划，今天想先从睡眠还是情绪开始？" }
];

const HOMECARE_CATALOG = [
  { tab: "按摩", title: "舒缓全身按摩", meta: "全身精油 · 轻柔手法", hint: "60分钟", btnLabel: "预约", cta: "book" },
  { tab: "推拿", title: "肩颈推拿", meta: "缓解久坐酸胀", hint: "60分钟", btnLabel: "预约", cta: "book" },
  { tab: "推拿", title: "肩颈推拿", meta: "进阶力度 · 需师傅评估", hint: "30分钟", btnLabel: "中阶", cta: "level" },
  { tab: "SPA", title: "香薰舒压 SPA", meta: "玫瑰海盐热敷", hint: "90分钟", btnLabel: "预约", cta: "book" },
  { tab: "SPA", title: "足部精护", meta: "热敷泡脚 + 修形护理", hint: "45分钟", btnLabel: "预约", cta: "book" },
  { tab: "按摩", title: "运动恢复按摩", meta: "筋膜放松 · 适合运动后", hint: "45分钟", btnLabel: "预约", cta: "book" },
  { tab: "康复", title: "腰部调理推拿", meta: "师傅持证 · 可预约上门", hint: "50分钟", btnLabel: "预约", cta: "book" },
  { tab: "按摩", title: "头部舒缓按摩", meta: "减压助眠", hint: "30分钟", btnLabel: "预约", cta: "book" }
];

const AMAP_KEY_STORAGE = "limme_amap_key";
/** 在高德控制台创建「Web 端 (JS)」Key 后，可填在此处，首次进入线下页即可直接加载地图；未填写时仍可在「线下」页底栏输入。页面内点「保存」会写入本机，并覆盖此默认值。切勿把含真实 Key 的仓库提交到公开环境，务必在高德侧配置 Referer/域名白名单。 */
const AMAP_KEY_DEFAULT = "";

const YOGA_ONLINE_COURSES = [
  { id: "o1", title: "晨间唤醒瑜伽", instructor: "小柠", durationMin: 30, difficulty: "初级", type: "流瑜伽", cta: "book" },
  { id: "o2", title: "阴瑜伽安睡", instructor: "Mia", durationMin: 45, difficulty: "初级", type: "阴瑜伽", cta: "book" },
  { id: "o3", title: "腰腹燃脂", instructor: "周周", durationMin: 35, difficulty: "中级", type: "塑形", cta: "book" },
  { id: "o4", title: "肩颈舒缓瑜伽", instructor: "小柠", durationMin: 30, difficulty: "中级", type: "哈他", cta: "level" },
  { id: "o5", title: "开髋与柔韧", instructor: "Ann", durationMin: 50, difficulty: "中高级", type: "开髋", cta: "book" },
  { id: "o6", title: "办公族拉伸", instructor: "Mia", durationMin: 20, difficulty: "初级", type: "办公", cta: "book" }
];

/* 周边坐标与距离为示例数据，接入后端后可换为真实 LBS 结果 */
const YOGA_OFFLINE_STUDIOS = [
  { id: "s1", name: "甜先生瑜伽生活馆", address: "朝外大街甲 6 号 · 地铁直达", lng: 116.4406, lat: 39.9217, dist: 1.1, rating: 4.9, course: "肩颈放松瑜伽", duration: "30分钟" },
  { id: "s2", name: "静语瑜伽", address: "金台里 19 号 2F", lng: 116.461, lat: 39.9154, dist: 2.3, rating: 4.8, course: "流瑜伽", duration: "60分钟" },
  { id: "s3", name: "光尘瑜伽", address: "通惠河东路 1 号", lng: 116.455, lat: 39.9012, dist: 3.1, rating: 4.6, course: "阴瑜伽", duration: "45分钟" },
  { id: "s4", name: "如荷瑜伽", address: "工体南路 8 号", lng: 116.433, lat: 39.93, dist: 2.0, rating: 4.7, course: "球瑜伽", duration: "50分钟" }
];

const YOGA_DIF_ORD = { 初级: 0, 中级: 1, 中高级: 2, 高级: 3 };

let homecareActiveTab = "按摩";
let yogaViewMode = "online";
let yogaFilterDim = "duration";
let yogaMapInstance = null;
let yogaMarkers = [];
let _yogaInited = false;
let tcmMapInstance = null;
let tcmMapMarkers = [];

const clinicData = {
  beauty: {
    title: "医美轻美机构列表（按距离/评分）",
    items: [
      { name: "甜先生轻医美中心", meta: "评分4.9 · 1.2km · 资质认证", doctor: "数字人医生：林医生" },
      { name: "悦肤医疗机构", meta: "评分4.8 · 2.1km · 安全保障", doctor: "数字人医生：周医生" }
    ]
  },
  mind: {
    title: "中医/心理咨询机构列表",
    items: [
      { name: "甜先生中医调理馆", meta: "评分4.9 · 1.8km · 三甲合作", doctor: "数字人医师：陈医师" },
      { name: "心语心理咨询中心", meta: "评分4.7 · 2.9km · 平台认证", doctor: "数字人咨询师：秦老师" }
    ]
  }
};

const mallTree = {
  化妆品: {
    面部彩妆: [
      { name: "丝绒雾面唇釉礼盒", price: "¥268", ico: "💋" },
      { name: "养肤粉底液 30ml", price: "¥189", ico: "🧴" },
      { name: "四色眼影盘", price: "¥158", ico: "🎨" }
    ],
    卸妆洁面: [
      { name: "温和卸妆膏 100g", price: "¥99", ico: "🫧" },
      { name: "氨基酸洁面慕斯", price: "¥79", ico: "🧼" }
    ]
  },
  保健品: {
    维生素: [
      { name: "复合维生素软糖", price: "¥128", ico: "💊" },
      { name: "维D3+钙嚼片", price: "¥96", ico: "🦴" }
    ],
    益生菌: [
      { name: "女性益生菌 30条", price: "¥219", ico: "🫘" },
      { name: "肠道益生元粉", price: "¥168", ico: "🌿" }
    ]
  },
  护肤品: {
    面部护理: [
      { name: "修护精华", price: "¥199", ico: "✨" },
      { name: "补水面膜", price: "¥79", ico: "💧" }
    ],
    防晒专区: [
      { name: "轻薄防晒乳", price: "¥129", ico: "☀️" },
      { name: "敏感肌防晒", price: "¥159", ico: "🌤️" }
    ]
  },
  周边好物: {
    美容仪: [
      { name: "射频导入仪", price: "¥599", ico: "📳" },
      { name: "眼部按摩仪", price: "¥269", ico: "👁️" }
    ],
    香氛蜡烛: [
      { name: "舒缓助眠香氛", price: "¥99", ico: "🕯️" },
      { name: "木质调香氛", price: "¥109", ico: "🪵" }
    ]
  },
  养护品: {
    中式养生: [
      { name: "红枣桂圆饮", price: "¥49", ico: "🫖" },
      { name: "阿胶固元糕", price: "¥69", ico: "🍯" }
    ],
    功能补剂: [
      { name: "胶原蛋白粉", price: "¥139", ico: "🥛" },
      { name: "益生菌组合", price: "¥118", ico: "🧬" }
    ]
  }
};

/** 今日严选 5 个推荐位：与 mallTree 分类联动，主卡/比价/列表跟手 */
const PICKGOODS_SPOTLIGHTS = [
  {
    id: "spot-lip",
    tag: "化妆品",
    chip: "唇釉礼盒",
    title: "丝绒雾面唇釉礼盒 · 三支装",
    price: "¥ 268",
    ico: "💋",
    seed: "limmSpotLip",
    level1: "化妆品",
    level2: "面部彩妆",
    compareBlurb: "对比天猫/抖音同类均价约 ¥320，严选直降"
  },
  {
    id: "spot-vc",
    tag: "保健品",
    chip: "维生素软糖",
    title: "复合维生素软糖 · 60 粒装",
    price: "¥ 128",
    ico: "💊",
    seed: "limmSpotVc",
    level1: "保健品",
    level2: "维生素",
    compareBlurb: "跨境与本土渠道价差约 18%，已为你标红低价"
  },
  {
    id: "spot-serum",
    tag: "护肤品",
    chip: "修护精华",
    title: "修护精华 · 熬夜急救",
    price: "¥ 199",
    ico: "✨",
    seed: "limmSpotSerum",
    level1: "护肤品",
    level2: "面部护理",
    compareBlurb: "同款成分不同包装，严选供应链省中间环节"
  },
  {
    id: "spot-dev",
    tag: "周边",
    chip: "美容仪",
    title: "射频导入仪 · 入门款",
    price: "¥ 599",
    ico: "📳",
    seed: "limmSpotDev",
    level1: "周边好物",
    level2: "美容仪",
    compareBlurb: "京东/拼多多历史低价区间已抓取（示意）"
  },
  {
    id: "spot-jelly",
    tag: "滋补",
    chip: "阿胶糕",
    title: "阿胶固元糕 · 小包装",
    price: "¥ 69",
    ico: "🍯",
    seed: "limmSpotJelly",
    level1: "养护品",
    level2: "中式养生",
    compareBlurb: "产地与批次可查，支持「假一赔三」示意条款"
  }
];

/** 全网比价：渠道定义（与 buildPickgoodsComparePackage 组合生成多维对照） */
const PICKGOODS_COMPARE_CHANNELS = [
  { id: "mr-sweet", label: "甜先生 今日严选", nick: "严选", color: "#f47fa8", role: "anchor" },
  { id: "tb", label: "淘宝 / 天猫", nick: "淘天", color: "#ff5000", role: "ext" },
  { id: "jd", label: "京东", nick: "京东", color: "#e4393c", role: "ext" },
  { id: "pdd", label: "拼多多", nick: "拼多多", color: "#e02e24", role: "ext" },
  { id: "dy", label: "抖音商城", nick: "抖音", color: "#161823", role: "ext" },
  { id: "vip", label: "唯品会", nick: "唯品会", color: "#c71220", role: "ext" }
];

const flowData = {
  medical: {
    title: "医美面诊核心流程",
    steps: [
      "首页唤醒甜先生",
      "AI 问询需求",
      "美美看脸并生成皮肤报告",
      "推荐医美机构",
      "进入机构数字人面诊",
      "查看治疗方案",
      "在线预约并支付",
      "生成核销码并到店核销"
    ]
  },
  tcm: {
    title: "中医心理咨询流程",
    steps: [
      "首页唤醒甜先生",
      "咨询睡眠/情绪问题",
      "推荐中医心理咨询机构",
      "进入数字人问诊",
      "生成调理方案",
      "预约到院并购买滋补品",
      "支付完成并预约成功"
    ]
  },
  referral: {
    title: "闺蜜分销流程",
    steps: [
      "我的 -> 邀请闺蜜",
      "生成并分享邀请海报",
      "好友注册并消费",
      "系统自动核算佣金",
      "发起提现申请并到账"
    ]
  }
};

/**
 * 服务页：全部「二级能力」一屏 icon+文案（原多 Tab 的汇总）
 * action: page / face(美美看脸) / plaza(回首页到内容广场) / msg(Toast)
 */
const SERVICE_ALL_ICONS = [
  { ico: "📅", title: "经期管理", desc: "经期记录、预测、健康建议", action: { type: "page", name: "health-cycle" } },
  { ico: "⚖️", title: "体重管理", desc: "体重记录、减脂/塑形", action: { type: "page", name: "health-weight" } },
  { ico: "✨", title: "美颜相机", desc: "拍照修图、肤质存档", action: { type: "face" } },
  { ico: "💰", title: "智能记账本", desc: "日常记账、账单统计", action: { type: "msg", text: "智能记账本将接入手账与统计（示意）" } },
  { ico: "👔", title: "电子衣柜+穿搭", desc: "衣物录入、每日推荐", action: { type: "page", name: "wardrobe" } },
  { ico: "🧘", title: "瑜伽课程", desc: "线上课、线下场馆", action: { type: "page", name: "yoga" } },
  { ico: "💆", title: "上门服务", desc: "按摩、推拿等到家", action: { type: "page", name: "homecare" } },
  { ico: "💬", title: "24h 私密男模", desc: "陪聊、互动房间", action: { type: "page", name: "boyfriend" } },
  { ico: "🎬", title: "内容频道", desc: "小说、漫剧、短视频", action: { type: "plaza" } },
  { ico: "🎀", title: "邀请闺蜜", desc: "邀请海报、分享入口", action: { type: "page", name: "profile" } },
  { ico: "📊", title: "佣金明细", desc: "分佣、订单", action: { type: "page", name: "profile" } },
  { ico: "💳", title: "佣金提现", desc: "可提现、到账", action: { type: "page", name: "profile" } }
];

const faceFlowSteps = [
  {
    title: "步骤1：美美看脸检测",
    screen: "对应原型：4.png",
    image: "./assets/flow/4.png",
    rows: ["医生主页与预约咨询入口", "用户点击“预约咨询”进入检测链路"],
    cta: "进入检测报告",
    actions: ["预约咨询", "查看医生主页", "检测说明"]
  },
  {
    title: "步骤2：检测报告",
    screen: "对应原型：5.png",
    image: "./assets/flow/5.png",
    rows: ["展示水润度/毛孔/弹性指标", "系统输出检测结论与改善建议"],
    cta: "生成个性方案",
    actions: ["查看完整报告", "下载报告", "继续问诊"]
  },
  {
    title: "步骤3：医生问答",
    screen: "对应原型：6.png",
    image: "./assets/flow/6.png",
    rows: ["数字人医生根据报告给出建议", "用户补充问题后发送问诊"],
    cta: "进入定制方案",
    actions: ["发送问题", "语音补充", "查看问答记录"]
  },
  {
    title: "步骤4：定制方案",
    screen: "对应原型：7.png",
    image: "./assets/flow/7.png",
    rows: ["按 Step1~Step3 展示护肤流程", "给出预期效果与疗程节奏"],
    cta: "选择套餐",
    actions: ["Step1 清洁修护", "Step2 轻医美治疗", "Step3 居家维护"]
  },
  {
    title: "步骤5：套餐选择",
    screen: "对应原型：8.png",
    image: "./assets/flow/8.png",
    rows: ["基础版/进阶版/尊享版对比", "支持一键预约高阶套餐"],
    cta: "选择预约时间",
    actions: ["基础版", "进阶版", "尊享版"]
  },
  {
    title: "步骤6：预约时间",
    screen: "对应原型：9.png",
    image: "./assets/flow/9.png",
    rows: ["按日期与时段选可预约窗口", "确认到店时间并锁定资源"],
    cta: "确认订单",
    actions: ["2024.11.15", "10:00-11:00", "14:00-15:00", "16:00-17:00", "确认时间"]
  },
  {
    title: "步骤7：确认订单",
    screen: "对应原型：10.png",
    image: "./assets/flow/10.png",
    rows: ["展示机构、项目、时间和金额", "核对信息后提交订单"],
    cta: "去支付",
    actions: ["核对机构", "核对项目", "提交订单"]
  },
  {
    title: "步骤8：支付",
    screen: "对应原型：11.png / 11.jpg",
    image: "./assets/flow/11.png",
    rows: ["选择支付方式（微信/支付宝/银行卡）", "完成支付进入预约成功页"],
    cta: "查看预约结果",
    actions: ["微信支付", "支付宝", "银行卡"]
  },
  {
    title: "步骤9：预约成功",
    screen: "对应原型：12.png",
    image: "./assets/flow/12.png",
    rows: ["生成核销码（到店核销）", "支持分享与到店前提醒"],
    cta: "完成链路",
    actions: ["查看核销码", "添加日历提醒", "分享给闺蜜"]
  }
];

/** 中医调理：机构选择（示例坐标与列表可改接后端 LBS） */
const TCM_PICK_INST = [
  { id: "t1", name: "云杉中医馆", tag: "情志调理", rating: 4.8, img: "./assets/xiaomei-avatar.png?v=6", lng: 116.4412, lat: 39.9221 },
  { id: "t2", name: "青禾堂中医", tag: "体质调养", rating: 4.8, img: "./assets/share-logo.png?v=6", lng: 116.4612, lat: 39.9155 },
  { id: "t3", name: "心愈 · 中医心理咨询", tag: "睡眠压力", rating: 4.8, img: "./assets/xiaomei-avatar.png?v=6", lng: 116.4551, lat: 39.9013 },
  { id: "t4", name: "和光养生馆", tag: "日常保健", rating: 4.7, img: "./assets/share-logo.png?v=6", lng: 116.433, lat: 39.93 },
  { id: "t5", name: "甜先生中医调理", tag: "线下面诊", rating: 4.9, img: "./assets/xiaomei-avatar.png?v=6", lng: 116.4492, lat: 39.9181 }
];

/** 选机构/医师后，滋补推荐、食疗方案页共用的上下文字段 */
let tcmSelectionContext = { id: "", name: "", doctor: "", source: "tcmflow" };

const TCM_IMG_V = "1";
const tcmAsset = (name) => `./assets/tcm/${name}?v=${TCM_IMG_V}`;

const TCM_NOURISH_LIST = [
  { title: "宁夏枸杞", sub: "滋补肝肾", price: 89, showScore: false, img: tcmAsset("nourish-01-goji.jpg") },
  { title: "云衿肝肾方", sub: "滋补肝肾", price: 89, showScore: false, img: tcmAsset("nourish-02-herbs.jpg") },
  { title: "阿胶固元糕", sub: "气血双补", price: 89, showScore: true, score: 4.8, img: tcmAsset("nourish-03-ejiao.jpg") },
  { title: "红枣桂圆饮", sub: "温补安神", price: 89, showScore: true, score: 4.8, img: tcmAsset("nourish-04-dates.jpg") },
  { title: "百合莲子羹", sub: "润肺养心", price: 89, showScore: false, img: tcmAsset("nourish-05-lotus-lily.jpg") }
];

const TCM_DIET_STEPS = [
  { title: "解郁安神粥", sub: "早晚温服，一周 3 次", img: tcmAsset("diet-01-porridge.jpg") },
  { title: "小米、莲子、百合", sub: "三味配伍，脾肺同调", img: tcmAsset("diet-02-grains.jpg") },
  { title: "茯苓、山药、枸杞", sub: "辅料与体质备注以面诊为准", img: tcmAsset("diet-03-roots.jpg") },
  { title: "小火慢炖 30 分钟", sub: "粥稠米烂即可，忌大火", img: tcmAsset("diet-04-cooking.jpg") },
  { title: "宜忌与储存", sub: "经期与用药请遵医嘱", img: tcmAsset("diet-05-herbs.jpg") }
];

let _tcmPickInited = false;
let _tcmSubPageInited = false;

function getTcmPickFiltered() {
  const q = (document.getElementById("tcm-pick-search")?.value || "").trim().toLowerCase();
  let list = TCM_PICK_INST.map((x) => ({ ...x }));
  if (q) {
    list = list.filter((x) => x.name.toLowerCase().includes(q) || x.tag.toLowerCase().includes(q));
  }
  return list;
}

function renderTcmPickList() {
  const list = document.getElementById("tcm-pick-list");
  if (!list) return;
  const items = getTcmPickFiltered();
  list.innerHTML = "";
  if (items.length === 0) {
    const p = document.createElement("p");
    p.className = "tcm-pick-empty muted";
    p.textContent = "没有匹配的机构，请换个关键词试试。";
    list.appendChild(p);
    return;
  }
  items.forEach((it) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tcm-pick-card";
    b.setAttribute("data-tcm-pick-id", it.id);
    b.setAttribute("role", "listitem");
    const r = Number(it.rating);
    const rs = Number.isFinite(r) ? r.toFixed(1) : "4.8";
    b.innerHTML = `
      <span class="tcm-pick-av-wrap">
        <img class="tcm-pick-av" src="${it.img}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${avatarFallback}'" />
      </span>
      <span class="tcm-pick-body">
        <span class="tcm-pick-name">${it.name}</span>
        <span class="tcm-pick-tag">${it.tag}</span>
      </span>
      <span class="tcm-pick-rating" aria-label="评分 ${rs} 分">★${rs}分</span>
    `;
    b.addEventListener("click", () => {
      if (tcmMapInstance && it.lng != null && it.lat != null) {
        try {
          tcmMapInstance.setZoomAndCenter(16, [it.lng, it.lat]);
        } catch (_) {
          /* ignore */
        }
      }
      tcmSelectionContext = { id: it.id, name: it.name, doctor: "", source: "tcmflow" };
      switchPage("tcm-nourish");
      renderTcmNourishPage();
    });
    list.appendChild(b);
  });
}

function initTcmPickOnce() {
  if (_tcmPickInited) return;
  const inp = document.getElementById("tcm-pick-search");
  if (!inp) return;
  _tcmPickInited = true;
  inp.addEventListener("input", () => renderTcmPickList());
  document.getElementById("tcm-amap-key-save")?.addEventListener("click", () => {
    const v = document.getElementById("tcm-amap-key")?.value?.trim() || "";
    localStorage.setItem(AMAP_KEY_STORAGE, v);
    if (!v) {
      showToast("已清空：地图将以占位方式展示。");
    } else {
      showToast("已保存，正在加载地图…");
    }
    destroyTcmMap();
    setTimeout(() => tryInitTcmAmap(), 0);
  });
}

function renderTcmPickPage() {
  initTcmPickOnce();
  const keyInp = document.getElementById("tcm-amap-key");
  if (keyInp) keyInp.value = getStoredAmapKey();
  renderTcmPickList();
  setTimeout(() => tryInitTcmAmap(), 0);
}

function initTcmSubPagesOnce() {
  if (_tcmSubPageInited) return;
  _tcmSubPageInited = true;
  document.getElementById("tcm-nourish-cart")?.addEventListener("click", () => {
    showToast("已加入购物车（示意），可在「电商消费」继续结算。");
  });
  document.getElementById("tcm-diet-save")?.addEventListener("click", () => {
    showToast("方案已收藏（示意），可同步到预约记录与提醒。");
  });
}

function renderTcmNourishList() {
  const root = document.getElementById("tcm-nourish-list");
  if (!root) return;
  root.innerHTML = "";
  TCM_NOURISH_LIST.forEach((row) => {
    const art = document.createElement("article");
    art.className = "tcm-sup-card";
    art.setAttribute("role", "listitem");
    const right = row.showScore
      ? `<span class="tcm-sup-right"><span class="tcm-sup-star" aria-hidden="true">★</span>${(row.score ?? 4.8).toFixed(1)}分</span>`
      : `<span class="tcm-sup-right"><span class="tcm-sup-yuan" aria-hidden="true">¥</span>${row.price}</span>`;
    art.innerHTML = `
      <div class="tcm-sup-av">
        <img src="${row.img}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${avatarFallback}'" />
      </div>
      <div class="tcm-sup-mid">
        <h3 class="tcm-sup-title">${row.title}</h3>
        <p class="tcm-sup-sub">${row.sub}</p>
      </div>
      ${right}
    `;
    root.appendChild(art);
  });
}

function renderTcmDietList() {
  const root = document.getElementById("tcm-diet-list");
  if (!root) return;
  root.innerHTML = "";
  TCM_DIET_STEPS.forEach((row) => {
    const art = document.createElement("article");
    art.className = "tcm-diet-card";
    art.setAttribute("role", "listitem");
    const fall = avatarFallback;
    art.innerHTML = `
      <div class="tcm-diet-av" aria-hidden="true">
        <img src="${row.img}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${fall}'" />
      </div>
      <div class="tcm-diet-mid">
        <h3 class="tcm-diet-title">${row.title}</h3>
        <p class="tcm-diet-sub">${row.sub}</p>
      </div>
      <span class="tcm-diet-rating" aria-label="推荐 4.8 分"><span class="tcm-diet-star" aria-hidden="true">★</span>4.8分</span>
    `;
    root.appendChild(art);
  });
}

function renderTcmNourishPage() {
  initTcmSubPagesOnce();
  const ctx = document.getElementById("tcm-nourish-ctx");
  if (ctx) {
    const a = tcmSelectionContext.name || "机构";
    const b = tcmSelectionContext.doctor;
    ctx.textContent = b ? `根据「${a}」· ${b} 的调理方向推荐` : `根据「${a}」为您搭配`;
  }
  const back = document.getElementById("tcm-nourish-back");
  if (back) {
    back.setAttribute("data-page-jump", tcmSelectionContext.source === "clinic" ? "clinic" : "tcmflow");
  }
  renderTcmNourishList();
}

function renderTcmDietPage() {
  initTcmSubPagesOnce();
  const ctx = document.getElementById("tcm-diet-ctx");
  if (ctx) {
    const a = tcmSelectionContext.name || "机构";
    const b = tcmSelectionContext.doctor;
    ctx.textContent = b ? `${a} · ${b} · 七日食疗` : `${a} · 七日食疗`;
  }
  renderTcmDietList();
}

/** 首页·内容广场：双列「最短列」瀑布流（Picsum 固定 seed，方/高/横长，随主页面滚动） */
const CONTENT_PLAZA_TILES = [
  { cat: "小说", title: "甜宠·连载中", shape: "sq", seed: "plazaN1" },
  { cat: "漫剧", title: "大女主养成", shape: "tall", seed: "plazaM1" },
  { cat: "短剧", title: "5 分钟一集", shape: "tall", seed: "plazaD1" },
  { cat: "小游戏", title: "消消乐", shape: "sq", seed: "plazaG1" },
  { cat: "听书", title: "治愈电台", shape: "wide", seed: "plazaA1" },
  { cat: "小说", title: "悬疑推理", shape: "sq", seed: "plazaN2" },
  { cat: "漫剧", title: "都市恋爱", shape: "tall", seed: "plazaM2" },
  { cat: "短剧", title: "霸总反转", shape: "sq", seed: "plazaD2" },
  { cat: "知识", title: "健康科普 3 分钟", shape: "wide", seed: "plazaK1" },
  { cat: "小游戏", title: "合成大西瓜", shape: "sq", seed: "plazaG2" },
  { cat: "影单", title: "周末必刷", shape: "tall", seed: "plazaF1" },
  { cat: "播客", title: "情感夜话", shape: "sq", seed: "plazaP1" }
];

/** 主列表后追加一条，落向较短列，减轻底部单侧大块留白 */
const PLAZA_EXTRA_TAIL = {
  cat: "发现",
  title: "每日更新，上滑看更多好内容",
  shape: "tall",
  seed: "plazaFiller1",
  tail: true
};

let _plazaWired = false;

function refreshPlazaPageHint() {
  const hint = document.getElementById("content-plaza-hint");
  if (!hint) return;
  if (!document.getElementById("page-home")?.classList?.contains("active")) return;
  const y = window.scrollY || 0;
  hint.classList.toggle("is-dim", y > 20);
}

function plazaPicsum(seed, w, h) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

/** 随机打乱，使方/高/横长在双列里每次排布不同 */
function shufflePlazaList(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makePlazaTileElement(item) {
  const sz =
    item.shape === "sq"
      ? { w: 400, h: 400, cls: "plaza-tile--sq" }
      : item.shape === "tall"
        ? { w: 400, h: 500, cls: "plaza-tile--tall" }
        : { w: 400, h: 280, cls: "plaza-tile--wide" };
  const b = document.createElement("button");
  b.type = "button";
  b.className = `plaza-tile ${sz.cls}${item.tail ? " plaza-tile--tail" : ""}`;
  b.setAttribute("aria-label", item.tail ? `${item.title}，${item.cat}更多推荐` : `${item.title}，${item.cat}，评分约 4.8`);
  b.innerHTML = `
    <div class="plaza-tile-imgwrap">
      <img src="${plazaPicsum(item.seed, sz.w, sz.h)}" alt="" width="${sz.w}" height="${sz.h}" loading="lazy" decoding="async" />
    </div>
    <div class="plaza-tile-body">
      <div class="plaza-tile-row1">
        <span class="plaza-tile-cat">${item.cat}</span>
        <span class="plaza-tile-rating" aria-hidden="true">★4.8分</span>
      </div>
      <p class="plaza-tile-title">${item.title}</p>
    </div>
  `;
  b.addEventListener("click", () => {
    if (item.tail) {
      showToast("更多好内容已在路上（接入投放后可按兴趣为你刷新）");
    } else {
      showToast(`已打开「${item.title}」· ${item.cat}（内容示意，可接投放与埋点）`);
    }
  });
  return b;
}

function renderContentPlaza() {
  const root = document.getElementById("content-masonry");
  if (!root) return;
  root.innerHTML = "";
  const col0 = document.createElement("div");
  const col1 = document.createElement("div");
  col0.className = "plaza-masonry-col";
  col1.className = "plaza-masonry-col";
  const track = document.createElement("div");
  track.className = "plaza-masonry-cols";
  track.appendChild(col0);
  track.appendChild(col1);
  root.appendChild(track);
  const list = shufflePlazaList(CONTENT_PLAZA_TILES);
  const appendToShorter = (node) => {
    const a = col0.scrollHeight;
    const b = col1.scrollHeight;
    (a <= b ? col0 : col1).appendChild(node);
  };
  list.forEach((item) => {
    appendToShorter(makePlazaTileElement(item));
  });
  /** 主列表后补一条，优先填满较短列的底部 */
  appendToShorter(makePlazaTileElement(PLAZA_EXTRA_TAIL));
  const dots = document.getElementById("content-plaza-dots");
  if (dots) {
    dots.innerHTML = ["小说", "漫剧", "短剧", "更多"]
      .map(
        (label, i) =>
          `<span class="plaza-dot${i === 0 ? " is-active" : ""}" data-plaza-idx="${i}" role="tab" tabindex="0" aria-label="${label}" title="${label}"></span>`
      )
      .join("");
    dots.querySelectorAll(".plaza-dot").forEach((d) => {
      d.addEventListener("click", () => {
        dots.querySelectorAll(".plaza-dot").forEach((n) => n.classList.remove("is-active"));
        d.classList.add("is-active");
        showToast(`已切换到「${d.getAttribute("aria-label")}」相关推荐（示意）`);
      });
    });
  }
  if (!_plazaWired) {
    _plazaWired = true;
    window.addEventListener("scroll", refreshPlazaPageHint, { passive: true });
  }
  refreshPlazaPageHint();
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1800);
}

function getAIConfig() {
  try {
    return JSON.parse(localStorage.getItem(AI_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function setAIConfig(cfg) {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(cfg));
}

function createFlowRenderer(steps, titleEl, contentEl, timelineEl) {
  let current = 0;
  const dotEls = [];
  const selectedActionMap = new Map();

  const renderTimeline = () => {
    if (!timelineEl) return;
    dotEls.forEach((dotEl, index) => {
      dotEl.classList.toggle("is-current", index === current);
      dotEl.classList.toggle("is-done", index < current);
    });
    dotEls[current]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const buildTimeline = () => {
    if (!timelineEl) return;
    timelineEl.innerHTML = "";
    dotEls.length = 0;
    steps.forEach((step, index) => {
      const dotEl = document.createElement("button");
      dotEl.type = "button";
      dotEl.className = "flow-dot";
      dotEl.textContent = `${index + 1}. ${step.title.replace(/^步骤\d+：/, "")}`;
      dotEl.addEventListener("click", () => {
        current = index;
        render();
      });
      dotEls.push(dotEl);
      timelineEl.appendChild(dotEl);
    });
  };

  const render = () => {
    if (!titleEl || !contentEl) return;
    const step = steps[current];
    titleEl.textContent = `${step.title}（${current + 1}/${steps.length}）`;
    contentEl.innerHTML = "";

    const cardEl = document.createElement("article");
    cardEl.className = "flow-step-card";

    if (step.image) {
      const mediaEl = document.createElement("div");
      mediaEl.className = "flow-step-media";
      const imageEl = document.createElement("img");
      imageEl.className = "flow-step-image";
      imageEl.src = step.image;
      imageEl.alt = `${step.title}示意图`;
      imageEl.loading = "lazy";
      mediaEl.appendChild(imageEl);
      cardEl.appendChild(mediaEl);
    }

    const bodyEl = document.createElement("div");
    bodyEl.className = "flow-step-body";

    if (step.screen) {
      const screenRow = document.createElement("div");
      screenRow.className = "flow-step-screen";
      screenRow.textContent = step.screen;
      bodyEl.appendChild(screenRow);
    }

    const pointsEl = document.createElement("div");
    pointsEl.className = "flow-step-points";
    step.rows.forEach((row) => {
      const item = document.createElement("div");
      item.className = "flow-step-point";
      item.textContent = row;
      pointsEl.appendChild(item);
    });
    bodyEl.appendChild(pointsEl);

    if (step.cta) {
      const ctaRow = document.createElement("button");
      ctaRow.className = "flow-step-cta";
      ctaRow.type = "button";
      ctaRow.textContent = `当前步操作：${step.cta}`;
      ctaRow.addEventListener("click", () => showToast(`${step.cta}（原型演示）`));
      bodyEl.appendChild(ctaRow);
    }

    if (Array.isArray(step.actions) && step.actions.length) {
      const actionGridEl = document.createElement("div");
      actionGridEl.className = "flow-actions-grid";
      const selectedSet = selectedActionMap.get(current) || new Set();
      step.actions.forEach((label) => {
        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.className = "flow-action-btn";
        actionBtn.textContent = label;
        if (selectedSet.has(label)) actionBtn.classList.add("is-active");
        actionBtn.addEventListener("click", () => {
          const stepSet = selectedActionMap.get(current) || new Set();
          if (stepSet.has(label)) {
            stepSet.delete(label);
          } else {
            stepSet.add(label);
          }
          selectedActionMap.set(current, stepSet);
          render();
          showToast(`已选择：${label}`);
        });
        actionGridEl.appendChild(actionBtn);
      });
      bodyEl.appendChild(actionGridEl);
    }

    cardEl.appendChild(bodyEl);
    contentEl.appendChild(cardEl);
    renderTimeline();
  };

  buildTimeline();
  return {
    next() { current = Math.min(current + 1, steps.length - 1); render(); },
    prev() { current = Math.max(current - 1, 0); render(); },
    reset() { current = 0; render(); },
    getStep() { return current; }
  };
}

function appendChatBubble(text, role = "ai") {
  if (!chatListEl || !text) return;
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role === "user" ? "bubble-user" : "bubble-ai"}`;
  bubble.textContent = text;
  chatListEl.appendChild(bubble);
  while (chatListEl.children.length > CHAT_LIMIT) {
    chatListEl.removeChild(chatListEl.firstElementChild);
  }
}

function setupScriptedChatReveal() {
  if (!chatListEl) return;
  chatListEl.innerHTML = "";
  scriptedChat.forEach((item, idx) => {
    window.setTimeout(() => {
      appendChatBubble(item.text, item.role);
    }, idx * 1700 + 500);
  });
}

function buildLocalReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes("皮肤") || t.includes("测肤")) {
    return "可以，我先为你安排 AI 皮肤检测。请在光线均匀环境下保持正脸，我会先生成肤质观察，再给你可执行的护理建议。";
  }
  if (t.includes("经期") || t.includes("情绪") || t.includes("焦虑")) {
    return "收到，我建议先做三步：记录最近一次经期开始日、昨夜入睡醒来时间、今天情绪波动时段。我可以据此给你3天节律与饮食建议。";
  }
  if (t.includes("预约") || t.includes("咨询")) {
    return "已收到你的咨询需求，我可以帮你筛选附近机构并按评分排序。你更偏向医美项目、心理咨询，还是中医调理？";
  }
  if (t.includes("睡眠")) {
    return "睡眠问题可以先从固定起床时间开始。我建议先连续3天记录入睡时刻、醒来次数和午后咖啡因摄入，我再给你个性化调整方案。";
  }
  return "我已收到你的需求。你可以继续告诉我：当前困扰、持续多久、是否影响睡眠或经期，我会给你一步步的女性健康管理建议。";
}

async function postChatCompletion(messages, temperature = 0.7) {
  const cfg = getAIConfig();
  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) return null;
  const response = await fetch(cfg.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature
    })
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(errText || `HTTP ${response.status}`);
  }
  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

async function getAIReply(userText) {
  const cfg = getAIConfig();
  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) {
    return buildLocalReply(userText);
  }

  try {
    const text = await postChatCompletion(
      [
        {
          role: "system",
          content: "你是甜先生 Mr. Sweet，一位女性健康管家。回复简洁温柔，优先给可执行建议，避免医疗诊断结论。"
        },
        { role: "user", content: userText }
      ],
      0.7
    );
    return text || buildLocalReply(userText);
  } catch (error) {
    showToast(`AI接口失败，已用本地回复：${error.message}`);
    return buildLocalReply(userText);
  }
}

function setupHomeChatComposer() {
  if (!homeChatInputEl || !homeChatSendEl) return;
  const sendNow = async () => {
    const text = homeChatInputEl.value.trim();
    if (!text) return;
    homeChatInputEl.value = "";
    appendChatBubble(text, "user");
    saveLedgerChatRecord(text);
    homeChatSendEl.disabled = true;
    try {
      const reply = await getAIReply(text);
      appendChatBubble(reply, "ai");
    } finally {
      homeChatSendEl.disabled = false;
      homeChatInputEl.focus();
    }
  };
  homeChatSendEl.addEventListener("click", () => {
    void sendNow();
  });
  homeChatInputEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    void sendNow();
  });
}

function safeReadArrayLs(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function detectLedgerCats(text) {
  const s = String(text || "").toLowerCase();
  const hit = [];
  HOME_LEDGER_CAT_RULES.forEach((rule) => {
    if (rule.kws.some((kw) => s.includes(kw))) hit.push(rule.id);
  });
  return [...new Set(hit)];
}

function saveLedgerChatRecord(text) {
  const cats = detectLedgerCats(text);
  if (!cats.length) cats.push("misc");
  const list = safeReadArrayLs(HOME_LEDGER_CHAT_KEY);
  list.push({
    text: String(text || "").slice(0, 120),
    cats,
    ts: Date.now()
  });
  while (list.length > 240) list.shift();
  localStorage.setItem(HOME_LEDGER_CHAT_KEY, JSON.stringify(list));
}

function ledgerChatStats() {
  const list = safeReadArrayLs(HOME_LEDGER_CHAT_KEY);
  const counts = {};
  const latestByCat = {};
  HOME_LEDGER_CAT_RULES.forEach((r) => {
    counts[r.id] = 0;
    latestByCat[r.id] = "";
  });
  list.forEach((it) => {
    const txt = String(it.text || "");
    (it.cats || []).forEach((c) => {
      if (counts[c] === undefined) return;
      counts[c] += 1;
      latestByCat[c] = txt;
    });
  });
  return { counts, latestByCat, total: list.length };
}

function buildTodayLedgerDigest() {
  const sleep = safeReadArrayLs("limme_health_sleep_v1");
  const cal = safeReadArrayLs("limme_health_cal_v1");
  const water = safeReadArrayLs("limme_health_water_v1");
  const cycle = safeReadArrayLs("limme_health_cycle_v1");
  const wardrobe = safeReadArrayLs("limme_wardrobe_items_v1");
  const chat = ledgerChatStats();
  const totalLogs = sleep.length + cal.length + water.length + cycle.length + wardrobe.length + chat.total;
  const bubbleLogs = chatListEl ? Math.min(6, chatListEl.children.length) : 0;
  const score = Math.max(68, Math.min(98, 72 + Math.min(18, totalLogs * 2) + Math.min(8, bubbleLogs)));
  const summary = `已归档：健康 ${sleep.length + cal.length + water.length + cycle.length} 条、穿搭 ${wardrobe.length} 条、主题对话 ${chat.total} 条。AI 认为你今天在「自我照顾」上表现很稳。`;
  return { score, summary, chat };
}

function setLedgerOpen(open) {
  if (!homeLedgerPanelEl || !homeLedgerToggleEl || !homeLedgerMaskEl) return;
  homeLedgerPanelEl.classList.toggle("show", open);
  homeLedgerPanelEl.setAttribute("aria-hidden", open ? "false" : "true");
  homeLedgerToggleEl.setAttribute("aria-expanded", open ? "true" : "false");
  homeLedgerMaskEl.hidden = !open;
}

function setupHomeLedgerPanel() {
  if (!homeLedgerToggleEl || !homeLedgerPanelEl || !homeLedgerMaskEl) return;
  const refreshDigest = () => {
    const d = buildTodayLedgerDigest();
    if (homeLedgerScoreEl) homeLedgerScoreEl.textContent = `今日 AI 评分：${d.score} 分`;
    if (homeLedgerSummaryEl) homeLedgerSummaryEl.textContent = d.summary;
    if (homeLedgerListEl) {
      homeLedgerListEl.querySelectorAll("[data-ledger-cat]").forEach((el) => {
        const cat = el.getAttribute("data-ledger-cat") || "";
        const n = d.chat?.counts?.[cat] || 0;
        const latest = d.chat?.latestByCat?.[cat] || "";
        const countEl = el.querySelector(`[data-ledger-count="${cat}"]`);
        if (countEl) countEl.textContent = String(n);
        const descEl = el.querySelector("span");
        if (descEl && latest) descEl.textContent = latest.length > 22 ? `${latest.slice(0, 22)}...` : latest;
      });
    }
  };
  homeLedgerToggleEl.addEventListener("click", () => {
    const opening = !homeLedgerPanelEl.classList.contains("show");
    if (opening) refreshDigest();
    setLedgerOpen(opening);
  });
  homeLedgerCloseEl?.addEventListener("click", () => setLedgerOpen(false));
  homeLedgerMaskEl.addEventListener("click", () => setLedgerOpen(false));
}

function speakText(text) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function setupVoiceConversation() {
  if (!voiceBtnEl) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtnEl.addEventListener("click", () => {
      showToast("当前环境不支持网页语音识别（微信内常见）。可用小程序原生语音或在Chrome/Edge打开。");
    });
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  let isListening = false;
  let hasResultInSession = false;
  let longPressTimer = null;
  let pressStarted = false;

  const setVoiceBtn = (listening) => {
    if (voiceLabelEl) {
      voiceLabelEl.textContent = listening ? "🎙️ 松开结束并发送" : "🎤 长按呼叫甜先生";
    }
    voiceBtnEl.classList.toggle("is-listening", listening);
  };

  recognition.onresult = async (event) => {
    hasResultInSession = true;
    const text = event.results?.[0]?.[0]?.transcript?.trim();
    if (!text) {
      showToast("没有识别到有效语音，请再试一次。");
      return;
    }
    appendChatBubble(text, "user");
    saveLedgerChatRecord(text);
    const reply = await getAIReply(text);
    appendChatBubble(reply, "ai");
    speakText(reply);
  };

  recognition.onerror = (event) => {
    const err = event?.error || "unknown";
    const errMap = {
      "not-allowed": "麦克风被拒绝，请在浏览器地址栏开启麦克风权限。",
      "service-not-allowed": "浏览器语音服务不可用，请切换 Chrome/Edge。",
      "network": "语音识别网络异常，请检查网络后重试。",
      "no-speech": "没有检测到语音，请靠近麦克风重试。",
      "audio-capture": "未检测到麦克风设备，请检查系统输入设备。",
      "aborted": "语音识别已中断，请重试。"
    };
    showToast(errMap[err] || `语音识别失败：${err}`);
    setVoiceBtn(false);
  };

  recognition.onstart = () => {
    hasResultInSession = false;
    isListening = true;
    setVoiceBtn(true);
    showToast("已开始聆听，请说话。");
  };

  recognition.onend = () => {
    if (isListening && !hasResultInSession) {
      showToast("未识别到语音内容，请在安静环境下重试。");
    }
    isListening = false;
    setVoiceBtn(false);
  };

  const startListening = () => {
    if (isListening) return;
    try {
      recognition.start();
    } catch (error) {
      isListening = false;
      setVoiceBtn(false);
      showToast(`无法开始语音识别：${error.message}`);
    }
  };

  const stopListening = () => {
    if (!isListening) return;
    try {
      recognition.stop();
    } catch {
      isListening = false;
      setVoiceBtn(false);
    }
  };

  const beginPress = () => {
    if (pressStarted) return;
    pressStarted = true;
    longPressTimer = window.setTimeout(() => {
      startListening();
    }, 180);
  };

  const endPress = () => {
    if (!pressStarted) return;
    pressStarted = false;
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    stopListening();
  };

  voiceBtnEl.addEventListener("pointerdown", beginPress);
  voiceBtnEl.addEventListener("pointerup", endPress);
  voiceBtnEl.addEventListener("pointerleave", endPress);
  voiceBtnEl.addEventListener("pointercancel", endPress);

  voiceBtnEl.addEventListener("click", (event) => {
    // Prevent short tap from toggling; this mimics WeChat hold-to-talk.
    event.preventDefault();
    if (!isListening) showToast("请长按按钮开始说话，松开后发送识别。");
  });
}

const ARK_CHAT_COMPLETIONS_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
/** 方舟控制台展示的模型接入点名可能不同，失败时请改为控制台中的 ID（含 ep- 前缀时只填在模型框即可） */
const ARK_DOUBAO_SEED2_EXAMPLE_MODEL = "doubao-seed-2-0-pro-260215";

function setupAIConfig() {
  const cfg = getAIConfig();
  if (aiEndpointEl) aiEndpointEl.value = cfg.endpoint || "https://api.openai.com/v1/chat/completions";
  if (aiModelEl) aiModelEl.value = cfg.model || "";
  if (aiKeyEl) aiKeyEl.value = cfg.apiKey || "";

  aiConfigBtnEl?.addEventListener("click", () => openModal("ai"));
  document.getElementById("ai-preset-ark")?.addEventListener("click", () => {
    if (aiEndpointEl) aiEndpointEl.value = ARK_CHAT_COMPLETIONS_URL;
    if (aiModelEl) aiModelEl.value = ARK_DOUBAO_SEED2_EXAMPLE_MODEL;
    showToast("已填入方舟北京区示例；模型名请与控制台一致，Key 请粘贴后点保存。");
  });
  aiSaveBtnEl?.addEventListener("click", () => {
    const next = {
      endpoint: aiEndpointEl?.value?.trim(),
      model: aiModelEl?.value?.trim(),
      apiKey: aiKeyEl?.value?.trim()
    };
    setAIConfig(next);
    showToast("AI 配置已保存：甜先生语音、私密男友、看图等将共用该接口。");
    closeModal("ai");
  });
}

function openHotServicePanel(key) {
  if (key === "medical") {
    enterFaceflowWithDetect();
    return;
  }
  if (key === "tcm") {
    switchPage("tcmflow");
    return;
  }
  if (key === "homecare") {
    switchPage("homecare");
    return;
  }
  if (key === "yoga") {
    switchPage("yoga");
    return;
  }
}

function svcThumbUrl() {
  return `${limmeAssetBase()}assets/mr-sweet-avatar.jpg?v=1`;
}

function renderHomecareList() {
  const list = document.getElementById("homecare-list");
  if (!list) return;
  const items = HOMECARE_CATALOG.filter((x) => x.tab === homecareActiveTab);
  list.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "svc-card";
    const isLevel = item.cta === "level";
    const thumb = document.createElement("img");
    thumb.className = "svc-card-img";
    thumb.src = svcThumbUrl();
    thumb.alt = "";
    const body = document.createElement("div");
    body.className = "svc-card-body";
    body.innerHTML = `<strong class="svc-card-title"></strong><p class="svc-card-meta"></p><p class="svc-card-hint"></p>`;
    body.querySelector(".svc-card-title").textContent = item.title;
    body.querySelector(".svc-card-meta").textContent = item.meta;
    body.querySelector(".svc-card-hint").textContent = item.hint;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = isLevel ? "svc-card-btn svc-card-btn--muted" : "svc-card-btn";
    btn.textContent = item.btnLabel;
    btn.addEventListener("click", () => {
      if (isLevel) showToast(`已选择「${item.btnLabel}」· ${item.title}，稍后会有顾问联系确认。`);
      else showToast(`预约已提交：${item.title}（示意），可在「预约记录」查看进度。`);
    });
    row.append(thumb, body, btn);
    list.appendChild(row);
  });
}

function getStoredAmapKey() {
  const raw = localStorage.getItem(AMAP_KEY_STORAGE);
  if (raw === null) {
    return (AMAP_KEY_DEFAULT || "").trim();
  }
  return (raw || "").trim();
}

function loadAmapScript(key) {
  if (window.AMap) return Promise.resolve();
  if (!key) return Promise.reject(new Error("empty key"));
  return new Promise((resolve, reject) => {
    const sc = document.createElement("script");
    sc.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
    sc.async = true;
    sc.onerror = () => reject(new Error("load"));
    sc.onload = () => resolve();
    document.head.appendChild(sc);
  });
}

function destroyYogaMap() {
  if (yogaMapInstance) {
    try {
      yogaMapInstance.clearMap();
    } catch (_) {
      /* ignore */
    }
    try {
      yogaMapInstance.destroy();
    } catch (_) {
      /* ignore */
    }
  }
  yogaMapInstance = null;
  yogaMarkers = [];
}

function tryInitYogaAmap() {
  const mapEl = document.getElementById("yoga-offline-map");
  const fallback = document.getElementById("yoga-map-fallback");
  if (!mapEl) return;
  const key = getStoredAmapKey();
  if (!key) {
    if (fallback) fallback.style.display = "flex";
    return;
  }
  if (fallback) fallback.style.display = "none";
  loadAmapScript(key)
    .then(() => {
      const AMapG = window.AMap;
      if (!AMapG) {
        if (fallback) fallback.style.display = "flex";
        return;
      }
      destroyYogaMap();
      const el = document.getElementById("yoga-offline-map");
      if (el) el.innerHTML = "";
      yogaMapInstance = new AMapG.Map("yoga-offline-map", {
        viewMode: "2D",
        zoom: 13
      });
      yogaMarkers = YOGA_OFFLINE_STUDIOS.map((s) => {
        const m = new AMapG.Marker({
          position: [s.lng, s.lat],
          map: yogaMapInstance,
          title: s.name
        });
        m.on("click", () => {
          showToast(s.name);
        });
        return m;
      });
      if (yogaMarkers.length) {
        try {
          yogaMapInstance.setFitView(yogaMarkers, false, [32, 48, 32, 48]);
        } catch (_) {
          try {
            yogaMapInstance.setCenter([YOGA_OFFLINE_STUDIOS[0].lng, YOGA_OFFLINE_STUDIOS[0].lat]);
          } catch (e2) {
            /* ignore */
          }
        }
      }
      setTimeout(() => {
        try {
          yogaMapInstance?.resize();
        } catch (_) {
          /* ignore */
        }
      }, 300);
    })
    .catch(() => {
      if (fallback) fallback.style.display = "flex";
      showToast("地图未能加载，请检查 Key 或网络 / 白名单域名为当前站点。");
    });
}

function destroyTcmMap() {
  if (tcmMapInstance) {
    try {
      tcmMapInstance.clearMap();
    } catch (_) {
      /* ignore */
    }
    try {
      tcmMapInstance.destroy();
    } catch (_) {
      /* ignore */
    }
  }
  tcmMapInstance = null;
  tcmMapMarkers = [];
}

function tryInitTcmAmap() {
  const mapEl = document.getElementById("tcm-pick-map");
  const fallback = document.getElementById("tcm-pick-map-fallback");
  if (!mapEl) return;
  const key = getStoredAmapKey();
  if (!key) {
    if (fallback) fallback.style.display = "flex";
    return;
  }
  if (fallback) fallback.style.display = "none";
  loadAmapScript(key)
    .then(() => {
      const AMapG = window.AMap;
      if (!AMapG) {
        if (fallback) fallback.style.display = "flex";
        return;
      }
      destroyTcmMap();
      const el = document.getElementById("tcm-pick-map");
      if (el) el.innerHTML = "";
      tcmMapInstance = new AMapG.Map("tcm-pick-map", {
        viewMode: "2D",
        zoom: 13
      });
      tcmMapMarkers = TCM_PICK_INST.map((s) => {
        const m = new AMapG.Marker({
          position: [s.lng, s.lat],
          map: tcmMapInstance,
          title: s.name
        });
        m.on("click", () => {
          showToast(s.name);
        });
        return m;
      });
      if (tcmMapMarkers.length) {
        try {
          tcmMapInstance.setFitView(tcmMapMarkers, false, [28, 44, 28, 44]);
        } catch (_) {
          try {
            tcmMapInstance.setCenter([TCM_PICK_INST[0].lng, TCM_PICK_INST[0].lat]);
          } catch (e2) {
            /* ignore */
          }
        }
      }
      setTimeout(() => {
        try {
          tcmMapInstance?.resize();
        } catch (_) {
          /* ignore */
        }
      }, 300);
    })
    .catch(() => {
      if (fallback) fallback.style.display = "flex";
      showToast("地图未能加载，请检查 Key 或网络 / 白名单域名为当前站点。");
    });
}

function openYogaBookModal(label, sub) {
  const titleEl = document.getElementById("yoga-book-title");
  const subEl = document.getElementById("yoga-book-sub");
  const root = document.getElementById("yoga-book-slots");
  if (!titleEl || !root) return;
  titleEl.textContent = label || "预约";
  if (subEl) subEl.textContent = sub || "";
  const slots = ["09:00 — 10:00", "15:00 — 16:00", "20:00 — 21:00"];
  root.innerHTML = "";
  slots.forEach((sl, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "yoga-time-slot" + (i % 2 ? " is-alt" : "");
    b.textContent = sl;
    b.addEventListener("click", () => {
      showToast(`已选择 ${sl}，「${label}」预约已提交（示意）`);
      closeModal("yoga-book");
    });
    root.appendChild(b);
  });
  openModal("yoga-book");
}

function getSortedYogaOnline() {
  let list = YOGA_ONLINE_COURSES.map((c) => ({ ...c }));
  if (yogaFilterDim === "duration") {
    list.sort((a, b) => a.durationMin - b.durationMin);
  } else if (yogaFilterDim === "difficulty") {
    list.sort(
      (a, b) =>
        (YOGA_DIF_ORD[a.difficulty] ?? 5) - (YOGA_DIF_ORD[b.difficulty] ?? 5) || a.title.localeCompare(b.title, "zh")
    );
  } else {
    list.sort((a, b) => a.type.localeCompare(b.type, "zh") || a.title.localeCompare(b.title, "zh"));
  }
  const q = (document.getElementById("yoga-online-search")?.value || "").trim().toLowerCase();
  if (q) {
    list = list.filter(
      (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderYogaOnlineList() {
  const list = document.getElementById("yoga-online-list");
  if (!list) return;
  const items = getSortedYogaOnline();
  list.innerHTML = "";
  const illu = svcThumbUrl();
  items.forEach((c) => {
    const art = document.createElement("article");
    art.className = "yoga-ocard";
    const img = document.createElement("img");
    img.className = "yoga-ocard-illu";
    img.src = illu;
    img.alt = "";
    const main = document.createElement("div");
    main.className = "yoga-ocard-main";
    const t = document.createElement("h3");
    t.className = "yoga-ocard-title";
    t.textContent = c.title;
    const row = document.createElement("p");
    row.className = "yoga-ocard-row";
    row.innerHTML = `<span class="yoga-ocado"></span><span class="yoga-ocado-txt">${c.instructor} · ${c.durationMin} 分钟</span>`;
    main.append(t, row);
    const btn = document.createElement("button");
    btn.type = "button";
    if (c.cta === "level") {
      btn.className = "yoga-ocard-btn yoga-ocard-btn--muted";
      btn.textContent = c.difficulty;
      btn.addEventListener("click", () => {
        showToast(`已选「${c.difficulty}」：${c.title}，顾问将联系你（示意）`);
      });
    } else {
      btn.className = "yoga-ocard-btn";
      btn.textContent = "预约";
      btn.addEventListener("click", () => {
        openYogaBookModal(c.title, `线上 · ${c.instructor} · ${c.type}`);
      });
    }
    art.append(img, main, btn);
    list.appendChild(art);
  });
  const more = document.createElement("article");
  more.className = "yoga-ocard yoga-ocard--more";
  more.innerHTML = `<div class="yoga-omore-plus" aria-hidden="true">+</div><p class="yoga-omore-txt">发现更多好课</p>`;
  more.addEventListener("click", () => showToast("更多课程即将上线，敬请期待～"));
  list.appendChild(more);
}

function getYogaOfflineFiltered() {
  let list = YOGA_OFFLINE_STUDIOS.map((s) => ({ ...s }));
  const q = (document.getElementById("yoga-offline-search")?.value || "").trim().toLowerCase();
  if (q) {
    list = list.filter((s) => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q));
  }
  if (document.getElementById("yoga-offline-chips")?.dataset.ratingOnly === "1") {
    list = list.filter((s) => s.rating >= 4.5);
  }
  if (document.getElementById("yoga-offline-chips")?.dataset.near2 === "1") {
    list = list.filter((s) => s.dist <= 2.1);
  }
  return list.sort((a, b) => a.dist - b.dist);
}

function renderYogaOfflineList() {
  const list = document.getElementById("yoga-offline-list");
  if (!list) return;
  const items = getYogaOfflineFiltered();
  const elRadius = document.getElementById("yoga-chip-radius");
  if (elRadius) elRadius.classList.toggle("is-on", document.getElementById("yoga-offline-chips")?.dataset.near2 === "1");
  const elRating = document.getElementById("yoga-chip-rating");
  if (elRating) elRating.classList.toggle("is-on", document.getElementById("yoga-offline-chips")?.dataset.ratingOnly === "1");
  list.innerHTML = "";
  const illu = svcThumbUrl();
  items.forEach((s) => {
    const art = document.createElement("article");
    art.className = "yoga-ocard";
    const img = document.createElement("img");
    img.className = "yoga-ocard-illu";
    img.src = illu;
    img.alt = "";
    const main = document.createElement("div");
    main.className = "yoga-ocard-main";
    const t = document.createElement("h3");
    t.className = "yoga-ocard-title";
    t.textContent = s.course;
    const row1 = document.createElement("p");
    row1.className = "yoga-ocard-meta";
    row1.textContent = s.name;
    const row2 = document.createElement("p");
    row2.className = "yoga-ocado-txt sm";
    row2.textContent = `约 ${s.dist} km · ${s.rating} 分 · ${s.duration}`;
    main.append(t, row1, row2);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "yoga-ocard-btn";
    btn.textContent = "预约";
    btn.addEventListener("click", () => {
      openYogaBookModal(s.name, `线下 · ${s.address} · ${s.course}`);
    });
    art.append(img, main, btn);
    list.appendChild(art);
  });
}

function applyYogaView() {
  const onl = document.getElementById("yoga-panel-online");
  const off = document.getElementById("yoga-panel-offline");
  const title = document.getElementById("yoga-topbar-title");
  if (yogaViewMode === "online") {
    onl?.classList.remove("is-hidden");
    if (onl) onl.removeAttribute("hidden");
    off?.classList.add("is-hidden");
    if (off) off.setAttribute("hidden", "hidden");
    if (title) {
      title.textContent = "线上瑜伽课";
      title.classList.add("yoga-topbar-title--brand");
    }
    document.getElementById("yoga-subfilters")?.querySelectorAll(".yoga-subfilter").forEach((b) => {
      b.classList.toggle("active", b.dataset.yogaDim === yogaFilterDim);
    });
    destroyYogaMap();
  } else {
    onl?.classList.add("is-hidden");
    if (onl) onl.setAttribute("hidden", "hidden");
    off?.classList.remove("is-hidden");
    if (off) off.removeAttribute("hidden");
    if (title) {
      title.textContent = "线下瑜伽馆预约";
      title.classList.remove("yoga-topbar-title--brand");
    }
    const keyInp = document.getElementById("yoga-amap-key");
    if (keyInp) keyInp.value = getStoredAmapKey();
    renderYogaOfflineList();
    setTimeout(() => tryInitYogaAmap(), 0);
  }
  document.getElementById("yoga-mode-tabs")?.querySelectorAll(".yoga-mode-tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.yogaMode === yogaViewMode);
  });
  if (yogaViewMode === "online") {
    renderYogaOnlineList();
  }
}

function initYogaInteractionsOnce() {
  if (_yogaInited) return;
  const modeWrap = document.getElementById("yoga-mode-tabs");
  if (!modeWrap) return;
  _yogaInited = true;
  modeWrap.addEventListener("click", (e) => {
    const t = e.target.closest("[data-yoga-mode]");
    if (!t) return;
    modeWrap.querySelectorAll(".yoga-mode-tab").forEach((b) => b.classList.remove("active"));
    t.classList.add("active");
    yogaViewMode = t.dataset.yogaMode;
    applyYogaView();
  });
  const sub = document.getElementById("yoga-subfilters");
  sub?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yoga-dim]");
    if (!b) return;
    sub.querySelectorAll(".yoga-subfilter").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    yogaFilterDim = b.dataset.yogaDim;
    renderYogaOnlineList();
  });
  document.getElementById("yoga-online-search")?.addEventListener("input", () => renderYogaOnlineList());
  document.getElementById("yoga-offline-search")?.addEventListener("input", () => renderYogaOfflineList());
  document.getElementById("yoga-amap-key-save")?.addEventListener("click", () => {
    const v = document.getElementById("yoga-amap-key")?.value?.trim() || "";
    localStorage.setItem(AMAP_KEY_STORAGE, v);
    if (!v) {
      showToast("已清空：地图将以占位方式展示");
    } else {
      showToast("已保存，正在加载地图…");
    }
    destroyYogaMap();
    if (yogaViewMode === "offline") setTimeout(() => tryInitYogaAmap(), 0);
  });
  document.getElementById("yoga-settings-btn")?.addEventListener("click", () => {
    showToast("课程提醒、画质与缓存（功能示意）。");
  });
  const chWrap = document.getElementById("yoga-offline-chips");
  chWrap?.addEventListener("click", (e) => {
    const c = e.target.closest(".yoga-chip");
    if (!c) return;
    if (c.id === "yoga-chip-priority") {
      chWrap.dataset.near2 = "";
      chWrap.dataset.ratingOnly = "";
      renderYogaOfflineList();
      showToast("已按距离优先展示附近场馆。");
      return;
    }
    if (c.id === "yoga-chip-radius") {
      chWrap.dataset.near2 = chWrap.dataset.near2 === "1" ? "" : "1";
    } else if (c.id === "yoga-chip-rating") {
      chWrap.dataset.ratingOnly = chWrap.dataset.ratingOnly === "1" ? "" : "1";
    }
    renderYogaOfflineList();
  });
}

function initSvcPages() {
  const ht = document.getElementById("homecare-tabs");
  if (ht && !ht.dataset.bound) {
    ht.dataset.bound = "1";
    ht.addEventListener("click", (e) => {
      const t = e.target.closest("[data-homecare-tab]");
      if (!t) return;
      ht.querySelectorAll(".svc-tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      homecareActiveTab = t.dataset.homecareTab;
      renderHomecareList();
    });
  }
}

function renderHomecarePage() {
  initSvcPages();
  const ht = document.getElementById("homecare-tabs");
  if (ht) {
    ht.querySelectorAll(".svc-tab").forEach((x) => {
      x.classList.toggle("active", x.dataset.homecareTab === homecareActiveTab);
    });
  }
  renderHomecareList();
}

function renderYogaPage() {
  initSvcPages();
  initYogaInteractionsOnce();
  applyYogaView();
}

function bindDataMsgEvents(scope = document) {
  scope.querySelectorAll("[data-msg]").forEach((item) => {
    if (item.dataset.bound === "1") return;
    item.dataset.bound = "1";
    item.addEventListener("click", () => showToast(item.dataset.msg));
  });
}

if (xiaomeiAvatarEl) {
  xiaomeiAvatarEl.onerror = () => {
    xiaomeiAvatarEl.src = avatarFallback;
  };
}

const PROFILE_INVITE_LS_KEY = "limme_profile_invite_v1";
const PROFILE_ASSET_LS_KEY = "limme_profile_asset_v1";

function defaultProfileInvite() {
  return { invited: 0, points: 0, postersGenerated: 0 };
}

function readProfileInvite() {
  try {
    const o = JSON.parse(localStorage.getItem(PROFILE_INVITE_LS_KEY) || "null");
    if (!o || typeof o !== "object") return defaultProfileInvite();
    return { ...defaultProfileInvite(), ...o };
  } catch {
    return defaultProfileInvite();
  }
}

function writeProfileInvite(obj) {
  localStorage.setItem(PROFILE_INVITE_LS_KEY, JSON.stringify(obj));
}

const INVITE_CANVAS_W = 1080;
const INVITE_CANVAS_H = 1728;

let _invitePosterBlobCache = null;
let _invitePosterSigCache = "";

function invalidateInvitePosterCache() {
  _invitePosterBlobCache = null;
  _invitePosterSigCache = "";
}

function getProfileInviteCodeString() {
  const idText = document.getElementById("profile-id-text")?.textContent?.trim() || "882046";
  return `LIMME${idText}`;
}

function getInvitePosterSignature() {
  const nick = document.getElementById("profile-name-btn")?.textContent?.trim() || "";
  return `${getProfileInviteCodeString()}|${nick}`;
}

function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function loadImageUrl(src) {
  return new Promise((resolve, reject) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error(String(src)));
    im.src = src;
  });
}

async function loadInviteHeroImage() {
  const base = limmeAssetBase();
  const urls = [
    `${base}assets/invite-poster-hero.png?v=4`,
    `${base}assets/invite-poster-hero.jpg?v=4`,
    `${base}assets/invite-poster-hero.jpeg?v=4`,
    `${base}assets/invite-poster-hero.webp?v=4`
  ];
  for (let i = 0; i < urls.length; i += 1) {
    try {
      const img = await loadImageUrl(urls[i]);
      if (img.naturalWidth > 0) return img;
    } catch {
      /* try next */
    }
  }
  return null;
}

function drawRoundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawDecorativeQr(ctx, ox, oy, size, seedStr) {
  const n = 27;
  const cell = size / n;
  let rnd = hashString(seedStr || "limme");
  const next = () => {
    rnd = (Math.imul(rnd, 1664525) + 1013904223) >>> 0;
    return rnd;
  };
  ctx.save();
  drawRoundRectPath(ctx, ox, oy, size, size, cell * 2);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(ox, oy, size, size);
  function finder(fx, fy) {
    const u = 7 * cell;
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(ox + fx, oy + fy, u, u);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ox + fx + cell, oy + fy + cell, u - 2 * cell, u - 2 * cell);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(ox + fx + 2 * cell, oy + fy + 2 * cell, u - 4 * cell, u - 4 * cell);
  }
  finder(0, 0);
  finder((n - 7) * cell, 0);
  finder(0, (n - 7) * cell);
  ctx.fillStyle = "#1a1a1a";
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      const inTopLeft = r < 7 && c < 7;
      const inTopRight = r < 7 && c >= n - 7;
      const inBottomLeft = r >= n - 7 && c < 7;
      if (inTopLeft || inTopRight || inBottomLeft) continue;
      if ((next() & 3) !== 0) {
        ctx.fillRect(ox + c * cell + cell * 0.08, oy + r * cell + cell * 0.08, cell * 0.86, cell * 0.86);
      }
    }
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(26, 22, 26, 0.12)";
  ctx.lineWidth = 2;
  drawRoundRectPath(ctx, ox + 0.5, oy + 0.5, size - 1, size - 1, cell * 2);
  ctx.stroke();
}

function getInviteLandingUrl(code) {
  const base = limmeAssetBase();
  const u = new URL(`${base}index.html`, window.location.href);
  u.searchParams.set("from", "invite");
  if (code) u.searchParams.set("code", code);
  return u.toString();
}

async function loadRealQrImage(url, size) {
  const qrApi = window.QRCode;
  if (!qrApi || typeof qrApi.toDataURL !== "function") return null;
  try {
    const dataUrl = await qrApi.toDataURL(url, {
      width: Math.max(64, Math.round(size)),
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#1a1a1a", light: "#ffffff" }
    });
    return await loadImageUrl(dataUrl);
  } catch {
    return null;
  }
}

async function drawInviteQr(ctx, ox, oy, size, inviteCode) {
  const link = getInviteLandingUrl(inviteCode);
  const qrImg = await loadRealQrImage(link, size);
  if (!qrImg) {
    drawDecorativeQr(ctx, ox, oy, size, inviteCode);
    return;
  }
  ctx.save();
  drawRoundRectPath(ctx, ox, oy, size, size, 16);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(ox, oy, size, size);
  ctx.drawImage(qrImg, ox, oy, size, size);
  ctx.restore();
  ctx.strokeStyle = "rgba(26, 22, 26, 0.12)";
  ctx.lineWidth = 2;
  drawRoundRectPath(ctx, ox + 0.5, oy + 0.5, size - 1, size - 1, 16);
  ctx.stroke();
}

async function drawInvitePosterToCanvas(canvas) {
  const W = INVITE_CANVAS_W;
  const H = INVITE_CANVAS_H;
  if (canvas.width !== W) canvas.width = W;
  if (canvas.height !== H) canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no ctx");
  const code = getProfileInviteCodeString();

  const grd = ctx.createLinearGradient(0, 0, W, H);
  grd.addColorStop(0, "#fff5fb");
  grd.addColorStop(0.45, "#ffe8f2");
  grd.addColorStop(0.72, "#ffffff");
  grd.addColorStop(1, "#fff0f7");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  const blobs = [
    { x: 0.18 * W, y: 0.1 * H, r: 200 },
    { x: 0.78 * W, y: 0.16 * H, r: 160 },
    { x: 0.52 * W, y: 0.3 * H, r: 220 }
  ];
  for (let i = 0; i < blobs.length; i += 1) {
    const b = blobs[i];
    const gg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    gg.addColorStop(0, "rgba(255, 186, 214, 0.38)");
    gg.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gg;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#e879a9";
  ctx.font = "600 34px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.fillText("甜先生 Mr. Sweet", W / 2, 88);

  ctx.fillStyle = "#1f151d";
  ctx.font = "800 56px system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillText("邀请闺蜜 一起变美", W / 2, 168);

  ctx.fillStyle = "rgba(100, 82, 92, 0.78)";
  ctx.font = "500 26px system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif";
  ctx.fillText("健康变美 · 同行有礼", W / 2, 228);

  const hero = await loadInviteHeroImage();
  const maxImgW = 980;
  const maxImgH = 900;
  const imgY0 = 248;
  if (hero && hero.naturalWidth > 0) {
    const iw = hero.naturalWidth;
    const ih = hero.naturalHeight;
    const sc = Math.min(maxImgW / iw, maxImgH / ih);
    const dw = iw * sc;
    const dh = ih * sc;
    const ix = (W - dw) / 2;
    const iy = imgY0 + (maxImgH - dh) / 2;
    ctx.save();
    ctx.shadowColor = "rgba(200, 120, 150, 0.2)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    drawRoundRectPath(ctx, ix - 10, iy - 10, dw + 20, dh + 20, 26);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(255, 200, 220, 0.9)";
    ctx.lineWidth = 2;
    drawRoundRectPath(ctx, ix - 10, iy - 10, dw + 20, dh + 20, 26);
    ctx.stroke();
    drawRoundRectPath(ctx, ix, iy, dw, dh, 22);
    ctx.clip();
    ctx.drawImage(hero, ix, iy, dw, dh);
    ctx.restore();
  } else {
    const ix = (W - maxImgW) / 2;
    const iy = imgY0;
    const grad = ctx.createLinearGradient(ix, iy, ix + maxImgW, iy + maxImgH);
    grad.addColorStop(0, "#ffd6e8");
    grad.addColorStop(1, "#ffeef6");
    ctx.fillStyle = grad;
    drawRoundRectPath(ctx, ix, iy, maxImgW, maxImgH, 28);
    ctx.fill();
    ctx.fillStyle = "#8a6a78";
    ctx.font = "600 26px system-ui, 'PingFang SC', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`请将主插画保存为 ${limmeAssetBase()}assets/invite-poster-hero.png`, W / 2, iy + maxImgH / 2 - 18);
    ctx.fillStyle = "#a67888";
    ctx.font = "500 22px system-ui, sans-serif";
    ctx.fillText("（支持 png / jpg / webp）", W / 2, iy + maxImgH / 2 + 18);
  }

  const footTop = 1180;
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
  drawRoundRectPath(ctx, 48, footTop, W - 96, H - footTop - 72, 36);
  ctx.fill();
  ctx.strokeStyle = "rgba(232, 200, 215, 0.7)";
  ctx.lineWidth = 2;
  drawRoundRectPath(ctx, 48.5, footTop + 0.5, W - 97, H - footTop - 73, 36);
  ctx.stroke();
  ctx.restore();

  const qrSize = 220;
  const qrX = (W - qrSize) / 2;
  const qrY = footTop + 40;
  await drawInviteQr(ctx, qrX, qrY, qrSize, code);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#1f151d";
  ctx.font = "800 30px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(`邀请码 ${code}`, W / 2, qrY + qrSize + 48);

  ctx.fillStyle = "rgba(90, 80, 88, 0.9)";
  ctx.font = "500 22px system-ui, 'PingFang SC', sans-serif";
  ctx.fillText("保存图片后可在微信发送给闺蜜", W / 2, qrY + qrSize + 92);

  ctx.font = "500 19px system-ui, sans-serif";
  ctx.fillStyle = "rgba(130, 118, 126, 0.82)";
  ctx.fillText("示意海报 · 正式活动以运营配置为准", W / 2, H - 108);
}

function canvasToPngBlob(c) {
  return new Promise((resolve, reject) => {
    c.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("toBlob"));
    }, "image/png", 0.92);
  });
}

async function buildInvitePosterBlobForExport() {
  const sig = getInvitePosterSignature();
  if (_invitePosterBlobCache && _invitePosterSigCache === sig) {
    return _invitePosterBlobCache;
  }
  const c = document.createElement("canvas");
  c.width = INVITE_CANVAS_W;
  c.height = INVITE_CANVAS_H;
  await drawInvitePosterToCanvas(c);
  const blob = await canvasToPngBlob(c);
  _invitePosterBlobCache = blob;
  _invitePosterSigCache = sig;
  return blob;
}

function updateInvitePosterShareBtnVisibility() {
  const btn = document.getElementById("invite-poster-share");
  if (!btn) return;
  btn.classList.toggle("is-hidden", typeof navigator.share !== "function");
}

async function renderInvitePosterPreview() {
  const loading = document.getElementById("invite-poster-loading");
  const canvas = document.getElementById("invite-poster-canvas");
  if (!canvas) return;
  loading?.classList.remove("is-hidden");
  canvas.classList.add("is-hidden");
  try {
    await drawInvitePosterToCanvas(canvas);
    const blob = await canvasToPngBlob(canvas);
    _invitePosterBlobCache = blob;
    _invitePosterSigCache = getInvitePosterSignature();
    loading?.classList.add("is-hidden");
    canvas.classList.remove("is-hidden");
    updateInvitePosterShareBtnVisibility();
  } catch (err) {
    console.error(err);
    loading?.classList.add("is-hidden");
    showToast("海报绘制失败，请稍后重试");
  }
}

async function shareInvitePosterBlob(blob, channel) {
  const code = getProfileInviteCodeString();
  const baseText =
    channel === "moments"
      ? `和闺蜜一起用甜先生～邀请码 ${code}`
      : channel === "msg"
        ? `送你甜先生邀请码 ${code}，一起变美`
        : `我在用甜先生，邀请你一起变美。邀请码：${code}`;
  const file = new File([blob], `mr-sweet-邀请-${code}.png`, { type: "image/png" });
  try {
    if (navigator.share) {
      if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "甜先生 · 邀请闺蜜一起变美",
          text: baseText
        });
        showToast("已调起系统分享");
        return;
      }
      await navigator.share({
        title: "甜先生 · 邀请闺蜜一起变美",
        text: `${baseText}\n（当前环境不支持直接传图，可先下载海报再发送）`
      });
      showToast("已分享文字说明");
      return;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return;
    console.warn(e);
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mr-sweet-邀请海报-${code}.png`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("已改为下载海报：在微信里以图片发送即可");
}

function defaultProfileAsset() {
  return { commissionYuan: 128.5, teamCount: 4 };
}

function readProfileAsset() {
  try {
    const o = JSON.parse(localStorage.getItem(PROFILE_ASSET_LS_KEY) || "null");
    if (!o || typeof o !== "object") return defaultProfileAsset();
    return { ...defaultProfileAsset(), ...o };
  } catch {
    return defaultProfileAsset();
  }
}

function refreshProfilePage() {
  const inv = readProfileInvite();
  const ast = readProfileAsset();
  const codeStrong = document.getElementById("invite-poster-code");
  if (codeStrong) codeStrong.textContent = getProfileInviteCodeString();
  invalidateInvitePosterCache();
  const rewardEl = document.getElementById("profile-invite-reward");
  if (rewardEl) {
    rewardEl.textContent = `成功邀请享 ${inv.points || "XX"} 积分`;
  }
  const pv = document.getElementById("profile-stat-points-val");
  if (pv) pv.textContent = String(inv.points);
  const cv = document.getElementById("profile-commission-val");
  if (cv) cv.textContent = `¥ ${Number(ast.commissionYuan).toFixed(2)}`;
  const tv = document.getElementById("profile-team-val");
  if (tv) tv.textContent = `${ast.teamCount} 人`;
}

let _profilePageWired = false;
function setupProfilePageOnce() {
  if (_profilePageWired) return;
  _profilePageWired = true;

  document.getElementById("profile-avatar-btn")?.addEventListener("click", () => {
    showToast("打开头像裁剪与上传（示意，可接 OSS）");
  });
  document.getElementById("profile-name-btn")?.addEventListener("click", () => {
    const cur = document.getElementById("profile-name-btn")?.textContent || "甜粉用户";
    const n = window.prompt("修改昵称（本地示意）", cur);
    if (n && String(n).trim()) {
      const btn = document.getElementById("profile-name-btn");
      if (btn) btn.textContent = String(n).trim();
      invalidateInvitePosterCache();
      showToast("昵称已更新（本机示意）");
    }
  });
  document.getElementById("profile-id-copy")?.addEventListener("click", async () => {
    const t = document.getElementById("profile-id-text")?.textContent || "";
    const clip = `mr-sweet-${t}`;
    try {
      await navigator.clipboard.writeText(clip);
      showToast("邀请 ID 已复制到剪贴板");
    } catch {
      showToast(`当前环境无法自动复制，请手动复制：${clip}`);
    }
  });
  document.getElementById("profile-vip-btn")?.addEventListener("click", () => {
    showToast("粉柠会员：积分加倍、专属客服、生日礼与线下权益（示意）");
  });
  document.getElementById("profile-stat-points")?.addEventListener("click", () => {
    const inv = readProfileInvite();
    showToast(`当前积分 ${inv.points}，明细将接积分商城与任务中心（示意）`);
  });

  document.getElementById("profile-poster-btn")?.addEventListener("click", () => {
    openModal("invite-poster");
  });

  document.getElementById("profile-share-wx")?.addEventListener("click", () => {
    void (async () => {
      showToast("正在生成邀请海报…");
      try {
        const blob = await buildInvitePosterBlobForExport();
        await shareInvitePosterBlob(blob, "wx");
      } catch (e) {
        console.error(e);
        showToast("生成海报失败，请稍后重试");
      }
    })();
  });
  document.getElementById("profile-share-moments")?.addEventListener("click", () => {
    void (async () => {
      showToast("正在生成邀请海报…");
      try {
        const blob = await buildInvitePosterBlobForExport();
        await shareInvitePosterBlob(blob, "moments");
      } catch (e) {
        console.error(e);
        showToast("生成海报失败，请稍后重试");
      }
    })();
  });
  document.getElementById("profile-share-msg")?.addEventListener("click", () => {
    void (async () => {
      showToast("正在生成邀请海报…");
      try {
        const blob = await buildInvitePosterBlobForExport();
        await shareInvitePosterBlob(blob, "msg");
      } catch (e) {
        console.error(e);
        showToast("生成海报失败，请稍后重试");
      }
    })();
  });

  document.getElementById("profile-edit-profile")?.addEventListener("click", () => {
    showToast("打开资料编辑：性别、生日、肤质标签等（示意）");
  });
  document.getElementById("profile-edit-avatar")?.addEventListener("click", () => {
    showToast("与头像入口一致：上传裁剪流程（示意）");
  });
  document.getElementById("profile-member-center")?.addEventListener("click", () => {
    showToast("会员任务、等级成长与专属权益列表（示意）");
  });

  document.getElementById("profile-asset-commission")?.addEventListener("click", () => {
    const ast = readProfileAsset();
    showToast(`可提现约 ¥${Number(ast.commissionYuan).toFixed(2)}，提现前将校验实名与银行卡（示意）`);
  });
  document.getElementById("profile-asset-team")?.addEventListener("click", () => {
    showToast("打开分销团队与邀请链路数据（示意）");
  });
  document.getElementById("profile-commission-detail")?.addEventListener("click", () => {
    showToast("佣金流水：订单、结算周期、状态筛选（示意）");
  });
  document.getElementById("profile-withdraw")?.addEventListener("click", () => {
    showToast("跳转提现页：金额、手续费、到账说明（示意）");
  });

  document.getElementById("profile-tool-skin")?.addEventListener("click", () => {
    showToast("皮肤档案：检测记录、方案与产品清单（示意，可接美美看脸）");
  });
  document.getElementById("profile-tool-fav")?.addEventListener("click", () => {
    showToast("我的收藏：内容、商品与机构（示意）");
  });
  document.getElementById("profile-tool-addr")?.addEventListener("click", () => {
    showToast("收货地址簿：默认地址与识别粘贴（示意）");
  });
  document.getElementById("profile-tool-bank")?.addEventListener("click", () => {
    showToast("银行卡管理：安全验证与提现账户（示意）");
  });

  document.getElementById("profile-set-security")?.addEventListener("click", () => {
    showToast("账号与安全：手机号、密码、登录设备（示意）");
  });
  document.getElementById("profile-set-voice")?.addEventListener("click", () => {
    showToast("语音唤醒：甜先生灵敏度与免打扰时段（示意）");
  });
  document.getElementById("profile-set-notify")?.addEventListener("click", () => {
    showToast("消息通知：订单、活动、健康提醒开关（示意）");
  });
  document.getElementById("profile-set-about")?.addEventListener("click", () => {
    showToast("关于甜先生 Mr. Sweet：版本、证照与联系方式（示意）");
  });
  document.getElementById("profile-set-help")?.addEventListener("click", () => {
    showToast("客服与帮助：在线会话与常见问题（示意）");
  });
  document.getElementById("profile-set-privacy")?.addEventListener("click", () => {
    showToast("隐私政策与用户协议全文（示意）");
  });

  document.getElementById("invite-poster-download")?.addEventListener("click", () => {
    void (async () => {
      try {
        const blob = await buildInvitePosterBlobForExport();
        const code = getProfileInviteCodeString();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mr-sweet-邀请海报-${code}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        const inv = readProfileInvite();
        writeProfileInvite({ ...inv, postersGenerated: (inv.postersGenerated || 0) + 1 });
        showToast("已下载高清 PNG，可在相册或文件中查看");
      } catch (e) {
        console.error(e);
        showToast("下载失败，请稍后重试");
      }
    })();
  });

  document.getElementById("invite-poster-share")?.addEventListener("click", () => {
    void (async () => {
      try {
        const blob = await buildInvitePosterBlobForExport();
        await shareInvitePosterBlob(blob, "wx");
      } catch (e) {
        console.error(e);
        showToast("分享失败，可改用下载海报");
      }
    })();
  });
}

function switchPage(pageName) {
  if (pageName !== "faceflow") {
    stopFaceCamera();
  }
  ["wardrobe-capture", "wardrobe-add", "wardrobe-cat"].forEach((modalName) => {
    const el = document.getElementById(`modal-${modalName}`);
    if (el?.classList.contains("show")) closeModal(modalName);
  });
  pages.forEach((name) => {
    const pageEl = document.getElementById(`page-${name}`);
    const tabEl = document.querySelector(`.tab-item[data-page="${name}"]`);
    const active = name === pageName;
    pageEl?.classList.toggle("active", active);
    tabEl?.classList.toggle("active", active);
  });
  /* 从首页长列表切到「我的」等较短页面时，若不归零滚动条，视口常落在文档底部空白处，像「页面没更新」 */
  window.scrollTo(0, 0);
  if (pageName === "wardrobe") {
    void refreshWardrobePageContext();
  } else {
    wardrobePendingFiles = null;
  }
  if (pageName === "boyfriend") {
    preloadBoyfriendAvatars();
    renderBoyfriendPersonaCards();
  }
  if (pageName !== "boyfriend") {
    closeBfVideoCall();
  }
  if (pageName !== "health-breathe") {
    stopHealthBreatheAnim();
  }
  if (pageName === "health-sleep") refreshHealthSleepPage();
  else if (pageName === "health-calories") refreshHealthCaloriesPage();
  else if (pageName === "health-water") refreshHealthWaterPage();
  else if (pageName === "health-exercise") refreshHealthExercisePage();
  else if (pageName === "health-weight") refreshHealthWeightPage();
  else if (pageName === "health-cycle") refreshHealthCyclePage();
  else if (pageName === "health-breathe") refreshHealthBreathePage();
  else if (pageName === "health-medicine") refreshHealthMedicinePage();
  else if (pageName === "homecare") renderHomecarePage();
  else if (pageName === "yoga") renderYogaPage();
  else if (pageName === "tcmflow") renderTcmPickPage();
  else if (pageName === "tcm-nourish") renderTcmNourishPage();
  else if (pageName === "tcm-diet") renderTcmDietPage();
  else if (pageName === "home") renderContentPlaza();
  else if (pageName === "services") syncPickgoodsSpotStrip();
  else if (pageName === "profile") refreshProfilePage();
  if (pageName !== "yoga") {
    destroyYogaMap();
  }
  if (pageName !== "tcmflow") {
    destroyTcmMap();
  }
}

let wardrobeCaptureStream = null;

function stopWardrobeCaptureIfAny() {
  if (!wardrobeCaptureStream) return;
  wardrobeCaptureStream.getTracks().forEach((track) => track.stop());
  wardrobeCaptureStream = null;
  const wardrobeCapVideoEl = document.getElementById("wardrobe-capture-video");
  if (wardrobeCapVideoEl) wardrobeCapVideoEl.srcObject = null;
}

function openModal(modalName) {
  const modalEl = document.getElementById(`modal-${modalName}`);
  if (!modalEl) return;
  modalEl.classList.add("show");
  modalEl.setAttribute("aria-hidden", "false");
  if (modalName === "invite-poster") {
    queueMicrotask(() => {
      void renderInvitePosterPreview();
    });
  }
}

function closeModal(modalName) {
  if (modalName === "wardrobe-capture") stopWardrobeCaptureIfAny();
  const modalEl = document.getElementById(`modal-${modalName}`);
  if (!modalEl) return;
  modalEl.classList.remove("show");
  modalEl.setAttribute("aria-hidden", "true");
}

let faceVideoStream = null;

function stopFaceCamera() {
  if (faceVideoStream) {
    faceVideoStream.getTracks().forEach((track) => track.stop());
    faceVideoStream = null;
  }
  if (faceDetectVideoEl) {
    faceDetectVideoEl.srcObject = null;
    faceDetectVideoEl.classList.add("is-hidden");
  }
  if (faceflowCaptureDetectEl) faceflowCaptureDetectEl.disabled = true;
}

function resetFaceDetectUi() {
  stopFaceCamera();
  faceDetectProcessingEl?.classList.add("is-hidden");
  if (faceflowOpenCameraEl) faceflowOpenCameraEl.disabled = false;
  if (faceflowCaptureDetectEl) faceflowCaptureDetectEl.disabled = true;
  if (faceDetectLiveLabelEl) faceDetectLiveLabelEl.textContent = "预览未开启";
}

function captureFaceFrameDataUrl(videoEl) {
  const w = videoEl.videoWidth;
  const h = videoEl.videoHeight;
  if (!w || !h) return null;
  const canvas = document.createElement("canvas");
  const maxW = 960;
  const scale = Math.min(1, maxW / w);
  const tw = Math.round(w * scale);
  const th = Math.round(h * scale);
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.save();
  ctx.translate(tw, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(videoEl, 0, 0, tw, th);
  ctx.restore();
  try {
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return null;
  }
}

function extractChatCompletionText(data) {
  const msg = data?.choices?.[0]?.message;
  if (!msg) return "";
  if (typeof msg.content === "string" && msg.content.trim()) return msg.content.trim();
  if (Array.isArray(msg.content)) {
    return msg.content
      .filter((c) => c?.type === "text" && c.text)
      .map((c) => c.text.trim())
      .join("\n")
      .trim();
  }
  return "";
}

async function recompressDataUrl(dataUrl, quality, maxW = 720) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const scale = Math.min(1, maxW / img.width);
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx2 = c.getContext("2d");
      if (!ctx2) {
        resolve(dataUrl);
        return;
      }
      ctx2.drawImage(img, 0, 0, c.width, c.height);
      try {
        resolve(c.toDataURL("image/jpeg", quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const VISION_SYSTEM_PROMPT =
  "你是甜先生 Mr. Sweet 的护肤与形象顾问。用户会上传一张正脸照片（可能素颜或淡妆）。请结合图像给出观察与护理建议：避免医学诊断与处方用语，不做疾病确诊，风险提示要温和。输出中文。";

const VISION_USER_PROMPT = "请结合这张照片进行肤质与护肤方向的解读。按以下小节输出（控制在520字以内）：\n1) 可见的整体印象（肤光、均匀度等）\n2) 可能的水油与毛孔感受（谨慎表述）\n3) 泛红/暗沉等线索（谨慎表述，强调光线与拍摄角度影响）\n4) 日常护理与防晒建议\n5) 何时建议线下皮肤科或医美面诊\n若图像无法辨认面部或被遮挡，请直接说明无法分析并给出拍摄建议。";

function shouldRetryVisionWithTextOnlyPayload(message) {
  const m = String(message || "");
  return /deserialize|unknown variant|image_url|expected `text`|expected \"text\"|column \d+|invalid type|expected a string|found an array/i.test(m);
}

async function postVisionChat(cfg, payload) {
  const response = await fetch(cfg.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.apiKey}`
    },
    body: JSON.stringify(payload)
  });
  const raw = await response.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    const snippet = raw.slice(0, 220).replace(/\s+/g, " ");
    throw new Error(`接口返回非 JSON（HTTP ${response.status}）：${snippet}`);
  }
  if (!response.ok) {
    const msg = data?.error?.message || data?.message || `请求失败（HTTP ${response.status}）`;
    throw new Error(msg);
  }
  return data;
}

function buildOpenAiImageUrlMessages(url) {
  return [
    { role: "system", content: VISION_SYSTEM_PROMPT },
    {
      role: "user",
      content: [
        { type: "text", text: VISION_USER_PROMPT },
        { type: "image_url", image_url: { url } }
      ]
    }
  ];
}

function buildDualTextOnlyMessages(url) {
  return [
    { role: "system", content: VISION_SYSTEM_PROMPT },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `${VISION_USER_PROMPT}\n\n（以下为 JPEG 的 data URL，请按图像理解并分析；若你无法处理 data URL，请说明。）`
        },
        { type: "text", text: url }
      ]
    }
  ];
}

function buildStringUserMessage(url) {
  return [
    { role: "system", content: VISION_SYSTEM_PROMPT },
    {
      role: "user",
      content: `${VISION_USER_PROMPT}\n\n---\n以下为一行 JPEG data URL，请按图像理解：\n${url}`
    }
  ];
}

async function getVisionSkinReport(imageDataUrl) {
  const cfg = getAIConfig();
  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) {
    throw new Error("请先在右上角「⚙️」填写 API Endpoint、模型名和 API Key。");
  }
  let url = imageDataUrl;
  let q = 0.82;
  while (url.length > 5_500_000 && q > 0.48) {
    q -= 0.06;
    const next = await recompressDataUrl(url, q, 640);
    if (!next || next === url) break;
    url = next;
  }

  const strategies = [
    { label: "openai_image_url", build: () => buildOpenAiImageUrlMessages(url) },
    { label: "dual_text", build: () => buildDualTextOnlyMessages(url) },
    { label: "string_user", build: () => buildStringUserMessage(url) }
  ];

  let lastError = null;
  for (let i = 0; i < strategies.length; i += 1) {
    try {
      const data = await postVisionChat(cfg, {
        model: cfg.model,
        messages: strategies[i].build(),
        temperature: 0.45,
        max_tokens: 900
      });
      const text = extractChatCompletionText(data);
      if (!text) {
        throw new Error("模型未返回文字。");
      }
      if (i > 0) {
        showToast("当前接口不支持 image_url，已自动改用「纯 text」兼容格式提交。");
      }
      return text;
    } catch (err) {
      lastError = err;
      const msg = err?.message || "";
      if (i < strategies.length - 1 && shouldRetryVisionWithTextOnlyPayload(msg)) {
        continue;
      }
      throw err;
    }
  }
  throw lastError || new Error("看图分析失败");
}

function setFaceflowVisionReport(text) {
  if (faceflowVisionReportTextEl) faceflowVisionReportTextEl.textContent = text;
  faceflowVisionReportCardEl?.classList.remove("is-hidden");
  try {
    localStorage.setItem(SKIN_VISION_REPORT_KEY, JSON.stringify({ at: Date.now(), text }));
  } catch {
    // ignore quota
  }
}

function showFaceflowDetectEntry() {
  resetFaceDetectUi();
  faceflowDetectScreenEl?.classList.remove("is-hidden");
  faceflowMainEl?.classList.add("is-hidden");
}

function hideFaceflowDetectShowMain() {
  resetFaceDetectUi();
  faceflowDetectScreenEl?.classList.add("is-hidden");
  faceflowMainEl?.classList.remove("is-hidden");
}

function renderClinic(type) {
  const data = clinicData[type];
  if (!data || !clinicListEl || !clinicTitleEl) return;
  clinicTitleEl.textContent = data.title;
  clinicListEl.innerHTML = "";
  data.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.innerHTML = `
      <strong>${item.name}</strong>
      <p>${item.meta}</p>
      <p>${item.doctor}</p>
      <div class="actions">
        ${
          type === "mind"
            ? `<button type="button" class="btn btn-tcm-mind-pick">选此机构 · 滋补与食疗</button>`
            : ""
        }
        <button class="btn" data-open-flow-page="${type === "mind" ? "tcmflow" : "faceflow"}">进入面诊</button>
        <button class="btn" data-msg="已打开 ${item.name} 方案页">查看方案</button>
      </div>
    `;
    if (type === "mind") {
      row.querySelector(".btn-tcm-mind-pick")?.addEventListener("click", () => {
        tcmSelectionContext = { id: "", name: item.name, doctor: item.doctor, source: "clinic" };
        switchPage("tcm-nourish");
        renderTcmNourishPage();
      });
    }
    row.querySelectorAll("[data-msg]").forEach((btn) => {
      btn.addEventListener("click", () => showToast(btn.dataset.msg));
    });
    row.querySelectorAll("[data-open-flow-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.openFlowPage === "faceflow") {
          enterFaceflowWithDetect();
          return;
        }
        if (btn.dataset.openFlowPage === "tcmflow") {
          switchPage("tcmflow");
        }
      });
    });
    clinicListEl.appendChild(row);
  });
}

function renderMallLevel1() {
  mallLevel1El.innerHTML = "";
  Object.keys(mallTree).forEach((level1, idx) => {
    const option = document.createElement("option");
    option.value = level1;
    option.textContent = idx === 0 ? `一级分类：${level1}` : level1;
    mallLevel1El.appendChild(option);
  });
  renderMallLevel2();
}

function renderMallLevel2(preferredLevel2 = null) {
  const level1 = mallLevel1El.value;
  const level2Keys = Object.keys(mallTree[level1] || {});
  mallLevel2El.innerHTML = "";
  level2Keys.forEach((level2, idx) => {
    const option = document.createElement("option");
    option.value = level2;
    option.textContent = idx === 0 ? `二级分类：${level2}` : level2;
    mallLevel2El.appendChild(option);
  });
  if (preferredLevel2 && level2Keys.includes(preferredLevel2)) {
    mallLevel2El.value = preferredLevel2;
  }
  renderMallResults();
}

function parsePriceYuan(val) {
  const m = String(val).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function hashPickgoodsString(str) {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function formatPickgoodsYuan(n) {
  return `¥${Math.round(n)}`;
}

function formatDeltaVsLimme(limmeYuan, couponYuan) {
  const d = couponYuan - limmeYuan;
  if (d === 0) return "持平";
  if (d > 0) return `高 ¥${d}`;
  return `低 ¥${Math.abs(d)}`;
}

function buildPickgoodsComparePackage(limmeYuan, nameSeed) {
  const h = hashPickgoodsString(`${nameSeed}|${limmeYuan}`);
  const extProfiles = [
    {
      ship: "3–5 日达（仓配随机）",
      shop: "旗舰店与 C 店混杂",
      guards: ["7 天无理由", "运费按店"],
      insight:
        "淘天 SKU 最杂：同款不同链接价差大，建议锁定「天猫」标 + 近 30 天好评率，再用券后价与严选对照。"
    },
    {
      ship: "自营常「次日达」",
      shop: "京东自营 / POP 混排",
      guards: ["180 天质保（品类差异）", "上门取退"],
      insight: "京东自营在正品链路与售后响应上整体更稳，标价常偏高，大促叠券后才会贴近严选。"
    },
    {
      ship: "2–4 日达（产地直发多）",
      shop: "百亿补贴 / 品牌店",
      guards: ["活动假一赔十", "退货包运费（看标）"],
      insight:
        "拼多多券后梯度最大：百亿补贴款可能低于严选，但需核对是否「品牌」黑标、是否「退货包运费」，避免低价无售后。"
    },
    {
      ship: "3–6 日达",
      shop: "品牌店播 / 达播同款",
      guards: ["平台仲裁", "券时效短"],
      insight: "抖音同款受直播价与粉丝券影响，短时间波动快；适合跟播锁价，不适合作为唯一低价依据。"
    },
    {
      ship: "2–4 日达（特卖仓）",
      shop: "唯品自营 / 品牌特卖",
      guards: ["断码多", "部分款不退换"],
      insight: "唯品走特卖逻辑：尺码与批次变动快，适合接受「特卖规则」的用户，不宜与常规旗舰店简单等同。"
    }
  ];
  const listMul = [1.14, 1.08, 1.02, 1.12, 1.06];
  const couponMul = [1.05, 1.02, 0.87, 1.04, 0.98];
  let extIdx = 0;
  const channels = PICKGOODS_COMPARE_CHANNELS.map((c) => {
    if (c.role === "anchor") {
      return {
        ...c,
        listYuan: limmeYuan,
        couponYuan: limmeYuan,
        ship: "下单后 48h 内发出",
        shop: "品牌直供 / 平台自营池",
        guards: ["运费险", "正品溯源", "7 天无理由"],
        insight: "严选价为「含基础售后的一口价锚点」：便于与外链券后、运费、店铺类型综合对照。",
        deltaCouponVsLimme: 0
      };
    }
    const jitter = ((h >> (extIdx * 7)) & 31) - 14;
    const listYuan = Math.max(1, Math.round(limmeYuan * listMul[extIdx] + jitter));
    const couponYuan = Math.max(1, Math.round(limmeYuan * couponMul[extIdx] + Math.floor(jitter / 2)));
    const prof = extProfiles[extIdx];
    extIdx += 1;
    return {
      ...c,
      listYuan,
      couponYuan,
      ship: prof.ship,
      shop: prof.shop,
      guards: prof.guards,
      insight: prof.insight,
      deltaCouponVsLimme: couponYuan - limmeYuan
    };
  });
  const byCoupon = [...channels].sort((a, b) => a.couponYuan - b.couponYuan);
  const cheap = byCoupon[0];
  const costly = byCoupon[byCoupon.length - 1];
  const pdd = channels.find((x) => x.id === "pdd");
  const jd = channels.find((x) => x.id === "jd");
  let narrative = `按「券后估算」排序：「${cheap.nick}」约 ${formatPickgoodsYuan(cheap.couponYuan)} 最低，「${costly.nick}」约 ${formatPickgoodsYuan(costly.couponYuan)} 最高（示意模型，非实时抓取）。`;
  if (pdd && pdd.couponYuan < limmeYuan) {
    narrative += ` 「拼多多」券后低于严选 ${formatPickgoodsYuan(limmeYuan - pdd.couponYuan)}，请优先核对品牌授权、是否退货包运费与店铺评分后再决策。`;
  } else {
    narrative += ` 本次示意中「拼多多」券后未低于严选；真实环境常随百亿补贴波动，建议以回链价为准二次确认。`;
  }
  if (jd) {
    narrative += ` 「京东」在物流时效与自营售后上更适合「少折腾、要稳」的购买路径；「淘天」则需花精力筛店。`;
  }
  const summaryLine =
    "说明：券后价为满减/百亿补贴等规则下的估算，不含各站运费与红包差异；接入 API 后可展示抓取时间与店铺直达链。";
  return { channels, narrative, summaryLine };
}

function getPickgoodsHeroCompareProduct() {
  if (pickgoodsCurSpot) {
    return {
      name: pickgoodsCurSpot.title,
      price: pickgoodsCurSpot.price,
      ico: pickgoodsCurSpot.ico || "🛍️"
    };
  }
  const level1 = mallLevel1El?.value;
  const level2 = mallLevel2El?.value;
  const pick = mallTree[level1]?.[level2]?.[0];
  if (pick) {
    return { name: pick.name, price: pick.price, ico: pick.ico || "📦" };
  }
  return { name: "严选好物", price: "¥1899", ico: "🛍️" };
}

function openPickgoodsCompareModal(product) {
  const name = product?.name || "当前商品";
  const ico = product?.ico || "📦";
  const limmeYuan = parsePriceYuan(product?.price || "0");
  if (limmeYuan <= 0) {
    showToast("暂无有效价格，无法比价（示意）");
    return;
  }
  const narrEl = document.getElementById("pickgoods-compare-narrative");
  const matrixWrap = document.getElementById("pickgoods-compare-matrix-wrap");
  const cardsEl = document.getElementById("pickgoods-compare-cards");
  const prodEl = document.getElementById("pickgoods-compare-product");
  const sumEl = document.getElementById("pickgoods-compare-summary");
  if (!narrEl || !matrixWrap || !cardsEl || !prodEl || !sumEl) return;
  prodEl.innerHTML = `<span class="pickgoods-compare-ico" aria-hidden="true">${ico}</span><div class="pickgoods-compare-name-wrap"><strong class="pickgoods-compare-name"></strong><span class="pickgoods-compare-ref"></span></div>`;
  prodEl.querySelector(".pickgoods-compare-name").textContent = name;
  prodEl.querySelector(".pickgoods-compare-ref").textContent = `严选参考价（锚点）¥${limmeYuan}`;
  const pkg = buildPickgoodsComparePackage(limmeYuan, name);
  narrEl.textContent = pkg.narrative;
  sumEl.textContent = pkg.summaryLine;
  const { channels } = pkg;
  const minCoupon = Math.min(...channels.map((c) => c.couponYuan));
  const bestIds = new Set(channels.filter((c) => c.couponYuan === minCoupon).map((c) => c.id));

  matrixWrap.innerHTML = "";
  const table = document.createElement("table");
  table.className = "pickgoods-compare-matrix";
  table.setAttribute("role", "grid");
  const thead = document.createElement("thead");
  const hr = document.createElement("tr");
  const th0 = document.createElement("th");
  th0.className = "pickgoods-matrix-corner";
  th0.textContent = "对比项";
  th0.setAttribute("scope", "col");
  hr.appendChild(th0);
  channels.forEach((c) => {
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.className = `pickgoods-matrix-col${bestIds.has(c.id) ? " is-coupon-best" : ""}`;
    th.innerHTML = `<span class="pickgoods-matrix-th-dot" style="background:${c.color}"></span><span class="pickgoods-matrix-th-txt">${c.label}</span>`;
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  const addRow = (label, getCellText, { sub = "" } = {}) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.className = "pickgoods-matrix-rowhd";
    th.innerHTML = `<span class="pickgoods-matrix-rowhd-main">${label}</span>${sub ? `<span class="pickgoods-matrix-rowhd-sub">${sub}</span>` : ""}`;
    tr.appendChild(th);
    channels.forEach((c) => {
      const td = document.createElement("td");
      td.className = bestIds.has(c.id) ? "is-coupon-best" : "";
      td.textContent = getCellText(c);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  };
  addRow("页内标价", (c) => formatPickgoodsYuan(c.listYuan), { sub: "商品页展示" });
  addRow("券后估算", (c) => formatPickgoodsYuan(c.couponYuan), { sub: "满减/补贴示意" });
  addRow("券后 vs 严选", (c) => (c.role === "anchor" ? "锚点" : formatDeltaVsLimme(limmeYuan, c.couponYuan)));
  addRow("物流时效", (c) => c.ship);
  addRow("店铺形态", (c) => c.shop);
  addRow("保障要点", (c) => (Array.isArray(c.guards) ? c.guards.join(" · ") : String(c.guards || "—")));
  table.appendChild(tbody);
  matrixWrap.appendChild(table);

  cardsEl.innerHTML = "";
  channels.forEach((c) => {
    const art = document.createElement("article");
    art.className = `pickgoods-compare-card${c.role === "anchor" ? " is-anchor" : ""}`;
    const head = document.createElement("header");
    head.className = "pickgoods-compare-card-hd";
    head.innerHTML = `<span class="pickgoods-compare-card-dot" style="background:${c.color}"></span><div><strong class="pickgoods-compare-card-title">${c.label}</strong><span class="pickgoods-compare-card-sub">${c.nick}</span></div>`;
    const metrics = document.createElement("dl");
    metrics.className = "pickgoods-compare-dl";
    [["页内标价", formatPickgoodsYuan(c.listYuan)], ["券后估算", formatPickgoodsYuan(c.couponYuan)], ["物流", c.ship], ["店铺", c.shop]].forEach(([dt, dd]) => {
      const dti = document.createElement("dt");
      dti.textContent = dt;
      const ddi = document.createElement("dd");
      ddi.textContent = dd;
      metrics.appendChild(dti);
      metrics.appendChild(ddi);
    });
    const ins = document.createElement("p");
    ins.className = "pickgoods-compare-card-insight";
    ins.textContent = c.insight;
    const foot = document.createElement("div");
    foot.className = "pickgoods-compare-card-foot";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn pickgoods-compare-card-btn";
    btn.textContent = c.role === "anchor" ? "看严选保障" : `去${c.nick}搜同款`;
    btn.addEventListener("click", () => {
      if (c.role === "anchor") {
        showToast("将打开站内严选详情、溯源与售后说明（示意）");
      } else {
        showToast(`将携带商品标题跳转「${c.label}」搜索同款（示意 · 可接搜索 H5 / 开放平台）`);
      }
    });
    foot.appendChild(btn);
    art.appendChild(head);
    art.appendChild(metrics);
    art.appendChild(ins);
    art.appendChild(foot);
    cardsEl.appendChild(art);
  });

  openModal("pickgoods-compare");
}

function pickgoodsHeroImageSeed(level1, level2, productName) {
  const raw = `pg-${level1}-${level2}-${productName || "x"}`;
  return raw.replace(/\s+/g, "").slice(0, 48);
}

let pickgoodsCurSpot = null;
let _pickgoodsApplyingSpot = false;
let pickgoodsSpotCycleIdx = 0;

function syncPickgoodsSpotStrip() {
  const strip = document.getElementById("pickgoods-spot-strip");
  if (!strip) return;
  strip.querySelectorAll(".pickgoods-spot-chip").forEach((btn) => {
    const id = btn.getAttribute("data-spot-id");
    btn.classList.toggle("is-active", !!pickgoodsCurSpot && pickgoodsCurSpot.id === id);
    btn.setAttribute("aria-selected", !!pickgoodsCurSpot && pickgoodsCurSpot.id === id ? "true" : "false");
  });
}

function applyPickgoodsSpotlight(spot) {
  if (!spot || !mallLevel1El || !mallLevel2El) return;
  _pickgoodsApplyingSpot = true;
  pickgoodsCurSpot = spot;
  pickgoodsSpotCycleIdx = Math.max(0, PICKGOODS_SPOTLIGHTS.findIndex((s) => s.id === spot.id));
  mallLevel1El.value = spot.level1;
  renderMallLevel2(spot.level2);
  _pickgoodsApplyingSpot = false;
  syncPickgoodsSpotStrip();
}

function renderPickgoodsSpotStrip() {
  const strip = document.getElementById("pickgoods-spot-strip");
  if (!strip) return;
  strip.innerHTML = "";
  PICKGOODS_SPOTLIGHTS.forEach((spot) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pickgoods-spot-chip";
    btn.setAttribute("data-spot-id", spot.id);
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-label", `${spot.tag}，${spot.chip}`);
    btn.innerHTML = `<span class="pickgoods-spot-chip-tag">${spot.tag}</span><span class="pickgoods-spot-chip-name">${spot.chip}</span>`;
    btn.addEventListener("click", () => {
      applyPickgoodsSpotlight(spot);
      showToast(`已切到「${spot.chip}」· 下方列表与比价已同步`);
    });
    strip.appendChild(btn);
  });
  syncPickgoodsSpotStrip();
}

function refreshPickgoodsHeroDisplayed() {
  const imgEl = document.getElementById("pickgoods-hero-img");
  const nameEl = document.getElementById("pickgoods-hero-name");
  const priceEl = document.getElementById("pickgoods-hero-price");
  if (!imgEl || !nameEl || !priceEl || !mallLevel1El || !mallLevel2El) return;
  const level1 = mallLevel1El.value;
  const level2 = mallLevel2El.value;
  const products = mallTree[level1]?.[level2] || [];
  if (
    pickgoodsCurSpot &&
    (pickgoodsCurSpot.level1 !== level1 || pickgoodsCurSpot.level2 !== level2)
  ) {
    pickgoodsCurSpot = null;
  }
  if (pickgoodsCurSpot) {
    const s = pickgoodsCurSpot;
    imgEl.src = `https://picsum.photos/seed/${encodeURIComponent(s.seed)}/224/224`;
    nameEl.textContent = s.title;
    priceEl.textContent = s.price;
    syncPickgoodsSpotStrip();
    return;
  }
  const pick = products[0];
  const seed = encodeURIComponent(pickgoodsHeroImageSeed(level1, level2, pick?.name || "hero"));
  imgEl.src = `https://picsum.photos/seed/${seed}/224/224`;
  if (pick) {
    nameEl.textContent = `${pick.name} · ${level1}严选`;
    const num = String(pick.price).replace(/¥\s*/g, "").trim();
    priceEl.textContent = num ? `¥ ${num}` : pick.price;
  } else {
    nameEl.textContent = "严选玫瑰香氛礼盒 · 限量";
    priceEl.textContent = "¥ 1899";
  }
  syncPickgoodsSpotStrip();
}

function renderMallResults() {
  const level1 = mallLevel1El.value;
  const level2 = mallLevel2El.value;
  if (!_pickgoodsApplyingSpot && pickgoodsCurSpot) {
    if (pickgoodsCurSpot.level1 !== level1 || pickgoodsCurSpot.level2 !== level2) {
      pickgoodsCurSpot = null;
    }
  }
  const products = mallTree[level1]?.[level2] || [];
  mallResultsEl.innerHTML = "";
  products.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "result-item pickgoods-result-row";
    row.setAttribute("aria-label", `${item.name}，${item.price}，打开全网比价`);
    const ico = item.ico || "📦";
    row.innerHTML = `
      <span class="pickgoods-result-ico" aria-hidden="true">${ico}</span>
      <div class="pickgoods-result-main">
        <strong>${item.name}</strong>
        <p class="price">${item.price}</p>
      </div>
      <span class="pickgoods-result-cta">全网比价</span>
    `;
    row.addEventListener("click", () => {
      openPickgoodsCompareModal(item);
    });
    mallResultsEl.appendChild(row);
  });
  refreshPickgoodsHeroDisplayed();
}

let _pickgoodsUiWired = false;
function setupPickgoodsUiOnce() {
  if (_pickgoodsUiWired) return;
  _pickgoodsUiWired = true;
  renderPickgoodsSpotStrip();
  document.getElementById("pickgoods-search-btn")?.addEventListener("click", () => {
    openPickgoodsCompareModal(getPickgoodsHeroCompareProduct());
  });
  document.getElementById("pickgoods-bag-btn")?.addEventListener("click", () => {
    showToast("购物袋 · 已选严选与比价清单（示意）");
  });
  document.getElementById("pickgoods-hero-head")?.addEventListener("click", () => {
    pickgoodsSpotCycleIdx = (pickgoodsSpotCycleIdx + 1) % PICKGOODS_SPOTLIGHTS.length;
    const next = PICKGOODS_SPOTLIGHTS[pickgoodsSpotCycleIdx];
    applyPickgoodsSpotlight(next);
    showToast(`下一件严选：${next.chip}`);
  });
  document.getElementById("pickgoods-compare-btn")?.addEventListener("click", () => {
    openPickgoodsCompareModal(getPickgoodsHeroCompareProduct());
  });
  if (PICKGOODS_SPOTLIGHTS[0]) {
    applyPickgoodsSpotlight(PICKGOODS_SPOTLIGHTS[0]);
  }
}

function handleServiceIconAction(entry) {
  const a = entry.action;
  if (!a) return;
  if (a.type === "page") {
    switchPage(a.name);
    return;
  }
  if (a.type === "face") {
    enterFaceflowWithDetect();
    return;
  }
  if (a.type === "plaza") {
    switchPage("home");
    setTimeout(() => {
      document.getElementById("content-plaza")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return;
  }
  if (a.type === "msg") {
    showToast(a.text);
  }
}

function renderServiceIconBar() {
  if (!serviceIconGridEl) return;
  serviceIconGridEl.innerHTML = "";
  SERVICE_ALL_ICONS.forEach((entry) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "service-icon-item";
    btn.setAttribute("aria-label", `${entry.title}。${entry.desc || ""}`);
    btn.innerHTML = `<span class="service-icon-ico" aria-hidden="true">${entry.ico}</span><em>${entry.title}</em><small>${entry.desc || ""}</small>`;
    btn.addEventListener("click", () => handleServiceIconAction(entry));
    serviceIconGridEl.appendChild(btn);
  });
}

function openFlow(flowKey) {
  const data = flowData[flowKey];
  if (!data || !flowTitleEl || !flowStepsEl) return;
  flowTitleEl.textContent = data.title;
  flowStepsEl.innerHTML = "";
  data.steps.forEach((step, index) => {
    const row = document.createElement("div");
    row.className = "list-row";
    row.textContent = `${index + 1}. ${step}`;
    flowStepsEl.appendChild(row);
  });
  openModal("flow");
}

document.querySelectorAll(".tab-item").forEach((item) => {
  item.addEventListener("click", () => switchPage(item.dataset.page));
});

bindDataMsgEvents();

document.querySelectorAll("[data-modal]").forEach((item) => {
  item.addEventListener("click", () => openModal(item.dataset.modal));
});

document.querySelectorAll("[data-page-jump]").forEach((item) => {
  item.addEventListener("click", () => {
    switchPage(item.dataset.pageJump);
  });
});

document.querySelectorAll("[data-open-flow-page]").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.openFlowPage === "faceflow") {
      enterFaceflowWithDetect();
      return;
    }
    if (item.dataset.openFlowPage === "tcmflow") {
      switchPage("tcmflow");
    }
  });
});

document.querySelectorAll("[data-close]").forEach((item) => {
  item.addEventListener("click", () => closeModal(item.dataset.close));
});

document.querySelectorAll(".modal").forEach((modalEl) => {
  modalEl.addEventListener("click", (event) => {
    if (event.target !== modalEl) return;
    const modalName = modalEl.id.replace("modal-", "");
    closeModal(modalName);
  });
});

brandHomeBtnEl?.addEventListener("click", () => {
  document.querySelectorAll(".modal.show").forEach((modalEl) => {
    const modalName = modalEl.id.replace("modal-", "");
    closeModal(modalName);
  });
  switchPage("home");
});

document.querySelectorAll(".mini-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll('.mini-tab:not(.service-tab)').forEach((n) => n.classList.remove("active"));
    tab.classList.add("active");
    renderClinic(tab.dataset.clinic);
  });
});

document.querySelectorAll("[data-flow]").forEach((item) => {
  item.addEventListener("click", () => openFlow(item.dataset.flow));
});

document.querySelectorAll("[data-hot-service]").forEach((item) => {
  item.addEventListener("click", () => openHotServicePanel(item.dataset.hotService));
});

mallLevel1El?.addEventListener("change", renderMallLevel2);
mallLevel2El?.addEventListener("change", renderMallResults);

renderClinic("beauty");
renderMallLevel1();
setupPickgoodsUiOnce();
setupProfilePageOnce();
refreshProfilePage();
renderServiceIconBar();
renderContentPlaza();
setupVoiceConversation();
setupHomeChatComposer();
setupHomeLedgerPanel();
setupAIConfig();
setupScriptedChatReveal();

const faceFlowController = createFlowRenderer(faceFlowSteps, faceflowTitleEl, faceflowContentEl, faceflowTimelineEl);

function enterFaceflowWithDetect() {
  faceFlowController?.reset();
  switchPage("faceflow");
  faceflowVisionReportCardEl?.classList.add("is-hidden");
  showFaceflowDetectEntry();
}

faceFlowController.reset();

faceflowOpenCameraEl?.addEventListener("click", async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("当前环境不支持摄像头，请在 HTTPS 下使用 Chrome / Edge，或升级微信后重试。");
    return;
  }
  faceflowOpenCameraEl.disabled = true;
  try {
    stopFaceCamera();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "user" },
        width: { ideal: 720 },
        height: { ideal: 720 }
      },
      audio: false
    });
    faceVideoStream = stream;
    if (faceDetectVideoEl) {
      faceDetectVideoEl.srcObject = stream;
      await faceDetectVideoEl.play();
      faceDetectVideoEl.classList.remove("is-hidden");
    }
    if (faceflowCaptureDetectEl) faceflowCaptureDetectEl.disabled = false;
    if (faceDetectLiveLabelEl) faceDetectLiveLabelEl.textContent = "实时预览";
    showToast("摄像头已开启，对准椭圆区域后点「拍摄并完成检测」。");
  } catch (err) {
    faceflowOpenCameraEl.disabled = false;
    const n = err?.name || "";
    if (n === "NotAllowedError" || n === "PermissionDeniedError") {
      showToast("摄像头权限被拒绝，请在系统或浏览器设置中允许访问相机。");
    } else if (n === "NotFoundError" || n === "DevicesNotFoundError") {
      showToast("未检测到可用摄像头设备。");
    } else {
      showToast(`无法打开摄像头：${err?.message || n || "未知错误"}`);
    }
  }
});

faceflowCaptureDetectEl?.addEventListener("click", async () => {
  if (!faceDetectVideoEl || faceDetectVideoEl.readyState < 2) {
    showToast("画面尚未就绪，请稍候再拍。");
    return;
  }
  const imageDataUrl = captureFaceFrameDataUrl(faceDetectVideoEl);
  if (!imageDataUrl) {
    showToast("截图失败，请重试。");
    return;
  }
  if (faceDetectProcessingLabelEl) faceDetectProcessingLabelEl.textContent = "AI 正在读图分析…";
  faceDetectProcessingEl?.classList.remove("is-hidden");
  faceflowCaptureDetectEl.disabled = true;
  try {
    const text = await getVisionSkinReport(imageDataUrl);
    setFaceflowVisionReport(text);
    showToast("已根据照片生成「看图报告」。");
    hideFaceflowDetectShowMain();
  } catch (err) {
    showToast(err?.message || "看图分析失败");
    faceflowCaptureDetectEl.disabled = !faceVideoStream;
  } finally {
    faceDetectProcessingEl?.classList.add("is-hidden");
  }
});

faceflowVisionReportCloseEl?.addEventListener("click", () => {
  faceflowVisionReportCardEl?.classList.add("is-hidden");
});

faceflowSkipDetectEl?.addEventListener("click", () => {
  hideFaceflowDetectShowMain();
});

faceflowPrevEl?.addEventListener("click", () => {
  if (faceFlowController.getStep() === 0) {
    showFaceflowDetectEntry();
    return;
  }
  faceFlowController.prev();
});
faceflowNextEl?.addEventListener("click", () => faceFlowController.next());
const WARDROBE_ITEMS_KEY = "limme_wardrobe_items_v1";

const wardrobeCatalog = {
  tops: {
    style: "舒适通勤风 |",
    tempRange: "适宜 18-24°C",
    title: "上装搭配方案",
    outfitDetail:
      "上装：燕麦色针织开衫 + 白T内搭\n\n下装建议：浅蓝九分直筒裤或米色西装裤\n鞋履：乐福鞋或小白鞋\n场景：办公室、咖啡约会\n贴士：早晚温差大时可叠穿薄风衣。"
  },
  bottoms: {
    style: "利落城市风 |",
    tempRange: "适宜 16-22°C",
    title: "下装搭配方案",
    outfitDetail:
      "下装：高腰直筒牛仔裤或垂感阔腿裤\n上装建议：修身打底 + 短款外套\n鞋履：短靴或运动鞋\n场景：逛街、城市出行\n贴士：裤长刚到鞋面显腿长。"
  },
  dresses: {
    style: "休闲约会风 |",
    tempRange: "适宜 22-26°C",
    title: "裙装推荐搭配",
    outfitDetail:
      "裙装：粉上衣 + 白色过膝半裙（示意配色）\n鞋履：裸色玛丽珍或小跟凉鞋\n包袋：小号腋下包或链条包\n场合：周末约会、拍照出街\n贴士：图为配色参考，可在「添加衣物」中上传你的真实单品。"
  },
  accessories: {
    style: "点睛精致风 |",
    tempRange: "适宜 20-28°C",
    title: "配饰点亮方案",
    outfitDetail:
      "配饰：细项链 + 小耳环 + 腰带或丝巾\n服装建议：素色套装会让配饰更出挑\n场景：宴会、商务社交\n贴士：金银不要混搭过多，选一种主色金属。"
  }
};

const wardrobeBackEl = document.getElementById("wardrobe-back");
const wardrobeHeaderAddEl = document.getElementById("wardrobe-header-add");
const wardrobeWeatherTextEl = document.getElementById("wardrobe-weather-text");
const wardrobeWeatherRefreshEl = document.getElementById("wardrobe-weather-refresh");
const wardrobeOutfitMetaEl = document.getElementById("wardrobe-outfit-weather-meta");
const wardrobeViewOutfitEl = document.getElementById("wardrobe-view-outfit");
const wardrobeAddClothesEl = document.getElementById("wardrobe-add-clothes");
const wardrobeAddInputEl = document.getElementById("wardrobe-add-input");
const wardrobeRecStyleEl = document.getElementById("wardrobe-rec-style");
const wardrobeRecTempEl = document.getElementById("wardrobe-rec-temp");
const wardrobeRecVisualEl = document.getElementById("wardrobe-rec-visual");
const wardrobeOutfitTitleEl = document.getElementById("wardrobe-outfit-title");
const wardrobeOutfitBodyEl = document.getElementById("wardrobe-outfit-body");
const wardrobeCatBtns = document.querySelectorAll("#page-wardrobe [data-wardrobe-cat]");
const wardrobeItemsListEl = document.getElementById("wardrobe-items-list");
const wardrobeItemsEmptyEl = document.getElementById("wardrobe-items-empty");
const wardrobePickGalleryEl = document.getElementById("wardrobe-pick-gallery");
const wardrobePickCameraEl = document.getElementById("wardrobe-pick-camera");
const wardrobeCaptureModalEl = document.getElementById("modal-wardrobe-capture");
const wardrobeCaptureVideoEl = document.getElementById("wardrobe-capture-video");
const wardrobeCaptureShutterEl = document.getElementById("wardrobe-capture-shutter");
const wardrobeCaptureCloseEl = document.getElementById("wardrobe-capture-close");
const wardrobeCaptureFlipEl = document.getElementById("wardrobe-capture-flip");
const wardrobeCatModalEl = document.getElementById("modal-wardrobe-cat");
const wardrobeCatSkipEl = document.getElementById("wardrobe-cat-skip");
const wardrobeCatCancelEl = document.getElementById("wardrobe-cat-cancel");
const wardrobeStorageBodyEl = document.getElementById("wardrobe-storage-body");

let currentWardrobeCat = "dresses";
/** @type {"user" | "environment"} */
let wardrobeCaptureFacingMode = "user";
/** @type {File[] | null} */
let wardrobePendingFiles = null;
/** @type {null | { tcur: number; tmin: number; tmax: number; precipToday?: number; code?: number; isApprox: boolean; suggestion: { style: string; hint: string } }} */
let wardrobeWeatherState = null;

function getGeoPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    );
  });
}

function weatherCodeLabel(code) {
  const c = Number(code);
  if (c === 0) return "晴";
  if ([1, 2, 3].includes(c)) return "多云";
  if ([45, 48].includes(c)) return "雾";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(c)) return "有雨";
  if ([71, 73, 75, 77, 85, 86].includes(c)) return "降雪";
  return "多云";
}

function outfitSuggestionFromTemp(tmin, tmax, tcur) {
  const lo = tmin != null ? Number(tmin) : null;
  const hi = tmax != null ? Number(tmax) : null;
  const cur = tcur != null ? Number(tcur) : null;
  const mid = cur != null ? cur : lo != null && hi != null ? (lo + hi) / 2 : 22;
  const dayHi = hi != null ? hi : mid + 3;
  if (dayHi >= 32) {
    return { style: "清凉透气风", hint: "高温天优选亚麻、真丝混纺与透气凉鞋，注意防晒与补水。" };
  }
  if (dayHi >= 28) {
    return { style: "休闲轻盈风", hint: "气温偏高，短袖/吊带配薄开衫，室内外温差备一件可脱外套。" };
  }
  if (mid >= 20 && dayHi <= 30) {
    return { style: "休闲通勤风", hint: "叠穿衬衫、针织与西装外套都合适，裙装可配玛丽珍或乐福鞋。" };
  }
  if (mid < 8) {
    return { style: "保暖叠穿风", hint: "羽绒服/厚呢＋围巾手套；内层选发热打底更锁温。" };
  }
  if (mid < 16) {
    return { style: "轻暖过渡风", hint: "风衣、薄呢与毛衣组合，下装可选直筒牛仔或毛呢半裙。" };
  }
  return { style: "舒适通勤风", hint: "洋葱式穿法方便穿脱，防风面料更省心。" };
}

function updateWardrobeStorageCopy() {
  if (!wardrobeStorageBodyEl) return;
  const p = wardrobeWeatherState?.precipToday;
  const hi = wardrobeWeatherState?.tmax;
  if (p != null && p > 1) {
    wardrobeStorageBodyEl.textContent =
      "今日降水偏多，真皮包袋宜入防潮柜；真丝与雪纺建议悬挂通风，棉针织可折叠平放避免受潮。";
  } else if (hi != null && hi >= 30) {
    wardrobeStorageBodyEl.textContent =
      "高温天棉麻类可折叠收纳节省空间；易汗衣物与防晒外套建议单独隔层，避免串味。";
  } else {
    wardrobeStorageBodyEl.textContent = "建议悬挂易皱真丝衣物，折叠收纳棉质 T 恤与针织；围巾腰带可用小抽屉盒分区。";
  }
}

function buildWardrobeOutfitMetaLine() {
  const w = wardrobeWeatherState;
  const sug = w?.suggestion || outfitSuggestionFromTemp(null, null, null);
  if (w && w.tmin != null && w.tmax != null) {
    return `气温 ${Math.round(w.tmin)}-${Math.round(w.tmax)}℃ · ${sug.style}`;
  }
  if (w && w.tcur != null) {
    return `当前约 ${Math.round(w.tcur)}℃ · ${sug.style}`;
  }
  const d = wardrobeCatalog[currentWardrobeCat];
  if (!d) return "气温读取中…";
  const tempPart = d.tempRange.replace(/^适宜\s*/, "适宜 ");
  return `${tempPart} · ${d.style.replace(/\|\s*$/, "").trim()}`;
}

async function refreshWardrobeWeather() {
  if (wardrobeWeatherTextEl) wardrobeWeatherTextEl.textContent = "定位与天气读取中…";
  try {
    const pos = await getGeoPosition();
    const lat = pos?.lat ?? 39.9042;
    const lon = pos?.lon ?? 116.4074;
    const approx = !pos;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=1`;
    const r = await fetch(url);
    if (!r.ok) throw new Error("weather");
    const j = await r.json();
    const tcur = j.current?.temperature_2m;
    const tmin = j.daily?.temperature_2m_min?.[0];
    const tmax = j.daily?.temperature_2m_max?.[0];
    const precipToday = j.daily?.precipitation_sum?.[0];
    const code = j.current?.weather_code;
    const suggestion = outfitSuggestionFromTemp(tmin, tmax, tcur);
    wardrobeWeatherState = {
      tcur,
      tmin,
      tmax,
      precipToday,
      code,
      isApprox: approx,
      suggestion
    };
    updateWardrobeStorageCopy();
    if (wardrobeWeatherTextEl) {
      const loc = approx ? "未定位 · 北京参考" : "基于当前位置";
      const sky = weatherCodeLabel(code);
      const curTxt = tcur != null ? `当前约 ${Math.round(tcur)}℃` : "";
      const rangeTxt =
        tmin != null && tmax != null ? `今 ${Math.round(tmin)}–${Math.round(tmax)}℃` : "";
      wardrobeWeatherTextEl.textContent = [loc, sky, rangeTxt, curTxt].filter(Boolean).join(" · ");
    }
  } catch {
    wardrobeWeatherState = null;
    if (wardrobeWeatherTextEl) wardrobeWeatherTextEl.textContent = "天气暂时不可用，点击 ↻ 重试";
    updateWardrobeStorageCopy();
  }
}

async function refreshWardrobePageContext() {
  await refreshWardrobeWeather();
  renderWardrobeRecommendation(currentWardrobeCat);
  renderWardrobeItemsList();
}

const WARDROBE_CAT_KEYS = ["tops", "bottoms", "dresses", "accessories"];

function getWardrobeCategoryCounts() {
  const counts = { tops: 0, bottoms: 0, dresses: 0, accessories: 0 };
  getWardrobeItems().forEach((item) => {
    const c = item.cat && WARDROBE_CAT_KEYS.includes(item.cat) ? item.cat : "tops";
    counts[c]++;
  });
  return counts;
}

function updateWardrobeCategoryCounts() {
  const counts = getWardrobeCategoryCounts();
  const map = {
    tops: "wardrobe-count-tops",
    bottoms: "wardrobe-count-bottoms",
    dresses: "wardrobe-count-dresses",
    accessories: "wardrobe-count-accessories"
  };
  WARDROBE_CAT_KEYS.forEach((k) => {
    const el = document.getElementById(map[k]);
    if (el) el.textContent = `${counts[k]} 件`;
  });
}

async function flushWardrobePending(cat) {
  const files = wardrobePendingFiles;
  wardrobePendingFiles = null;
  closeModal("wardrobe-cat");
  if (!files?.length) return;
  await addWardrobeItemsFromFiles(files, cat || "tops");
}

function decodeImageFromFile(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

async function fileToThumbDataUrl(file) {
  const img = await decodeImageFromFile(file);
  if (!img || !img.width) return null;
  const maxW = 140;
  const w = Math.min(maxW, img.width);
  const h = Math.round((img.height * w) / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  let q = 0.55;
  let data = "";
  for (let i = 0; i < 5; i++) {
    data = canvas.toDataURL("image/jpeg", q);
    if (data.length <= 96000) break;
    q -= 0.1;
  }
  return data.length > 120000 ? null : data;
}

function getWardrobeItems() {
  try {
    const raw = localStorage.getItem(WARDROBE_ITEMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveWardrobeItems(items) {
  try {
    localStorage.setItem(WARDROBE_ITEMS_KEY, JSON.stringify(items.slice(0, 200)));
  } catch {
    showToast("本地存储失败，请检查浏览器存储空间或删除部分衣物。");
  }
}

async function addWardrobeItemsFromFiles(fileList, cat = "tops") {
  const files = Array.from(fileList || []).filter((f) => f && f.name);
  if (!files.length) return;
  const safeCat = WARDROBE_CAT_KEYS.includes(cat) ? cat : "tops";
  const items = getWardrobeItems();
  const baseTs = Date.now();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const thumb = await fileToThumbDataUrl(file);
    items.unshift({
      name: file.name,
      ts: baseTs + i,
      kind: "image",
      cat: safeCat,
      ...(thumb ? { thumb } : {})
    });
  }
  saveWardrobeItems(items);
  renderWardrobeItemsList();
  showToast(`已添加 ${files.length} 件衣物`);
}

function renderWardrobeItemsList() {
  if (!wardrobeItemsListEl || !wardrobeItemsEmptyEl) return;
  const items = getWardrobeItems();
  if (!items.length) {
    wardrobeItemsEmptyEl.hidden = false;
    wardrobeItemsListEl.hidden = true;
    wardrobeItemsListEl.innerHTML = "";
    return;
  }
  wardrobeItemsEmptyEl.hidden = true;
  wardrobeItemsListEl.hidden = false;
  wardrobeItemsListEl.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "wardrobe-item";
    let thumbEl;
    if (item.thumb) {
      thumbEl = document.createElement("img");
      thumbEl.className = "wardrobe-item-thumb";
      thumbEl.src = item.thumb;
      thumbEl.alt = "";
    } else {
      thumbEl = document.createElement("div");
      thumbEl.className = "wardrobe-item-thumb wardrobe-item-thumb--ph";
      thumbEl.setAttribute("aria-hidden", "true");
      thumbEl.textContent = "👔";
    }
    const meta = document.createElement("div");
    meta.className = "wardrobe-item-meta";
    const nameEl = document.createElement("div");
    nameEl.className = "wardrobe-item-name";
    nameEl.textContent = item.name || "未命名";
    const dateEl = document.createElement("div");
    dateEl.className = "wardrobe-item-date";
    const d = item.ts ? new Date(item.ts) : new Date();
    dateEl.textContent = d.toLocaleString("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    meta.append(nameEl, dateEl);
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "wardrobe-item-remove";
    rm.setAttribute("aria-label", "删除");
    rm.dataset.wardrobeRemoveIndex = String(index);
    rm.textContent = "×";
    li.append(thumbEl, meta, rm);
    wardrobeItemsListEl.appendChild(li);
  });
  updateWardrobeCategoryCounts();
}

function removeWardrobeItemAtIndex(index) {
  const items = getWardrobeItems();
  if (index < 0 || index >= items.length) return;
  items.splice(index, 1);
  saveWardrobeItems(items);
  renderWardrobeItemsList();
  showToast("已删除");
}

function updateWardrobeFlipButtonLabel() {
  if (!wardrobeCaptureFlipEl) return;
  const isUser = wardrobeCaptureFacingMode === "user";
  wardrobeCaptureFlipEl.setAttribute("aria-label", isUser ? "切换为后置摄像头" : "切换为前置摄像头");
  wardrobeCaptureFlipEl.title = isUser ? "切换为后置" : "切换为前置";
}

async function startWardrobeCapturePreview() {
  if (!wardrobeCaptureVideoEl) return;
  stopWardrobeCaptureIfAny();
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast("当前环境不支持摄像头，请使用相册添加。");
    closeModal("wardrobe-capture");
    return;
  }
  const requestStream = (facing) =>
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: facing }, width: { ideal: 720 } },
      audio: false
    });
  try {
    wardrobeCaptureStream = await requestStream(wardrobeCaptureFacingMode);
  } catch {
    if (wardrobeCaptureFacingMode === "environment") {
      try {
        wardrobeCaptureFacingMode = "user";
        wardrobeCaptureStream = await requestStream("user");
        showToast("后置不可用，已切回前置。");
      } catch {
        showToast("无法打开摄像头，请检查权限或改用相册。");
        closeModal("wardrobe-capture");
        return;
      }
    } else {
      showToast("无法打开摄像头，请检查权限或改用相册。");
      closeModal("wardrobe-capture");
      return;
    }
  }
  try {
    wardrobeCaptureVideoEl.srcObject = wardrobeCaptureStream;
    await wardrobeCaptureVideoEl.play();
    updateWardrobeFlipButtonLabel();
  } catch {
    showToast("预览启动失败，请重试。");
    closeModal("wardrobe-capture");
  }
}

function setActiveWardrobeCat(cat) {
  wardrobeCatBtns.forEach((btn) => {
    const on = btn.dataset.wardrobeCat === cat;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", on ? "true" : "false");
  });
}

function renderWardrobeRecommendation(cat) {
  const d = wardrobeCatalog[cat];
  if (!d) return;
  currentWardrobeCat = cat;
  setActiveWardrobeCat(cat);
  if (wardrobeRecStyleEl) wardrobeRecStyleEl.textContent = d.style;
  if (wardrobeRecTempEl) wardrobeRecTempEl.textContent = d.tempRange;
  if (wardrobeRecVisualEl) wardrobeRecVisualEl.dataset.wardrobeCat = cat;
  if (wardrobeOutfitMetaEl) wardrobeOutfitMetaEl.textContent = buildWardrobeOutfitMetaLine();
}

function openWardrobeOutfitModal() {
  const d = wardrobeCatalog[currentWardrobeCat];
  if (!d) return;
  const w = wardrobeWeatherState;
  const sug = w?.suggestion || outfitSuggestionFromTemp(w?.tmin, w?.tmax, w?.tcur);
  const parts = [];
  if (w && w.tmin != null && w.tmax != null) {
    parts.push(
      `【天气】约 ${Math.round(w.tmin)}-${Math.round(w.tmax)}℃（${w.isApprox ? "参考定位" : "本地预报"}）\n${sug.hint}`
    );
  } else if (w && w.tcur != null) {
    parts.push(`【天气】当前约 ${Math.round(w.tcur)}℃\n${sug.hint}`);
  }
  if (wardrobeStorageBodyEl?.textContent) {
    parts.push(`【收纳】${wardrobeStorageBodyEl.textContent}`);
  }
  parts.push(`【${d.title}】\n${d.outfitDetail}`);
  if (wardrobeOutfitTitleEl) wardrobeOutfitTitleEl.textContent = "搭配与收纳详情";
  if (wardrobeOutfitBodyEl) wardrobeOutfitBodyEl.textContent = parts.join("\n\n");
  openModal("wardrobe-outfit");
}

function initWardrobePage() {
  renderWardrobeRecommendation("dresses");
  renderWardrobeItemsList();

  wardrobeBackEl?.addEventListener("click", () => switchPage("home"));

  wardrobeHeaderAddEl?.addEventListener("click", () => openModal("wardrobe-add"));

  wardrobeWeatherRefreshEl?.addEventListener("click", () => {
    void refreshWardrobeWeather().then(() => renderWardrobeRecommendation(currentWardrobeCat));
  });

  wardrobeCatModalEl?.addEventListener("click", (e) => {
    if (e.target === wardrobeCatModalEl) {
      wardrobePendingFiles = null;
      closeModal("wardrobe-cat");
    }
  });

  wardrobeCatSkipEl?.addEventListener("click", () => void flushWardrobePending("tops"));

  wardrobeCatCancelEl?.addEventListener("click", () => {
    wardrobePendingFiles = null;
    closeModal("wardrobe-cat");
  });

  document.querySelectorAll("[data-wardrobe-bulk-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-wardrobe-bulk-cat");
      if (!cat) return;
      void flushWardrobePending(cat);
    });
  });

  wardrobeCatBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.wardrobeCat;
      if (!cat || !wardrobeCatalog[cat]) return;
      renderWardrobeRecommendation(cat);
    });
  });

  wardrobeViewOutfitEl?.addEventListener("click", () => openWardrobeOutfitModal());

  wardrobeItemsListEl?.addEventListener("click", (e) => {
    const rmBtn = e.target.closest("[data-wardrobe-remove-index]");
    if (!rmBtn || !wardrobeItemsListEl.contains(rmBtn)) return;
    const idx = Number(rmBtn.dataset.wardrobeRemoveIndex);
    if (Number.isFinite(idx)) removeWardrobeItemAtIndex(idx);
  });

  wardrobeAddClothesEl?.addEventListener("click", () => openModal("wardrobe-add"));

  wardrobePickGalleryEl?.addEventListener("click", () => {
    closeModal("wardrobe-add");
    wardrobeAddInputEl?.click();
  });

  function openWardrobeCategoryPicker(files) {
    const arr = Array.from(files || []).filter((f) => f && f.name);
    if (!arr.length) return;
    wardrobePendingFiles = arr;
    openModal("wardrobe-cat");
  }

  wardrobePickCameraEl?.addEventListener("click", () => {
    closeModal("wardrobe-add");
    wardrobeCaptureFacingMode = "user";
    updateWardrobeFlipButtonLabel();
    openModal("wardrobe-capture");
    requestAnimationFrame(() => {
      startWardrobeCapturePreview();
    });
  });

  wardrobeCaptureFlipEl?.addEventListener("click", () => {
    wardrobeCaptureFacingMode = wardrobeCaptureFacingMode === "user" ? "environment" : "user";
    startWardrobeCapturePreview();
  });

  wardrobeCaptureModalEl?.addEventListener("click", (e) => {
    if (e.target === wardrobeCaptureModalEl) closeModal("wardrobe-capture");
  });

  wardrobeCaptureCloseEl?.addEventListener("click", () => closeModal("wardrobe-capture"));

  wardrobeCaptureShutterEl?.addEventListener("click", () => {
    const video = wardrobeCaptureVideoEl;
    if (!video?.videoWidth) {
      showToast("请稍等画面就绪后再拍。");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          showToast("拍摄失败，请重试。");
          return;
        }
        const file = new File([blob], `wardrobe-${Date.now()}.jpg`, { type: "image/jpeg" });
        closeModal("wardrobe-capture");
        openWardrobeCategoryPicker([file]);
      },
      "image/jpeg",
      0.88
    );
  });

  wardrobeAddInputEl?.addEventListener("change", () => {
    openWardrobeCategoryPicker(wardrobeAddInputEl.files);
    wardrobeAddInputEl.value = "";
  });
}

const BF_AVATAR_VER = "20260426p2";

/**
 * GitHub Pages 项目站位于 /仓库名/ 下时，若入口 URL 缺少尾部斜杠，或部分内置浏览器解析异常，
 * 相对路径 `./assets/...` 可能错解析到 `github.io/assets/...` 而 404。此处用 pathname 拼出站点根前缀。
 */
function limmeAssetBase() {
  if (typeof location === "undefined") return "./";
  if (location.protocol === "file:") return "./";
  let path = location.pathname.replace(/\/index\.html?$/i, "");
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function bfAvatarUrl(fileName) {
  return `${limmeAssetBase()}assets/${fileName}?v=${BF_AVATAR_VER}`;
}

function preloadBoyfriendAvatars() {
  BF_PERSONAS.forEach((p) => {
    if (!p.avatarFile) return;
    const img = new Image();
    img.src = bfAvatarUrl(p.avatarFile);
  });
}

const BF_PERSONAS = [
  {
    id: "lu_yu",
    name: "陆屿",
    tag: "温柔慢热 · 稳稳接住你的情绪",
    emoji: "🌙",
    avatarFile: "bf-v2-lu-yu.png",
    opening: "嗨，我在这儿。今天不用逞强也行，想聊什么都可以。",
    systemPrompt:
      "你是甜先生 Mr. Sweet 里的陪聊数字人「陆屿」，26 岁上下的男生语气，温柔、克制、善于倾听。你会用短句回应，偶尔轻轻开一句玩笑暖场，但不油腻。用户低落时先共情再给微小可行建议。禁止说教、禁止扮演真人医生或律师。",
    suggestLines: [
      "今天在地铁上看到一对老夫妻牵手，突然想你了。",
      "我有点累，你愿意听我废话五分钟吗？",
      "骂我两句也行，不然我老憋着。"
    ]
  },
  {
    id: "pei_ye",
    name: "裴野",
    tag: "痞气会撩 · 专治不开心",
    emoji: "😏",
    avatarFile: "bf-v2-pei-ye.png",
    opening: "哟，这是谁家小朋友跑我这儿来了？说吧，今天谁惹你不高兴了，我替你记小本本。",
    systemPrompt:
      "你是甜先生 Mr. Sweet 里的陪聊数字人「裴野」，嘴贫但懂分寸，像关系很好的异性朋友。多用幽默、反转、轻微推拉逗用户笑，不人身攻击、不涉及色情细节。拒绝油腻霸总话术。用户真难过时要收敛玩笑先安慰。",
    suggestLines: ["裴老师上线，今天提供限量版捏脸服务。", "给我个表现机会，我保证比甲方好沟通。", "请你喝赛博奶茶，三分糖去冰。"]
  },
  {
    id: "qin_lang",
    name: "秦朗",
    tag: "兵马俑卫衣理工梗王 · 陪你逛展也行",
    emoji: "🗿",
    avatarFile: "bf-v2-qin-lang.png",
    opening:
      "刚从那件「骑兵卫衣」灵感里出来——今天要不要跟我去云上博物馆散步？我背着冷知识随时解说。",
    systemPrompt:
      "你是甜先生 Mr. Sweet 里的陪聊数字人「秦朗」，爱穿文化梗卫衣的理工感男友风聊天对象。说话里可以自然融入历史梗、博物馆话术、兵马俑与丝绸之路一类轻松知识点，用有趣类比讲日常烦恼（例如把 deadline 比作考古发掘防尘层）。轻松逗乐为主，不做严肃史学考据争论。禁止敏感政治议题。",
    suggestLines: [
      "今日出土心情碎片一件，要帮我登记编号吗？",
      "我发现你把周一过成了急救现场，需要策展人吗？",
      "要不要听我用三分钟讲「拖延的像素如何坍缩」。"
    ]
  },
  {
    id: "lin_che",
    name: "林澈",
    tag: "年下清爽 · 直球小狗型",
    emoji: "🐕",
    avatarFile: "bf-v2-lin-che.png",
    opening: "姐姐，今天要加班吗？我刚把心情调好，等你戳我一下。",
    systemPrompt:
      "你是甜先生 Mr. Sweet 里的陪聊数字人「林澈」，清爽少年感语气，真诚直球，俏皮但有礼貌。若用户表示不喜欢被称呼姐姐/哥哥，立刻改用中性称呼。可撒娇式关心，不涉及性暗示。",
    suggestLines: ["报告，今天也想当你的情绪外挂。", "我在练习一本正经说胡话，你要当评委吗？", "说点开心的，我知道你很厉害。"]
  }
];

const bfPersonasById = new Map(BF_PERSONAS.map((p) => [p.id, p]));
let bfActiveId = null;
const bfThread = [];
let bfLastAiText = "";

const bfToHomeEl = document.getElementById("bf-to-home");
const bfOpenAiTipEl = document.getElementById("bf-open-ai-tip");
const bfPanelPickEl = document.getElementById("bf-panel-pick");
const bfPanelRoomEl = document.getElementById("bf-panel-room");
const bfRoomHeadEl = document.getElementById("bf-room-head");
const bfPersonaGridEl = document.getElementById("bf-persona-grid");
const bfRoomAvatarImgEl = document.getElementById("bf-room-avatar-img");
const bfRoomNameEl = document.getElementById("bf-room-name");
const bfRoomTagEl = document.getElementById("bf-room-tag");
const bfChangePartnerEl = document.getElementById("bf-change-partner");
const bfClearThreadEl = document.getElementById("bf-clear-thread");
const bfChatScrollEl = document.getElementById("bf-chat-scroll");
const bfInputEl = document.getElementById("bf-input");
const bfSendEl = document.getElementById("bf-send");
const bfSpeakLastEl = document.getElementById("bf-speak-last");
const bfSuggestLineEl = document.getElementById("bf-suggest-line");
const bfVideoOverlayEl = document.getElementById("bf-video-overlay");
const bfVideoToggleEl = document.getElementById("bf-video-toggle");
const bfVideoBackTextEl = document.getElementById("bf-video-back-text");
const bfVideoPeerNameEl = document.getElementById("bf-video-peer-name");
const bfVideoSubEl = document.getElementById("bf-video-sub");
const bfVideoRemoteAvatarEl = document.getElementById("bf-video-remote-avatar");
const bfVideoLocalEl = document.getElementById("bf-video-local");
const bfVideoMuteEl = document.getElementById("bf-video-mute");
const bfVideoSpeakerEl = document.getElementById("bf-video-speaker");
const bfVideoPttEl = document.getElementById("bf-video-ptt");
const bfVideoFlipEl = document.getElementById("bf-video-flip");
const bfVideoHangupEl = document.getElementById("bf-video-hangup");

let bfVideoStream = null;
let bfVideoSpeakerOn = true;
let bfVideoFacingUser = true;
let bfVideoRecognition = null;
let bfVideoPttHeld = false;
let bfVideoPttCaptureId = null;

if (bfRoomAvatarImgEl) {
  bfRoomAvatarImgEl.src = bfAvatarUrl("bf-v2-lu-yu.png");
}

function appendBfBubble(text, role = "ai") {
  if (!bfChatScrollEl || !text) return;
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role === "user" ? "bubble-user" : "bubble-ai"}`;
  bubble.textContent = text;
  bfChatScrollEl.appendChild(bubble);
  bfChatScrollEl.scrollTop = bfChatScrollEl.scrollHeight;
}

function trimBfThread() {
  const maxPairs = 14;
  while (bfThread.length > maxPairs * 2) bfThread.splice(0, 2);
}

function buildBoyfriendLocalReply(persona, userText) {
  const t = userText.trim();
  if (!t) return "我在这呢，随便丢一句过来也行。";
  if (/帅|好看|酷/.test(t)) {
    return persona.id === "pei_ye"
      ? "夸我可以，今天心情打折付我一句谢谢就行。"
      : "被你夸一下，今天算加班也值了。";
  }
  if (/累|烦|崩|难受|哭/.test(t)) {
    return persona.id === "pei_ye"
      ? "来，气势拿出来——先骂我两句出气，再慢慢说事。"
      : "先深呼吸三次，我慢慢听，你说到哪算哪。";
  }
  if (/哈|哈哈|呵|笑/.test(t)) return "笑声收到，已存档，下次心情不好就回放给你听。";
  if (/睡|晚安/.test(t)) return "晚安，把手机扔远点，梦里有我站岗。";
  if (/吃|饿|奶茶/.test(t)) return "按时吃饭，不然我会启动碎碎念模式。";
  return `${persona.name}：我听到啦。再说细一点，我陪你接一个梗也好、认真也好。`;
}

async function getBoyfriendReply(userText) {
  const persona = bfPersonasById.get(bfActiveId);
  if (!persona) return "先选一位聊天对象吧。";
  const cfg = getAIConfig();
  const systemContent = `${persona.systemPrompt}\n\n【人设锚点】开场气质参考：${persona.opening}\n回复用几段中文内口语完成，可用括号补充动作感但不要每场都用。`;
  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) {
    return buildBoyfriendLocalReply(persona, userText);
  }
  const history = bfThread.map((m) => ({ role: m.role, content: m.content }));
  const apiMessages = [{ role: "system", content: systemContent }, ...history, { role: "user", content: userText }];
  try {
    const text = await postChatCompletion(apiMessages, 0.88);
    return text || buildBoyfriendLocalReply(persona, userText);
  } catch (error) {
    showToast(`数字人接口失败：${error.message}`);
    return buildBoyfriendLocalReply(persona, userText);
  }
}

function bfVideoCallOpen() {
  return bfVideoOverlayEl && !bfVideoOverlayEl.classList.contains("is-hidden");
}

function stopBfCamera() {
  if (bfVideoStream) {
    bfVideoStream.getTracks().forEach((t) => t.stop());
    bfVideoStream = null;
  }
  if (bfVideoLocalEl) bfVideoLocalEl.srcObject = null;
}

function closeBfVideoCall(options = {}) {
  stopBfCamera();
  window.speechSynthesis?.cancel();
  if (bfVideoOverlayEl) {
    bfVideoOverlayEl.classList.add("is-hidden");
    bfVideoOverlayEl.setAttribute("aria-hidden", "true");
  }
  if (options.toast) showToast(options.toast);
}

function syncBfVideoRemoteAvatarFromRoom() {
  if (!bfVideoRemoteAvatarEl || !bfRoomAvatarImgEl) return;
  const src = bfRoomAvatarImgEl.currentSrc || bfRoomAvatarImgEl.src;
  if (src) bfVideoRemoteAvatarEl.src = src;
  const persona = bfPersonasById.get(bfActiveId);
  bfVideoRemoteAvatarEl.alt = persona ? `${persona.name} · 数字人` : "数字人";
}

async function startBfCamera() {
  if (!bfVideoLocalEl || !navigator.mediaDevices?.getUserMedia) {
    showToast("当前环境不支持摄像头预览。");
    return false;
  }
  stopBfCamera();
  try {
    bfVideoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: bfVideoFacingUser ? "user" : "environment" },
      audio: true
    });
    bfVideoLocalEl.srcObject = bfVideoStream;
    await bfVideoLocalEl.play().catch(() => {});
    return true;
  } catch (err) {
    showToast(`无法开启摄像头：${err?.name || err?.message || "权限被拒绝"}`);
    return false;
  }
}

async function flipBfCamera() {
  bfVideoFacingUser = !bfVideoFacingUser;
  if (bfVideoCallOpen()) await startBfCamera();
}

async function openBfVideoCall() {
  if (!bfActiveId) {
    showToast("请先选择聊天对象。");
    return;
  }
  if (!bfVideoOverlayEl) return;
  if (bfVideoPeerNameEl && bfRoomNameEl) bfVideoPeerNameEl.textContent = bfRoomNameEl.textContent || "对方";
  if (bfVideoSubEl) bfVideoSubEl.textContent = "视频通话 · 数字人";
  syncBfVideoRemoteAvatarFromRoom();
  bfVideoOverlayEl.classList.remove("is-hidden");
  bfVideoOverlayEl.setAttribute("aria-hidden", "false");
  await startBfCamera();
}

function ensureBfVideoRecognition() {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) return null;
  if (!bfVideoRecognition) {
    const r = new Ctor();
    r.lang = "zh-CN";
    r.interimResults = false;
    r.continuous = false;
    r.maxAlternatives = 1;
    r.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript?.trim();
      if (text) void deliverBoyfriendUtterance(text, { silentEmpty: true });
      else showToast("没听清，松开后再试一次。");
    };
    r.onerror = (event) => {
      const err = event.error;
      if (err === "aborted" || err === "no-speech") return;
      showToast(`语音识别：${err}`);
    };
    bfVideoRecognition = r;
  }
  return bfVideoRecognition;
}

async function deliverBoyfriendUtterance(text, options = {}) {
  const { silentEmpty = false } = options;
  const t = (text || "").trim();
  if (!t) {
    if (!silentEmpty) showToast("先写点什么再发送～");
    return false;
  }
  if (!bfActiveId) {
    showToast("请先选一位对象。");
    return false;
  }
  appendBfBubble(t, "user");
  trimBfThread();
  if (bfSendEl) bfSendEl.disabled = true;
  try {
    const reply = await getBoyfriendReply(t);
    bfThread.push({ role: "user", content: t });
    bfThread.push({ role: "assistant", content: reply });
    trimBfThread();
    appendBfBubble(reply, "ai");
    bfLastAiText = reply;
    if (bfVideoCallOpen() && bfVideoSpeakerOn) speakText(reply);
    return true;
  } finally {
    if (bfSendEl) bfSendEl.disabled = false;
  }
}

function clearBfRoomTheme() {
  bfPanelRoomEl?.removeAttribute("data-bf-theme");
  if (bfRoomHeadEl) bfRoomHeadEl.className = "bf-room-head";
}

function applyBfRoomTheme(personaId) {
  if (!bfPanelRoomEl || !personaId) return;
  bfPanelRoomEl.setAttribute("data-bf-theme", personaId);
}

function showBfPickPanel() {
  closeBfVideoCall();
  clearBfRoomTheme();
  bfPanelPickEl?.classList.remove("is-hidden");
  bfPanelRoomEl?.classList.add("is-hidden");
}

function showBfRoomPanel() {
  bfPanelPickEl?.classList.add("is-hidden");
  bfPanelRoomEl?.classList.remove("is-hidden");
}

function resetBoyfriendOpening() {
  const persona = bfPersonasById.get(bfActiveId);
  if (!persona || !bfChatScrollEl) return;
  bfThread.length = 0;
  bfLastAiText = "";
  bfChatScrollEl.innerHTML = "";
  appendBfBubble(persona.opening, "ai");
  bfLastAiText = persona.opening;
}

function openBoyfriendRoom(persona) {
  closeBfVideoCall();
  bfActiveId = persona.id;
  bfThread.length = 0;
  bfLastAiText = "";
  if (bfRoomAvatarImgEl && persona.avatarFile) {
    const src = bfAvatarUrl(persona.avatarFile);
    bfRoomAvatarImgEl.removeAttribute("src");
    bfRoomAvatarImgEl.loading = "eager";
    bfRoomAvatarImgEl.decoding = "async";
    requestAnimationFrame(() => {
      bfRoomAvatarImgEl.src = src;
      syncBfVideoRemoteAvatarFromRoom();
    });
    bfRoomAvatarImgEl.alt = `${persona.name} · 甜先生 Mr. Sweet 数字人`;
  }
  if (bfRoomHeadEl) {
    bfRoomHeadEl.className = "bf-room-head";
    bfRoomHeadEl.classList.add(`bf-room-head--${persona.id}`);
  }
  applyBfRoomTheme(persona.id);
  if (bfRoomNameEl) bfRoomNameEl.textContent = persona.name;
  if (bfRoomTagEl) bfRoomTagEl.textContent = persona.tag;
  if (bfChatScrollEl) bfChatScrollEl.innerHTML = "";
  appendBfBubble(persona.opening, "ai");
  bfLastAiText = persona.opening;
  showBfRoomPanel();
  bfInputEl?.focus();
  showToast(`已接入 ${persona.name}，随便撩一句试试～`);
}

function renderBoyfriendPersonaCards() {
  if (!bfPersonaGridEl) return;
  bfPersonaGridEl.innerHTML = "";
  BF_PERSONAS.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bf-persona-card";
    btn.dataset.bfPersona = p.id;
    btn.setAttribute("role", "listitem");
    const src = p.avatarFile ? bfAvatarUrl(p.avatarFile) : "";
    btn.innerHTML = `<div class="bf-persona-avatar" aria-hidden="true"><img src="${src}" alt="" width="52" height="52" loading="eager" decoding="async" fetchpriority="high"></div><div class="bf-persona-name">${p.name}</div><div class="bf-persona-tag">${p.tag}</div>`;
    btn.addEventListener("click", () => openBoyfriendRoom(p));
    bfPersonaGridEl.appendChild(btn);
  });
}

async function sendBoyfriendMessage() {
  const text = bfInputEl?.value?.trim() || "";
  if (!text) {
    showToast("先写点什么再发送～");
    return;
  }
  if (!bfActiveId) {
    showToast("请先选一位对象。");
    return;
  }
  if (bfInputEl) bfInputEl.value = "";
  await deliverBoyfriendUtterance(text, { silentEmpty: true });
}

function initBoyfriendPage() {
  renderBoyfriendPersonaCards();
  bfToHomeEl?.addEventListener("click", () => switchPage("home"));
  bfOpenAiTipEl?.addEventListener("click", () => {
    showToast("与首页相同：右上角 ⚙️ 可配置接口、模型与 Key");
    openModal("ai");
  });
  bfChangePartnerEl?.addEventListener("click", () => showBfPickPanel());
  bfClearThreadEl?.addEventListener("click", () => {
    resetBoyfriendOpening();
    showToast("会话已清空，重新开场。");
  });
  bfSendEl?.addEventListener("click", () => void sendBoyfriendMessage());
  bfInputEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendBoyfriendMessage();
    }
  });
  bfSpeakLastEl?.addEventListener("click", () => {
    if (!bfLastAiText) {
      showToast("还没有可朗读的回复。");
      return;
    }
    speakText(bfLastAiText);
  });
  bfSuggestLineEl?.addEventListener("click", () => {
    const persona = bfPersonasById.get(bfActiveId);
    if (!persona) {
      showToast("先进入聊天房间。");
      return;
    }
    const lines = persona.suggestLines || ["今天发生一件小事想跟你讲。"];
    const pick = lines[Math.floor(Math.random() * lines.length)];
    if (bfInputEl) bfInputEl.value = pick;
    bfInputEl?.focus();
    showToast("已填入一句，可改改再发。");
  });

  bfVideoToggleEl?.addEventListener("click", () => void openBfVideoCall());
  bfVideoBackTextEl?.addEventListener("click", () => closeBfVideoCall({ toast: "已切回文字聊天" }));
  bfVideoHangupEl?.addEventListener("click", () => closeBfVideoCall({ toast: "视频通话已结束" }));
  bfVideoMuteEl?.addEventListener("click", () => {
    const tracks = bfVideoStream?.getAudioTracks?.() || [];
    if (!tracks.length) {
      showToast("麦克风未就绪。");
      return;
    }
    tracks.forEach((tr) => {
      tr.enabled = !tr.enabled;
    });
    const muted = !tracks[0].enabled;
    bfVideoMuteEl?.classList.toggle("is-muted", muted);
    bfVideoMuteEl?.setAttribute("aria-pressed", muted ? "true" : "false");
  });
  bfVideoSpeakerEl?.addEventListener("click", () => {
    bfVideoSpeakerOn = !bfVideoSpeakerOn;
    bfVideoSpeakerEl?.setAttribute("aria-pressed", bfVideoSpeakerOn ? "true" : "false");
    bfVideoSpeakerEl?.classList.toggle("is-muted", !bfVideoSpeakerOn);
    if (!bfVideoSpeakerOn) window.speechSynthesis?.cancel();
    showToast(bfVideoSpeakerOn ? "扬声器：开（会朗读数字人回复）" : "扬声器：关（仅文字）");
  });
  bfVideoFlipEl?.addEventListener("click", () => void flipBfCamera());

  const ptt = bfVideoPttEl;
  if (ptt) {
    const endPtt = () => {
      if (!bfVideoPttHeld) return;
      bfVideoPttHeld = false;
      ptt.classList.remove("is-active");
      ptt.textContent = "按住 说话";
      try {
        bfVideoRecognition?.stop();
      } catch (_) {
        /* ignore */
      }
      if (bfVideoPttCaptureId != null) {
        try {
          ptt.releasePointerCapture(bfVideoPttCaptureId);
        } catch (_) {
          /* ignore */
        }
        bfVideoPttCaptureId = null;
      }
    };
    ptt.addEventListener("pointerdown", (e) => {
      if (!bfVideoCallOpen()) return;
      if (bfSendEl?.disabled) {
        showToast("等上一条说完再说话～");
        return;
      }
      const rec = ensureBfVideoRecognition();
      if (!rec) {
        showToast("当前环境不支持语音识别，请用 Chrome / Edge，或先用文字。");
        return;
      }
      e.preventDefault();
      try {
        ptt.setPointerCapture(e.pointerId);
        bfVideoPttCaptureId = e.pointerId;
      } catch (_) {
        /* ignore */
      }
      try {
        rec.start();
        bfVideoPttHeld = true;
        ptt.classList.add("is-active");
        ptt.textContent = "松开 发送";
      } catch (_) {
        showToast("请松手后再重新按住说话。");
      }
    });
    ptt.addEventListener("pointerup", endPtt);
    ptt.addEventListener("pointercancel", endPtt);
    ptt.addEventListener("lostpointercapture", endPtt);
  }
}

const HEALTH_KEYS = {
  sleep: "limme_health_sleep_v1",
  sleepTarget: "limme_health_sleep_target_v1",
  cal: "limme_health_cal_v1",
  water: "limme_health_water_v1",
  ex: "limme_health_ex_v1",
  weight: "limme_health_weight_v1",
  cycle: "limme_health_cycle_v1",
  med: "limme_health_med_v1"
};

const HEALTH_CAL_PRESETS = [
  { name: "米饭 150g", kcal: 180 },
  { name: "白粥 1 碗", kcal: 130 },
  { name: "鸡胸肉 100g", kcal: 120 },
  { name: "鸡蛋 1 个", kcal: 75 },
  { name: "牛奶 250ml", kcal: 150 },
  { name: "香蕉 1 根", kcal: 90 },
  { name: "拿铁中杯", kcal: 200 },
  { name: "可乐 330ml", kcal: 140 }
];

function healthReadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function healthWriteJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function todayDateStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseLocalDay(iso) {
  const [y, mo, da] = iso.split("-").map(Number);
  return new Date(y, mo - 1, da);
}

function addDaysToIso(iso, n) {
  const d = parseLocalDay(iso);
  d.setDate(d.getDate() + n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetweenIso(a, b) {
  const ms = parseLocalDay(b) - parseLocalDay(a);
  return Math.round(ms / 86400000);
}

function sleepDurationHours(bedStr, wakeStr) {
  const [bh, bm] = bedStr.split(":").map(Number);
  const [wh, wm] = wakeStr.split(":").map(Number);
  const b = bh * 60 + bm;
  const w = wh * 60 + wm;
  const diff = w >= b ? w - b : 24 * 60 - b + w;
  return Math.round((diff / 60) * 10) / 10;
}

function refreshHealthSleepPage() {
  const wakeDateEl = document.getElementById("sleep-wake-date");
  const bedEl = document.getElementById("sleep-bed-time");
  const wakeEl = document.getElementById("sleep-wake-time");
  const targetEl = document.getElementById("sleep-target-bed");
  const previewEl = document.getElementById("sleep-preview");
  const listEl = document.getElementById("sleep-history-list");
  const avgEl = document.getElementById("sleep-avg-display");
  if (!wakeDateEl || !bedEl || !wakeEl) return;
  const logs = healthReadJson(HEALTH_KEYS.sleep, []);
  const targetBed = localStorage.getItem(HEALTH_KEYS.sleepTarget) || "23:30";
  targetEl.value = targetBed;
  wakeDateEl.value = wakeDateEl.value || todayDateStr();
  const updatePreview = () => {
    if (!bedEl.value || !wakeEl.value) {
      previewEl.textContent = "填写入睡与醒来时间后，将显示估算睡眠时长。";
      return;
    }
    const h = sleepDurationHours(bedEl.value, wakeEl.value);
    previewEl.textContent = `估算睡眠时长：约 ${h} 小时`;
  };
  if (!bedEl.dataset.slBind) {
    bedEl.dataset.slBind = "1";
    bedEl.addEventListener("input", updatePreview);
    wakeEl.addEventListener("input", updatePreview);
  }
  updatePreview();

  const render = () => {
    const sorted = [...logs].sort((a, b) => (a.wakeDate < b.wakeDate ? 1 : -1));
    const last7 = sorted.slice(0, 7);
    const avg =
      last7.length === 0 ? null : Math.round((last7.reduce((s, x) => s + x.hours, 0) / last7.length) * 10) / 10;
    avgEl.textContent = avg == null ? "暂无数据，先保存一条睡眠记录吧。" : `近 7 条记录平均：约 ${avg} 小时 / 晚`;
    listEl.innerHTML = "";
    sorted.slice(0, 30).forEach((row) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${row.wakeDate}  睡 ${row.bed} → 起 ${row.wake}  ·  ${row.hours} h`;
      const del = document.createElement("button");
      del.type = "button";
      del.className = "health-record-del";
      del.textContent = "删";
      del.addEventListener("click", () => {
        const next = healthReadJson(HEALTH_KEYS.sleep, []).filter((x) => x.wakeDate !== row.wakeDate);
        healthWriteJson(HEALTH_KEYS.sleep, next);
        refreshHealthSleepPage();
      });
      li.append(span, del);
      listEl.appendChild(li);
    });
  };
  render();

  const saveBtn = document.getElementById("sleep-save-btn");
  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.dataset.bound = "1";
    saveBtn.addEventListener("click", () => {
      const wd = wakeDateEl.value;
      const bed = bedEl.value;
      const wake = wakeEl.value;
      if (!wd || !bed || !wake) {
        showToast("请填写完整日期与时间");
        return;
      }
      const hours = sleepDurationHours(bed, wake);
      let next = healthReadJson(HEALTH_KEYS.sleep, []).filter((x) => x.wakeDate !== wd);
      next.push({ wakeDate: wd, bed, wake, hours });
      healthWriteJson(HEALTH_KEYS.sleep, next);
      if (targetEl?.value) localStorage.setItem(HEALTH_KEYS.sleepTarget, targetEl.value);
      showToast("睡眠记录已保存");
      refreshHealthSleepPage();
    });
  }
  if (targetEl && !targetEl.dataset.boundBlur) {
    targetEl.dataset.boundBlur = "1";
    targetEl.addEventListener("change", () => {
      if (targetEl.value) localStorage.setItem(HEALTH_KEYS.sleepTarget, targetEl.value);
    });
  }
}

function refreshHealthCaloriesPage() {
  const dateEl = document.getElementById("cal-date");
  const nameEl = document.getElementById("cal-name");
  const kcalEl = document.getElementById("cal-kcal");
  const listEl = document.getElementById("cal-list");
  const totalEl = document.getElementById("cal-total-display");
  const chipsEl = document.getElementById("cal-quick-chips");
  if (!dateEl || !listEl) return;
  dateEl.value = dateEl.value || todayDateStr();
  const store = healthReadJson(HEALTH_KEYS.cal, {});
  const day = dateEl.value;
  const items = Array.isArray(store[day]) ? store[day] : [];

  if (chipsEl && !chipsEl.dataset.built) {
    chipsEl.dataset.built = "1";
    HEALTH_CAL_PRESETS.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "health-chip";
      b.textContent = `${p.name} · ${p.kcal}`;
      b.addEventListener("click", () => {
        nameEl.value = p.name;
        kcalEl.value = String(p.kcal);
      });
      chipsEl.appendChild(b);
    });
  }

  const total = items.reduce((s, x) => s + (Number(x.kcal) || 0), 0);
  totalEl.textContent = `${total} kcal`;
  listEl.innerHTML = "";
  items.forEach((row, idx) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${row.name}  ·  ${row.kcal} kcal`;
    const del = document.createElement("button");
    del.type = "button";
    del.className = "health-record-del";
    del.textContent = "删";
    del.addEventListener("click", () => {
      const nextItems = items.filter((_, i) => i !== idx);
      const nextStore = { ...store, [day]: nextItems };
      if (nextItems.length === 0) delete nextStore[day];
      healthWriteJson(HEALTH_KEYS.cal, nextStore);
      refreshHealthCaloriesPage();
    });
    li.append(span, del);
    listEl.appendChild(li);
  });

  const addBtn = document.getElementById("cal-add-btn");
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.dataset.bound = "1";
    addBtn.addEventListener("click", () => {
      const d = dateEl.value;
      const name = nameEl.value.trim();
      const kcal = Number(kcalEl.value);
      if (!d || !name || !Number.isFinite(kcal) || kcal <= 0) {
        showToast("请填写食物名称与有效热量");
        return;
      }
      const st = healthReadJson(HEALTH_KEYS.cal, {});
      const arr = Array.isArray(st[d]) ? st[d] : [];
      arr.push({ name, kcal });
      st[d] = arr;
      healthWriteJson(HEALTH_KEYS.cal, st);
      nameEl.value = "";
      kcalEl.value = "";
      showToast("已加入");
      refreshHealthCaloriesPage();
    });
  }
  if (dateEl && !dateEl.dataset.bound) {
    dateEl.dataset.bound = "1";
    dateEl.addEventListener("change", () => refreshHealthCaloriesPage());
  }
}

function refreshHealthWaterPage() {
  const goalEl = document.getElementById("water-goal");
  const dateEl = document.getElementById("water-date");
  const barEl = document.getElementById("water-bar");
  const statEl = document.getElementById("water-stat-text");
  if (!goalEl || !dateEl || !barEl) return;
  const st = healthReadJson(HEALTH_KEYS.water, { goalMl: 2000, days: {} });
  if (!goalEl.value) goalEl.value = String(st.goalMl || 2000);
  dateEl.value = dateEl.value || todayDateStr();
  const day = dateEl.value;
  const goal = Math.max(300, Number(goalEl.value) || 2000);
  st.goalMl = goal;
  healthWriteJson(HEALTH_KEYS.water, st);
  const ml = st.days[day] || 0;
  const pct = Math.min(100, Math.round((ml / goal) * 100));
  barEl.style.width = `${pct}%`;
  statEl.textContent = `${day}  已饮 ${ml} / ${goal} ml  ·  ${pct}%`;

  const resetBtn = document.getElementById("water-reset-day");
  if (resetBtn && !resetBtn.dataset.bound) {
    resetBtn.dataset.bound = "1";
    resetBtn.addEventListener("click", () => {
      const s = healthReadJson(HEALTH_KEYS.water, { goalMl: 2000, days: {} });
      delete s.days[dateEl.value];
      healthWriteJson(HEALTH_KEYS.water, s);
      showToast("已清空当日饮水记录");
      refreshHealthWaterPage();
    });
  }
  document.querySelectorAll("[data-water-add]").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      const add = Number(btn.getAttribute("data-water-add"));
      const s = healthReadJson(HEALTH_KEYS.water, { goalMl: 2000, days: {} });
      const d = dateEl.value;
      s.days[d] = (s.days[d] || 0) + add;
      s.goalMl = Math.max(300, Number(goalEl.value) || 2000);
      healthWriteJson(HEALTH_KEYS.water, s);
      refreshHealthWaterPage();
    });
  });
  if (goalEl && !goalEl.dataset.bound) {
    goalEl.dataset.bound = "1";
    goalEl.addEventListener("change", () => refreshHealthWaterPage());
  }
  if (dateEl && !dateEl.dataset.wBound) {
    dateEl.dataset.wBound = "1";
    dateEl.addEventListener("change", () => refreshHealthWaterPage());
  }
}

function refreshHealthExercisePage() {
  const dateEl = document.getElementById("ex-date");
  const listEl = document.getElementById("ex-list");
  const daySumEl = document.getElementById("ex-day-summary");
  const weekSumEl = document.getElementById("ex-week-summary");
  if (!dateEl || !listEl) return;
  dateEl.value = dateEl.value || todayDateStr();
  const st = healthReadJson(HEALTH_KEYS.ex, {});
  const day = dateEl.value;
  const items = Array.isArray(st[day]) ? st[day] : [];
  let weekMin = 0;
  for (let i = 0; i < 7; i++) {
    const d = addDaysToIso(day, -i);
    const arr = Array.isArray(st[d]) ? st[d] : [];
    weekMin += arr.reduce((s, r) => s + (Number(r.minutes) || 0), 0);
  }
  const dayMin = items.reduce((s, r) => s + (Number(r.minutes) || 0), 0);
  const daySteps = items.reduce((s, r) => s + (Number(r.steps) || 0), 0);
  daySumEl.textContent = `运动 ${dayMin} 分钟 · 记录步数合计 ${daySteps}`;
  weekSumEl.textContent = `含当日往前共 7 天：累计运动 ${weekMin} 分钟`;

  listEl.innerHTML = "";
  items.forEach((row, idx) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${row.type}  ·  ${row.minutes || 0} 分钟${row.steps ? ` · ${row.steps} 步` : ""}`;
    const del = document.createElement("button");
    del.type = "button";
    del.className = "health-record-del";
    del.textContent = "删";
    del.addEventListener("click", () => {
      const next = items.filter((_, j) => j !== idx);
      const nextSt = { ...st, [day]: next };
      if (next.length === 0) delete nextSt[day];
      healthWriteJson(HEALTH_KEYS.ex, nextSt);
      refreshHealthExercisePage();
    });
    li.append(span, del);
    listEl.appendChild(li);
  });

  const addBtn = document.getElementById("ex-add-btn");
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.dataset.bound = "1";
    addBtn.addEventListener("click", () => {
      const d = dateEl.value;
      const type = document.getElementById("ex-type").value.trim();
      const minutes = Number(document.getElementById("ex-min").value);
      const steps = Number(document.getElementById("ex-steps").value);
      if (!d || !type || !Number.isFinite(minutes) || minutes <= 0) {
        showToast("请填写活动类型与有效时长");
        return;
      }
      const s = healthReadJson(HEALTH_KEYS.ex, {});
      const arr = Array.isArray(s[d]) ? s[d] : [];
      arr.push({ type, minutes, steps: Number.isFinite(steps) && steps > 0 ? steps : 0 });
      s[d] = arr;
      healthWriteJson(HEALTH_KEYS.ex, s);
      document.getElementById("ex-type").value = "";
      document.getElementById("ex-min").value = "";
      document.getElementById("ex-steps").value = "";
      showToast("已添加");
      refreshHealthExercisePage();
    });
  }
  if (dateEl && !dateEl.dataset.exBound) {
    dateEl.dataset.exBound = "1";
    dateEl.addEventListener("change", () => refreshHealthExercisePage());
  }
}

function refreshHealthWeightPage() {
  const heightEl = document.getElementById("weight-height");
  const dateEl = document.getElementById("weight-date");
  const kgEl = document.getElementById("weight-kg");
  const listEl = document.getElementById("weight-list");
  const bmiEl = document.getElementById("weight-bmi-display");
  if (!heightEl || !dateEl || !listEl) return;
  const st = healthReadJson(HEALTH_KEYS.weight, { heightCm: null, logs: [] });
  if (st.heightCm) heightEl.value = String(st.heightCm);
  dateEl.value = dateEl.value || todayDateStr();

  const renderList = () => {
    const wst = healthReadJson(HEALTH_KEYS.weight, { heightCm: null, logs: [] });
    const logs = [...(wst.logs || [])].sort((a, b) => (a.date < b.date ? 1 : -1));
    listEl.innerHTML = "";
    logs.slice(0, 40).forEach((row) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${row.date}  ·  ${row.kg} kg`;
      const del = document.createElement("button");
      del.type = "button";
      del.className = "health-record-del";
      del.textContent = "删";
      del.addEventListener("click", () => {
        const orig = healthReadJson(HEALTH_KEYS.weight, { heightCm: null, logs: [] });
        orig.logs = (orig.logs || []).filter((x) => x.date !== row.date);
        healthWriteJson(HEALTH_KEYS.weight, orig);
        refreshHealthWeightPage();
      });
      li.append(span, del);
      listEl.appendChild(li);
    });
    const hcm = Number(heightEl.value) || wst.heightCm;
    const last = logs[0];
    if (last && hcm) {
      const m = hcm / 100;
      const bmi = Math.round((last.kg / (m * m)) * 10) / 10;
      bmiEl.textContent = `最近体重 ${last.kg} kg（${last.date}）· BMI ≈ ${bmi}（非医疗结论）`;
    } else if (last) {
      bmiEl.textContent = `最近体重 ${last.kg} kg（${last.date}）· 填写身高后可算 BMI`;
    } else {
      bmiEl.textContent = "暂无体重记录";
    }
  };
  renderList();

  const hSave = document.getElementById("weight-height-save");
  if (hSave && !hSave.dataset.bound) {
    hSave.dataset.bound = "1";
    hSave.addEventListener("click", () => {
      const h = Number(heightEl.value);
      if (!Number.isFinite(h) || h < 120 || h > 220) {
        showToast("请输入合理身高（120–220 cm）");
        return;
      }
      const wst = healthReadJson(HEALTH_KEYS.weight, { heightCm: null, logs: [] });
      wst.heightCm = h;
      healthWriteJson(HEALTH_KEYS.weight, wst);
      showToast("身高已保存");
      refreshHealthWeightPage();
    });
  }
  const addBtn = document.getElementById("weight-add-btn");
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.dataset.bound = "1";
    addBtn.addEventListener("click", () => {
      const d = dateEl.value;
      const kg = Number(kgEl.value);
      if (!d || !Number.isFinite(kg) || kg < 25 || kg > 200) {
        showToast("请填写有效体重");
        return;
      }
      const wst = healthReadJson(HEALTH_KEYS.weight, { heightCm: null, logs: [] });
      wst.logs = (wst.logs || []).filter((x) => x.date !== d);
      wst.logs.push({ date: d, kg: Math.round(kg * 10) / 10 });
      healthWriteJson(HEALTH_KEYS.weight, wst);
      kgEl.value = "";
      showToast("体重已保存");
      refreshHealthWeightPage();
    });
  }
}

function refreshHealthCyclePage() {
  const predictEl = document.getElementById("cycle-predict-display");
  const listEl = document.getElementById("cycle-start-list");
  const noteEl = document.getElementById("cycle-note");
  const startPick = document.getElementById("cycle-start-date");
  if (!predictEl || !listEl) return;
  const st = healthReadJson(HEALTH_KEYS.cycle, { starts: [], note: "" });
  noteEl.value = st.note || "";
  const starts = [...new Set(st.starts || [])].sort();

  let predict = "至少记录两次月经开始日，才能估算平均周期。";
  if (starts.length >= 2) {
    const intervals = [];
    for (let i = 1; i < starts.length; i++) intervals.push(daysBetweenIso(starts[i - 1], starts[i]));
    const use = intervals.slice(-3);
    const avg = Math.round(use.reduce((a, b) => a + b, 0) / use.length);
    const clamped = Math.min(35, Math.max(21, avg));
    const next = addDaysToIso(starts[starts.length - 1], clamped);
    predict = `根据近段间隔估算平均约 ${clamped} 天 · 下次大约在 ${next}（仅供参考）`;
  } else if (starts.length === 1) {
    predict = `暂按 28 天推测下次约 ${addDaysToIso(starts[0], 28)}（多记几次会更准）`;
  }
  predictEl.textContent = predict;

  listEl.innerHTML = "";
  [...starts].reverse().forEach((iso) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = iso;
    const del = document.createElement("button");
    del.type = "button";
    del.className = "health-record-del";
    del.textContent = "删";
    del.addEventListener("click", () => {
      const s = healthReadJson(HEALTH_KEYS.cycle, { starts: [], note: "" });
      s.starts = (s.starts || []).filter((x) => x !== iso);
      healthWriteJson(HEALTH_KEYS.cycle, s);
      refreshHealthCyclePage();
    });
    li.append(span, del);
    listEl.appendChild(li);
  });

  const markToday = document.getElementById("cycle-mark-start");
  if (markToday && !markToday.dataset.bound) {
    markToday.dataset.bound = "1";
    markToday.addEventListener("click", () => {
      const iso = todayDateStr();
      const s = healthReadJson(HEALTH_KEYS.cycle, { starts: [], note: "" });
      const set = new Set(s.starts || []);
      set.add(iso);
      s.starts = [...set].sort();
      healthWriteJson(HEALTH_KEYS.cycle, s);
      showToast("已记录月经开始");
      refreshHealthCyclePage();
    });
  }
  const addStart = document.getElementById("cycle-add-start-btn");
  if (addStart && !addStart.dataset.bound) {
    addStart.dataset.bound = "1";
    addStart.addEventListener("click", () => {
      const iso = startPick.value;
      if (!iso) {
        showToast("请选择日期");
        return;
      }
      const s = healthReadJson(HEALTH_KEYS.cycle, { starts: [], note: "" });
      const set = new Set(s.starts || []);
      set.add(iso);
      s.starts = [...set].sort();
      healthWriteJson(HEALTH_KEYS.cycle, s);
      showToast("已保存");
      refreshHealthCyclePage();
    });
  }
  const noteSave = document.getElementById("cycle-note-save");
  if (noteSave && !noteSave.dataset.bound) {
    noteSave.dataset.bound = "1";
    noteSave.addEventListener("click", () => {
      const s = healthReadJson(HEALTH_KEYS.cycle, { starts: [], note: "" });
      s.note = noteEl.value.slice(0, 500);
      healthWriteJson(HEALTH_KEYS.cycle, s);
      showToast("备忘已保存");
    });
  }
}

function stopHealthBreatheAnim() {
  if (healthBreatheTimer) {
    clearInterval(healthBreatheTimer);
    healthBreatheTimer = null;
  }
  healthBreatheSeq = [];
}

function refreshHealthBreathePage() {
  stopHealthBreatheAnim();
  const phaseEl = document.getElementById("breathe-phase");
  const countEl = document.getElementById("breathe-count");
  const ringEl = document.getElementById("breathe-ring");
  if (phaseEl) phaseEl.textContent = "点击下方开始";
  if (countEl) countEl.textContent = "—";
  ringEl?.classList.remove("is-exhale");
}

function buildBreatheSequence(mode, rounds) {
  const r = Math.min(12, Math.max(1, rounds));
  const seq = [];
  if (mode === "box") {
    for (let i = 0; i < r; i++) {
      seq.push({ ph: "吸气", s: 4, ex: false });
      seq.push({ ph: "屏息", s: 4, ex: false });
      seq.push({ ph: "呼气", s: 4, ex: true });
      seq.push({ ph: "屏息", s: 4, ex: false });
    }
  } else {
    for (let i = 0; i < r; i++) {
      seq.push({ ph: "吸气", s: 4, ex: false });
      seq.push({ ph: "屏息", s: 7, ex: false });
      seq.push({ ph: "呼气", s: 8, ex: true });
    }
  }
  return seq;
}

function breatheApplyUi() {
  const cur = healthBreatheSeq[healthBreatheIdx];
  const phaseEl = document.getElementById("breathe-phase");
  const countEl = document.getElementById("breathe-count");
  const ringEl = document.getElementById("breathe-ring");
  if (!cur) return;
  phaseEl.textContent = `${cur.ph} · 剩余 ${healthBreatheSec} 秒`;
  countEl.textContent = String(healthBreatheSec);
  ringEl.classList.toggle("is-exhale", !!cur.ex);
}

function refreshHealthMedicinePage() {
  const listToday = document.getElementById("med-today-list");
  const listAll = document.getElementById("med-all-list");
  if (!listToday || !listAll) return;
  const meds = healthReadJson(HEALTH_KEYS.med, []);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  function parseTimes(str) {
    return (str || "")
      .split(/[,，;；\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((t) => {
        const m = t.match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return null;
        const h = Number(m[1]);
        const mi = Number(m[2]);
        if (h > 23 || mi > 59) return null;
        return h * 60 + mi;
      })
      .filter((x) => x != null)
      .sort((a, b) => a - b);
  }

  const pending = [];
  meds.forEach((m) => {
    const times = parseTimes(m.timesStr);
    times.forEach((tm) => {
      if (tm >= nowMin) pending.push({ tm, label: `${m.name}（${m.dose || "—"}）· ${String(Math.floor(tm / 60)).padStart(2, "0")}:${String(tm % 60).padStart(2, "0")}` });
    });
  });
  pending.sort((a, b) => a.tm - b.tm);

  listToday.innerHTML = "";
  if (pending.length === 0) {
    const li = document.createElement("li");
    li.innerHTML = "<span>当前时间之后暂无待服时间点（或尚未添加药品）</span>";
    listToday.appendChild(li);
  } else {
    pending.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${p.label}</span>`;
      listToday.appendChild(li);
    });
  }

  listAll.innerHTML = "";
  meds.forEach((m, idx) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = `${m.name}  ·  ${m.dose || "—"}  ·  ${m.timesStr || "—"}${m.note ? `  ·  ${m.note}` : ""}`;
    const del = document.createElement("button");
    del.type = "button";
    del.className = "health-record-del";
    del.textContent = "删";
    del.addEventListener("click", () => {
      const next = meds.filter((_, j) => j !== idx);
      healthWriteJson(HEALTH_KEYS.med, next);
      refreshHealthMedicinePage();
    });
    li.append(span, del);
    listAll.appendChild(li);
  });

  const addBtn = document.getElementById("med-add-btn");
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.dataset.bound = "1";
    addBtn.addEventListener("click", () => {
      const name = document.getElementById("med-name").value.trim();
      const dose = document.getElementById("med-dose").value.trim();
      const timesStr = document.getElementById("med-times").value.trim();
      const note = document.getElementById("med-note").value.trim();
      if (!name || !timesStr) {
        showToast("请填写药品名称与至少一个时间");
        return;
      }
      const bad = timesStr.split(/[,，;；\s]+/).some((t) => {
        const s = t.trim();
        if (!s) return false;
        return !/^(\d{1,2}):(\d{2})$/.test(s);
      });
      if (bad) {
        showToast("时间格式请用 HH:MM，多个用逗号分隔");
        return;
      }
      const arr = healthReadJson(HEALTH_KEYS.med, []);
      arr.push({ name, dose, timesStr, note });
      healthWriteJson(HEALTH_KEYS.med, arr);
      document.getElementById("med-name").value = "";
      document.getElementById("med-dose").value = "";
      document.getElementById("med-times").value = "";
      document.getElementById("med-note").value = "";
      showToast("已添加");
      refreshHealthMedicinePage();
    });
  }
}

function initHealthTools() {
  const startBtn = document.getElementById("breathe-start");
  const stopBtn = document.getElementById("breathe-stop");
  if (startBtn && !startBtn.dataset.bound) {
    startBtn.dataset.bound = "1";
    startBtn.addEventListener("click", () => {
      const mode = document.getElementById("breathe-mode")?.value || "478";
      const rounds = Number(document.getElementById("breathe-rounds")?.value) || 4;
      stopHealthBreatheAnim();
      healthBreatheSeq = buildBreatheSequence(mode, rounds);
      healthBreatheIdx = 0;
      healthBreatheSec = healthBreatheSeq[0]?.s || 0;
      if (!healthBreatheSeq.length) return;
      breatheApplyUi();
      healthBreatheTimer = setInterval(() => {
        healthBreatheSec -= 1;
        if (healthBreatheSec > 0) {
          breatheApplyUi();
          return;
        }
        healthBreatheIdx += 1;
        if (healthBreatheIdx >= healthBreatheSeq.length) {
          stopHealthBreatheAnim();
          document.getElementById("breathe-phase").textContent = "本轮已完成，可以再来一轮～";
          document.getElementById("breathe-count").textContent = "✓";
          document.getElementById("breathe-ring")?.classList.remove("is-exhale");
          showToast("呼吸练习完成");
          return;
        }
        healthBreatheSec = healthBreatheSeq[healthBreatheIdx].s;
        breatheApplyUi();
      }, 1000);
    });
  }
  if (stopBtn && !stopBtn.dataset.bound) {
    stopBtn.dataset.bound = "1";
    stopBtn.addEventListener("click", () => {
      stopHealthBreatheAnim();
      refreshHealthBreathePage();
    });
  }
}

initBoyfriendPage();
initWardrobePage();
initHealthTools();
