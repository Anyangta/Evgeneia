window.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const nextBtn = slider.querySelector(".arrow.right");
    const prevBtn = slider.querySelector(".arrow.left");
    const dots = slider.querySelectorAll(".dot");

    let index = 0;
    const total = slides.length;

    function updateSlide() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % total;
        updateSlide();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        updateSlide();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            index = Number(dot.dataset.index);
            updateSlide();
        });
    });
});