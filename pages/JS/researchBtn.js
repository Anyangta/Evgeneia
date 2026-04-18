const ITEMS_PER_PAGE = 5;

const pageData = {
  study: {
    items: [
      { title: "클라우드 실시간 이벤트 처리", tag: "Computer Vision", date: "2026. 04. 10", desc: "엣지 컴퓨터를 기반과 분산 처리를 이용한 실시간 이벤트 데이터 분석 및 처리." },
      /*
      { title: "GAN 학습 불안정성 분석", tag: "Generative Model", date: "2024. 04. 02", desc: "Mode Collapse와 Vanishing Gradient 문제를 실험을 통해 재현하고 WGAN으로 해결 방법을 정리하였습니다." },
      { title: "CNN 특징 추출 실험", tag: "Computer Vision", date: "2024. 04. 20", desc: "ResNet, VGG, EfficientNet의 특징 추출 방식을 비교하고 각 구조의 장단점을 분석하였습니다." },
      { title: "LSTM 시계열 예측", tag: "NLP", date: "2024. 05. 08", desc: "주가 데이터를 활용하여 LSTM 기반 시계열 예측 모델을 설계하고 성능을 평가하였습니다." },
      { title: "Diffusion Model 이해", tag: "Generative Model", date: "2024. 05. 25", desc: "DDPM 논문을 정리하고 노이즈 스케줄링과 역확산 과정을 시각화하였습니다." },
      { title: "RL 기초 - Q-Learning", tag: "Reinforcement Learning", date: "2024. 06. 10", desc: "CartPole 환경에서 Q-Learning을 직접 구현하며 에이전트의 학습 과정을 분석하였습니다." },
      { title: "Graph Neural Network", tag: "GNN", date: "2024. 06. 28", desc: "분자 구조를 그래프로 표현하고 GCN을 활용해 특성 예측을 수행하는 파이프라인을 구축하였습니다." },
      { title: "Vision Transformer 실험", tag: "Deep Learning", date: "2024. 07. 15", desc: "ViT 구조를 CIFAR-10에 적용하고 CNN 대비 성능 및 학습 효율을 비교하였습니다." },
      { title: "Contrastive Learning 정리", tag: "Self-supervised", date: "2024. 08. 01", desc: "SimCLR, MoCo 등 대조 학습 방법론의 핵심 아이디어와 구현 방식을 정리하였습니다." },
       */
    ]
  },
  project: {
    items: [
      { title: "Harry Potter 텍스트 기반 Hybrid RAG", status: "진행중", type: "전시회", agency: "World IT Show", period: "2026. 03 – 2026. 04", role: "참여연구원", desc: "VectorDB + BM25을 활용한 RAG기반 검색 엔진 최적화 연구" },
      /*
      { title: "페로브스카이트 LED 소자 안정성 개선", status: "진행중", type: "국가과제", agency: "산업통상자원부", period: "2023. 01 – 2025. 12", role: "참여연구원", desc: "할라이드 페로브스카이트 발광층의 열적·환경적 안정성을 개선하기 위한 계면 엔지니어링 연구를 진행하였습니다." },
      { title: "고분자 전해질 기반 에너지 저장 소자 개발", status: "완료", type: "기업과제", agency: "삼성SDI", period: "2023. 06 – 2024. 05", role: "연구원", desc: "고이온전도성 고분자 전해질 합성 및 전고체 배터리 적용 가능성을 평가하고 최적 조성을 도출하였습니다." },
      { title: "유기 반도체 박막 공정 최적화", status: "완료", type: "기업과제", agency: "LG화학", period: "2022. 09 – 2023. 08", role: "참여연구원", desc: "슬롯-다이 코팅 공정 파라미터 최적화를 통해 대면적 유기 반도체 박막의 균일도 및 재현성을 향상시켰습니다." },
      { title: "탠덤 태양전지 모듈 스케일업 연구", status: "진행중", type: "국가과제", agency: "한국에너지기술평가원 (KETEP)", period: "2024. 01 – 2026. 12", role: "참여연구원", desc: "페로브스카이트/실리콘 탠덤 구조의 대면적 모듈 제작 공정을 개발하고 장기 안정성 평가 프로토콜을 수립하였습니다." },
      { title: "유연 전자소자용 투명전극 개발", status: "완료", type: "기업과제", agency: "코오롱인더스트리", period: "2023. 03 – 2024. 02", role: "연구원", desc: "은 나노와이어 기반 투명전극의 굴곡 안정성과 면저항 특성을 개선하여 웨어러블 소자 적용 가능성을 검증하였습니다." },
       */
    ]
  }
};

const blocks = document.querySelectorAll(".research-block");

blocks.forEach((block) => {
  const type = block.dataset.type;
  const contentEl = block.querySelector(".content");
  const pageList = block.querySelector(".page-list");
  const prevBtn = block.querySelector(".prevBtn");
  const nextBtn = block.querySelector(".nextBtn");

  const items = pageData[type].items;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  let currentPage = 1;

  function renderContent(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const slice = items.slice(start, start + ITEMS_PER_PAGE);

    if (type === "project") {
      contentEl.innerHTML = slice.map(item => `
        <div class="project-card ${item.status === '완료' ? 'done' : 'ongoing'}">
          <div class="project-title">${item.title}</div>
          <div class="project-period">${item.period}</div>
          <div class="project-meta">
            <span class="badge-type ${item.type === '국가과제' ? 'gov' : 'corp'}">${item.type}</span>
            <span class="badge-agency">🏢 ${item.agency}</span>
            <span class="badge-role">${item.role}</span>
            <span class="badge-status ${item.status === '완료' ? 'done' : 'ongoing'}">
              ${item.status === '완료' ? '✔ 완료' : '● 진행중'}
            </span>
          </div>
          <p class="project-desc">${item.desc}</p>
        </div>
      `).join("");
    } else {
      contentEl.innerHTML = slice.map(item => `
        <div class="content-card">
          <h2>${item.title}</h2>
          <div class="content-meta">
            <span class="content-tag">${item.tag}</span>
            <span class="content-date">${item.date}</span>
          </div>
          <p>${item.desc}</p>
        </div>
      `).join("");
    }
  }

  function createPageButton(page) {
    const button = document.createElement("button");
    button.className = "page-btn" + (page === currentPage ? " active" : "");
    button.textContent = page;
    button.addEventListener("click", () => updatePage(page));
    return button;
  }

  function createEllipsis() {
    const span = document.createElement("span");
    span.className = "ellipsis";
    span.textContent = "...";
    return span;
  }

  function renderPagination() {
    pageList.innerHTML = "";

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageList.appendChild(createPageButton(i));
      return;
    }
    if (currentPage <= 3) {
      [1, 2, 3].forEach(i => pageList.appendChild(createPageButton(i)));
      pageList.appendChild(createEllipsis());
      pageList.appendChild(createPageButton(totalPages));
      return;
    }
    if (currentPage >= totalPages - 2) {
      pageList.appendChild(createPageButton(1));
      pageList.appendChild(createEllipsis());
      [totalPages - 2, totalPages - 1, totalPages].forEach(i => pageList.appendChild(createPageButton(i)));
      return;
    }
    pageList.appendChild(createPageButton(1));
    pageList.appendChild(createEllipsis());
    pageList.appendChild(createPageButton(currentPage));
    pageList.appendChild(createEllipsis());
    pageList.appendChild(createPageButton(totalPages));
  }

  function updatePage(page) {
    currentPage = page;
    renderContent(page);
    renderPagination();
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => { if (currentPage > 1) updatePage(currentPage - 1); });
  nextBtn.addEventListener("click", () => { if (currentPage < totalPages) updatePage(currentPage + 1); });

  updatePage(1);
});