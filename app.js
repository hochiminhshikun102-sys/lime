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
const tcmflowTitleEl = document.getElementById("tcmflow-step-title");
const tcmflowContentEl = document.getElementById("tcmflow-step-content");
const tcmflowPrevEl = document.getElementById("tcmflow-prev");
const tcmflowNextEl = document.getElementById("tcmflow-next");
const tcmflowTimelineEl = document.getElementById("tcmflow-timeline");
const avatarFallback = "./assets/share-logo.png?v=6";
const AI_CONFIG_KEY = "limme_ai_config_v1";
const FACE_CAPTURE_STORAGE_KEY = "limme_face_capture_v1";
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
      { name: "柠美轻医美中心", meta: "评分4.9 · 1.2km · 资质认证", doctor: "数字人医生：林医生" },
      { name: "悦肤医疗机构", meta: "评分4.8 · 2.1km · 安全保障", doctor: "数字人医生：周医生" }
    ]
  },
  mind: {
    title: "中医/心理咨询机构列表",
    items: [
      { name: "柠美中医调理馆", meta: "评分4.9 · 1.8km · 三甲合作", doctor: "数字人医师：陈医师" },
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

async function getAIReply(userText) {
  const cfg = getAIConfig();
  if (!cfg.endpoint || !cfg.model || !cfg.apiKey) {
    return buildLocalReply(userText);
  }

  try {
    const response = await fetch(cfg.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          {
            role: "system",
            content: "你是柠美LIMME的小美AI女性健康管家，回复简洁温柔，优先给可执行建议。"
          },
          { role: "user", content: userText }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
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

function setupAIConfig() {
  const cfg = getAIConfig();
  if (aiEndpointEl) aiEndpointEl.value = cfg.endpoint || "https://api.openai.com/v1/chat/completions";
  if (aiModelEl) aiModelEl.value = cfg.model || "";
  if (aiKeyEl) aiKeyEl.value = cfg.apiKey || "";

  aiConfigBtnEl?.addEventListener("click", () => openModal("ai"));
  aiSaveBtnEl?.addEventListener("click", () => {
    const next = {
      endpoint: aiEndpointEl?.value?.trim(),
      model: aiModelEl?.value?.trim(),
      apiKey: aiKeyEl?.value?.trim()
    };
    setAIConfig(next);
    showToast("AI配置已保存，后续语音将调用真实大模型。");
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
  pages.forEach((name) => {
    const pageEl = document.getElementById(`page-${name}`);
    const tabEl = document.querySelector(`.tab-item[data-page="${name}"]`);
    const active = name === pageName;
    pageEl?.classList.toggle("active", active);
    tabEl?.classList.toggle("active", active);
  });
}

function openModal(modalName) {
  const modalEl = document.getElementById(`modal-${modalName}`);
  if (!modalEl) return;
  modalEl.classList.add("show");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal(modalName) {
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

function sampleFaceRegionMetrics(videoEl) {
  const w = videoEl.videoWidth;
  const h = videoEl.videoHeight;
  if (!w || !h) return null;
  const canvas = document.createElement("canvas");
  const maxSide = 480;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const cw = Math.round(w * scale);
  const ch = Math.round(h * scale);
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(videoEl, 0, 0, cw, ch);
  const cx = cw / 2;
  const cy = ch / 2;
  const rx = cw * 0.22;
  const ry = ch * 0.32;
  const imgData = ctx.getImageData(0, 0, cw, ch);
  const d = imgData.data;
  let brightSum = 0;
  let redExcess = 0;
  let n = 0;
  for (let y = 0; y < ch; y += 1) {
    for (let x = 0; x < cw; x += 1) {
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      if (nx * nx + ny * ny > 1) continue;
      const i = (y * cw + x) * 4;
      const rv = d[i];
      const gv = d[i + 1];
      const bv = d[i + 2];
      brightSum += 0.299 * rv + 0.587 * gv + 0.114 * bv;
      redExcess += rv - 0.5 * (gv + bv);
      n += 1;
    }
  }
  if (!n) return null;
  const brightness = brightSum / n;
  const redness = redExcess / n;
  let thumbDataUrl = "";
  try {
    thumbDataUrl = canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    thumbDataUrl = "";
  }
  return { brightness, redness, thumbDataUrl };
}

function describeBasicSkin(metrics) {
  const { brightness, redness } = metrics;
  const tone = brightness > 172
    ? "整体偏亮（注意防晒与氧化）"
    : brightness < 118
      ? "整体偏暗（可做温和提亮）"
      : "明暗关系较均衡";
  const flush = redness > 18
    ? "面颊偏红感略高（光线/敏感都会影响）"
    : "潮红干扰较低";
  return {
    tone,
    flush,
    hint: `采样亮度约 ${Math.round(brightness)}（本地算法演示，非医疗诊断）`
  };
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
  const metrics = sampleFaceRegionMetrics(faceDetectVideoEl);
  if (!metrics || !metrics.thumbDataUrl) {
    showToast("取样失败，请调整光线或距离后重试。");
    return;
  }
  const desc = describeBasicSkin(metrics);
  faceDetectProcessingEl?.classList.remove("is-hidden");
  faceflowCaptureDetectEl.disabled = true;
  try {
    localStorage.setItem(FACE_CAPTURE_STORAGE_KEY, JSON.stringify({
      at: Date.now(),
      brightness: metrics.brightness,
      redness: metrics.redness,
      thumbDataUrl: metrics.thumbDataUrl,
      summary: `${desc.tone}；${desc.flush}`
    }));
  } catch {
    // Storage full or disabled
  }
  await new Promise((resolve) => window.setTimeout(resolve, 900));
  faceDetectProcessingEl?.classList.add("is-hidden");
  showToast(`检测完成：${desc.tone}；${desc.flush}。${desc.hint}`);
  hideFaceflowDetectShowMain();
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
