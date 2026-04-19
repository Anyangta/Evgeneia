// ─────────────────────────────────────────
//  데이터 — 노트 추가할 때 여기만 수정하세요
// ─────────────────────────────────────────
const NOTES = {
    frontend: {
        title: "Frontend",
        items: [
            {
                title: "CSS Grid와 Flexbox 레이아웃 정리",
                date: "2025. 12. 01",
                desc: "Grid와 Flexbox의 차이를 정리하고 각각 어떤 상황에 쓰는지 비교 분석. 실제 레이아웃 구현 예제 포함.",
                tags: ["CSS", "Layout", "Grid"]
            },
            {
                title: "React 상태관리 — useState vs useReducer",
                date: "2025. 11. 18",
                desc: "복잡한 상태를 다룰 때 useReducer가 왜 유리한지 분석. 간단한 To-do 앱으로 두 방식 비교.",
                tags: ["React", "Hooks", "State"]
            },
            {
                title: "JavaScript 비동기 처리 — Promise와 async/await",
                date: "2025. 11. 05",
                desc: "콜백 지옥부터 async/await까지 비동기 흐름을 단계적으로 정리.",
                tags: ["JavaScript", "Async", "Promise"]
            },
        ]
    },
    backend: {
        title: "Backend",
        items: [
            {
                title: "REST API 설계 원칙",
                date: "2025. 12. 05",
                desc: "RESTful API 설계 시 지켜야 할 원칙과 엔드포인트 네이밍 규칙 정리.",
                tags: ["REST", "API", "Node.js"]
            },
            {
                title: "JWT 인증 흐름 정리",
                date: "2025. 11. 20",
                desc: "Access Token과 Refresh Token의 역할과 보안 이슈 정리.",
                tags: ["JWT", "Auth", "Security"]
            },
        ]
    },
    ai: {
        title: "AI / ML",
        items: [
            {
                title: "Transformer 아키텍처 이해",
                date: "2025. 12. 10",
                desc: "Self-Attention 메커니즘부터 Encoder-Decoder 구조까지 단계적으로 분석.",
                tags: ["Transformer", "NLP", "Attention"]
            },
        ]
    },
    cloud: {
        title: "Cloud",
        items: [
            {
                title: "Docker 기본 개념과 명령어 정리",
                date: "2025. 11. 28",
                desc: "이미지, 컨테이너, 볼륨, 네트워크 개념과 자주 쓰는 명령어 모음.",
                tags: ["Docker", "Container", "Linux"]
            },
        ]
    },
    security: {
        title: "Security",
        items: [
            {
                title: "CORS 정책과 해결 방법",
                date: "2025. 11. 15",
                desc: "브라우저의 동일 출처 정책과 CORS 에러 해결 방법 정리.",
                tags: ["CORS", "Security", "HTTP"]
            },
        ]
    },
    language: {
        title: "Language",
        items: [
            {
                title: "Python 제너레이터와 이터레이터",
                date: "2025. 12. 03",
                desc: "yield 키워드의 동작 원리와 메모리 효율적인 데이터 처리 패턴.",
                tags: ["Python", "Generator", "Iterator"]
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

// ─────────────────────────────────────────
//  URL 파라미터에서 카테고리 읽기
//  예: notes.html?category=frontend
// ─────────────────────────────────────────
function getCategory() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "frontend";
}

// ─────────────────────────────────────────
//  노트 목록 렌더링
// ─────────────────────────────────────────
function renderList(items, page) {
    const list = document.getElementById("note-list");
    list.innerHTML = "";

    const start = (page - 1) * PER_PAGE;
    const pageItems = items.slice(start, start + PER_PAGE);

    pageItems.forEach((item, i) => {
        const num = String(start + i + 1).padStart(2, "0");

        const row = document.createElement("div");
        row.className = "note-row";
        row.innerHTML = `
            <div class="note-header">
                <span class="note-num">${num}</span>
                <span class="note-title">${item.title}</span>
                <span class="note-date">${item.date}</span>
                <div class="note-arrow">›</div>
            </div>
            <div class="note-body">
                <div class="note-body-inner">
                    <p>${item.desc}</p>
                    <div class="note-tags">
                        ${item.tags.map(t => `<span class="note-tag">${t}</span>`).join("")}
                    </div>
                </div>
            </div>
        `;

        row.querySelector(".note-header").addEventListener("click", () => {
            const isOpen = row.classList.contains("open");
            document.querySelectorAll(".note-row.open").forEach(r => {
                r.classList.remove("open");
                r.querySelector(".note-body").classList.remove("show");
            });
            if (!isOpen) {
                row.classList.add("open");
                row.querySelector(".note-body").classList.add("show");
            }
        });

        list.appendChild(row);
    });
}

// ─────────────────────────────────────────
//  페이지네이션 렌더링
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

// ─────────────────────────────────────────
//  초기화
// ─────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    const category = getCategory();
    const data = NOTES[category] || NOTES["frontend"];

    document.title = data.title + " — Study Notes";
    document.getElementById("page-title").textContent = data.title;

    currentItems = data.items;
    renderList(currentItems, currentPage);
    renderPagination(currentItems.length, currentPage);
});