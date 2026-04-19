// ─────────────────────────────────────────────────────
//  데이터 — 노트 추가할 때 여기만 수정하세요
//
//  각 항목 구조:
//  {
//    title : "노트 제목",
//    date  : "2025. 12. 01",
//    level : "초급 / 중급 / 고급",
//    img   : "이미지 URL (없으면 "" 로 비워두세요)",
//    tags  : ["태그1", "태그2"],
//    desc  : "요약 설명 (줄바꿈은 \n 사용)",
//    code  : "코드 (없으면 ""),
//    refs  : [{ title: "링크 제목", url: "https://..." }]  // 없으면 []
//  }
// ─────────────────────────────────────────────────────

const NOTES = {
    frontend: {
        title: "Frontend",
        items: [
            {
                title: "CSS Grid와 Flexbox 레이아웃 정리",
                date: "2025. 12. 01",
                level: "중급",
                img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop",
                tags: ["CSS", "Layout", "Grid"],
                desc: "Grid는 2차원 레이아웃, Flexbox는 1차원 레이아웃에 적합합니다.\n페이지 전체 구조에는 Grid를, 컴포넌트 내부 정렬에는 Flexbox를 사용하는 것이 일반적인 패턴입니다.\n두 가지를 함께 사용할 때 가장 강력해집니다.",
                code:
`/* Grid — 2차원 레이아웃 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Flexbox — 1차원 정렬 */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}`,
                refs: [
                    { title: "MDN — CSS Grid Layout", url: "https://developer.mozilla.org/ko/docs/Web/CSS/CSS_grid_layout" },
                    { title: "CSS-Tricks — A Complete Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
                ]
            },
            {
                title: "React 상태관리 — useState vs useReducer",
                date: "2025. 11. 18",
                level: "중급",
                img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop",
                tags: ["React", "Hooks", "State"],
                desc: "간단한 상태는 useState, 여러 상태가 연관되거나 복잡한 로직은 useReducer가 적합합니다.\nuseReducer는 상태 변화 로직을 컴포넌트 밖으로 분리할 수 있어 테스트에 유리합니다.",
                code:
`const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}`,
                refs: [
                    { title: "React 공식 문서 — useReducer", url: "https://react.dev/reference/react/useReducer" },
                ]
            },
            {
                title: "JavaScript 비동기 처리 — Promise와 async/await",
                date: "2025. 11. 05",
                level: "초급",
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop",
                tags: ["JavaScript", "Async", "Promise"],
                desc: "콜백 지옥부터 async/await까지 비동기 흐름을 단계적으로 정리합니다.\nPromise 체이닝과 async/await의 차이를 이해하고 에러 핸들링 패턴을 정리합니다.",
                code:
`// async / await
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}`,
                refs: [
                    { title: "MDN — Promise", url: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise" },
                    { title: "MDN — async function", url: "https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function" },
                ]
            },
        ]
    },
    backend: {
        title: "Backend",
        items: [
            {
                title: "REST API 설계 원칙",
                date: "2025. 12. 05",
                level: "중급",
                img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop",
                tags: ["REST", "API", "Node.js"],
                desc: "RESTful API 설계 시 지켜야 할 원칙과 엔드포인트 네이밍 규칙 정리.",
                code:
`GET    /users          // 목록 조회
GET    /users/:id      // 단건 조회
POST   /users          // 생성
PUT    /users/:id      // 전체 수정
PATCH  /users/:id      // 부분 수정
DELETE /users/:id      // 삭제`,
                refs: [
                    { title: "REST API Design Best Practices", url: "https://restfulapi.net/" },
                ]
            },
            {
                title: "JWT 인증 흐름 정리",
                date: "2025. 11. 20",
                level: "중급",
                img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop",
                tags: ["JWT", "Auth", "Security"],
                desc: "Access Token과 Refresh Token의 역할과 보안 이슈 정리.\nAccess Token은 짧은 만료 시간, Refresh Token은 긴 만료 시간으로 설정합니다.",
                code:
`const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

const decoded = jwt.verify(token, process.env.JWT_SECRET);`,
                refs: [
                    { title: "JWT 공식 사이트", url: "https://jwt.io/" },
                ]
            },
        ]
    },
    ai: {
        title: "AI / ML",
        items: [
            {
                title: "Transformer 아키텍처 이해",
                date: "2025. 12. 10",
                level: "고급",
                img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop",
                tags: ["Transformer", "NLP", "Attention"],
                desc: "Self-Attention 메커니즘부터 Encoder-Decoder 구조까지 단계적으로 분석.\nQuery, Key, Value 행렬 연산을 통해 시퀀스 내 토큰 간 관계를 학습합니다.",
                code:
`import torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super().__init__()
        self.attention = nn.MultiheadAttention(embed_size, heads)

    def forward(self, x):
        return self.attention(x, x, x)`,
                refs: [
                    { title: "Attention Is All You Need (논문)", url: "https://arxiv.org/abs/1706.03762" },
                ]
            },
        ]
    },
    cloud: {
        title: "Cloud",
        items: [
            {
                title: "Docker 기본 개념과 명령어 정리",
                date: "2025. 11. 28",
                level: "초급",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop",
                tags: ["Docker", "Container", "Linux"],
                desc: "이미지, 컨테이너, 볼륨, 네트워크 개념과 자주 쓰는 명령어 모음.",
                code:
`docker build -t my-app .
docker run -d -p 3000:3000 my-app
docker ps
docker stop <container_id>`,
                refs: [
                    { title: "Docker 공식 문서", url: "https://docs.docker.com/" },
                ]
            },
        ]
    },
    security: {
        title: "Security",
        items: [
            {
                title: "CORS 정책과 해결 방법",
                date: "2025. 11. 15",
                level: "초급",
                img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop",
                tags: ["CORS", "Security", "HTTP"],
                desc: "브라우저의 동일 출처 정책(SOP)과 CORS 에러 해결 방법 정리.\nNode.js Express에서 cors 미들웨어를 사용해 간단히 해결할 수 있습니다.",
                code:
`app.use(cors({
  origin: 'https://my-frontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));`,
                refs: [
                    { title: "MDN — CORS", url: "https://developer.mozilla.org/ko/docs/Web/HTTP/CORS" },
                ]
            },
        ]
    },
    language: {
        title: "Language",
        items: [
            {
                title: "Python 제너레이터와 이터레이터",
                date: "2025. 12. 03",
                level: "중급",
                img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop",
                tags: ["Python", "Generator", "Iterator"],
                desc: "yield 키워드의 동작 원리와 메모리 효율적인 데이터 처리 패턴.\n일반 함수와 달리 제너레이터는 값을 한 번에 메모리에 올리지 않고 필요할 때 생성합니다.",
                code:
`def count_up(limit):
    n = 0
    while n < limit:
        yield n
        n += 1

for i in count_up(5):
    print(i)  # 0 1 2 3 4`,
                refs: [
                    { title: "Python 공식 문서 — Generator", url: "https://docs.python.org/ko/3/howto/functional.html#generators" },
                ]
            },
        ]
    },
};

// ─────────────────────────────────────────
//  설정
// ─────────────────────────────────────────
const PER_PAGE = 10;
let currentPage = 1;
let currentItems = [];

function getCategory() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "frontend";
}

// ─────────────────────────────────────────
//  탭 전환
// ─────────────────────────────────────────
function switchTab(panelEl, tab) {
    panelEl.querySelectorAll(".ptab").forEach(t => {
        t.classList.toggle("active", t.dataset.tab === tab);
    });
    panelEl.querySelectorAll(".ptab-content").forEach(c => {
        c.classList.toggle("active", c.dataset.tab === tab);
    });
}

// ─────────────────────────────────────────
//  아코디언 토글
// ─────────────────────────────────────────
function toggleRow(row) {
    const body = row.querySelector(".note-body");
    const isOpen = row.classList.contains("open");
    document.querySelectorAll(".note-row.open").forEach(r => {
        r.classList.remove("open");
        r.querySelector(".note-body").classList.remove("show");
    });
    if (!isOpen) {
        row.classList.add("open");
        body.classList.add("show");
    }
}

// ─────────────────────────────────────────
//  노트 행 렌더링
// ─────────────────────────────────────────
function renderList(items, page) {
    const list = document.getElementById("note-list");
    list.innerHTML = "";

    const start = (page - 1) * PER_PAGE;
    const pageItems = items.slice(start, start + PER_PAGE);

    pageItems.forEach((item, i) => {
        const globalIdx = start + i;
        const num = String(globalIdx + 1).padStart(2, "0");
        const isOdd = (globalIdx % 2 === 0);
        const parity = isOdd ? "odd" : "even";

        const imgStyle = item.img
            ? `background-image: url('${item.img}')`
            : "";
        const imgClass = item.img ? "row-img" : "row-img no-img";

        const codeTab = item.code
            ? `<div class="ptab" data-tab="code">코드</div>` : "";
        const codeContent = item.code
            ? `<div class="ptab-content" data-tab="code">
                 <div class="code-scroll"><pre>${escapeHtml(item.code)}</pre></div>
               </div>` : "";

        const refsTab = item.refs && item.refs.length
            ? `<div class="ptab" data-tab="refs">참고</div>` : "";
        const refsContent = item.refs && item.refs.length
            ? `<div class="ptab-content" data-tab="refs">
                 <div class="ref-list">
                   ${item.refs.map((r, ri) => `
                     <a class="ref-item" href="${r.url}" target="_blank" rel="noopener">
                       <span class="ref-num">${String(ri + 1).padStart(2, "0")}</span>
                       <span class="ref-title">${r.title}</span>
                       <span class="ref-arrow">→</span>
                     </a>`).join("")}
                 </div>
               </div>` : "";

        const descHtml = item.desc
            .split("\n")
            .map(line => `<p>${line}</p>`)
            .join("");

        const row = document.createElement("div");
        row.className = `note-row ${parity}`;
        row.innerHTML = `
            <div class="row-inner">
                <div class="${imgClass}" style="${imgStyle}"></div>
                <div class="row-content">
                    <span class="note-num">${num}</span>
                    <span class="note-title">${item.title}</span>
                    <div class="note-meta">
                        <span class="note-date">${item.date}</span>
                        <div class="note-arrow">›</div>
                    </div>
                </div>
            </div>
            <div class="note-body">
                <div class="note-panel">
                    <div class="panel-tabs">
                        <div class="ptab active" data-tab="summary">요약</div>
                        ${codeTab}
                        ${refsTab}
                    </div>
                    <div class="ptab-content active" data-tab="summary">
                        <div class="summary-block">
                            <div class="summary-main">${descHtml}</div>
                            <div class="summary-side">
                                <div class="side-box">
                                    <span class="side-box-label">Tags</span>
                                    <div class="note-tags">
                                        ${item.tags.map(t => `<span class="note-tag">${t}</span>`).join("")}
                                    </div>
                                </div>
                                ${item.level ? `
                                <div class="side-box">
                                    <span class="side-box-label">난이도</span>
                                    <span class="value">${item.level}</span>
                                </div>` : ""}
                            </div>
                        </div>
                    </div>
                    ${codeContent}
                    ${refsContent}
                </div>
            </div>
        `;

        row.querySelector(".row-inner").addEventListener("click", () => toggleRow(row));

        const panel = row.querySelector(".note-panel");
        panel.querySelectorAll(".ptab").forEach(tab => {
            tab.addEventListener("click", (e) => {
                e.stopPropagation();
                switchTab(panel, tab.dataset.tab);
            });
        });

        list.appendChild(row);
    });
}

// ─────────────────────────────────────────
//  페이지네이션
// ─────────────────────────────────────────
function renderPagination(total, page) {
    const container = document.getElementById("pagination");
    container.innerHTML = "";
    const totalPages = Math.ceil(total / PER_PAGE);
    if (totalPages <= 1) return;

    const prevBtn = document.createElement("button");
    prevBtn.className = "pg-btn";
    prevBtn.innerHTML = "‹";
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener("click", () => goTo(page - 1));
    container.appendChild(prevBtn);

    for (let p = 1; p <= totalPages; p++) {
        const btn = document.createElement("button");
        btn.className = "pg-btn" + (p === page ? " active" : "");
        btn.textContent = p;
        btn.addEventListener("click", () => goTo(p));
        container.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "pg-btn";
    nextBtn.innerHTML = "›";
    nextBtn.disabled = page === totalPages;
    nextBtn.addEventListener("click", () => goTo(page + 1));
    container.appendChild(nextBtn);
}

function goTo(page) {
    currentPage = page;
    renderList(currentItems, currentPage);
    renderPagination(currentItems.length, currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// ─────────────────────────────────────────
//  초기화
// ─────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    const category = getCategory();
    const data = NOTES[category] || NOTES["frontend"];

    document.title = data.title + " — Study Notes";
    document.getElementById("page-title").textContent = data.title;
    document.getElementById("page-count").textContent = data.items.length + " notes";

    currentItems = data.items;
    renderList(currentItems, currentPage);
    renderPagination(currentItems.length, currentPage);
});