export function renderImages(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
          <div class="photo-card">
            <a href="${largeImageURL}" class="photo-card-link">
              <div class="photo-card-wrapper">
                <div class="photo-card-container">
                  <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                </div>
              </div>
            </a>
            <div class="info">
              <p class="info-item"><b>Likes</b> ${likes}</p>
              <p class="info-item"><b>Views</b> ${views}</p>
              <p class="info-item"><b>Comments</b> ${comments}</p>
              <p class="info-item"><b>Downloads</b> ${downloads}</p>
            </div>
          </div>
        `
    )
    .join('');
}
