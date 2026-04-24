const pages = ["home", "clinic", "services", "orders", "profile"];
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
const hotServiceTitleEl = document.getElementById("hot-service-title");
const hotServiceContentEl = document.getElementById("hot-service-content");
const hotServiceMainActionEl = document.getElementById("hot-service-main-action");
const hotServiceSubActionEl = document.getElementById("hot-service-sub-action");
const clinicTitleEl = document.getElementById("clinic-title");
const clinicListEl = document.getElementById("clinic-list");
const flowTitleEl = document.getElementById("flow-title");
const flowStepsEl = document.getElementById("flow-steps");
const avatarFallback = "./assets/share-logo.png?v=6";
const AI_CONFIG_KEY = "limme_ai_config_v1";
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
    hotServiceMainActionEl.onclick = () => showToast(`${cfg.mainAction} 已打开`);
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
        <button class="btn" data-msg="已进入 ${item.name} 数字人面诊页">进入面诊</button>
        <button class="btn" data-msg="已打开 ${item.name} 方案页">查看方案</button>
      </div>
    `;
    row.querySelectorAll("[data-msg]").forEach((btn) => {
      btn.addEventListener("click", () => showToast(btn.dataset.msg));
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
