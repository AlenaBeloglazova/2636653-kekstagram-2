import { renderThumbnails } from './thumbnails.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

let currentPhotos = [];
let currentFilter = 'filter-default';

const filterButtons = document.querySelector('.img-filters__form');
const filterButtonsList = document.querySelectorAll('.img-filters__button');

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функции фильтрации
const getDefaultPhotos = (photos) => photos.slice();

const getRandomPhotos = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const filters = {
  'filter-default': getDefaultPhotos,
  'filter-random': getRandomPhotos,
  'filter-discussed': getDiscussedPhotos
};

// Активация кнопки фильтра
const setActiveFilter = (activeButton) => {
  filterButtonsList.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

// Перерисовка галереи с новым фильтром
const renderFilteredPhotos = debounce((filterName) => {
  const filteredPhotos = filters[filterName](currentPhotos);
  renderThumbnails(filteredPhotos, true);
}, RERENDER_DELAY);

// Обработчик клика по фильтрам
const onFilterClick = (evt) => {
  const targetButton = evt.target.closest('.img-filters__button');
  if (!targetButton) {
    return;
  }

  const filterName = targetButton.id;
  if (filterName === currentFilter) {
    return;
  }

  setActiveFilter(targetButton);
  currentFilter = filterName;
  renderFilteredPhotos(filterName);
};

// Инициализация фильтров
const initFilters = (photos) => {
  currentPhotos = photos;
  currentFilter = 'filter-default';

  filterButtons.addEventListener('click', onFilterClick);
};

export { initFilters };
