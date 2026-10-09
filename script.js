
const carousel = document.querySelector(".carousel");

if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const images = [...carousel.querySelectorAll(".carousel-image")];
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    const counter = carousel.querySelector(".carousel-counter");

    let currentIndex = 0;
    let touchStartX = 0;

    // Create one dot for every image.
    const dots = images.map((image, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Prikaži fotografiju ${index + 1}`);

        dot.addEventListener("click", () => {
            showImage(index);
        });

        dotsContainer.appendChild(dot);

        return dot;
    });

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        images.forEach((image, i) => {
            image.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute("aria-current",
                i === currentIndex ? "true" : "false");
        });

        counter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
    }

    prevButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    // Support finger swipes on mobile.
    track.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 50) {
            showImage(
                difference < 0
                    ? currentIndex + 1
                    : currentIndex - 1
            );
        }
    }, { passive: true });

    showImage(0);
}
