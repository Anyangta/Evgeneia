const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // 한 번 나타나면 해제
    }
  });
}, {
  threshold: 0.15 // 요소가 15% 보이면 발동
});

// 애니메이션 걸 요소들 등록
document.querySelectorAll(".anim").forEach(el => observer.observe(el));