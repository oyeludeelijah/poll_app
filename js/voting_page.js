document.addEventListener("DOMContentLoaded", function () {
  const slider = function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");

    let curSlide = 0;
    const maxSlide = slides.length - 1;

    // Functions
    const createDots = function () {
      slides.forEach((_, i) => {
        const html = `<button class="dots__dot" data-slide="${i}"></button>`;
        dotContainer.insertAdjacentHTML("beforeend", html);
      });
    };

    const activateDot = function (slide) {
      document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };

    const nextSlide = function () {
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };

    const init = function () {
      createDots();
      activateDot(0);
      goToSlide(0);
    };

    init();

    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
      e.key === "ArrowLeft" && prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });

    // Swipe functionality for mobile users
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStartX - touchEndX;
      if (touchDiff > 50) {
        nextSlide();
      } else if (touchDiff < -50) {
        prevSlide();
      }
      touchStartX = 0;
      touchEndX = 0;
    };

    slider.addEventListener("touchstart", handleTouchStart, false);
    slider.addEventListener("touchmove", handleTouchMove, false);
    slider.addEventListener("touchend", handleTouchEnd, false);
  };

  slider();

  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      console.log("Voted for:", this.textContent);
    });
  });
});
