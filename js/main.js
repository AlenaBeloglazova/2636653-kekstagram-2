
import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initUploadForm } from './form.js';

initUploadForm();

getData()
  .then((photos) => renderThumbnails(photos))
  .catch(() => {
    const dataErrorTemplate = document.querySelector('#data-error').content;
    const errorElement = dataErrorTemplate.cloneNode(true);
    document.body.appendChild(errorElement);

    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  });
