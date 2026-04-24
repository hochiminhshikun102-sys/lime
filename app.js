const pages = ["home", "clinic", "services", "orders", "profile"];
const toastEl = document.getElementById("toast");
const mallLevel1El = document.getElementById("mall-level-1");
const mallLevel2El = document.getElementById("mall-level-2");
const mallResultsEl = document.getElementById("mall-results");
const clinicTitleEl = document.getElementById("clinic-title");
const clinicListEl = document.getElementById("clinic-list");
const flowTitleEl = document.getElementById("flow-title");
const flowStepsEl = document.getElementById("flow-steps");

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
      "AI 扫脸测肤并生成皮肤报告",
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

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1800);
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

document.querySelectorAll("[data-msg]").forEach((item) => {
  item.addEventListener("click", () => showToast(item.dataset.msg));
});

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
    document.querySelectorAll(".mini-tab").forEach((n) => n.classList.remove("active"));
    tab.classList.add("active");
    renderClinic(tab.dataset.clinic);
  });
});

document.querySelectorAll("[data-flow]").forEach((item) => {
  item.addEventListener("click", () => openFlow(item.dataset.flow));
});

mallLevel1El?.addEventListener("change", renderMallLevel2);
mallLevel2El?.addEventListener("change", renderMallResults);

renderClinic("beauty");
renderMallLevel1();
