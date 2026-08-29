/* Carosello con loop infinito */
document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const originals = track ? [...track.querySelectorAll('.event-card')] : [];

  if (!track || !previous || !next || !originals?.length) return;

  let position = originals.length;

  originals.slice().reverse().forEach((card) => track.prepend(card.cloneNode(true)));
  originals.forEach((card) => track.append(card.cloneNode(true)));

  const stepSize = () => {
    const card = track.querySelector('.event-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.offsetWidth + gap;
  };

  const visibleCards = () => Math.max(1, Math.round(track.clientWidth / stepSize()));

  const move = (instant = false) => {
    track.style.transition = instant ? 'none' : 'transform 0.35s ease';
    track.style.transform = `translateX(-${position * stepSize()}px)`;
  };

  const reset = () => {
    if (position >= originals.length * 2 || position < originals.length) {
      position = position % originals.length;
      if (position < 0) position += originals.length;
      position += originals.length;
      move(true);
    }
  };

  const changePage = (direction) => {
    position += direction * visibleCards();
    move();
  };

  next.addEventListener('click', () => changePage(1));
  previous.addEventListener('click', () => changePage(-1));

  track.addEventListener('transitionend', reset);
  window.addEventListener('resize', () => move(true));
  move(true);
});

/* Fade in e fade out durante lo scroll */
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('section:not(.galleria), .event-card, .approfondimento-card');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  elements.forEach((element) => element.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.01 }); // controllo della percentuale di visibilità dell'elemento

  elements.forEach((element) => observer.observe(element));
});

/* Masonry */
import { MasonryGrid } from 'https://cdn.skypack.dev/@masonry-grid/vanilla';

const grid = document.getElementById('grid');

if (grid) {
  grid.classList.remove('hidden');

  new MasonryGrid(grid);
}
