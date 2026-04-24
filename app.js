const pages = ["home", "mall", "booking", "profile"];
const toastEl = document.getElementById("toast");
const submenuTitleEl = document.getElementById("submenu-title");
const submenuContainerEl = document.getElementById("submenu-container");
const detailPanelEl = document.getElementById("detail-panel");
const mallLevel1El = document.getElementById("mall-level-1");
const mallLevel2El = document.getElementById("mall-level-2");
const mallResultsEl = document.getElementById("mall-results");

const serviceTree = {
  medical: {
    label: "轻医美",
    items: [
      { name: "水光护理", desc: "补水焕亮管理，支持到店预约。" },
      { name: "光子嫩肤", desc: "肤色提亮、淡纹方案推荐。" },
      { name: "术后修护", desc: "恢复周期追踪与提醒服务。" }
    ]
  },
  tcm: {
    label: "中医调理",
    items: [
      { name: "体质评估", desc: "九型体质问诊与饮食建议。" },
      { name: "艾灸理疗", desc: "宫寒/肩颈调理套餐管理。" },
      { name: "经络疏通", desc: "周期提醒和复购推荐。" }
    ]
  },
  homecare: {
    label: "上门服务",
    items: [
      { name: "推拿康养", desc: "按时段预约技师上门。" },
      { name: "产后护理", desc: "分阶段康复计划跟踪。" },
      { name: "家庭理疗", desc: "长辈关怀与上门排班。" }
    ]
  },
  yoga: {
    label: "瑜伽课程",
    items: [
      { name: "减脂课程", desc: "课程排班与缺课补签。" },
      { name: "塑形课程", desc: "动作纠正和周计划打卡。" },
      { name: "冥想舒缓", desc: "睡前放松和呼吸训练。" }
    ]
  },
  beauty: {
    label: "美颜管理",
    items: [
      { name: "滤镜诊断", desc: "肤色风格测试与推荐。" },
      { name: "妆容模板", desc: "约会/通勤妆容一键收藏。" },
      { name: "素颜计划", desc: "护肤记录与周期提醒。" }
    ]
  },
  finance: {
    label: "账单到账",
    items: [
      { name: "消费明细", desc: "按时间筛选订单流水。" },
      { name: "退款进度", desc: "退款节点实时推送。" },
      { name: "到账记录", desc: "分渠道查看到账状态。" }
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

function renderSubmenu(menuKey) {
  const menuData = serviceTree[menuKey];
  if (!menuData) return;
  submenuTitleEl.textContent = `当前分类：${menuData.label}`;
  submenuContainerEl.innerHTML = "";
  menuData.items.forEach((item, idx) => {
    const button = document.createElement("button");
    button.className = `submenu-item${idx === 0 ? " active" : ""}`;
    button.innerHTML = `${item.name}<small>${item.desc}</small>`;
    button.addEventListener("click", () => {
      document.querySelectorAll(".submenu-item").forEach((n) => n.classList.remove("active"));
      button.classList.add("active");
      detailPanelEl.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="actions">
          <button class="btn" data-msg="已进入 ${item.name} 详情">查看详情</button>
          <button class="btn" data-msg="${item.name} 已加入预约清单">加入预约</button>
        </div>
      `;
      detailPanelEl.querySelectorAll("[data-msg]").forEach((n) => {
        n.addEventListener("click", () => showToast(n.dataset.msg));
      });
    });
    submenuContainerEl.appendChild(button);
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

document.querySelectorAll(".tab-item").forEach((item) => {
  item.addEventListener("click", () => switchPage(item.dataset.page));
});

document.querySelectorAll("[data-msg]").forEach((item) => {
  item.addEventListener("click", () => showToast(item.dataset.msg));
});

document.querySelectorAll("[data-modal]").forEach((item) => {
  item.addEventListener("click", () => openModal(item.dataset.modal));
});

document.querySelectorAll(".menu-level-1").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".menu-level-1").forEach((n) => n.classList.remove("active"));
    item.classList.add("active");
    renderSubmenu(item.dataset.menu);
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

mallLevel1El?.addEventListener("change", renderMallLevel2);
mallLevel2El?.addEventListener("change", renderMallResults);

renderSubmenu("medical");
renderMallLevel1();
