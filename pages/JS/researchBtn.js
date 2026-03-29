const content = document.getElementById("content");
const pageList = document.getElementById("pageList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 1;
const totalPages = 9;

const pageContent = {
  1: `
    <h2>1페이지</h2>
    <p>여기에 1페이지 내용이 들어갑니다.</p>
  `,
  2: `
    <h2>2페이지</h2>
    <p>여기에 2페이지 내용이 들어갑니다.</p>
  `,
  3: `
    <h2>3페이지</h2>
    <p>여기에 3페이지 내용이 들어갑니다.</p>
  `,
  4: `
    <h2>4페이지</h2>
    <p>여기에 4페이지 내용이 들어갑니다.</p>
  `,
  5: `
    <h2>5페이지</h2>
    <p>여기에 5페이지 내용이 들어갑니다.</p>
  `,
  6: `
    <h2>6페이지</h2>
    <p>여기에 6페이지 내용이 들어갑니다.</p>
  `,
  7: `
    <h2>7페이지</h2>
    <p>여기에 7페이지 내용이 들어갑니다.</p>
  `,
  8: `
    <h2>8페이지</h2>
    <p>여기에 8페이지 내용이 들어갑니다.</p>
  `,
  9: `
    <h2>9페이지</h2>
    <p>여기에 9페이지 내용이 들어갑니다.</p>
  `
};

function createPageButton(page) {
  const button = document.createElement("button");
  button.className = "page-btn";
  button.textContent = page;
  button.dataset.page = page;

  if (page === currentPage) {
    button.classList.add("active");
  }

  button.addEventListener("click", () => {
    updatePage(page);
  });

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
    for (let i = 1; i <= totalPages; i++) {
      pageList.appendChild(createPageButton(i));
    }
    return;
  }

  if (currentPage <= 3) {
    pageList.appendChild(createPageButton(1));
    pageList.appendChild(createPageButton(2));
    pageList.appendChild(createPageButton(3));
    pageList.appendChild(createEllipsis());
    pageList.appendChild(createPageButton(totalPages));
    return;
  }

  if (currentPage >= totalPages - 2) {
    pageList.appendChild(createPageButton(1));
    pageList.appendChild(createEllipsis());
    pageList.appendChild(createPageButton(totalPages - 2));
    pageList.appendChild(createPageButton(totalPages - 1));
    pageList.appendChild(createPageButton(totalPages));
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

  content.innerHTML = pageContent[page] || `
    <h2>${page}페이지</h2>
    <p>아직 내용이 없습니다.</p>
  `;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  renderPagination();
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    updatePage(currentPage - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    updatePage(currentPage + 1);
  }
});

updatePage(1);