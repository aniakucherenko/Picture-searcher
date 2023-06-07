import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImages } from './imagecreate.js';

const API_KEY = '37101968-a8bba96bf4362bcab2ee69f76';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const PER_PAGE = 40;
const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let searchQuery = '';
let index = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.style.display = 'none';

function onSearch(event) {
  event.preventDefault();
  page = 1;
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return;
  }

  gallery.innerHTML = '';
  fetchImages(searchQuery, page);
  loadMoreBtn.style.display = 'none';
}

async function fetchImages(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    const hits = response.data.hits;
    const totalHits = response.data.totalHits;

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    gallery.insertAdjacentHTML('beforeend', renderImages(hits, index));

    lightbox.refresh();

    if (hits.length < PER_PAGE) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }

    if (page === 1) {
      loadMoreBtn.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    } else {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .lastElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2 - 100,
        behavior: 'smooth',
      });
    }

    if (totalHits <= page * PER_PAGE) {
      loadMoreBtn.style.display = 'none';
    }

    page += 1;
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong. Please try again later.'
    );
  }
}

function onLoadMore() {
  fetchImages(searchQuery, (page += 1));
}
