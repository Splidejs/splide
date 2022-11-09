export function toggleButton(): string {
  return `
    <button class="splide__toggle">
      <span class="splide__toggle__play">Play</span>
      <span class="splide__toggle__pause">Pause</span>
    </button>
  `;
}

export function progressBar(): string {
  return `
    <div class="splide__progress">
      <div class="splide__progress__bar">
      </div>
    </div>
  `;
}

export function customArrows(): string {
  return `
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        ←
      </button>
      <button class="splide__arrow splide__arrow--next">
        →
      </button>
    </div>
  `;
}

export function customPagination(): string {
  return `<div class="splide__pagination"></div>`;
}