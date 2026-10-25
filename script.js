"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("gallery-track");
    const slides = document.querySelectorAll(".gallery-slide");
    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");
    const pager = document.getElementById("pager");

    const totalImages = slides.length;
    let currentPage = 0;

    function getVisibleCount() {
        if (window.matchMedia("(max-width: 600px)").matches) {
            return 1;
        }

        return 3;
    }

    function getPageCount() {
        return Math.ceil(totalImages / getVisibleCount());
    }

    function updateGallery() {
        const visibleCount = getVisibleCount();
        const pageCount = getPageCount();
        const maxPage = pageCount - 1;

        currentPage = Math.min(currentPage, maxPage);

        const lastSlideIndex = Math.max(0, totalImages - visibleCount);
        const slideIndex = Math.min(
            currentPage * visibleCount,
            lastSlideIndex
        );

        const slideWidth = slides[0].getBoundingClientRect().width;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap) || 0;
        const offset = slideIndex * (slideWidth + gap);

        track.style.transform = "translateX(-" + offset + "px)";

        pager.textContent = (currentPage + 1) + " / " + pageCount;

        previousButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= maxPage;
    }

    previousButton.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            updateGallery();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < getPageCount() - 1) {
            currentPage++;
            updateGallery();
        }
    });

    window.addEventListener("resize", updateGallery);

    updateGallery();
});