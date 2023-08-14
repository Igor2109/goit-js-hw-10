import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/api-cats';
import { createMarkup, createMarkupCat } from './markup';
import refs from './refs';

refs.selectEl.addEventListener('change', onValueId);
fetchBreeds()
  .then(arr => {
    load();

    return (refs.selectEl.innerHTML = createMarkup(arr.data));
  })
  .then(() => slim())
  .catch(fetchError);

function onValueId(e) {
  const id = e.target.value;
  fetchCatByBreed(id)
    .then(obj => {
      load();

      return (refs.catInfoEl.innerHTML = createMarkupCat(obj.data));
    })
    .then(() => success())
    .catch(fetchError);
}
function fetchError() {
  //   refs.error.hidden = false;
  Report.failure(refs.error.textContent, '');
}
function success() {
  Notify.success('Search was successful!)', '');
}
function load() {
  refs.selectEl.hidden = false;
  refs.loaderEl.classList.remove('loader');
}

function slim() {
  new SlimSelect({
    select: refs.selectEl,
  });
}
