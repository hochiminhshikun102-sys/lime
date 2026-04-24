const pages = ["home", "clinic", "services", "orders", "profile", "faceflow", "tcmflow", "wardrobe", "boyfriend"];
const toastEl = document.getElementById("toast");
const mallLevel1El = document.getElementById("mall-level-1");
const mallLevel2El = document.getElementById("mall-level-2");
const mallResultsEl = document.getElementById("mall-results");
const servicePanelEl = document.getElementById("service-panel");
const shopPanelEl = document.getElementById("shop-panel");
const xiaomeiAvatarEl = document.getElementById("xiaomei-avatar");
const voiceBtnEl = document.getElementById("voice-btn");
const voiceLabelEl = document.querySelector(".voice-label");
const chatListEl = document.querySelector(".chat-list");
const aiConfigBtnEl = document.getElementById("ai-config-btn");
const aiEndpointEl = document.getElementById("ai-endpoint");
const aiModelEl = document.getElementById("ai-model");
const aiKeyEl = document.getElementById("ai-key");
const aiSaveBtnEl = document.getElementById("ai-save-btn");
const brandHomeBtnEl = document.getElementById("brand-home-btn");
const hotServiceTitleEl = document.getElementById("hot-service-title");
const hotServiceContentEl = document.getElementById("hot-service-content");
const hotServiceMainActionEl = document.getElementById("hot-service-main-action");
const hotServiceSubActionEl = document.getElementById("hot-service-sub-action");
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
const tcmflowTitleEl = document.getElementById("tcmflow-step-title");
const tcmflowContentEl = document.getElementById("tcmflow-step-content");
const tcmflowPrevEl = document.getElementById("tcmflow-prev");
const tcmflowNextEl = document.getElementById("tcmflow-next");
const tcmflowTimelineEl = document.getElementById("tcmflow-timeline");
const avatarFallback = "./assets/share-logo.png?v=6";
const AI_CONFIG_KEY = "limme_ai_config_v1";
const SKIN_VISION_REPORT_KEY = "limme_skin_vision_report_v1";
const CHAT_LIMIT = 4;
const scriptedChat = [
  { role: "ai", text: "嗨，我是你的小美AI管家，有什么可以帮你的吗？" },
  { role: "user", text: "我想做个皮肤检测" },
  { role: "ai", text: "好的，我可以帮你安排AI皮肤检测。你是想立即开始，还是先看报告示例？" },
  { role: "user", text: "立即开始" }
];

const hotServiceMap = {
  medical: {
    title: "轻医美项目",
    rows: ["肤质分析与项目匹配", "数字人医生初筛面诊", "治疗周期与报价透明展示"],
    mainAction: "预约医美面诊",
    subAction: "查看项目清单"
  },
  tcm: {
    title: "中医调理",
    rows: ["体质问询与睡眠评估", "食疗/理疗方案组合推荐", "支持到院与滋补品联动下单"],
    mainAction: "进入中医问诊",
    subAction: "查看调理方案"
  },
  homecare: {
    title: "上门服务",
    rows: ["上门推拿、按摩、康养", "按区域与时段智能排班", "服务前后提醒与评价闭环"],
    mainAction: "立即预约上门",
    subAction: "查看服务套餐"
  },
  yoga: {
    title: "瑜伽课程",
    rows: ["线上课程随时练", "线下场馆一键预约", "按体态目标生成课程计划"],
    mainAction: "进入课程中心",
    subAction: "查看课表"
  }
};

const clinicData = {
  beauty: {
    title: "医美轻美机构列表（按距离/评分）",
    items: [
      { name: "limme柠美轻医美中心", meta: "评分4.9 · 1.2km · 资质认证", doctor: "数字人医生：林医生" },
      { name: "悦肤医疗机构", meta: "评分4.8 · 2.1km · 安全保障", doctor: "数字人医生：周医生" }
    ]
  },
  mind: {
    title: "中医/心理咨询机构列表",
    items: [
      { name: "limme柠美中医调理馆", meta: "评分4.9 · 1.8km · 三甲合作", doctor: "数字人医师：陈医师" },
      { name: "心语心理咨询中心", meta: "评分4.7 · 2.9km · 平台认证", doctor: "数字人咨询师：秦老师" }
    ]
  }
};

const mallTree = {
  护肤品: {
    面部护理: [
      { name: "修护精华", price: "¥199" },
      { name: "补水面膜", price: "¥79" }
    ],
    防晒专区: [
      { name: "轻薄防晒乳", price: "¥129" },
      { name: "敏感肌防晒", price: "¥159" }
    ]
  },
  周边好物: {
    美容仪: [
      { name: "射频导入仪", price: "¥599" },
      { name: "眼部按摩仪", price: "¥269" }
    ],
    香氛蜡烛: [
      { name: "舒缓助眠香氛", price: "¥99" },
      { name: "木质调香氛", price: "¥109" }
    ]
  },
  养护品: {
    中式养生: [
      { name: "红枣桂圆饮", price: "¥49" },
      { name: "阿胶固元糕", price: "¥69" }
    ],
    功能补剂: [
      { name: "胶原蛋白粉", price: "¥139" },
      { name: "益生菌组合", price: "¥118" }
    ]
  }
};

const flowData = {
  medical: {
    title: "医美面诊核心流程",
    steps: [
      "首页唤醒小美",
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
      "首页唤醒小美",
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

const serviceMenuData = {
  health: [
    { title: "经期管理", desc: "经期记录、预测、健康建议" },
    { title: "体重管理", desc: "体重记录、减脂/塑形方案" },
    { title: "美颜相机", desc: "拍照修图、肤质存档" },
    { title: "智能记账本", desc: "日常记账、账单统计" }
  ],
  life: [
    { title: "电子衣柜+穿搭", desc: "衣物录入、每日推荐" },
    { title: "瑜伽课程", desc: "线上课程、线下预约" },
    { title: "上门服务", desc: "上门按摩、上门推拿" }
  ],
  emotion: [
    { title: "24h 私密男模", desc: "私密聊天、互动房间" },
    { title: "内容频道", desc: "小说、漫剧、短视频" }
  ],
  referral: [
    { title: "邀请闺蜜", desc: "邀请海报、分享入口" },
    { title: "佣金明细", desc: "首单50%，后续10%" },
    { title: "佣金提现", desc: "可提现金额、到账记录" }
  ]
};

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

const tcmFlowSteps = [
  {
    title: "步骤1：机构选择",
    screen: "对应原型：27.png",
    image: "./assets/flow/27.png",
    rows: ["按评分/距离筛选中医心理机构", "点击机构进入医师详情"],
    cta: "查看医师详情",
    actions: ["按评分排序", "按距离排序", "进入机构"]
  },
  {
    title: "步骤2：医师详情",
    screen: "对应原型：28.png",
    image: "./assets/flow/28.png",
    rows: ["查看医师资质与擅长（失眠/压力）", "点击“立即预约”进入问诊"],
    cta: "开始问诊",
    actions: ["查看资质", "擅长方向", "立即预约"]
  },
  {
    title: "步骤3：开始问诊",
    screen: "对应原型：29.png",
    image: "./assets/flow/29.png",
    rows: ["选择情志/睡眠/压力问题标签", "输入当前状态并提交问诊"],
    cta: "查看体质报告",
    actions: ["睡眠问题", "压力情绪", "提交问诊"]
  },
  {
    title: "步骤4：体质分析报告",
    screen: "对应原型：30.png",
    image: "./assets/flow/30.png",
    rows: ["输出体质结论（如气郁质）", "展示关键症状条目"],
    cta: "查看调理方案",
    actions: ["体质结论", "风险提示", "生成方案"]
  },
  {
    title: "步骤5：专属调理方案",
    screen: "对应原型：31.png",
    image: "./assets/flow/31.png",
    rows: ["作息与饮食建议清单", "展示方案执行进度"],
    cta: "到店预约",
    actions: ["作息计划", "饮食建议", "执行打卡"]
  },
  {
    title: "步骤6：到店预约",
    screen: "对应原型：32.png",
    image: "./assets/flow/32.png",
    rows: ["选择机构与日期时段", "提交预约进入后续追踪"],
    cta: "设置复诊提醒",
    actions: ["选择机构", "选择时段", "提交预约"]
  },
  {
    title: "步骤7：复诊提醒",
    screen: "对应原型：35.png",
    image: "./assets/flow/35.png",
    rows: ["查看复诊时间/医师信息", "设置提醒避免漏诊"],
    cta: "去服务评价",
    actions: ["7天前提醒", "1天前提醒", "当天提醒"]
  },
  {
    title: "步骤8：服务评价",
    screen: "对应原型：36.png",
    image: "./assets/flow/36.png",
    rows: ["星级评分 + 文本评价", "形成服务闭环与口碑沉淀"],
    cta: "完成链路",
    actions: ["五星评分", "文字评价", "提交评价"]
  }
];

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
    return "可以的，我先为你安排 AI 皮肤检测。请在光线均匀环境下保持正脸，我会先生成肤质报告，再推荐适合你的护理方案。";
  }
  if (t.includes("预约")) {
    return "已收到预约需求，我可以帮你筛选附近机构并按评分排序。你更偏向医美项目，还是中医调理？";
  }
  if (t.includes("经期")) {
    return "经期管理已为你准备好，我可以记录周期并给出饮食与作息建议。你想先补录最近三个月数据吗？";
  }
  return "我已收到你的需求。你可以继续说具体目标，比如皮肤检测、预约面诊、经期管理或上门服务，我会一步步帮你完成。";
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
          content: "你是 limme柠美 的小美AI女性健康管家，回复简洁温柔，优先给可执行建议。"
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
      voiceLabelEl.textContent = listening ? "🎙️ 松开结束并发送" : "🎤 长按呼叫小美";
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
    showToast("AI 配置已保存：小美语音、私密男友、看图等将共用该接口。");
    closeModal("ai");
  });
}

function openHotServicePanel(key) {
  if (key === "medical") {
    enterFaceflowWithDetect();
    return;
  }
  if (key === "tcm") {
    tcmFlowController?.reset();
    switchPage("tcmflow");
    return;
  }

  const cfg = hotServiceMap[key];
  if (!cfg || !hotServiceTitleEl || !hotServiceContentEl) return;

  hotServiceTitleEl.textContent = cfg.title;
  hotServiceContentEl.innerHTML = "";
  cfg.rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "list-row";
    item.textContent = row;
    hotServiceContentEl.appendChild(item);
  });

  if (hotServiceMainActionEl) {
    hotServiceMainActionEl.textContent = cfg.mainAction;
    hotServiceMainActionEl.onclick = () => {
      showToast(`${cfg.mainAction} 已打开`);
    };
  }
  if (hotServiceSubActionEl) {
    hotServiceSubActionEl.textContent = cfg.subAction;
    hotServiceSubActionEl.onclick = () => showToast(`${cfg.subAction} 已打开`);
  }

  openModal("hot-service");
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
  if (pageName === "wardrobe") {
    void refreshWardrobePageContext();
  } else {
    wardrobePendingFiles = null;
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
  "你是 limme柠美 的护肤与形象顾问。用户会上传一张正脸照片（可能素颜或淡妆）。请结合图像给出观察与护理建议：避免医学诊断与处方用语，不做疾病确诊，风险提示要温和。输出中文。";

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
        <button class="btn" data-open-flow-page="${type === "mind" ? "tcmflow" : "faceflow"}">进入面诊</button>
        <button class="btn" data-msg="已打开 ${item.name} 方案页">查看方案</button>
      </div>
    `;
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
          tcmFlowController?.reset();
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

function renderMallLevel2() {
  const level1 = mallLevel1El.value;
  const level2Keys = Object.keys(mallTree[level1] || {});
  mallLevel2El.innerHTML = "";
  level2Keys.forEach((level2, idx) => {
    const option = document.createElement("option");
    option.value = level2;
    option.textContent = idx === 0 ? `二级分类：${level2}` : level2;
    mallLevel2El.appendChild(option);
  });
  renderMallResults();
}

function renderMallResults() {
  const level1 = mallLevel1El.value;
  const level2 = mallLevel2El.value;
  const products = mallTree[level1]?.[level2] || [];
  mallResultsEl.innerHTML = "";
  products.forEach((item) => {
    const row = document.createElement("div");
    row.className = "result-item";
    row.innerHTML = `
      <strong>${item.name}</strong>
      <p class="price">${item.price}</p>
    `;
    mallResultsEl.appendChild(row);
  });
}

function renderServicePanel(tabKey) {
  if (!servicePanelEl || !shopPanelEl) return;
  const isShop = tabKey === "shop";
  servicePanelEl.style.display = isShop ? "none" : "grid";
  shopPanelEl.classList.toggle("active", isShop);
  if (isShop) return;

  const items = serviceMenuData[tabKey] || [];
  servicePanelEl.innerHTML = "";
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "submenu-item";
    btn.setAttribute("data-msg", `${item.title}已打开`);
    btn.innerHTML = `${item.title}<small>${item.desc}</small>`;
    servicePanelEl.appendChild(btn);
  });
  bindDataMsgEvents(servicePanelEl);
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
      tcmFlowController?.reset();
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
    if (tab.classList.contains("service-tab")) {
      document.querySelectorAll(".service-tab").forEach((n) => n.classList.remove("active"));
      tab.classList.add("active");
      renderServicePanel(tab.dataset.serviceTab);
      return;
    }
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
renderServicePanel("health");
setupVoiceConversation();
setupAIConfig();
setupScriptedChatReveal();

const faceFlowController = createFlowRenderer(faceFlowSteps, faceflowTitleEl, faceflowContentEl, faceflowTimelineEl);
const tcmFlowController = createFlowRenderer(tcmFlowSteps, tcmflowTitleEl, tcmflowContentEl, tcmflowTimelineEl);

function enterFaceflowWithDetect() {
  faceFlowController?.reset();
  switchPage("faceflow");
  faceflowVisionReportCardEl?.classList.add("is-hidden");
  showFaceflowDetectEntry();
}

faceFlowController.reset();
tcmFlowController.reset();

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
tcmflowPrevEl?.addEventListener("click", () => tcmFlowController.prev());
tcmflowNextEl?.addEventListener("click", () => tcmFlowController.next());

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

const BF_PERSONAS = [
  {
    id: "lu_yu",
    name: "陆屿",
    tag: "温柔慢热 · 稳稳接住你的情绪",
    emoji: "🌙",
    avatarUrl: "./assets/bf-avatar-lu-yu.png?v=3",
    opening: "嗨，我在这儿。今天不用逞强也行，想聊什么都可以。",
    systemPrompt:
      "你是 limme柠美 里的陪聊数字人「陆屿」，26 岁上下的男生语气，温柔、克制、善于倾听。你会用短句回应，偶尔轻轻开一句玩笑暖场，但不油腻。用户低落时先共情再给微小可行建议。禁止说教、禁止扮演真人医生或律师。",
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
    avatarUrl: "./assets/bf-avatar-pei-ye.png?v=3",
    opening: "哟，这是谁家小朋友跑我这儿来了？说吧，今天谁惹你不高兴了，我替你记小本本。",
    systemPrompt:
      "你是 limme柠美 里的陪聊数字人「裴野」，嘴贫但懂分寸，像关系很好的异性朋友。多用幽默、反转、轻微推拉逗用户笑，不人身攻击、不涉及色情细节。拒绝油腻霸总话术。用户真难过时要收敛玩笑先安慰。",
    suggestLines: ["裴老师上线，今天提供限量版捏脸服务。", "给我个表现机会，我保证比甲方好沟通。", "请你喝赛博奶茶，三分糖去冰。"]
  },
  {
    id: "qin_lang",
    name: "秦朗",
    tag: "兵马俑卫衣理工梗王 · 陪你逛展也行",
    emoji: "🗿",
    avatarUrl: "./assets/bf-avatar-qin-lang.png?v=3",
    opening:
      "刚从那件「骑兵卫衣」灵感里出来——今天要不要跟我去云上博物馆散步？我背着冷知识随时解说。",
    systemPrompt:
      "你是 limme柠美 里的陪聊数字人「秦朗」，爱穿文化梗卫衣的理工感男友风聊天对象。说话里可以自然融入历史梗、博物馆话术、兵马俑与丝绸之路一类轻松知识点，用有趣类比讲日常烦恼（例如把 deadline 比作考古发掘防尘层）。轻松逗乐为主，不做严肃史学考据争论。禁止敏感政治议题。",
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
    avatarUrl: "./assets/bf-avatar-lin-che.png?v=3",
    opening: "姐姐，今天要加班吗？我刚把心情调好，等你戳我一下。",
    systemPrompt:
      "你是 limme柠美 里的陪聊数字人「林澈」，清爽少年感语气，真诚直球，俏皮但有礼貌。若用户表示不喜欢被称呼姐姐/哥哥，立刻改用中性称呼。可撒娇式关心，不涉及性暗示。",
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

function clearBfRoomTheme() {
  bfPanelRoomEl?.removeAttribute("data-bf-theme");
  if (bfRoomHeadEl) bfRoomHeadEl.className = "bf-room-head";
}

function applyBfRoomTheme(personaId) {
  if (!bfPanelRoomEl || !personaId) return;
  bfPanelRoomEl.setAttribute("data-bf-theme", personaId);
}

function showBfPickPanel() {
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
  bfActiveId = persona.id;
  bfThread.length = 0;
  bfLastAiText = "";
  if (bfRoomAvatarImgEl && persona.avatarUrl) {
    bfRoomAvatarImgEl.src = persona.avatarUrl;
    bfRoomAvatarImgEl.alt = `${persona.name} · limme柠美 数字人`;
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
    btn.innerHTML = `<div class="bf-persona-avatar" aria-hidden="true"><img src="${p.avatarUrl}" alt="" width="52" height="52" loading="lazy" decoding="async"></div><div class="bf-persona-name">${p.name}</div><div class="bf-persona-tag">${p.tag}</div>`;
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
  appendBfBubble(text, "user");
  trimBfThread();
  if (bfSendEl) bfSendEl.disabled = true;
  try {
    const reply = await getBoyfriendReply(text);
    bfThread.push({ role: "user", content: text });
    bfThread.push({ role: "assistant", content: reply });
    trimBfThread();
    appendBfBubble(reply, "ai");
    bfLastAiText = reply;
  } finally {
    if (bfSendEl) bfSendEl.disabled = false;
  }
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
}

initBoyfriendPage();
initWardrobePage();
